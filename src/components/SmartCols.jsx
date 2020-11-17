import React from "react";

import { SplitCol, SplitLayout, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

export function SmartCols({ col1, col2 }) {
    const { viewWidth } = useAdaptivity();

    if (viewWidth > ViewWidth.MOBILE) {
        col1 = (
            <SplitCol key="SmartCol-1"
                      spaced
            >
                {
                    col1
                }
            </SplitCol>
        );

        col2 = (
            <SplitCol width={viewWidth >= ViewWidth.TABLET ? 200 : 40}
                      key="SmartCol-2"
                      spaced
            >
                {
                    col2
                }
            </SplitCol>
        );
    }

    return (
        viewWidth > ViewWidth.MOBILE ?
            <SplitLayout>
                {
                    col1
                }
                {
                    col2
                }
            </SplitLayout>
            :
            <>
                {
                    col1
                }
                {
                    col2
                }
            </>
    )
}
