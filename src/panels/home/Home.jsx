import React, { Fragment } from "react";
import getArgs from "vkappsutils/dist/Args";
import VKBridge from "@vkontakte/vk-bridge";
import { useRouter } from "@unexp/router";
import { Panel, Group, CardGrid, Card, SimpleCell, Avatar, Button, ViewWidth, RichCell, useAdaptivity } from "@vkontakte/vkui";
import { Icon28SmileOutline, Icon24Gallery, Icon28StatisticsOutline, Icon32Graffiti, Icon28AddOutline, Icon24Globe, Icon28GraphOutline } from "@vkontakte/icons";

import { CustomPanelHeader } from "../../components";
import { IconServer, IconCalculator, IconSteve } from "../../icons";

const panels = [
    {
        id: "user",
        title: "Информация об игроке",
        description: "История никнейма и скин игрока",
        icon: <Icon28SmileOutline/>
    },
    {
        id: "server",
        title: "Информация о сервере по IP",
        description: "Количество и список игроков, версия сервера и другая полезная информация",
        icon: <IconServer/>
    },
    {
        id: "gallery",
        title: "Галерея скинов",
        description: "Скины для Minecraft на любой вкус и цвет",
        icon: <Icon24Gallery height={28} width={28}/>
    },
    {
        id: "hypixel",
        title: "Статистика Hypixel",
        description: "Подробная статистика по всем режимам сервера",
        icon: <Icon28StatisticsOutline/>
    },
    {
        id: "servers",
        title: "Сервера Minecraft",
        description: "Список случайных серверов Minecraft",
        icon: <Icon24Globe height={28} width={28}/>
    },
    {
        id: "generator",
        title: "Генератор достижений",
        description: "Создайте достижение с вашим текстом и случайной иконкой",
        icon: <Icon32Graffiti height={28} width={28}/>,
        checkClient: true
    },
    {
        id: "calculator",
        title: "Калькулятор координат",
        description: "Быстрый подсчёт координат в разных измерениях",
        icon: <IconCalculator/>
    },
    {
        id: "status",
        title: "Состояние сервисов",
        description: "Информация о доступности всех серверов Minecraft",
        icon: <Icon28GraphOutline/>
    }
];

export function Home({ id }) {

    const { viewWidth } = useAdaptivity();
    const { push } = useRouter();
    const { user_id, client } = getArgs();

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Minecraft помощник"
                               left={false}
            />
                <Group>
                    <CardGrid style={{ marginBottom: "12px", marginTop: viewWidth > ViewWidth.MOBILE ? "8px" : "0" }}
                              size="l"
                    >
                        {
                            panels.map(({ id, title, description, icon, checkClient }, index) => {
                                if (checkClient && client === "ok") {
                                    return;
                                }

                                return (
                                    <Fragment key={id}>
                                        <Card>
                                            <SimpleCell before={icon}
                                                        onClick={() => push({panel: id})}
                                                        size="m"
                                                        multiline
                                                        description={description}
                                            >
                                                {
                                                    title
                                                }
                                            </SimpleCell>
                                        </Card>
                                        {
                                            client !== "ok" && index === 5 &&
                                            <Card>
                                                <RichCell multiline
                                                          disabled
                                                          before={
                                                              <Avatar mode="image"
                                                                      id="steve-head"
                                                                      size={64}
                                                              >
                                                                  <IconSteve height={64} width={64}/>
                                                              </Avatar>
                                                          }
                                                          size="l"
                                                          text="Получите быстрый доступ ко всем функциям в сообщениях ВК!"
                                                          actions={
                                                              <Button mode="secondary"
                                                                      target="_blank"
                                                                      href="https://vk.com/public175914098"
                                                                      rel="noreferrer"
                                                              >
                                                                  Открыть
                                                              </Button>
                                                          }
                                                >
                                                    Steve - Minecraft Бот
                                                </RichCell>
                                            </Card>
                                        }
                                    </Fragment>
                                );
                            })
                        }
                        {
                            user_id && VKBridge.supports("VKWebAppAddToCommunity") &&
                            <Card>
                                <SimpleCell before={
                                    <Icon28AddOutline/>
                                }
                                            onClick={() => VKBridge.send("VKWebAppAddToCommunity", {})}
                                            size="m"
                                            multiline
                                            description="Установите приложение в свое сообщество за один клик"

                                >
                                    Установить приложение
                                </SimpleCell>
                            </Card>
                        }
                    </CardGrid>
                </Group>
        </Panel>
    )
}
