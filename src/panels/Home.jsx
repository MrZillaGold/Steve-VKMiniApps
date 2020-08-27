import React from "react";
import VKBridge from "@vkontakte/vk-bridge";

import { Panel, Group, Button, Cell, SimpleCell, Avatar, CardGrid, Card } from "@vkontakte/vkui";
import { IconCalculator, IconServer, IconSteve } from "../icons/icons";
import { Icon28SmileOutline, Icon24Globe, Icon32Graffiti, Icon28AddOutline, Icon28StatisticsOutline } from "@vkontakte/icons";
import { PanelHeader } from "../components/components";

export function Home({ id, navigator }) {
    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Minecraft помощник"/>
            <Group>
                <CardGrid style={{ marginBottom: "12px" }}>
                    <Card size="l">
                        <SimpleCell before={
                            <Icon28SmileOutline/>
                        }
                              onClick={() => navigator.go("user")}
                              size="m"
                              multiline
                              description="История никнейма и скин игрока"
                        >
                            Информация об игроке
                        </SimpleCell>
                    </Card>
                    <Card size="l">
                        <SimpleCell before={
                            <IconServer/>
                        }
                              onClick={() => navigator.go("server")}
                              size="m"
                              multiline
                              description="Количество и список игроков, версия сервера и другая полезная информация"
                        >
                            Информация о сервере по IP
                        </SimpleCell>
                    </Card>
                    <Card size="l">
                        <SimpleCell before={
                            <Icon28StatisticsOutline/>
                        }
                              onClick={() => navigator.go("hypixel")}
                              size="m"
                              multiline
                              description="Подробная статистика по всем режимам сервера"
                        >
                            Статистика Hypixel
                        </SimpleCell>
                    </Card>
                    <Card size="l">
                        <SimpleCell before={
                            <Icon32Graffiti height={28} width={28}/>
                        }
                              onClick={() => navigator.go("achievements")}
                              size="m"
                              multiline
                              description="Создайте достижение с вашим текстом и случайной иконкой"
                        >
                            Генератор достижений
                        </SimpleCell>
                    </Card>
                    <Card size="l">
                        <SimpleCell before={
                            <IconCalculator/>
                        }
                              onClick={() => navigator.go("calculator")}
                              size="m"
                              multiline
                              description="Быстрый подсчёт координат в разных измерениях"
                        >
                            Калькулятор координат
                        </SimpleCell>
                    </Card>
                    <Card size="l">
                        <SimpleCell before={
                            <Icon24Globe/>
                        }
                              onClick={() => navigator.go("status")}
                              size="m"
                              multiline
                              description="Информация о доступности всех сервисов Minecraft"
                        >
                            Состояние серверов Minecraft
                        </SimpleCell>
                    </Card>
                    <Card size="l">
                        <Cell multiline
                              before={
                                  <Avatar mode="image"
                                          id="steve-head"
                                          size={64}
                                  >
                                      <IconSteve height={64} width={64}/>
                                  </Avatar>
                              }
                              size="l"
                              description="Получите быстрый доступ ко всем функциям в сообщениях ВК!"
                              bottomContent={
                                  <Button target="_blank"
                                          href="https://vk.com/public175914098"
                                          rel="noreferrer"
                                  >
                                      <b>Перейти в группу с ботом</b>
                                  </Button>
                              }
                        >
                            Steve - Minecraft Бот
                        </Cell>
                    </Card>
                    <Card size="l">
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
                </CardGrid>
            </Group>
        </Panel>
    );
}
