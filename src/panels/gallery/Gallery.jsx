import React, { useEffect, useState } from "react";
import { NameMC } from "namemcwrapper";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group } from "@vkontakte/vkui";

import { Error, CustomPanelHeader, Spinner, OfflineBlock } from "../../components/components";

import { InfinityScroll } from "./InfinityScroll";

const nameMc = new NameMC({
    proxy: "https://stevecors.herokuapp.com"
});

export function Gallery({ id }) {

    const [mount, setMount] = useState(true);
    const [skins, setSkins] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getSkins();

        return () => setMount(false);
    }, []);

    const getSkins = () => {
        nameMc.getSkins("random")
            .then((randomSkins) => {
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
               centered={Boolean(skins.length === 0 || error)}
        >
            <CustomPanelHeader status="Галерея скинов"/>
            <Group>
                <Online>
                    {
                        skins.length > 0 ?
                            <InfinityScroll skins={skins}
                                            getSkins={getSkins}
                                            hasMore={hasMore}
                            />
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
