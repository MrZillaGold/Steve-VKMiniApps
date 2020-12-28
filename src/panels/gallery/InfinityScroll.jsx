import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CardGrid, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { ScrollToUp, Spinner } from "../../components/components";
import { SkinCard } from "./SkinCard";

export function InfinityScroll({ skins, height, getSkins, hasMore }) {

    const ref = useRef();
    const { viewWidth } = useAdaptivity();

    const [scrollUp, setScrollUp] = useState(false);

    const onScroll = () => {
        if (ref.current.lastScrollTop >= 100) {
            setScrollUp(true);
        } else {
            setScrollUp(false);
        }
    };

    return (
        <>
            <InfiniteScroll dataLength={skins.length}
                            ref={ref}
                            next={getSkins}
                            onScroll={onScroll}
                            hasMore={hasMore}
                            loader={
                                <Spinner/>
                            }
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
            </InfiniteScroll>
            <ScrollToUp scrollUp={scrollUp}/>
        </>
    );
}
