import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import VKBridge from "@vkontakte/vk-bridge";
import { Offline, Online } from "react-detect-offline";

import { Panel, Input, FormLayout, Button, Avatar, Group, Cell, Header, List, FormLayoutGroup, Separator, Div, Card, CardGrid, Headline } from "@vkontakte/vkui";
import { Icon24Chevron, Icon24Dropdown, Icon24FavoriteOutline, Icon24Write, Icon24DoneOutline, Icon24Cancel } from "@vkontakte/icons";
import { OfflineBlock, Spinner, Error, PanelHeader } from "../components/components";

import { declOfNum, isIP } from "../functions";

import defaultImage from "../assets/server-default.png";

import "./ServerInfo.css";

export function ServerInfo({ id, navigator, scheme }) {

    const [favorite, setFavorite] = useReducer((state, data) => {
        return {
            ...state,
            ...data
        };
    }, {
        servers: [],
        edit: false,
        open: false
    });

    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, false);

    const [IP, setIP] = useState("");
    const [serverData, setServerData] = useReducer((state, data) => {
        if (data) {
            setSpinner(false);
        }

        return data;
    }, null);

    useEffect(() => {
        VKBridge.send("VKWebAppStorageGet", {
            keys: ["steveFavoriteList"]
        })
            .then(({ keys }) => {
                let [servers] = keys;

                servers = servers.value;

                if (servers.length > 1) {
                    setFavorite({
                        servers: servers.split(",")
                    });
                }
            });
    }, []);

    const ping = (ip) => {
        setServerData(null);
        setSpinner(true);
        setFavorite({ open: false });

        axios.get(`https://api.mcsrvstat.us/2/${ip}`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                let { online, players, icon } = data;

                if (online) {
                    if (players.list) {
                        const online = players.online || 0;
                        const list = players.list.filter(name => name.match(/^[A-Za-z0-9_]{2,16}$/g));

                        data.players.list = (list.length < online && list.length === 12 ? `${list} и еще ${online - list.length} ${declOfNum(online - list.length, ["другой", "других", "других"])} ${declOfNum(online - list.length, ["игрок", "игрока", "игроков"])}` : list.toString()).replace(/,/g, ", ");
                    }

                    if (icon) {
                        data.icon = icon.replace(/\//g, "/");
                    } else {
                        data.icon = defaultImage;
                    }

                    data.ip = ip.toLowerCase();

                    setServerData(data);
                } else {
                    setError(`Сервер ${ip} оффлайн, либо информация отсутствует.`);
                    setSpinner(false);
                }
            })
            .catch(error => {
                setError("Произошла ошибка. Попробуйте позже.");
                setSpinner(false);

                console.log(error);
            });
    };

    const inputIP = (event) => {
        const { value } = event.currentTarget;

        setIP(
            value.replace(/[^а-яА-ЯёЁa-zA-Z0-9.:-]/g, "")
                .slice(0, 100)
        );
    };

    const addFavorite = (ip) => {
        const { servers } = favorite;

        const favoriteList = servers;

        favoriteList.unshift(ip.toLowerCase());
        setFavorite(favoriteList);

        saveFavorite();
    };

    const saveFavorite = () => {
        const { servers } = favorite;

        VKBridge.send("VKWebAppStorageSet", {
            key: "steveFavoriteList",
            value: servers.join(",")
        });
    };

    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Информация о сервере"
                         navigator={navigator}
                         left
            />
            <Online>
                <FormLayout>
                    <FormLayoutGroup top="IP-Адрес сервера" bottom="Например: Hypixel.net">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <div style={{ flexGrow: 99 }}>
                                <Input
                                    disabled={spinner || favorite.edit}
                                    name="ip"
                                    value={IP}
                                    onChange={inputIP}
                                    status={isIP(IP) || IP === "" ? "default" : "error"}
                                    bottom={isIP(IP) || IP === "" ? "Например: Hypixel.net" : "Неправильный IP-Адрес."}
                                    placeholder="Введите IP-Адрес"
                                    maxLength="100"
                                />
                            </div>
                            <div style={{ flexGrow: 1, marginRight: "5px" }}>
                                {
                                    favorite.open ?
                                        <Icon24Dropdown style={favorite.edit ? {opacity: ".2"} : ""}
                                                        onClick={() => favorite.edit ? null : setFavorite({ open: false })}
                                                        width={35}
                                                        height={35}
                                        />
                                        :
                                        <Icon24Chevron style={spinner ? {opacity: ".2"} : ""}
                                                       onClick={() => spinner ? null : setFavorite({ open: true, edit: false })}
                                                       width={35}
                                                       height={35}
                                        />
                                }
                            </div>
                        </div>
                    </FormLayoutGroup>
                </FormLayout>
                {
                    favorite.open && (
                        <>
                            <CardGrid>
                                <Card size="l" mode="shadow">
                                    <Header mode="secondary"
                                            aside={
                                                (favorite.servers.length > 0 || favorite.edit) &&
                                                (favorite.edit ?
                                                        <div style={{ display: "flex" }}>
                                                            <Icon24Cancel onClick={() => setFavorite({ edit: false, servers: favorite.old })}
                                                                          style={{ marginRight: "5px" }}
                                                            />
                                                            <Icon24DoneOutline onClick={() => {
                                                                setFavorite({ edit: false })

                                                                saveFavorite();
                                                            }}
                                                            />
                                                        </div>
                                                        :
                                                        <Icon24Write onClick={() => setFavorite({ edit: true, old: favorite.servers })}/>
                                                )
                                            }
                                    >
                                        Избранные сервера
                                    </Header>
                                    {
                                        (favorite.servers.length > 0 || favorite.edit) ?
                                            <List>
                                                {
                                                    favorite.servers.map((ip, index) => (
                                                        <Cell key={ip}
                                                              draggable={favorite.edit}
                                                              removable={favorite.edit}
                                                              onDragFinish={({from, to}) => {
                                                                  const favoriteList = [...favorite.servers];

                                                                  favoriteList.splice(from, 1);
                                                                  favoriteList.splice(to, 0, favorite.servers[from]);

                                                                  setFavorite({ servers: favoriteList });
                                                              }}
                                                              onRemove={() => {
                                                                  setFavorite({ servers: [...favorite.servers.slice(0, index), ...favorite.servers.slice(index + 1)] });
                                                              }}
                                                              onClick={async () => {
                                                                  setIP(ip);

                                                                  setFavorite({ open: false });

                                                                  ping(ip);
                                                              }}
                                                        >
                                                            { ip }
                                                        </Cell>
                                                    ))
                                                }
                                            </List>
                                            :
                                            <Error error={"В избранном нет ни одного сервера. Добавить сервер в избранное можно после получения информации о нём."}/>
                                    }
                                </Card>
                            </CardGrid>
                        </>
                    )
                }
                <Div>
                    <Button disabled={!(IP.length > 2 && !favorite.edit && !spinner && isIP(IP))}
                            onClick={() => ping(IP)}
                            size="xl"
                    >
                        <b>Получить информацию</b>
                    </Button>
                </Div>
                {
                    spinner && <Spinner/>
                }
                {
                    (serverData || error) &&
                    <>
                        <Separator style={{ margin: "15px 0 17px 0" }}/>
                        <Group>
                            <CardGrid style={{ margin: "0 0 27px 0" }}>
                                <Card size="l" mode="shadow">
                                    {
                                        serverData &&
                                        <>
                                            <Header aside={
                                                favorite.servers.includes(serverData.ip) ?
                                                    <Icon24DoneOutline style={{opacity: ".2"}}/>
                                                    :
                                                    <Icon24FavoriteOutline onClick={() => addFavorite(serverData.ip)}/>
                                            }
                                            >
                                                { serverData.ip }
                                            </Header>
                                            <List>
                                                <Cell multiline
                                                      before={
                                                          <Avatar style={{ imageRendering: "pixelated" }}
                                                                  mode="image"
                                                                  size={64}
                                                                  src={serverData.icon}
                                                          />
                                                      }
                                                      description={`Игроков: ${serverData.players.online} / ${serverData.players.max}`}
                                                >
                                                    <div className={`server-motd_${scheme}`}>
                                                        <span dangerouslySetInnerHTML={{__html: serverData.motd.html[0]}}/>
                                                        <span dangerouslySetInnerHTML={{__html: serverData.motd.html[1]}}/>
                                                    </div>
                                                </Cell>
                                                {
                                                    serverData.players.list &&
                                                    <>
                                                        <Cell multiline
                                                              style={{ whiteSpace: "pre-wrap" }}
                                                        >
                                                            <Headline weight="semibold"
                                                                      style={{ marginBottom: 5 }}
                                                            >
                                                                Игроки
                                                            </Headline>
                                                            {
                                                                serverData.players.list
                                                            }
                                                        </Cell>
                                                        {
                                                            serverData.version &&
                                                            <Cell>
                                                                <Headline weight="semibold"
                                                                          style={{ marginBottom: 5 }}
                                                                >
                                                                    Ядро сервера
                                                                </Headline>
                                                                { serverData.version }
                                                            </Cell>
                                                        }
                                                    </>
                                                }
                                            </List>
                                        </>
                                    }
                                    {
                                        error && <Error error={error}/>
                                    }
                                </Card>
                            </CardGrid>
                        </Group>
                    </>
                }
            </Online>
            <Offline>
                <OfflineBlock/>
            </Offline>
        </Panel>
    )
}
