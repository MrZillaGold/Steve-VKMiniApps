import React from "react";
import { Card, Text, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { useRouter } from "@unexp/router";

import "./SkinCard.css";

export function SkinCard({ url, isSlim, renders, rating, height }) {

    const { viewWidth } = useAdaptivity();
    const { push } = useRouter();

    return (
        <Card mode="shadow"
              className={`SkinCard ${viewWidth > ViewWidth.MOBILE ? "SkinCard_hover" : ""}`}
              style={{ height: `${height}px` }}
              onClick={() => push({ modal: "gallery-preview" }, {
                  skin: url,
                  isSlim
              })}
        >
            <img src={renders.body.front}
                 className="SkinCard-Image"
                 alt=""
            />
            <Text className="SkinCard-Rating"
                  weight="medium"
            >
                ★{ rating }
            </Text>
        </Card>
    )
}
