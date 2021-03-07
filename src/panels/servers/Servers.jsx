import React, { useEffect, useState } from "react";
import { NameMC } from "namemcwrapper";
import { Offline, Online } from "react-detect-offline";
import { Card, CardGrid, Group, Panel, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { useRouter } from "@unexp/router";

import { CustomPanelHeader, InfinityScroll, Spinner, Error, OfflineBlock } from "../../components";
import { ServerCard } from "../server/ServerCard";

const nameMc = new NameMC({
    proxy: "https://stevecors.herokuapp.com"
});

export function Servers({ id }) {

    const { viewWidth } = useAdaptivity();
    const { push } = useRouter();

    const [mount, setMount] = useState(true);
    const [servers, setServers] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getServers();

        return () => setMount(false);
    }, []);

    const getServers = () => {
        const page = Math.trunc(servers.length / 24) + 1;

        nameMc.getServers(page)
            .then((serversList) => {
                serversList = serversList.map((server) => {
                    server.motd.html = server.motd.html.split("\n");

                    return server;
                });

                if (mount) {
                    if (page - 1 && servers[servers.length - 1].ip === serversList[serversList.length - 1].ip) {
                        return setHasMore(false);
                    }

                    setServers(servers.concat(serversList));
                }
            })
            .catch((error) => {
                if (mount) {
                    if (servers.length === 0) {
                        setError("К сожалению, этот раздел недоступен из-за ошибки. Попробуйте позже.");
                    } else {
                        setHasMore(false);
                    }
                }

                console.log(error);
            });
    };

    return (
        <Panel id={id}
               /*centered={Boolean(servers.length === 0 || error)}*/
        >
            <CustomPanelHeader status="Сервера Minecraft"/>
            <Group>
                <Online>
                    {
                        servers.length > 0 ?
                            <InfinityScroll data={servers}
                                            hasMore={hasMore}
                                            get={getServers}
                            >
                                <CardGrid style={{ marginBottom: "12px", marginTop: viewWidth > ViewWidth.MOBILE ? "8px" : "2px", alignItems: "stretch" }}
                                          size={viewWidth > ViewWidth.MOBILE ? "m" : "l"}
                                >
                                    {
                                        servers.map((server) =>
                                            <Card key={server.ip}>
                                                <ServerCard server={server}
                                                            disabled={false}
                                                            onClick={() => push({ modal: "server-preview" }, {
                                                                server
                                                            })}
                                                />
                                            </Card>
                                        )
                                    }
                                </CardGrid>
                            </InfinityScroll>
                            :
                            !error && <Spinner/>
                    }
                    {
                        error && <Error error={error}/>
                    }
                </Online>
                <Offline onChange={() => {
                    if (servers.length === 0) {
                        setError(null);

                        getServers();
                    }
                }}>
                    <OfflineBlock/>
                </Offline>
            </Group>
        </Panel>
    );
}
