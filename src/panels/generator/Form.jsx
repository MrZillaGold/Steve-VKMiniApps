import React, { useEffect, useReducer } from "react";
import { Group, FormLayout, Input, FormItem, Textarea, SliderSwitch } from "@vkontakte/vkui";

export function Form({ setAchievement }) {

    const [{ title, body, textColor, backgroundColor }, setInputValue] = useReducer((state, input) => ({
        ...state,
        ...input
    }), {
        title: "",
        body: "",
        textColor: "yellow",
        backgroundColor: "black"
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
            body,
            textColor,
            backgroundColor
        }), 500)

        return () => clearTimeout(timeout);
    }, [title, body, backgroundColor, textColor]);

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
                <FormItem top="Цвет заголовка">
                    <SliderSwitch options={[
                        {
                            name: "Жёлтый",
                            value: "yellow",
                        },
                        {
                            name: "Розовый",
                            value: "pink",
                        },
                    ]}
                                  name="text"
                                  activeValue={textColor}
                                  onSwitch={(textColor) => setInputValue({
                                      textColor
                                  })}
                    />
                </FormItem>
                <FormItem top="Цвет фона">
                    <SliderSwitch options={[
                        {
                            name: "Чёрный",
                            value: "black",
                        },
                        {
                            name: "Белый",
                            value: "white",
                        },
                    ]}
                                  name="background"
                                  activeValue={backgroundColor}
                                  onSwitch={(backgroundColor) => setInputValue({
                                      backgroundColor
                                  })}
                    />
                </FormItem>
            </FormLayout>
        </Group>
    )
}
