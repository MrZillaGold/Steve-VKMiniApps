import React from "react";
import { RichCell, Avatar, Group, Counter, Tappable, ViewWidth, useAdaptivity } from "@vkontakte/vkui";

import { InfoRow } from "./InfoRow";
import { ServerTop } from "./ServerTop";

import "./ServerCard.css";

export function ServerCard({ server, setScrollUp = () => {}, onClick }) {

    const { viewWidth } = useAdaptivity();

    const { icon, rating, version, id, country, uptime, players: { online, max, list }, motd: { html } } = server;

    const card = (
        <>
            <Group mode="plain">
                <RichCell multiline
                          disabled
                          before={
                              <Avatar style={{ imageRendering: "pixelated" }}
                                      mode="image"
                                      size={64}
                                      src={icon}
                              />
                          }
                          text={
                              country &&
                              <>
                                  <img src={country.image}
                                       alt={country.emoji}
                                       height={16}
                                       style={{ verticalAlign: "-0.15em", marginRight: "5px" }}
                                  />
                                  {
                                      country.name
                                  }
                              </>
                          }
                          caption={`Игроков: ${online} / ${max}`}
                          after={
                              rating && <Counter>★ {rating}</Counter>
                          }
                          onClick={onClick}
                >
                    <div className="ServerCard-Motd">
                        <span dangerouslySetInnerHTML={{__html: html[0]}}/>
                        <br/>
                        <span dangerouslySetInnerHTML={{__html: html[1]}}/>
                    </div>
                </RichCell>
            </Group>
            {
                list &&
                <InfoRow header="Игроки">
                    {
                        list
                    }
                </InfoRow>
            }
            {
                version &&
                <InfoRow header="Ядро сервера">
                    {
                        version
                    }
                </InfoRow>
            }
            {
                uptime &&
                <InfoRow header="Время безотказной работы">
                    { uptime }%
                </InfoRow>
            }
            {
                id &&
                <ServerTop server={server}
                           setScrollUp={setScrollUp}
                />
            }
        </>
    );

    return (
        onClick ?
            <Tappable onClick={onClick}
                      style={{ height: viewWidth > ViewWidth.MOBILE ? "100%" : "auto" }}
            >
                {
                    card
                }
            </Tappable>
            :
            card
    );
}
