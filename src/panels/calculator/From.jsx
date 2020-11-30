import React from "react";
import { FormItem, FormLayout, FormLayoutGroup, Group, Input, NativeSelect, ViewWidth, withAdaptivity } from "@vkontakte/vkui";

export const Form = withAdaptivity(({ inputCoordinates, x, y, z, dimension, viewWidth }) => {
    return (
        <Group>
            <FormLayout>
                <FormItem top="Измерение"
                          bottom="Для которого необходимо просчитать координаты."
                >
                    <NativeSelect name="dimension"
                                  onChange={inputCoordinates}
                                  value={dimension}
                    >
                        <option value="world">Обычный мир</option>
                        <option value="nether">Ад</option>
                    </NativeSelect>
                </FormItem>
                <FormLayoutGroup mode={viewWidth > ViewWidth.MOBILE ? "horizontal" : "vertical"}>
                    <FormItem top="Координата X"
                              bottom="Целое число. (-29999999 — 29999999)"
                              status={x.match(/^-?[0-9]/g) || x === "" ? "default" : "error"}
                    >
                        <Input name="x"
                               value={x}
                               onChange={inputCoordinates}
                               placeholder="220"
                               autoComplete="off"
                        />
                    </FormItem>
                    <FormItem top="Координата Y"
                              bottom="Целое число. (0 — 256)"
                              status={y.match(/^[0-9]/g) || y === "" ? "default" : "error"}
                    >
                        <Input name="y"
                               value={y}
                               onChange={inputCoordinates}
                               placeholder="64"
                               autoComplete="off"
                        />
                    </FormItem>
                    <FormItem top="Координата Z"
                              bottom="Целое число. (-29999999 — 29999999)"
                              status={z.match(/^-?[0-9]/g) || z === "" ? "default" : "error"}
                    >
                        <Input name="z"
                               value={z}
                               onChange={inputCoordinates}
                               placeholder="-113"
                               autoComplete="off"
                        />
                    </FormItem>
                </FormLayoutGroup>
            </FormLayout>
        </Group>
    )
}, {
    viewWidth: true
});
