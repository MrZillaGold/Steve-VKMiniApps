import React, { useEffect, useRef } from "react";
import { HorizontalScroll, Tabs, TabsItem } from "@vkontakte/vkui";

export function TabsSelect({ activeTab, setActiveTab, tabs }) {

    const ref = useRef();
    const tabsRef = new Set([]);

    const getScrollToLeft = (offset) => {
        const containerWidth = ref.current.offsetWidth;

        const tab = [...tabsRef].find((element) => element.offsetLeft + element.offsetWidth - offset >= 0);
        if (!tab) {
            return offset;
        }

        if ([...tabsRef].indexOf(tab) === 0) {
            return 0;
        }

        const marginRight = parseInt(window.getComputedStyle(tab).marginRight);
        const scrollTo = tab.offsetLeft - (containerWidth - tab.offsetWidth) + marginRight;

        if (scrollTo <= 2 * marginRight) {
            return 0;
        }

        return scrollTo;
    }

    const getScrollToRight = (offset) => {
        const containerWidth = ref.current.offsetWidth;

        const tab = [...tabsRef].find((element) => element.offsetLeft + element.offsetWidth - offset > containerWidth);
        if (!tab) {
            return offset;
        }

        const marginRight = parseInt(window.getComputedStyle(tab).marginRight);
        return tab.offsetLeft - marginRight;
    }

    useEffect(() => {
        tabs.forEach((value, key) => {
            tabsRef.add(document.querySelector(`#${key}`));
        });
    });

    return (
        <div ref={ref}>
            <Tabs>
                <HorizontalScroll showArrows
                                  getScrollToRight={getScrollToRight}
                                  getScrollToLeft={getScrollToLeft}
                >
                    {
                        [...tabs].map(([ tab, [title] ]) =>
                            <TabsItem onClick={() => setActiveTab(tab)}
                                      id={tab}
                                      key={tab}
                                      selected={activeTab === tab}
                            >
                                {
                                    title
                                }
                            </TabsItem>
                        )
                    }
                </HorizontalScroll>
            </Tabs>
        </div>
    );
}
