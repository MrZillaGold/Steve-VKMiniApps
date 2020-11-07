import React from "react";
import { Cell, Avatar, Title } from "@vkontakte/vkui";

export function UserCard({ user }) {
    return (
        <Cell before={
            <Avatar src={`https://api.ashcon.app/mojang/v2/avatar/${user.username}`}
                    size={64}
                    mode="image"
                    className="user-avatar"
            />
        }
              style={{ marginTop: "8px" }}
              description={
                  user.rank_formatted !== "&7" ?
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
    )
}
