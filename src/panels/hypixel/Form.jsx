import React, { useState } from "react";
import { Button, Group } from "@vkontakte/vkui";

import { InputWithFavorite } from "../../components";

export function Form({ nickname, setNickname, spinner, getUser, setAdd }) {

    const [{ edit, setOpen }, setFavorite] = useState({});

    const input = ({ currentTarget }) => {
        const { value } = currentTarget;

        setNickname(
            value.replace(/[^A-Za-z0-9_]/g, "")
                .slice(0, 16)
        );
    };

    return (
        <Group>
            <InputWithFavorite inputTop="Никнейм"
                               inputBottom={"Может содержать только латинские буквы, цифры и символ \"_\". (От 1 до 16 символов)"}
                               input={{
                                   name: "nickname",
                                   value: nickname,
                                   disabled: spinner || edit,
                                   onChange: input,
                                   status: nickname.length > 0 || nickname === "" ?
                                       "default"
                                       :
                                       "error",
                                   placeholder: "Введите никнейм",
                                   maxLength: 16,
                                   pattern: "^[A-Za-z0-9_]+$"
                               }}
                               button={
                                   <Button disabled={!(nickname.length >= 1 && nickname.match("^[A-Za-z0-9_]+$") && !spinner && !edit)}
                                           stretched
                                           onClick={() => {
                                               setOpen(false);

                                               getUser(nickname);
                                           }}
                                           size="l"
                                   >
                                       Получить информацию
                                   </Button>
                               }
                               spinner={spinner}
                               favoriteBridgeKey="steveHypixelHistoryList"
                               favoriteHeader="История запросов"
                               favoriteEmpty="В истории запросов нет ни одной записи. Новая запись появится после получения информации об игроке."
                               onSelect={(item) => {
                                   input({
                                       currentTarget: {
                                           value: item
                                       }
                                   });

                                   setOpen(false);

                                   getUser(item);
                               }}
                               getState={(state) => {
                                   setFavorite(state);

                                   setAdd(state.add);
                               }}
            />
        </Group>
    )
}
