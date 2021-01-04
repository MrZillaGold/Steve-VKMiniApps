import React from "react";
import { Card, Text, useAdaptivity, ViewWidth } from "@vkontakte/vkui";

import { router } from "../../router";

import "./SkinCard.css";

export function SkinCard({ url, isSlim, renders, rating, height }) {

    const { viewWidth } = useAdaptivity();

    return (
        <Card mode="shadow"
              className={`SkinCard ${viewWidth > ViewWidth.MOBILE ? "SkinCard_hover" : ""}`}
              style={{ height: `${height}px` }}
              onClick={() => {
                  router.go("gallery-preview", {
                      skin: url,
                      isSlim
                  })

                  console.log(router.history)
              }}
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
