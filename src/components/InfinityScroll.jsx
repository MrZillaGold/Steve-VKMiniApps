import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { ScrollToUp, Spinner } from "../components";

export function InfinityScroll({ data, get, hasMore, children }) {

    const ref = useRef();

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
            <InfiniteScroll dataLength={data.length}
                            ref={ref}
                            next={get}
                            onScroll={onScroll}
                            hasMore={hasMore}
                            loader={
                                <Spinner/>
                            }
            >
                {
                    children
                }
            </InfiniteScroll>
            <ScrollToUp scrollUp={scrollUp}/>
        </>
    );
}
