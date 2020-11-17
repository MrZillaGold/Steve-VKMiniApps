import React, { useReducer } from "react";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group } from "@vkontakte/vkui";

import { Form } from "./Form";
import { Result } from "./Result";

import { CustomPanelHeader, OfflineBlock, SmartCols } from "../../components/components";

export function Generator({ id }) {

    const [{ title, body }, setAchievement] = useReducer((state, achievement) => ({
        ...state,
        ...achievement
    }), {
        title: "",
        body: "",
        sent: false,
        lock: false,
        url: null
    });

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Генератор достижений"/>
            <Online>
                <SmartCols col1={
                    <Form title={title}
                          body={body}
                          setAchievement={setAchievement}
                    />
                }
                           col2={
                               <Result title={title}
                                       body={body}
                               />
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
