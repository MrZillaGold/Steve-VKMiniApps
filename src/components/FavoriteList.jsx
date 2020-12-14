import React, { useEffect, useReducer } from "react";
import VKBridge from "@vkontakte/vk-bridge";
import { Header, List, Cell } from "@vkontakte/vkui";
import { Icon24Cancel, Icon24Done, Icon24Write } from "@vkontakte/icons";

import { Error } from "./Error";

import { HeightAnimation } from "../animation/animation";

/**
 * @description Список с избранными элементами
 * @param {function} onSelect - Действие при выборе элемента
 * @param {string} bridgeKey="" - Название строки с данными в хранилище
 * @param {string} header="" - Название списка
 * @param {boolean} opened - Состояние открытия списка (Только для мобильных устройств)
 * @param {boolean} disabled - Отключение выбора элементов списка
 * @param {string} empty - Текст заглушки при пустом списке
 * @param {function} getState - ункция для получения текущего состояния компонента
 * @return {Node}
 */
export function FavoriteList({ onSelect = () => {}, bridgeKey = "", header = "", opened = true, disabled = false, empty = "", getState = () => {} }) {

    const [{ items, edit, loaded, old, mount }, setFavorite] = useReducer((state, data) => ({
        ...state,
        ...data
    }), {
        items: [],
        edit: false,
        open: false,
        loaded: false,
        old: null,
        mount: true
    });

    const add = (item) => {
        if (!items.includes(item)) {
            const favorite = [...items];

            favorite.unshift(item);

            if (favorite.length > 10) {
                favorite.splice(-1,1);
            }

            setFavorite({
                items: favorite,
                loaded: true
            });
            save(favorite);
        }
    };

    const save = (items) => {
        VKBridge.send("VKWebAppStorageSet", {
            key: bridgeKey,
            value: items.join(",")
        });
    };

    useEffect(() => {
        VKBridge.send("VKWebAppStorageGet", {
            keys: [bridgeKey]
        })
            .then(({ keys }) => {
                let [items] = keys;

                items = items.value;

                if (mount) {
                    setFavorite({
                        loaded: true
                    });

                    if (items.length > 0) {
                        setFavorite({
                            items: items.split(","),
                            loaded: true
                        });
                    }
                }
            })
            .catch((error) => {
                if (mount) {
                    setFavorite({
                        loaded: true
                    });
                }

                console.log(error);
            });

        return () => setFavorite({
            mount: false
        });
    }, []);

    useEffect(() => {
        getState({
            add,
            items,
            edit,
            setFavorite
        });
    }, [items, edit]);

    return (
        <div style={!opened ? { display: "none" } : {}}>
            <Header mode="secondary"
                    aside={
                        (items.length > 0 || edit) && !disabled &&
                        (edit ?
                                <div style={{ display: "flex" }}>
                                    <Icon24Cancel onClick={() => setFavorite({ edit: false, items: old })}
                                                  style={{ marginRight: "5px" }}
                                    />
                                    <Icon24Done onClick={() => {
                                        setFavorite({ edit: false });
                                        save(items);
                                    }}
                                    />
                                </div>
                                :
                                <Icon24Write onClick={() => setFavorite({ edit: true, old: items})}/>
                        )
                    }
            >
                {
                    header
                }
            </Header>
            <HeightAnimation>
                {
                    (items.length || edit) ?
                        <List>
                            {
                                items.map((item, index) => (
                                    <Cell key={item + Math.random()}
                                          disabled={disabled}
                                          draggable={edit}
                                          removable={edit}
                                          onDragFinish={({from, to}) => {
                                              const favorite = [...items];

                                              favorite.splice(from, 1);
                                              favorite.splice(to, 0, items[from]);

                                              setFavorite({ items: favorite });
                                          }}
                                          onRemove={() => {
                                              setFavorite({ items: [...items.slice(0, index), ...items.slice(index + 1)] });
                                          }}
                                          onClick={() => {
                                              setFavorite({ open: false });
                                              onSelect(item);
                                          }}
                                    >
                                        { item }
                                    </Cell>
                                ))
                            }
                        </List>
                        :
                        loaded && <Error error={empty}/>
                }
            </HeightAnimation>
        </div>
    )
}