import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Cell, Div, Group, Header, List } from "@vkontakte/vkui";
import { Icon16Done, Icon24Copy } from "@vkontakte/icons";

import "./Result.css";

export default function Result({ x, y, z, dimension, copied, setCoordinates }) {

    const X = x === "" || isNaN(x) ? 0 : x;
    const Y = y === "" || isNaN(y) ? 0 : y;
    const Z = z === "" || isNaN(z) ? 0 : z;

    const dimensionX = Math.floor(dimension === "nether" ? X / 8 : X * 8);
    const dimensionZ = Math.floor(dimension === "nether" ? Z / 8 : Z * 8);

    return (
        <Group header={
            <Header mode="secondary">
                Координаты {dimension === "nether" ? "в аду" : "в обычном мире"}
            </Header>
        }>
            <Div>
                <List className="Result-List">
                    <Cell description="Координата X"
                          multiline
                          disabled
                    >
                        {dimensionX}
                    </Cell>
                    <Cell description="Координата Y"
                          multiline
                          disabled
                    >
                        {Y}
                    </Cell>
                    <Cell description="Координата Z"
                          multiline
                          disabled
                    >
                        {dimensionZ}
                    </Cell>
                </List>
                <List className="Result-List">
                    <Cell description="Номер чанка"
                          disabled
                    >
                        {Math.floor(X / 16)}, {Math.floor(Y / 16)}, {Math.floor(Z / 16)}
                    </Cell>
                    <Cell description="Файл чанка"
                          disabled
                    >
                        r.{Math.floor(X / 512)}.{Math.floor(Z / 512)}.mca
                    </Cell>
                </List>
                <CopyToClipboard text={`${dimensionX} ${Y} ${dimensionZ}`}>
                    <Button onClick={() => setCoordinates({ copied: true })}
                            stretched
                            before={
                                copied ? <Icon16Done/> : <Icon24Copy width={16} height={16}/>
                            }
                            disabled={
                                copied || !(x !== "-" && z !== "-" && (x !== "" || y !== "" || z !== ""))
                            }
                    >
                        {
                            copied ?
                                "Координаты скопированы!"
                                :
                                "Скопировать координаты"
                        }
                    </Button>
                </CopyToClipboard>
            </Div>
        </Group>
    )
}
