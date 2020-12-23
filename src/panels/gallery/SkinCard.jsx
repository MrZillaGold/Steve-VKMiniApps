import React, { useContext } from "react";
import { Card, Text, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { ModalsContext } from "vkui-navigation";

import { SchemeContext } from "../../hooks/hooks";

import "./SkinCard.css";

export function SkinCard({ url, isSlim, renders, rating, height }) {

    const { viewWidth } = useAdaptivity();
    const { openModal } = useContext(ModalsContext);
    const { scheme } = useContext(SchemeContext);

    return (
        <Card mode="shadow"
              className={`SkinCard SkinCard_${scheme} ${viewWidth > ViewWidth.MOBILE ? "SkinCard_hover" : ""}`}
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
