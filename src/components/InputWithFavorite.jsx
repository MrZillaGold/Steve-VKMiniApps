import React, { useState } from "react";
import { FormItem, FormLayout, Group, FormLayoutGroup, useAdaptivity, ViewWidth } from "@vkontakte/vkui";
import { Icon24Dropdown, Icon24Chevron } from "@vkontakte/icons";

import { FavoriteList } from "./FavoriteList";

export function InputWithFavorite({ input, inputTop, inputBottom, favoriteHeader, favoriteEmpty, favoriteBridgeKey, button, onSelect, getState, spinner, ...rest }) {

    const { viewWidth } = useAdaptivity();

    const [{ edit, setFavorite: setFavoriteState }, setFavorite] = useState({});
    const [open, setOpen] = useState(false);

    const displayFavorite = viewWidth <= ViewWidth.MOBILE ?
        open
        :
        true;

    return (
        <div {...rest}>
            <Group mode="plain"
                   separator="hide"
            >
                <FormLayout>
                    <FormLayoutGroup style={{ display: "flex" }}>
                        <FormItem top={inputTop}
                                  bottom={inputBottom}
                                  style={{ flexGrow: 99 }}
                        >
                            {
                                input
                            }
                        </FormItem>
                        {
                            viewWidth <= ViewWidth.MOBILE && (
                                <FormItem style={{ flexGrow: 1, marginTop: 30 }}>
                                    {
                                        open ?
                                            <Icon24Dropdown style={{ opacity: edit ? ".2" : "1" }}
                                                            onClick={() => {
                                                                if (!edit) {
                                                                    setOpen(false);
                                                                }
                                                            }}
                                                            width={35}
                                                            height={35}
                                            />
                                            :
                                            <Icon24Chevron style={{ opacity: spinner ? ".2" : "1" }}
                                                           onClick={() => {
                                                               if (!spinner) {
                                                                   setOpen(true);

                                                                   setFavoriteState({
                                                                       edit: false
                                                                   });
                                                               }
                                                           }}
                                                           width={35}
                                                           height={35}
                                            />
                                    }
                                </FormItem>
                            )
                        }
                    </FormLayoutGroup>
                    <FormItem>
                        {
                            button
                        }
                    </FormItem>
                </FormLayout>
            </Group>
            <FavoriteList opened={displayFavorite}
                          bridgeKey={favoriteBridgeKey}
                          header={favoriteHeader}
                          empty={favoriteEmpty}
                          onSelect={onSelect}
                          disabled={spinner}
                          getState={(state) => {
                              setFavorite(state);

                              getState({
                                  ...state,
                                  open,
                                  setOpen
                              });
                          }}
            />
        </div>
    );
}
