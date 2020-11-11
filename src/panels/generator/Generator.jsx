import React, { useReducer } from "react";
import { Offline, Online } from "react-detect-offline";
import { Panel, SplitCol, SplitLayout, useAdaptivity, Group, ViewWidth } from "@vkontakte/vkui";

import { Form } from "./Form";
import { Result } from "./Result";

import { CustomPanelHeader, OfflineBlock } from "../../components/components";

export function Generator({ id }) {

    const { viewWidth } = useAdaptivity();

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

    let GeneratorForm = <Form key="GeneratorForm" title={title} body={body} setAchievement={setAchievement}/>
    let GeneratorInfo = <Result key="GeneratorResult" title={title} body={body}/>

    if (viewWidth > ViewWidth.MOBILE) {
        GeneratorForm = (
            <SplitCol spaced
                      key="GeneratorForm"
            >
                {
                    GeneratorForm
                }
            </SplitCol>
        )
        GeneratorInfo = (
            <SplitCol width={`${viewWidth >= ViewWidth.DESKTOP ? 200 : 40}px`}
                      key="GeneratorInfo"
                      spaced
            >
                {
                    GeneratorInfo
                }
            </SplitCol>
        )
    }

    const GeneratorChild = [
        GeneratorForm,
        GeneratorInfo
    ];

    return (
        <Panel id={id}>
            <CustomPanelHeader status="Генератор достижений"/>
            <Online>
                {
                    viewWidth > ViewWidth.MOBILE ?
                        <SplitLayout>
                            {GeneratorChild}
                        </SplitLayout>
                        :
                        GeneratorChild
                }
            </Online>
            <Offline>
                <Group>
                    <OfflineBlock/>
                </Group>
            </Offline>
        </Panel>
    )
}
