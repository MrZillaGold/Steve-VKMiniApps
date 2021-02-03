import React from "react";
import { ModalPage, Card, Div } from "@vkontakte/vkui";
import { useParams, useRouter } from "@unexp/router";

import { SkinPreview, ModalHeader } from "../../components";

export function GalleryPreview({ id }) {

    const { skin, isSlim } = useParams();
    const { back } = useRouter();

    return (
        <ModalPage id={id}
                   header={
                       <ModalHeader>
                           Просмотр скина
                       </ModalHeader>
                   }
                   onClose={back}
        >
            <Div style={{ padding: "0px 12px 16px" }}>
                <Card mode="tint">
                    <SkinPreview skin={skin}
                                 isSlim={isSlim}
                    />
                </Card>
            </Div>
        </ModalPage>
    );
}
