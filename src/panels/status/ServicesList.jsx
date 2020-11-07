import React from "react";
import { Avatar, List, SimpleCell } from "@vkontakte/vkui";

import green from "../../assets/green.gif";
import yellow from "../../assets/yellow.gif";
import red from "../../assets/red.gif";
import { HeightAnimation } from "../../animation/animation";


const statuses = new Map([
    ["green", [green, "Всё в порядке"]],
    ["yellow", [yellow, "Небольшие неполадки"]],
    ["red", [red, "Проблемы с доступностью"]]
]);

const servers = new Map([
    ["minecraft.net", "Minecraft.net"],
    ["session.minecraft.net", "Сессии Minecraft"],
    ["account.mojang.com", "Аккаунты Mojang"],
    ["authserver.mojang.com", "Авторизация Mojang"],
    ["sessionserver.mojang.com", "Сессии Mojang"],
    ["api.mojang.com", "API Mojang"],
    ["textures.minecraft.net", "Текстуры/Скины Minecraft"],
    ["mojang.com", "Mojang.com"]
]);

export function ServicesList({ services }) {
    return (
        <HeightAnimation>
            <List>
                {
                    services.map((service, index) => {
                        const [name] = Object.keys(service);

                        const [image, description] = statuses.get(service[name]);

                        return (
                            <SimpleCell key={index}
                                        before={
                                            <Avatar src={image}/>
                                        }
                                        description={description}
                                        disabled
                            >
                                {
                                    servers.get(name)
                                }
                            </SimpleCell>
                        )
                    })
                }
            </List>
        </HeightAnimation>
    )
}
