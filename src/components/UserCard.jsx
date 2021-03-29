import React from "react";
import { Cell, Avatar, Title } from "@vkontakte/vkui";

import { ASHCON_ENDPOINT } from "../utils";

export function UserCard({ user }) {

    return (
        <Cell before={
            <Avatar src={`${ASHCON_ENDPOINT}/avatar/${user.username}`}
                    size={64}
                    mode="image"
                    className="user-avatar"
            />
        }
              style={{ margin: "8px 0" }}
              description={
                  user.rank_formatted && user.rank_formatted !== "&7" ?
                      user.rank_formatted.replace(/&./g, "")
                      :
                      ""
              }
              disabled
        >
            <Title level="1"
                   weight="semibold"
            >
                {
                    user.username
                }
            </Title>
        </Cell>
    );
}
