import React, { useContext } from "react";
import { Card, Text, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { ModalsContext } from "vkui-navigation";

import "./SkinCard.css";

export function SkinCard({ url, isSlim, renders, rating, height }) {

    const { viewWidth } = useAdaptivity();
    const { openModal } = useContext(ModalsContext);

    return (
        <Card mode="shadow"
              className={`SkinCard ${viewWidth > ViewWidth.MOBILE ? "SkinCard_hover" : ""}`}
              style={{ height: `${height}px` }}
              onClick={() => openModal("gallery-preview", {
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
