import React from "react";
import { Card, Text, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { useRouter } from "@unexp/router";

import "./SkinCard.css";

export function SkinCard({ skin, height }) {

    const { viewWidth } = useAdaptivity();
    const { push } = useRouter();

    return (
        <Card mode="shadow"
              className={`SkinCard ${viewWidth > ViewWidth.MOBILE ? "SkinCard_hover" : ""}`}
              style={{ height: `${height}px` }}
              onClick={() => push({ modal: "gallery-preview" }, {
                  skin: skin.url,
                  isSlim: skin.isSlim
              })}
        >
            <img src={skin.renders.body.front}
                 className="SkinCard-Image"
                 height={height}
                 alt=""
            />
            <Text className="SkinCard-Rating"
                  weight="medium"
            >
                ★{ skin.rating }
            </Text>
        </Card>
    )
}
