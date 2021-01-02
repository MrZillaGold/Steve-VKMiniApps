import axios from "axios";
import React, { useState, useReducer, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Avatar, FormItem, Group, Header, SimpleCell, SliderSwitch } from "@vkontakte/vkui";

import { Spinner, Error } from "../../components";
import { declOfNum } from "../../functions";

export function ServerTop({ server: { id }, setScrollUp }) {

    const ref = useRef();

    const [mount, setMount] = useState(true);
    const [period, setPeriod] = useState("all");

    const [top, setTop] = useReducer((currentState, updates) => ({
        ...currentState,
        ...updates
    }), {
        all: {
            hasMore: true,
            list: null,
            page: 1
        },
        today: {
            hasMore: true,
            list: null,
            page: 1
        }
    });

    const onScroll = () => {
        if (ref.current.lastScrollTop >= 100) {
            setScrollUp(true);
        } else {
            setScrollUp(false);
        }
    };

    useEffect(() => {
        loadTop("all");
        loadTop("today");

        return () => setMount(false);
    }, []);

    const loadTop = (period) => {
        axios.get(`https://minecraft-statistic.net/api/server/top/${id}/${period}/${top[period].page}`)
            .then(({ data: { data = [] } }) => {
                if (mount) {
                    setTop({
                        [period]: {
                            list: top[period].list ?
                                top[period].list.concat(data)
                                :
                                data,
                            page: top[period].page + 1,
                            hasMore: data.length === 30
                        }
                    });
                }
            })
            .catch((error) => {
                console.log(error);

                if (mount) {
                    setTop({
                        [period]: {
                            hasMore: false
                        }
                    });
                }
            });
    };

    return (
        <Group mode="plain"
               header={
                   <Header mode="secondary">
                       Рейтинг игроков
                   </Header>
               }
        >
            <FormItem top="Период">
                <SliderSwitch options={[
                    {
                        name: "Всё время",
                        value: "all",
                    },
                    {
                        name: "Сегодня",
                        value: "today",
                    }
                ]}
                              onSwitch={setPeriod}
                              activeValue={period}
                />
            </FormItem>
            {
                top[period].list ?
                    <InfiniteScroll dataLength={top[period].list.length}
                                    hasMore={top[period].hasMore}
                                    next={() => loadTop(period)}
                                    loader={
                                        <Spinner style={{ marginTop: 20 }}/>
                                    }
                                    onScroll={onScroll}
                                    ref={ref}
                    >
                        {
                            top[period].list.length ?
                                top[period].list.map(({ nickname, place, time }) => {
                                    time = Math.trunc(time / 60);

                                    return (
                                        <SimpleCell before={
                                            <Avatar src={`https://api.ashcon.app/mojang/v2/avatar/${nickname}`}
                                                    mode="image"
                                            />
                                        }
                                                    description={`${time} ${declOfNum(time, ["час", "часа", "часов"])}`}
                                                    disabled={true}
                                        >
                                            { place }. { nickname }
                                        </SimpleCell>
                                    );
                                })
                                :
                                <Error error="Статистика за выбранный период недоступна. Попробуйте позже."/>
                        }
                    </InfiniteScroll>
                    :
                    <Spinner style={{ marginTop: 20 }}/>
            }
        </Group>
    );
}
