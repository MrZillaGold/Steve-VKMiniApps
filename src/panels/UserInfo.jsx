import React, { useReducer, useEffect, useState } from "react";
import axios from "axios";
import VKBridge from "@vkontakte/vk-bridge";
import { Offline, Online } from "react-detect-offline";
import { NameMC } from "namemcwrapper";
import SkinViewer from "react-skinview3d";
import * as SkinView from "skinview3d";

import { Panel, Input, FormLayout, Button, Group, Cell, List, Div, Separator, Header, FormLayoutGroup, TabsItem, Tabs, CardGrid, Card } from "@vkontakte/vkui";
import { OfflineBlock, Spinner, PanelHeader, Error } from "../components/components";

import { timeConvert } from "../functions";

import { IconRun, IconWalk } from "../icons/icons";
import Icon24Message from "@vkontakte/icons/dist/24/message";
import Icon24DoneOutline from "@vkontakte/icons/dist/24/done_outline";
import Icon24Chevron from "@vkontakte/icons/dist/24/chevron";
import Icon24Dropdown from "@vkontakte/icons/dist/24/dropdown";
import Icon24Write from "@vkontakte/icons/dist/24/write";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Pause from "@vkontakte/icons/dist/24/pause";
import Icon16Play from "@vkontakte/icons/dist/16/play";

import "./UserInfo.css";

