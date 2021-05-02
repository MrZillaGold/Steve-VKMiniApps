import React from "react";
import { List } from "react-virtualized";
import AutoSizer from "react-virtualized-auto-sizer";
import { useRouter } from "@unexp/router";
import { Avatar, SimpleCell } from "@vkontakte/vkui";

import { Error } from "../../../../components";

const ROW_HEIGHT = 60;

export function Servers({ user }) {

    const { push } = useRouter();

    const serversCount = user.servers.length;

    return (
        serversCount ?
            <AutoSizer disableHeight>
                {({ width }) => (
                    <List height={serversCount <= 7 ? serversCount * ROW_HEIGHT : 450}
                          rowCount={serversCount}
                          rowHeight={ROW_HEIGHT}
                          rowRenderer={({ index, key, style }) => {
                              const server = user.servers[index].toJSON();
                              const { title, ip, icon } = server;

                              return (
                                  <SimpleCell key={key}
                                              style={{ ...style, width: width - 30 }}
                                              before={
                                                  <Avatar src={icon}
                                                          mode="image"
                                                  />
                                              }
                                              onClick={() => push({ modal: "server-preview" }, server)}
                                  >
                                      { title || ip }
                                  </SimpleCell>
                              );
                          }}
                          width={width}
                    />
                )}
            </AutoSizer>
            :
            <Error error="Список любимых серверов пуст"/>
    );
}

