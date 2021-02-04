import React, { useState } from "react";
import { RichCell, Avatar, Group, Counter, Tappable, ViewWidth, useAdaptivity, Button } from "@vkontakte/vkui";
import { Icon16Done, Icon24Copy } from "@vkontakte/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { InfoRow } from "./InfoRow";
import { ServerTop } from "./ServerTop";

import "./ServerCard.css";

export function ServerCard({ server, showIpCopy = false, setScrollUp = () => {}, onClick }) {

    const { viewWidth } = useAdaptivity();

    const [copy, setCopy] = useState(false);

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
                          actions={
                              showIpCopy &&
                              <CopyToClipboard text={server.ip}>
                                  <Button onClick={() => setCopy(true)}
                                          stretched
                                          before={
                                              copy ? <Icon16Done/> : <Icon24Copy width={16} height={16}/>
                                          }
                                          disabled={copy}
                                  >
                                      {
                                          copy ?
                                              "IP-адрес скопирован!"
                                              :
                                              "Скопировать IP-адрес"
                                      }
                                  </Button>
                              </CopyToClipboard>
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
