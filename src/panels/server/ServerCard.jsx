import React from "react";
import { Cell, Avatar, Group } from "@vkontakte/vkui";

import { Players } from "./Players";
import { Core } from "./Core";
import { ServerTop } from "./ServerTop";

import "./ServerCard.css";

export function ServerCard({ server, setScrollUp }) {

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
                    <div className="ServerCard-Motd">
                        <span dangerouslySetInnerHTML={{__html: server.motd.html[0]}}/>
                        <br/>
                        <span dangerouslySetInnerHTML={{__html: server.motd.html[1]}}/>
                    </div>
                </Cell>
            </Group>
            {
                server.players.list &&
                <Players server={server}/>
            }
            {
                server.version &&
                <Core server={server}/>
            }
            {
                server.id &&
                <ServerTop server={server}
                           setScrollUp={setScrollUp}
                />
            }
        </>
    )
}
