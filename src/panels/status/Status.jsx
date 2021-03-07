import React, { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { Offline, Online } from "react-detect-offline";
import { Panel, Group, Header } from "@vkontakte/vkui";

import { OfflineBlock, Error, Spinner, CustomPanelHeader } from "../../components";
import { ServicesList } from "./ServicesList";

export function Status({ id }) {

    const [mount, setMount] = useState(true);
    const [spinner, setSpinner] = useState(true);
    const [error, setError] = useReducer((state, error) => {
        if (error) {
            setSpinner(false);
        }

        return error;
    }, null);

    const [services, setServices] = useReducer((state, services) => {
        setSpinner(false);
        setError(null);

        return services;
    }, null);

    const getStatus = () => {
        setSpinner(true);
        setError(null);

        axios.get("https://stevecors.herokuapp.com/https://status.mojang.com/check")
            .then(({ data }) => {
                if (mount) {
                    setServices(data);
                }
            })
            .catch((error) => {
                if (mount) {
                    setError("Произошла ошибка. Попробуйте позже.");
                }

                console.log(error);
            });
    };

    useEffect(() => {
        getStatus();

        return () => setMount(false);
    }, []);

    return (
        <Panel id={id}
               /*centered={Boolean(spinner)}*/
        >
            <CustomPanelHeader status="Состояние сервисов"/>
            <Online>
                <Group header={
                    services &&
                    <Header mode="secondary">
                        Список сервисов
                    </Header>
                }>
                    {
                        spinner && <Spinner/>
                    }
                    {
                        error && <Error error={error} stretch/>
                    }
                    {
                        services && <ServicesList services={services}/>
                    }
                </Group>
            </Online>
            <Offline onChange={() => {
                if (!services) {
                    getStatus();
                }
            }}>
                <Group>
                    <OfflineBlock/>
                </Group>
            </Offline>
        </Panel>
    )
}
