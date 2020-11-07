import React from "react";
import { Button, Input, Group } from "@vkontakte/vkui";

import { InputWithFavorite } from "../../components/components";
import { isIP } from "../../functions";

export function Form({ IP, setIP, spinner, getServer, setAdd, setOpen, edit, setFavorite }) {

    const input = ({ currentTarget }) => {
        const { value } = currentTarget;

        setIP(
            value.replace(/[^а-яА-ЯёЁa-zA-Z0-9.:-]/g, "")
                .slice(0, 255)
        );
    };

    return (
        <Group>
            <InputWithFavorite inputTop="IP-Адрес сервера"
                               inputBottom={"Например: Hypixel.net"}
                               input={
                                   <Input
                                       disabled={spinner || edit}
                                       name="ip"
                                       value={IP}
                                       onChange={input}
                                       status={isIP(IP) || IP === "" ? "default" : "error"}
                                       bottom={isIP(IP) || IP === "" ? "Например: Hypixel.net" : "Неверный IP-Адрес."}
                                       placeholder="Введите IP-Адрес"
                                       maxLength="255"
                                   />
                               }
                               button={
                                   <Button disabled={!(IP.length > 2 && !edit && !spinner && isIP(IP))}
                                           stretched
                                           onClick={() => {
                                               setOpen(false);

                                               getServer(IP);
                                           }}
                                           size="l"
                                   >
                                       Получить информацию
                                   </Button>
                               }
                               spinner={spinner}
                               favoriteBridgeKey="steveFavoriteList"
                               favoriteHeader="Избранные сервера"
                               favoriteEmpty="В избранном нет ни одного сервера. Добавить сервер в избранное можно после получения информации о нём."
                               onSelect={(item) => {
                                   input({
                                       currentTarget: {
                                           value: item
                                       }
                                   });

                                   setOpen(false);

                                   getServer(item);
                               }}
                               getState={(state) => {
                                   setFavorite(state);

                                   setAdd(state.add);
                               }}
            />
        </Group>
    )
}
