import React, { useEffect, useState } from "react";
import { NameMC } from "namemcwrapper";
import InfiniteScroll from "react-infinite-scroll-component";

import { Card, CardGrid, Panel, Text } from "@vkontakte/vkui";
import { Error, PanelHeader, Spinner } from "../components/components";

import "./SkinGallery.css";

const nameMc = new NameMC();

nameMc.setOptions({
    proxy: "https://stevecors.herokuapp.com"
});

export function SkinGallery({ id, navigator, scheme }) {

    const [skins, setSkins] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        nameMc.getSkins("random")
            .then((skins) =>
                setSkins(skins)
            )
            .catch((error) => {
                setError("К сожалению, этот раздел не доступен из-за ошибки. Попробуйте позже.");

                console.log(error);
            });
    }, []);

    const getSkins = () => {
        nameMc.getSkins("random")
            .then((randomSkins) =>
                setSkins([
                    ...skins,
                    ...randomSkins
                ])
            )
            .catch((error) => {
                setHasMore(false);

                console.log(error);
            });
    };

    return (
        <Panel separator={false} id={id}>
            <PanelHeader status="Галерея скинов"
                         navigator={navigator}
                         left
            />
            {
                skins.length > 0 ?
                <InfiniteScroll dataLength={skins.length}
                                next={getSkins}
                                hasMore={hasMore}
                                loader={
                                    <Spinner/>
                                }
                >
                    <CardGrid className="Gallery-Grid">
                        {
                            skins.map(({ isSlim, rating, url, renders, hash }, index) => {

                                const { body } = new NameMC()
                                    .getRenders({
                                        skin: hash,
                                        model: isSlim ? "slim" : "classic",
                                        width: 150
                                    })

                                return (
                                    <Card size="m"
                                          key={index}
                                          mode="outline"
                                          className={`Gallery-Card Gallery-Card_${scheme}`}
                                          onClick={() => navigator.showModal("gallery-view", {
                                              url,
                                              isSlim
                                          })}
                                    >
                                        <img src={body.front}
                                             className="Gallery-Image"
                                             alt=""
                                        />
                                        <Text className="Gallery-Rating"
                                              weight="medium"
                                        >
                                            ★{ rating }
                                        </Text>
                                    </Card>
                                );
                            })
                        }
                    </CardGrid>
                </InfiniteScroll>
                    :
                    !error && <Spinner/>
            }
            {
                error && <Error error={error} stretch={true}/>
            }
        </Panel>
    );
}
