import React from "react";
import { FormItem, FormLayout, FormLayoutGroup, Group, Input, NativeSelect, ViewWidth, useAdaptivity } from "@vkontakte/vkui";

import { COORDINATE_REGEXP } from "../../utils";

export function Form({ inputCoordinates, x, y, z, dimension }) {

    const { viewWidth } = useAdaptivity();

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
                              status={x.match(COORDINATE_REGEXP) || x === "" ? "default" : "error"}
                    >
                        <Input name="x"
                               value={x}
                               onChange={inputCoordinates}
                               placeholder="220"
                               autoComplete="off"
                        />
                    </FormItem>
                    <FormItem top="Координата Y"
                              bottom="Целое число. (-64 — 384)"
                              status={y.match(COORDINATE_REGEXP) || y === "" ? "default" : "error"}
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
                              status={z.match(COORDINATE_REGEXP) || z === "" ? "default" : "error"}
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
}
