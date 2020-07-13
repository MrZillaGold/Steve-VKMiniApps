import React, { useReducer, useState, useEffect } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";

import { Button, Card, CardGrid, Cell, Div, FormLayout, FormLayoutGroup, Header, Input, List, Panel, Separator, Tabs, TabsItem, HorizontalScroll, Avatar, Title, Headline, Placeholder } from "@vkontakte/vkui";

import { Error, OfflineBlock, PanelHeader, Spinner } from "../components/components";

import { timeConvert } from "../functions";

import Icon24DoneOutline from "@vkontakte/icons/dist/24/done_outline";
import Icon24Chevron from "@vkontakte/icons/dist/24/chevron";
import Icon24Dropdown from "@vkontakte/icons/dist/24/dropdown";
import Icon24Write from "@vkontakte/icons/dist/24/write";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";

import "./HypixelStatistics.css";

const notFull = "Статистика этого режима неполная, полная статистика будет доступна в будущем.";

export function HypixelStatistics({ navigator, id }) {

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
            setSpinner(false);
            user.tab = "main";
        }

        return {
            ...state,
            ...user
        };
    }, {
        data: null,
        tab: "main"
    });

    const [nickname, setNickname] = useState("");

    useEffect(() => {
        VKBridge.send("VKWebAppStorageGet", {
            keys: ["steveHypixelHistoryList"]
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
        saveHistory(historyList);
    };

    const saveHistory = (history) => {
        VKBridge.send("VKWebAppStorageSet", {
            key: "steveHypixelHistoryList",
            value: history.join(",")
        });
    };

    const getUserInfo = (nickname) => {
        setUser({ data: null });
        setSpinner(true);

        axios.get(`https://api.slothpixel.me/api/players/${nickname}`)
            .then(({ data }) => {
                if (!data) {
                    setError("Произошла ошибка. Попробуйте позже.");
                    return setSpinner(false);
                }

                const { username } = data;

                if (!username) {
                    setSpinner(false);
                    return setError(`Игрок ${nickname} никогда не заходил на Hypixel.`);
                }

                setUser({ data })

                addToHistory(username);
            })
            .catch((error) => {
                setSpinner(false);

                switch(error.toString()) {
                    case "Error: Request failed with status code 404":
                        setError(`Игрока с никнеймом ${nickname} не существует!`);
                        break;
                    default:
                        setError("Произошла ошибка. Попробуйте позже.");
                        console.log(error);
                }
            })
    };

    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Статистика Hypixel"
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
                                                                saveHistory(history.users);
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
                                        <Error error={"В истории запросов нет ни одной записи. Новая запись появится после получения статистики игрока."}/>
                                }
                            </Card>
                        </CardGrid>
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
                    (user.data || error) &&
                    <>
                        <Separator style={{ margin: "15px 0 15px 0" }}/>
                        <CardGrid style={{ margin: "0 0 27px 0" }}>
                            <Card size="l" mode="shadow">
                                {
                                    user.data &&
                                    <>
                                        <Cell before={
                                            <Avatar src={`https://mc-heads.net/avatar/${user.data.username}/64`}
                                                    size={64}
                                                    mode="image"
                                                    className="user-avatar"
                                            />
                                        }
                                              style={{ marginTop: "8px" }}
                                              description={user.data.rank_formatted !== "&7" ? user.data.rank_formatted.replace(/&./g, "") : ""}
                                        >
                                            <Title level="1" weight="semibold">
                                                { user.data.username }
                                            </Title>
                                        </Cell>
                                        <HorizontalScroll>
                                            <Tabs style={{ background: "transparent" }}>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "main" })}
                                                    selected={user.tab === "main"}
                                                >
                                                    Основная информация
                                                </TabsItem>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "bedwars" })}
                                                    selected={user.tab === "bedwars"}
                                                >
                                                    BedWars
                                                </TabsItem>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "buildbattle" })}
                                                    selected={user.tab === "buildbattle"}
                                                >
                                                    BuildBattle
                                                </TabsItem>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "duels" })}
                                                    selected={user.tab === "duels"}
                                                >
                                                    Duels
                                                </TabsItem>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "uhc" })}
                                                    selected={user.tab === "uhc"}
                                                >
                                                    UHC
                                                </TabsItem>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "skywars" })}
                                                    selected={user.tab === "skywars"}
                                                >
                                                    SkyWars
                                                </TabsItem>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "murdermystery" })}
                                                    selected={user.tab === "murdermystery"}
                                                >
                                                    Murder Mystery
                                                </TabsItem>
                                                <TabsItem
                                                    onClick={() => setUser({ tab: "tnt" })}
                                                    selected={user.tab === "tnt"}
                                                >
                                                    TNT Games
                                                </TabsItem>
                                            </Tabs>
                                        </HorizontalScroll>
                                        {
                                            user.tab === "main" &&
                                            <>
                                                <div className="user-info_list">
                                                    <Cell description="Статус">
                                                        { user.data.online ? "Онлайн" : "Оффлайн" }
                                                    </Cell>
                                                    <Cell description="Уровень">
                                                        { Math.trunc(user.data.level) }
                                                    </Cell>
                                                    <Cell description="Очки достижений">
                                                        { user.data.achievement_points.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    { !user.data.online &&
                                                    <Cell description="Последний вход">
                                                        { user.data.last_login ? timeConvert(user.data.last_login) : "Неизвестно" }
                                                    </Cell>
                                                    }
                                                    <Cell description="Первый вход">
                                                        { user.data.first_login ? timeConvert(user.data.first_login) : "Неизвестно" }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Последняя игра">
                                                        { user.data.last_game ?? "Неизвестно"  }
                                                    </Cell>
                                                    <Cell description="Карма">
                                                        { user.data.karma.toLocaleString() }
                                                    </Cell>
                                                </div>
                                            </>
                                        }
                                        {
                                            user.tab === "bedwars" &&
                                            <div style={{ padding: "0 12px 12px 12px" }}>
                                                <div className="user-info_list">
                                                    <Cell description="Уровень">
                                                        { user.data.stats.BedWars.level }
                                                    </Cell>
                                                    <Cell description="Монет">
                                                        { user.data.stats.BedWars.coins.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { user.data.stats.BedWars.wins.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { user.data.stats.BedWars.losses.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { user.data.stats.BedWars.w_l }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { user.data.stats.BedWars.kills.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { user.data.stats.BedWars.deaths.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { user.data.stats.BedWars.k_d }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    Одиночный
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { (user.data.stats.BedWars.gamemodes.solo.wins || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { (user.data.stats.BedWars.gamemodes.solo.losses || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { ((user.data.stats.BedWars.gamemodes.solo.wins || 0) / (user.data.stats.BedWars.gamemodes.solo.losses || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { (user.data.stats.BedWars.gamemodes.solo.kills || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { (user.data.stats.BedWars.gamemodes.solo.deaths || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { ((user.data.stats.BedWars.gamemodes.solo.kills || 0) / (user.data.stats.BedWars.gamemodes.solo.deaths || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    Командный
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { (user.data.stats.BedWars.gamemodes.doubles.wins || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { (user.data.stats.BedWars.gamemodes.doubles.losses || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { ((user.data.stats.BedWars.gamemodes.doubles.wins || 0) / (user.data.stats.BedWars.gamemodes.doubles.losses || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { (user.data.stats.BedWars.gamemodes.doubles.kills || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { (user.data.stats.BedWars.gamemodes.doubles.deaths || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { ((user.data.stats.BedWars.gamemodes.doubles.kills || 0) / (user.data.stats.BedWars.gamemodes.doubles.deaths || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    3v3v3v3
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { (user.data.stats.BedWars.gamemodes["3v3v3v3"].wins || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { (user.data.stats.BedWars.gamemodes["3v3v3v3"].losses || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { ((user.data.stats.BedWars.gamemodes["3v3v3v3"].wins || 0) / (user.data.stats.BedWars.gamemodes["3v3v3v3"].losses || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { (user.data.stats.BedWars.gamemodes["3v3v3v3"].kills || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { (user.data.stats.BedWars.gamemodes["3v3v3v3"].deaths || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { ((user.data.stats.BedWars.gamemodes["3v3v3v3"].kills || 0) / (user.data.stats.BedWars.gamemodes["3v3v3v3"].deaths || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    4v4v4v4
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { (user.data.stats.BedWars.gamemodes["4v4v4v4"].wins || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { (user.data.stats.BedWars.gamemodes["4v4v4v4"].losses || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { ((user.data.stats.BedWars.gamemodes["4v4v4v4"].wins || 0) / (user.data.stats.BedWars.gamemodes["4v4v4v4"].losses || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { (user.data.stats.BedWars.gamemodes["4v4v4v4"].kills || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { (user.data.stats.BedWars.gamemodes["4v4v4v4"].deaths || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { ((user.data.stats.BedWars.gamemodes["4v4v4v4"].kills || 0) / (user.data.stats.BedWars.gamemodes["4v4v4v4"].deaths || 0)).toFixed(2) }
                                                    </Cell>
                                                </div>
                                            </div>
                                        }
                                        {
                                            user.tab === "buildbattle" &&
                                            <div style={{ padding: "0 12px 12px 12px" }}>
                                                <div className="user-info_list">
                                                    <Cell description="Очки">
                                                        { user.data.stats.BuildBattle.score.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Монет">
                                                        { user.data.stats.BuildBattle.coins.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Побед">
                                                        { user.data.stats.BuildBattle.wins.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    Одиночный
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед в обычном режиме" multiline>
                                                        { (user.data.stats.BuildBattle.wins_solo_normal || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Побед в Pro-режиме" multiline>
                                                        { (user.data.stats.BuildBattle.wins_solo_pro || 0).toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    Командный
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед в обычном режиме" multiline>
                                                        { (user.data.stats.BuildBattle.wins_teams_normal || 0).toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    Угадай постройку
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { (user.data.stats.BuildBattle.wins_guess_the_build || 0).toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Угадано построек">
                                                        { (user.data.stats.BuildBattle.correct_guesses || 0).toLocaleString() }
                                                    </Cell>
                                                </div>
                                            </div>
                                        }
                                        {
                                            user.tab === "duels" &&
                                            <div style={{ padding: "0 12px 12px 12px" }}>
                                                <div className="user-info_list">
                                                    <Cell description="Монет">
                                                        { user.data.stats.Duels.coins.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { user.data.stats.Duels.wins.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { user.data.stats.Duels.losses.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { user.data.stats.Duels.losses ? (user.data.stats.Duels.wins / user.data.stats.Duels.losses).toFixed(2) : 0 }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { user.data.stats.Duels.kills.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { user.data.stats.Duels.deaths.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { user.data.stats.Duels.deaths ? (user.data.stats.Duels.kills / user.data.stats.Duels.deaths).toFixed(2) : 0 }
                                                    </Cell>
                                                </div>
                                            </div>
                                        }
                                        {
                                            user.tab === "uhc" &&
                                            <div style={{ padding: "0 12px 12px 12px" }}>
                                                <div className="user-info_list">
                                                    <Cell description="Монет">
                                                        { user.data.stats.UHC.coins.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    UHC
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { user.data.stats.UHC.wins.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { user.data.stats.UHC.deaths.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { user.data.stats.UHC.win_loss }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { user.data.stats.UHC.kills.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { user.data.stats.UHC.deaths.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { user.data.stats.UHC.kd }
                                                    </Cell>
                                                </div>
                                                <Headline weight="semibold"
                                                          style={{ marginBottom: 5 }}
                                                >
                                                    Speed UHC
                                                </Headline>
                                                <div className="user-info_list">
                                                    <Cell description="Побед">
                                                        { user.data.stats.SpeedUHC.wins.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Поражений">
                                                        { user.data.stats.SpeedUHC.losses.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="П/П">
                                                        { user.data.stats.SpeedUHC.win_loss }
                                                    </Cell>
                                                </div>
                                                <div className="user-info_list">
                                                    <Cell description="Убийств">
                                                        { user.data.stats.SpeedUHC.kills.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="Смертей">
                                                        { user.data.stats.SpeedUHC.deaths.toLocaleString() }
                                                    </Cell>
                                                    <Cell description="У/С">
                                                        { user.data.stats.SpeedUHC.kd }
                                                    </Cell>
                                                </div>
                                            </div>
                                        }
                                        {
                                            user.tab === "skywars" &&
                                            <div>
                                                <div className="user-info_list">
                                                    <Cell description="Монет">
                                                        { user.data.stats.SkyWars.coins.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <Placeholder>
                                                    { notFull }
                                                </Placeholder>
                                            </div>
                                        }
                                        {
                                            user.tab === "murdermystery" &&
                                            <div>
                                                <div className="user-info_list">
                                                    <Cell description="Монет">
                                                        { user.data.stats.MurderMystery.coins.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <Placeholder>
                                                    { notFull }
                                                </Placeholder>
                                            </div>
                                        }
                                        {
                                            user.tab === "tnt" &&
                                            <div>
                                                <div className="user-info_list">
                                                    <Cell description="Монет">
                                                        { user.data.stats.TNT.coins.toLocaleString() }
                                                    </Cell>
                                                </div>
                                                <Placeholder>
                                                    { notFull }
                                                </Placeholder>
                                            </div>
                                        }
                                    </>
                                }
                                {
                                    error && <Error error={error}/>
                                }
                            </Card>
                        </CardGrid>
                    </>
                }
            </Online>
            <Offline>
                <OfflineBlock/>
            </Offline>
        </Panel>
    )
}
