import React from "react";
import { Cell, List } from "@vkontakte/vkui";

import { timeConvert } from "../../functions";

export function NameHistory({ user }) {
    return (
        <List>
            {
                user.list.map(({username, changed_at}, index) =>
                    <Cell key={index}
                          description={
                              changed_at ?
                                  timeConvert(changed_at)
                                  :
                                  user.createdAt ?
                                      user.createdAt
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
                    .reverse()
            }
        </List>
    );
}
