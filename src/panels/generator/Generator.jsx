import React, {Suspense, useReducer} from "react";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group } from "@vkontakte/vkui";

import { CustomPanelHeader, OfflineBlock, SmartCols } from "../../components";

const Form = React.lazy(() => import("./Form"));
const Result = React.lazy(() => import("./Result"));

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
                    <Suspense fallback={<></>}>
                        <Form setAchievement={setAchievement}
                              {...achievement}
                        />
                    </Suspense>
                }
                           col2={
                               <Suspense fallback={<></>}>
                                   <Result {...achievement}/>
                               </Suspense>
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
