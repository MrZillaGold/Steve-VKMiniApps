import React from "react";
import { List } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import { Avatar, SimpleCell } from "@vkontakte/vkui";

import { Error } from "../../../../components";

import { ASHCON_ENDPOINT } from "../../../../utils";

const ROW_HEIGHT = 60;

export function Friends({ user, setNickname, getUser }) {

    const friendsCount = user.friends.length;

    return (
        friendsCount ?
            <AutoSizer disableHeight>
                {({ width }) => (
                    <List height={friendsCount <= 7 ? friendsCount * ROW_HEIGHT : 450}
                          rowCount={friendsCount}
                          rowHeight={ROW_HEIGHT}
                          rowRenderer={({ index, key, style }) => {
                              const { name, uuid } = user.friends[index];

                              return (
                                  <SimpleCell key={key}
                                              style={{ ...style, width: width - 30 }}
                                              before={
                                                  <Avatar src={`${ASHCON_ENDPOINT}/avatar/${uuid}`}
                                                          mode="image"
                                                  />
                                              }
                                              onClick={() => {
                                                  setNickname(name);
                                                  getUser(name);
                                              }}
                                  >
                                      { name }
                                  </SimpleCell>
                              );
                          }}
                          width={width}
                    />
                )}
            </AutoSizer>
            :
            <Error error="Список друзей пуст"/>
    );
}
