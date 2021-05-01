import React from "react";
import { Cell, List } from "@vkontakte/vkui";

import { timeConvert } from "../../utils";

export function NameHistory({ user }) {

    return (
        <List>
            {
                user.username_history.map(({username, changed_at}, index) => (
                        <Cell key={index}
                              description={
                                  changed_at ?
                                      timeConvert(changed_at)
                                      :
                                      user.createdAt ?
                                          timeConvert(user.createdAt)
                                          :
                                          "Первый"
                              }
                              disabled
                        >
                            {
                                username
                            }
                        </Cell>
                    )
                )
                    .reverse()
            }
        </List>
    );
}
