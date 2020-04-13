import React from "react";
import VKBridge from "@vkontakte/vk-bridge";

import { Panel, Group, Button, Cell, Avatar, Separator } from "@vkontakte/vkui";

import { resizeWindow } from "../services/bridge";

import Icon24Globe from "@vkontakte/icons/dist/24/globe";
import Icon24Write from "@vkontakte/icons/dist/24/write";
import Icon24Search from "@vkontakte/icons/dist/24/search";
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';
/*import Icon24Message from "@vkontakte/icons/dist/24/message";*/
import { IconCalculator, IconServer, IconUser, IconSteve } from "./components/icons";

import "./scss/styles.scss"
import {PanelHeader} from "./components/components";

class HomePanelBase extends React.Component {

    componentDidMount() {
        resizeWindow(700);
    }

    render() {
        const { id, navigator } = this.props;

        return (
            <Panel separator={false} id={id}>
                <PanelHeader status="Minecraft помощник"/>
                <Group>
                    <Cell before={
                        <IconUser/>
                    }
                          onClick={() => navigator.go("user")}
                          className="pointer"
                    >
                        Информация об игроке
                    </Cell>
                    <Cell before={
                        <IconServer/>
                    }
                          onClick={() => navigator.go("server")}
                          className="pointer"
                    >
                        Информация о сервере по IP
                    </Cell>
                    <Separator style={{ margin: "6px 0" }}/>
                    <Cell before={
                        <Icon24Write/>
                    }
                          onClick={() => navigator.go("achievements")}
                          className="pointer"
                    >
                        Генератор достижений
                    </Cell>
                    {/*<Cell before={
                        <Icon24Message/>
                    }
                          onClick={() => navigator.go("chat")}
                          className="pointer"
                    >
                        Minecraft чат
                    </Cell>*/}
                    <Cell before={
                        <IconCalculator/>
                    }
                          onClick={() => navigator.go("calculator")}
                          className="pointer"
                    >
                        Калькулятор координат
                    </Cell>
                    <Cell before={
                        <Icon24Search/>
                    }
                          onClick={() => navigator.go("endercalculator")}
                          className="pointer"
                    >
                        Получение координат крепости
                    </Cell>
                    <Separator style={{ margin: "6px 0" }}/>
                    <Cell before={
                        <Icon24Globe/>
                    }
                          onClick={() => navigator.go("status")}
                          className="pointer"
                    >
                        Состояние серверов Minecraft
                    </Cell>
                    <Separator style={{ margin: "6px 0" }}/>
                    <Cell before={
                        <Icon24AddOutline/>
                    }
                          onClick={() => VKBridge.send("VKWebAppAddToCommunity", {})}
                          className="pointer"
                    >
                        Установить в своё сообщество
                    </Cell>
                    <Separator style={{ margin: "6px 0" }}/>
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
                </Group>
            </Panel>
        );
    }

}

export default HomePanelBase;
