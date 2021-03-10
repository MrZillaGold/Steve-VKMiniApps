import React, { useReducer } from "react";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group } from "@vkontakte/vkui";

import { CustomPanelHeader, OfflineBlock, SmartCols } from "../../components";

import { Form } from "./Form";
import { Result } from "./Result";

export function Generator({ id }) {

    const [achievement, setAchievement] = useReducer((state, achievement) => ({
        ...state,
        ...achievement
    }), {
        title: "",
        body: "",
        backgroundColor: "black",
        textColor: "yellow"
    });

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Генератор достижений"/>
            <Online>
                <SmartCols col1={
                    <Form setAchievement={setAchievement}
                          {...achievement}
                    />
                }
                           col2={
                               <Result {...achievement}/>
                           }
                />
            </Online>
            <Offline>
                <Group>
                    <OfflineBlock/>
                </Group>
            </Offline>
        </Panel>
    )
}
