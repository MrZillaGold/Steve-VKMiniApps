import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button, CardGrid, FixedLayout, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon28ArrowUpOutline } from "@vkontakte/icons";

import { Spinner } from "../../components/Spinner";
import { SkinCard } from "./SkinCard";

import "./InfinityScroll.css";

export function InfinityScroll({ skins, height, getSkins, hasMore }) {

    const { viewWidth } = useAdaptivity();
    const ref = useRef();

    const [scrollUp, setScrollUp] = useState(false);

    const onScroll = () => {
        if (ref.current.lastScrollTop >= 100) {
            setScrollUp(true);
        } else {
            setScrollUp(false);
        }
    };

    const scrollToUp = () => {
        window.scrollTo(0, 0);
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
                <CardGrid style={{ marginBottom: "12px", marginTop: viewWidth > ViewWidth.MOBILE ? "8px" : "2px" }}>
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
            <FixedLayout vertical="bottom"
                         className={`InfinityScroll-Up ${scrollUp ? "InfinityScroll-Up-Show" : ""}`}
            >
                <Button size="l"
                        mode="secondary"
                        className="InfinityScroll-Up-Button"
                        onClick={scrollToUp}
                >
                    <Icon28ArrowUpOutline/>
                </Button>
            </FixedLayout>
            </>
    )
}
