import React, { useEffect, useState } from "react";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group, ViewWidth, useAdaptivity, CardGrid } from "@vkontakte/vkui";

import { Error, CustomPanelHeader, Spinner, OfflineBlock, InfinityScroll } from "../../components";
import { SkinCard } from "./SkinCard";

import { nameMc } from "../../utils";

export function Gallery({ id }) {

    const { viewWidth } = useAdaptivity();

    const [mount, setMount] = useState(true);
    const [skins, setSkins] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSkins();

        return () => setMount(false);
    }, []);

    const height = viewWidth > ViewWidth.MOBILE ? 280 : 300;

    const getSkins = () => {
        nameMc.getSkins({ tab: "random" })
            .then((randomSkins) => {
                randomSkins = randomSkins.map((skin) => {
                    skin.renders = nameMc.getRenders({
                            skin: skin.hash,
                            model: skin.model,
                            width: 150,
                            height
                        });

                    return skin;
                });

                if (mount) {
                    setSkins([
                        ...skins,
                        ...randomSkins
                    ]);
                }
            })
            .catch((error) => {
                if (mount) {
                    if (skins.length === 0) {
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
               /*centered={Boolean(skins.length === 0 || error)}*/
        >
            <CustomPanelHeader status="Галерея скинов"/>
            <Group>
                <Online>
                    {
                        skins.length > 0 ?
                            <InfinityScroll data={skins}
                                            hasMore={hasMore}
                                            get={getSkins}
                            >
                                <CardGrid style={{ marginBottom: "12px", marginTop: viewWidth > ViewWidth.MOBILE ? "8px" : "2px" }}
                                          size={viewWidth > ViewWidth.MOBILE ? "s" : "m"}
                                >
                                    {
                                        skins.map((skin, index) =>
                                            <SkinCard key={index}
                                                      height={height}
                                                      {...skin}
                                            />
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
                    if (skins.length === 0) {
                        setError(null);

                        getSkins();
                    }
                }}>
                    <OfflineBlock/>
                </Offline>
            </Group>
        </Panel>
    );
}
