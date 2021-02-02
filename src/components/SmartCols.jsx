import React from "react";

import { SplitCol, SplitLayout, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

export function SmartCols({ col1, col2 }) {
    const { viewWidth } = useAdaptivity();

    if (viewWidth > ViewWidth.MOBILE) {
        col1 = (
            <SplitCol width={viewWidth >= ViewWidth.TABLET ? 400 : 300}
                      maxWidth={viewWidth >= ViewWidth.TABLET ? 400 : 300}
                      spaced
            >
                {
                    col1
                }
            </SplitCol>
        );

        col2 = (
            <SplitCol spaced>
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
    );
}
