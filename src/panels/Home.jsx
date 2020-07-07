import React from "react";
import VKBridge from "@vkontakte/vk-bridge";

import { Panel, Group, Button, Cell, Avatar, CardGrid, Card } from "@vkontakte/vkui";

import { PanelHeader } from "../components/components";

import { IconCalculator, IconServer, IconSteve } from "../icons/icons";
import Icon28SmileOutline from '@vkontakte/icons/dist/28/smile_outline';
import Icon28Globe from "@vkontakte/icons/dist/24/globe";
import Icon32Graffiti from '@vkontakte/icons/dist/32/graffiti';
import Icon28AddOutline from "@vkontakte/icons/dist/24/add_outline";

export function Home({ id, navigator }) {
    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Minecraft помощник"/>
            <Group>
                <CardGrid style={{ marginBottom: "12px" }}>
                    <Card size="l">
                        <Cell before={
                            <Icon28SmileOutline/>
                        }
                              onClick={() => navigator.go("user")}
                              size="m"
                              description="История никнейма и скин игрока"
                        >
                            Информация об игроке
                        </Cell>
                    </Card>
                    <Card size="l">
                        <Cell before={
                            <IconServer/>
                        }
                              onClick={() => navigator.go("server")}
                              size="m"
                              multiline
                              description="Количество и список игроков, версия сервера и другая полезная информация"
                        >
                            Информация о сервере по IP
                        </Cell>
                    </Card>
                    <Card size="l">
                        <Cell before={
                            <Icon32Graffiti height={28} width={28}/>
                        }
                              onClick={() => navigator.go("achievements")}
                              size="m"
                              multiline
                              description="Создайте достижение с вашим текстом и случайной иконкой"
                        >
                            Генератор достижений
                        </Cell>
                    </Card>
                    <Card size="l">
                        <Cell before={
                            <IconCalculator/>
                        }
                              onClick={() => navigator.go("calculator")}
                              size="m"
                              multiline
                              description="Быстрый подсчёт координат в разных измерениях"
                        >
                            Калькулятор координат
                        </Cell>
                    </Card>
                    <Card size="l">
                        <Cell before={
                            <Icon28Globe/>
                        }
                              onClick={() => navigator.go("status")}
                              size="m"
                              multiline
                              description="Информация о доступности всех сервисов Minecraft"
                        >
                            Состояние серверов Minecraft
                        </Cell>
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
                        <Cell before={
                            <Icon28AddOutline/>
                        }
                              onClick={() => VKBridge.send("VKWebAppAddToCommunity", {})}
                              size="m"
                              multiline
                              description="Установите приложение в свое сообщество за один клик"

                        >
                            Установить приложение
                        </Cell>
                    </Card>
                </CardGrid>
            </Group>
        </Panel>
    );
}
