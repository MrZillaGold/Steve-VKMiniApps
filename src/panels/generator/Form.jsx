import React, { useEffect, useReducer } from "react";
import { Group, FormLayout, Input, FormItem, Textarea } from "@vkontakte/vkui";

export function Form({ setAchievement }) {

    const [{ title, body }, setInputValue] = useReducer((state, input) => ({
        ...state,
        ...input
    }), {
        title: "",
        body: ""
    });

    const input = ({ currentTarget }) => {
        let { value, name } = currentTarget;

        value = value.replace(/[^а-яА-ЯёЁA-Za-z0-9!?., ]/g, "");

        switch (name) {
            case "title":
                value = value.slice(0, 20);

                break;
            case "body":
                value = value.slice(0, 210);

                break;
        }

        setInputValue({
            [name]: value
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => setAchievement({
            title,
            body
        }), 500)

        return () => clearTimeout(timeout);
    }, [title, body]);

    return (
        <Group>
            <FormLayout>
                <FormItem top="Заголовок">
                    <Input value={title}
                           name="title"
                           onChange={input}
                           placeholder="Достижение получено!"
                           maxLength="20"
                    />
                </FormItem>
                <FormItem top="Текст достижения"
                          bottom="Поля могут содержать символы латиницы, кириллицы, цифры и спецсимволы."
                >
                    <Textarea name="body"
                           value={body}
                           onChange={input}
                           placeholder="Терпение и труд"
                    />
                </FormItem>
            </FormLayout>
        </Group>
    )
}
