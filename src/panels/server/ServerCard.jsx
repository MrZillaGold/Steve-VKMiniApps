import React, { useContext } from "react";

import { Header, Cell, Avatar, Group, Div } from "@vkontakte/vkui";

import { SchemeContext } from "../../hooks/hooks";

import "./ServerCard.css";

export function ServerCard({ server }) {

    const { scheme } = useContext(SchemeContext);

    return (
        <>
            <Group mode="plain">
                <Cell multiline
                      disabled
                      before={
                          <Avatar style={{ imageRendering: "pixelated" }}
                                  mode="image"
                                  size={64}
                                  src={server.icon}
                          />
                      }
                      description={`Игроков: ${server.players.online} / ${server.players.max}`}
                >
                    <div className={`ServerCard-Motd_${scheme}`}>
                        <span dangerouslySetInnerHTML={{__html: server.motd.html[0]}}/>
                        <br/>
                        <span dangerouslySetInnerHTML={{__html: server.motd.html[1]}}/>
                    </div>
                </Cell>
            </Group>
            {
                server.players.list &&
                <Group mode="plain"
                       header={
                           <Header mode="secondary">
                               Игроки
                           </Header>
                       }
                >
                    <Div className="ServerCard-Line">
                        {
                            server.players.list
                        }
                    </Div>
                </Group>
            }
            {
                server.version &&
                <Group header={
                    <Header mode="secondary">
                        Ядро сервера
                    </Header>
                }
                       mode="plain"
                >
                    <Div className="ServerCard-Line">
                        {
                            server.version
                        }
                    </Div>
                </Group>
            }
        </>
    )
}