export function UserInfo({ id, navigator }) {

    const scheme = sessionStorage.getItem("scheme");

    const [error, setError] = useState(null);
    const [spinner, setSpinner] = useReducer((state, spinner) => {

        if (spinner) {
            setError(null);
        }

        return spinner;
    }, false);

    const [history, setHistory] = useReducer((state, data) => {
        return {
            ...state,
            ...data
        };
    }, {
        users: [],
        edit: false,
        open: false
    });

    const [user, setUser] = useReducer((state, user) => {
        if (user.data) {
            user.sent = false;
            user.lock = false;

            setSpinner(false);
        }

        return {
            ...state,
            ...user
        };
    }, {
        data: null,

        sent: false,
        lock: false
    });

    const [viewer, setViewer] = useReducer((state, viewer) => {

        if (!viewer) {
            viewer = {};

            viewer.skin = null;
            viewer.selectedSkin = 1;

            viewer.walk = true;
            viewer.paused = false;

            viewer.activeTab = "skin";
        } else {
            if (viewer.selectedSkin) {
                setUser({
                    lock: false,
                    sent: false
                });
            }
        }

        return {
            ...state,
            ...viewer
        };
    }, {
        activeTab: "skin",
        selectedSkin: 1,
        walk: true,
        skin: null,
        paused: false,
    });

    const [nickname, setNickname] = useState("");

    useEffect(() => {
        VKBridge.send("VKWebAppStorageGet", {
            keys: ["steveHistoryList"]
        })
            .then(({ keys }) => {
                let [users] = keys;

                users = users.value;

                if (users.length > 0) {
                    setHistory({
                        users: users.split(",")
                    });
                }
            });
    }, []);

    const inputNickname = (event) => {
        const { value } = event.currentTarget;

        setNickname(
            value.replace(/[^A-Za-z0-9_]/g, "")
                .slice(0, 16)
        );
    };

    const getUserInfo = (nickname) => {
        setUser({ data: null });
        setViewer(null);
        setHistory({ open: false });
        setSpinner(true);

        axios.get(`https://stevecors.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${nickname}`)
            .then(response => {
                return response.data;
            })
            .then(async ({ username_history, username, created_at, textures }) => {
                const data = {
                    list: username_history,
                    username: username,
                    createdAt: created_at ? timeConvert(created_at) : null,
                    skin: {
                        url: textures.skin.url,
                        history: [],
                        isSlim: textures.slim || false,
                        cape: (textures.cape && textures.cape.data) || null
                    }
                };

                const nameMc = new NameMC();

                nameMc.setOptions({
                    proxy: "https://stevecors.herokuapp.com"
                });

                await nameMc.skinHistory(username)
                    .then(skins => data.skin.history = skins)
                    .catch(console.log);

                setUser({ data });

                addToHistory(username);
            })
            .catch(error => {
                setSpinner(false);

                if (error.response && error.response.status) {
                    switch(error.response.status) {
                        case 404:
                            return setError(`Игрока с никнеймом ${nickname} не существует!`);
                        case 400:
                            return setError("Никнейм может содержать только латинские буквы, цифры и символ \"_\".");
                        default:
                            return setError("Произошла ошибка при получении данных. Попробуйте позже.");
                    }
                }

                setError("Произошла ошибка. Попробуйте позже.");
                console.log(error);
            });
    };

    const addToHistory = (username) => {
        if (history.users.includes(username)) {
            return;
        }

        const historyList = [...history.users];

        historyList.unshift(username);

        if (!(historyList.length <= 10)) {
            historyList.splice(-1,1);
        }

        setHistory({ users: historyList })
        saveHistory();
    };

    const saveHistory = () => {
        VKBridge.send("VKWebAppStorageSet", {
            key: "steveHistoryList",
            value: history.users.join(",")
        });
    };

    const sendToDM = () => {
        const { data } = user;

        setUser({ lock: true });

        VKBridge.send("VKWebAppAllowMessagesFromGroup", {
            group_id: 175914098
        })
            .then(({ result }) => {
                if (result) {
                    setUser({ sent: true });

                    VKBridge.send("VKWebAppSendPayload", {
                        group_id: 175914098,
                        payload: {
                            type: "document", url: data.skin.url.replace("https://stevecors.herokuapp.com/", ""),
                            name: data.username
                        }
                    });
                }
            })
            .catch(console.log);
    };

    const selectSkin = (skin, index) => {
        const { data } = user;
        const { selectedSkin } = viewer;

        if (selectedSkin - 1 !== index) {
            setViewer({
                selectedSkin: index + 1
            });

            setUser({ data: {
                    ...data,
                    skin: {
                        ...data.skin,
                        isSlim: skin.isSlim,
                        url: skin.url
                    }
                }
            })
        }
    };

    const toggleSkinAnimation = (action) => {
        viewer.skin.animation.handles.forEach((animation) => {
            // eslint-disable-next-line
            switch(action) {
                case "animation":
                    if (!viewer.walk) {
                        animation.animation = SkinView.WalkingAnimation;
                    } else {
                        animation.animation = SkinView.RunningAnimation;
                    }
                    setViewer({ walk: !viewer.walk });
                    break;
                case "pause":
                    animation.paused = !viewer.paused;
                    setViewer({ paused: !viewer.paused });
                    break;
            }
        });
    };

    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Информация об игроке"
                         navigator={navigator}
                         left
            />
            <Online>
                <FormLayout>
                    <FormLayoutGroup top="Никнейм"
                                     bottom={"Может содержать только латинские буквы, цифры и символ \"_\". (От 2 до 16 символов)"}
                    >
                        <div style={{display: "flex", alignItems: "center"}}>
                            <div style={{flexGrow: 99}}>
                                <Input name="nickname"
                                       disabled={spinner || history.edit}
                                       value={nickname}
                                       onChange={inputNickname}
                                       status={nickname.length > 1 || nickname === "" ? "default" : "error"}
                                       placeholder="Введите никнейм"
                                       maxLength="16"
                                       pattern="^[A-Za-z0-9_]+$"
                                />
                            </div>
                            <div style={{flexGrow: 1, marginRight: "5px"}}>
                                {
                                    history.open ?
                                        <Icon24Dropdown style={history.edit ? {opacity: ".2"} : ""}
                                                        onClick={() => !history.edit ? setHistory({ open: false }) : null}
                                                        width={35}
                                                        height={35}
                                        />
                                        :
                                        <Icon24Chevron style={spinner ? {opacity: ".2"} : ""}
                                                       onClick={() => spinner ? null : setHistory({ open: true, edit: false })}
                                                       width={35}
                                                       height={35}
                                        />
                                }
                            </div>
                        </div>
                    </FormLayoutGroup>
                </FormLayout>
                {
                    history.open && (
                        <>
                            <CardGrid>
                                <Card size="l" mode="shadow">
                                    <Header mode="secondary"
                                            aside={
                                                (history.users.length > 0 || history.edit) &&
                                                (history.edit ?
                                                        <div style={{display: "flex"}}>
                                                            <Icon24Cancel onClick={() => setHistory({ edit: false, users: history.old })}
                                                                          style={{marginRight: "5px"}}
                                                            />
                                                            <Icon24DoneOutline
                                                                onClick={() => {
                                                                    setHistory({ edit: false });
                                                                    saveHistory();
                                                                }}
                                                            />
                                                        </div>
                                                        :
                                                        <Icon24Write onClick={() => setHistory({ edit: true, old: history.users})}/>
                                                )
                                            }
                                    >
                                        История запросов
                                    </Header>
                                    {
                                        (history.users.length > 0 || history.edit) ?
                                            <List>
                                                {
                                                    history.users.map((user, index) => (
                                                        <Cell key={user + Math.random()}
                                                              draggable={history.edit}
                                                              removable={history.edit}
                                                              onDragFinish={({from, to}) => {
                                                                  const historyList = [...history.users];

                                                                  historyList.splice(from, 1);
                                                                  historyList.splice(to, 0, history.users[from]);

                                                                  setHistory({ users: historyList });
                                                              }}
                                                              onRemove={() => {
                                                                  setHistory({ users: [...history.users.slice(0, index), ...history.users.slice(index + 1)] });
                                                              }}
                                                              onClick={() => {
                                                                  setNickname(user);
                                                                  setHistory({ open: false });

                                                                  getUserInfo(user);
                                                              }}
                                                        >
                                                            { user }
                                                        </Cell>
                                                    ))
                                                }
                                            </List>
                                            :
                                            <Error error={"В истории запросов нет ни одной записи. Новая запись появится после получения информации об игроке."}/>
                                    }
                                </Card>
                            </CardGrid>
                        </>
                    )
                }
                <Div>
                    <Button disabled={!(nickname.length > 1 && nickname.match("^[A-Za-z0-9_]+$") && !spinner && !history.edit)}
                            onClick={() => getUserInfo(nickname)}
                            size="xl"
                    >
                        <b>Получить информацию</b>
                    </Button>
                </Div>
                {
                    spinner && <Spinner/>
                }
                {
                    user.data &&
                    <>
                        <Separator style={{ margin: "15px 0 0 0" }}/>
                        <Group>
                            <Tabs>
                                <TabsItem
                                    onClick={() => setViewer({ activeTab: "skin" })}
                                    selected={viewer.activeTab === "skin"}
                                >
                                    Скин
                                </TabsItem>
                                <TabsItem
                                    onClick={() => setViewer({ activeTab: "names" })}
                                    selected={viewer.activeTab === "names"}
                                >
                                    История никнейма
                                </TabsItem>
                            </Tabs>
                            <CardGrid style={{ margin: "0 0 27px 0" }}>
                                {
                                    viewer.activeTab === "skin" &&
                                    <Card size="l" mode="shadow">
                                        <div className={`skin skin-${scheme} ${viewer.paused && "skin-animation_paused"} skin-bg_animation`}>
                                            <div className="skin-icons skin-block">
                                                <Button className="skin-button"
                                                        onClick={() => toggleSkinAnimation("animation")}
                                                >
                                                    {!viewer.walk ? <IconWalk/> : <IconRun/>}
                                                </Button>
                                                <Button className="skin-button"
                                                        onClick={() => toggleSkinAnimation("pause")}
                                                >
                                                    {!viewer.paused ? <Icon24Pause width={16} height={16}/> : <Icon16Play/>}
                                                </Button>
                                            </div>
                                            <div className="skin-block skin-center">
                                                <SkinViewer skinUrl={`https://stevecors.herokuapp.com/${user.data.skin.url}`}
                                                            capeUrl={user.data.skin.cape ? `data:image/png;base64,${user.data.skin.cape}` : ""}
                                                            className="skin-shadow"
                                                            slim={user.data.skin.isSlim}
                                                            height={196}
                                                            width={196}
                                                            onReady={(skinViewer) => {
                                                                skinViewer.animation = new SkinView.CompositeAnimation();

                                                                const animation = viewer.walk ?
                                                                    skinViewer.animation.add(SkinView.WalkingAnimation)
                                                                    :
                                                                    skinViewer.animation.add(SkinView.RunningAnimation);

                                                                animation.paused = viewer.paused;

                                                                setViewer({ skin: skinViewer });
                                                            }}
                                                />
                                            </div>
                                        </div>
                                        <Separator/>
                                        <Div style={{ display: "flex" }}>
                                            <Button stretched
                                                    before={
                                                        user.sent ?
                                                            <Icon24DoneOutline width={16} height={16}/>
                                                            :
                                                            <Icon24Message width={16} height={16}/>
                                                    }
                                                    disabled={user.lock}
                                                    onClick={() => {
                                                        setUser({ lock: true });
                                                        sendToDM();
                                                    }}
                                            >
                                                <b>{user.sent ? "Сообщение отправлено!" : "Получить cкин в сообщения"}</b>
                                            </Button>
                                        </Div>
                                        {
                                            user.data.skin.history.length > 0 &&
                                            <>
                                                <Separator style={{ margin: "5px 0 0 0" }}/>
                                                <Header>
                                                    Скины
                                                </Header>
                                                <Div style={{ textAlign: "center" }}>
                                                    {
                                                        user.data.skin.history.map((skin, index) =>
                                                            <img key={index}
                                                                 className={`skin-head-button ${viewer.selectedSkin - 1 === index && "skin-head_selected"}`}
                                                                 src={skin.renders.face.replace("https://stevecors.herokuapp.com/", "")}
                                                                 onClick={() => selectSkin(skin, index)}
                                                                 onPointerEnter={() => selectSkin(skin, index)}
                                                                 alt=""
                                                            />
                                                        )
                                                    }
                                                </Div>
                                            </>
                                        }
                                    </Card>
                                }
                                {
                                    viewer.activeTab === "names" &&
                                    <Card size="l" mode="shadow">
                                        <List top={user.data.username ? `История никнейма ${user.data.username}` : ""}>
                                            {
                                                user.data.list && user.data.list.map(({username, changed_at}, index) =>
                                                    <Cell key={index}
                                                          description={changed_at ? timeConvert(changed_at) : user.data.createdAt ? user.data.createdAt : "Первый"}
                                                    >
                                                        { username }
                                                    </Cell>
                                                )
                                                    .reverse()
                                            }
                                        </List>
                                    </Card>
                                }
                            </CardGrid>
                        </Group>
                    </>
                }
                {
                    error && <Error error={error}/>
                }
            </Online>
            <Offline>
                <OfflineBlock/>
            </Offline>
        </Panel>
    )
}