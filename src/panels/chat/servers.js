import React from 'react';
import VKBridge from "@vkontakte/vk-bridge";

import {Group, Avatar, Cell, FixedLayout, Tappable} from "@vkontakte/vkui";
import { Spinner } from "../components/components"

import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import "./chat.css";

class Servers extends React.Component {

    state = {
        servers: [],
        socket: null,
        loading: true
    };

    async componentDidMount() {
        const serversStorage = sessionStorage.getItem("chatServers") || 0;
        const selectedAccount = sessionStorage.getItem("chatSelectedAccount") || 0;

        if (serversStorage.length > 1) await this.setState({servers: JSON.parse(serversStorage)});

        if (selectedAccount.length > 1) await this.setState({selectedAccount: JSON.parse(selectedAccount)});

        if (!serversStorage || !selectedAccount) {
            await VKBridge.send("VKWebAppStorageGet", {
                keys: ["chatServersList", "chatSelectedAccount"]
            })
                .then(res => {
                    if (res.keys[0].value.length > 1) {
                        this.setState({servers: JSON.parse(res.keys[0].value)});
                        sessionStorage.setItem("chatServers", res.keys[0].value);
                    }

                    if (res.keys[1].value.length > 1) {
                        this.setState({selectedAccount: JSON.parse(res.keys[1].value)});
                        sessionStorage.setItem("chatSelectedAccount", res.keys[1].value);
                    }
                })
                .catch(() => this.setState({ selectedAccount: null, servers: []}));
        }
        await this.setState({loading: false});
    }

    saveServersEdits() {
        sessionStorage.setItem('chatServers', JSON.stringify(this.state.servers));
        VKBridge.send("VKWebAppStorageSet", {
            key: "chatServersList",
            value: JSON.stringify(this.state.servers)
        });
    }

    render() {
        const {navigator, connect, editTab, visible, socket} = this.props;
        const {servers, loading, selectedAccount, editList, error, serversBackup} = this.state;

        const defaultImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAhlQTFRFr6+vrq6usLCwsbGxs7OztbW1tLS0v7+/xMTEycnJzMzMvb2909PTu7u7ysrKyMjIw8PDubm5x8fHy8vLuLi4tra2t7e3ra2ti4uLjIyMkJCQpKSkz8/P0dHRxsbGm5ubdnZ2SEhISUlJTk5OqKio0tLSrKysVFRUOjo6NjY2Ozs7PT09bW1tp6enzs7OwcHBvLy8srKyNzc3PDw8NTU1YGBgmJiYurq6pqamTExMNDQ0QUFBS0tLaWlpq6urqampUlJSMjIyLy8vLi4uOTk5WVlZl5eXiIiIeHh4j4+PgICAdHR0ZmZmnZ2dc3NzPz8/ODg4YWFhY2NjT09PU1NTZ2dnhoaGiYmJR0dHeXl5wsLCb29vPj4+Q0NDTU1NUVFRVVVVW1tbXl5ed3d3bGxsUFBQg4ODoqKihISEX19fXV1dQEBAMDAwSkpKV1dXMTExQkJCWFhYRUVFn5+fvr6+wMDAVlZWLCwsmpqajY2NxcXFgYGBRkZGfn5+bm5uXFxcZWVle3t7k5OTqqqqa2trWlpakZGRkpKSf39/o6OjREREfX19paWlh4eHenp6oKCgdXV1nJyccHBwlZWVhYWFcnJygoKCYmJilpaWKysrZGRkcXFxaGhoMzMzLS0tKioqKSkpfHx8JycnKCgoJiYmJSUlampqHx8fIyMjJCQkHBwcISEhICAgIiIijo6Onp6eioqKmZmZlJSUPV4xVgAACcBJREFUeJy9Vo1309YVF5AECoMGSFJgLYkkhi2JNiAJgj4KlqVAIYBEZIKgkmySKqWRZSsa2G1QCGaFpKILDAIlpbKdr5VuQOn+wl2n6xkfK+zQnf2kI7/3fO/v3vveve89BHkNVrwGr9P/7/HGjP9DH37FwP9tDt7Yg5W/Ea8leJV3K1c1Nb+e4NefltVr3lr7WzxY9zvAb/Fg/TLBqjdG0/oNb7eufkOClo2rWzdtXt/W3vEywTtbtm77/au1N7z73jK2t3W8TNDZhWJ4145XETS/94efnw3rX/ZgZyJJkAS16/1XEXyw9q1Nrd27N7YBkD3PYwdK0wxL7t23csWeX0PT7t09y8r/iWA/x/MsQQqU+GGjixz4WWAFsuPAyn8ztLdB9B3tzS1Ne14kOJiS0nJaSSaZ3hUHDh3+aNeRnXv2rNp5tO9Y3/FnfGhpAiw3XyTYs+MElaZVUmOZk/0irouZUx8N7DgtKIxxBjm7ffPmjU3Py79EsHP/x7RosgRLW7bIZXUsd25w6BOFIBhneO0H7649u/EFgqbn8On5k5+NaC6fTuc1W/Qwh8MzmQLD54tFwh9dt6nt/ab25xRakJbncMrRDY2XeF5yPZvzdF20cR1XgDBdDD7uaO86t+uPv8g2t62/cPHsCwQlkbNMkld8gxNRiADXdSej43S5XGQLn7/zhaVSgwd7LlxsHXt789plvEDQm8MNQSV9zBMNFPPsDJ7gck4OTRbtwtb2SwmKVJKXujcsq27e8Pam7WNI8y9ogafphJ5J2TmRMwLDCMIgcGw7i2f0jCn1nhxvHg8UmtYur9s+tqa1++KFZSA97c8QHBxxbEfHOcwI0TAIwwDFOcfWcdxjEhNXKlsKpmKMXF2/+hkgY2PdFzb+i+RPX44msMbkoaKIoTYXgB82p4upbIbLjlwbPXZ90plaffE5IK1r1ox1t7Uv46u9JT2LohiKpVKendKxKAg8wzFEm+PE3sFS7+Bn1o3VZ7u7u8+ebXwbQDrXt7ZeaFrRArndMZkq4TkRRT0nk0gBcC8MPdsBh0LPS+VGM6PXnC+bto9t3z42Ntb6M5Dhr892r7z+56v7W9o6rmYTdm/KE/EUMGQymawDU+npjmiLtlfqPZeYyF3LTXeseRbI0Ok97Z1DfX3TW9uaL4sJT0zkEpkUxmUT2WxWz2Y5SAkDszNiYbSQKpR6c5mum23PAKkMTB64fquv79ZUx1+y2cGUKJYSGdswRAjBjkQRdQ0b5UQ7OzExmsslcplU7+2v2jYuow25sxWZOT9zc7rvxN0TZ+6NYKks7goYhBwaYjaVMhg2zyuRYYsOmvrmWiEBy1FKZc9dOX//wMaenp72oxiBHDszvHWqq+v23aEruJfFTJ5PWkbA4YZXSllkerZIBpERpbjCtxMjGVQQUMynLKz37vGe3btXXVZ4xLx2a2pq+saDu99xNueocT5PCBBzjsNyIhnL1SrvuliIR6NXJiY8tlol6OJsOdbFez3rVjrJuIiwmrH3zPjM0O2TouhRcbqcLmrAkMIN26zOztaqtTRroamg99TIoM7Xy7JUm63V/MRc2+oDTCwVETlNJBMP7o1f77IxlEhXy+myxBgOZBFq1Bqy1TIvRDree7IgmlJNrtfq8wsLVWbX18336biYR2SZSAYjw5Xrx1DM4OVyXS7nk0IGyzqhLS0szi/Uq3To4WKhQJfr9fn5xaWFpfn5pbLzSb8jV/NpZGG2KLHMZ38dxEVRt6NkuSrTAueknERgu/L8Un1W5kPRstBAAcvzC0vfP1xaml+aZ7I8Xaumy8isnJd4QtAzhazIcSFVrsVkhIu27aA2X5//oVaOTcMLIs5gFhYfPnz4/d++//tDINCCcr2mSDWkXivLcdKKIFlE1DC1cjVOGp6nizpqFReq6Xxe80PDwLAw8Hzr4SMrFKtLajZLVeuLS0v1OrJQyxdZITQaJWhEmiRXpSSUsW5wgarQCqUxpohDZnoB6oXRD48oyso/pHpzRH1xcX5pcR4hYhcyBU05WMYLKU1jqDCMosiyVIZkkr5gWT6XEgXXg9JWSZj/crn8iDcNvrz4w9L8Yh0xKZUyVVXP6DoaRK7r+gHoB2iSJMgko/q+RwmWILi4ZXlaMZ+P5cePH5XTDKMsPH6cpzTEdS3XB/4QL2VDC8xYsAEZzqhveK6FuULkua6phrDLR7gqmC7DEJI8m1YYVcvnFT9EVJOiTNKiKDSbEX2AKdi2yiVcwwGbFOWHFMNQhhrhpmcavh8IuE/KRZYnQZKUGQR2gkpl+tLx4cqNq9sqnYdn9lWePKn8+GnX6UOXbsx0ne470fX01t1bh89Utp2Zqkz3h6LxHRb0T+zqGj8x92DoLjIzPj09Xbn34/nK3OS2yvEGwbYjczc/rTzdP/nk0OHPDw8M3xmYm3ty9NLnM8NT4yfBhX4suvztg6F7tw7PHR5HpqfPVI78dOPq5I3pqR/vnb4D6pVDwzf23ZkaOGacm9s2UNl39PTAwJapycpWx+Vc1IeCTsx9S5mWClPuIhXAkc65yasNguGnhypHts3dv5XZteX0F/1+ae7+FzM3n/5j30+dVzsr97IqphqqhbpYfw4ILNUUBKRv6KP+vd/tHbz94Uj/qVP9505+UyqNlNDS3olSroTahdGslylc4wLUpmmFgNRK0gqpKJqm0TRN0BpiBLiH2mhgYyGHwmtA1tkopmMeBmeC0cg/2NvFEOMUBRIjmaQYymQoWBpSUxQliYiwZ4scFsBlAFTgUEGDADVQr9E1It+P4HSCWoQki3wImUpSkWFAcQRREPo+hBBZgupbvmkKJiVQjOqaZJIEIxSlCi5FQjqTMJIkSRI6JJkklMbcWZCcUWBZVgSZyJCqqpoMaKpqQ6uRWhQQqZDAauMv+JomZQoqDKtABa8CRpINQyTiW64KTMtVA15CMkdW5EdW4wcOeLhRkJCqEMpyhUVhZLmmCfag1KgGB6KQpklqNEFoJEnQZJJlaRpuijC/WlKhWTYmiMbNkSDYmAeTpCn4Akwh5UKJAW2IxDGraVK6KMW8RrA8vDRoxDHPsryUT+djAhrQpdl0ujEKayfBHsbGccMmQyIgTWhwCyPACbBL8zxcQuBt2IVduxjzBA2rRUBbIjQglWJJkoqynG9YJoqIxsfASrMEnYQ+CINFYFkeA32JhYGGEyxNwnbTiEbji3I+DyY1unEuxBK04zgPN8MiG+flqiynZbkYw8ZThrsdtGEgDfox2IRIYAHoRkigzoImj/BS4w7I0iCalorQTuclGZRBXKoCoFmFmPPV2XIV4gGbeRBtzIKchiMg/U9LN6oOnlYmjAAAAABJRU5ErkJggg==";

        const addServer = async (data) => {
            const serverslist = [...this.state.servers];

            serverslist.unshift(data);

            await this.setState({servers: serverslist});
            await this.saveServersEdits();
        };

        const editServer = async (data, index) => {
            const servers = this.state.servers;

            servers[index] = data;

            await this.setState({servers: servers});
            await this.saveServersEdits();
        };

        return (
            !loading && visible ?
                <div>
                    <Group style={{marginBottom: "70px"}}>
                        {
                            servers.length > 0 ?
                                servers.map((server, index) => (
                                    <Cell key={Math.random()}
                                          size={!editList && "l"}
                                          description={server.version}
                                          before={
                                              <Avatar onError={e => e.target.src = defaultImage}
                                                      style={{imageRendering: "pixelated"}}
                                                      mode="image"
                                                      size={64}
                                                      src={`https://eu.mc-api.net/v3/server/favicon/${server.ip}:${server.port}`}
                                              />
                                          }
                                          asideContent={
                                              !editList && (
                                                  <Tappable onClick={() => navigator.showModal("edit-server", {server: server, index: index, servers: servers, editServer})}>
                                                      <Icon28EditOutline height={24} width={24}/>
                                                  </Tappable>
                                              )
                                          }
                                          bottomContent={
                                              !editList && (
                                                  <Tappable onClick={() => selectedAccount ? connect(server, selectedAccount, navigator, socket) : editTab("accounts")}>
                                                      Зайти на сервер
                                                  </Tappable>
                                              )
                                          }
                                          draggable={editList}
                                          removable={editList}
                                          onRemove={() => {
                                              this.setState({servers: [...servers.slice(0, index), ...servers.slice(index + 1)]});
                                          }}
                                          onDragFinish={({from, to}) => {
                                              const serversList = [...servers];
                                              serversList.splice(from, 1);
                                              serversList.splice(to, 0, servers[from]);
                                              this.setState({servers: serversList});
                                          }}
                                    >
                                        {`${server.ip}${server.port === "25565" ? "" : `:${server.port}`}`}
                                    </Cell>
                                ))
                                :
                                !editList &&
                                <Cell multiline
                                      before={
                                          <Icon24Add height={44} width={44}/>
                                      }
                                      size="m"
                                      description="Нажмите, чтобы добавить сервер."
                                      onClick={() => navigator.showModal("add-server", {
                                          addServer, servers: servers
                                      })
                                      }
                                >
                                    Вы не добавили ни одного сервера!
                                </Cell>
                        }
                    </Group>
                    <FixedLayout vertical="bottom"
                                 style={{display: "flex", direction: "rtl"}}
                    >
                        {
                            editList ?
                                <div style={{display: "flex", marginBottom: "10px"}}>
                                    {
                                        servers !== serversBackup &&
                                        <div className="footer-icon">
                                            <Icon24Done className="footer-icon__icon"
                                                        onClick={() => {
                                                            this.setState({editList: false});
                                                            this.saveServersEdits()
                                                        }}
                                                        height={35}
                                                        width={35}
                                            />
                                        </div>
                                    }
                                    <div className="footer-icon">
                                        <Icon24Cancel onClick={() => this.setState({editList: false, servers: serversBackup})}
                                                      className="footer-icon__icon"
                                                      height={35}
                                                      width={35}
                                        />
                                    </div>
                                </div>
                                :
                                <div style={{display: "flex", marginBottom: "10px"}}>
                                    <div className="footer-icon">
                                        <Icon24Add className="footer-icon__icon"
                                                   onClick={() => servers.length < 21 ? navigator.showModal("add-server", {addServer, servers: servers }) : this.props.error("Нельзя добавить больше 20 серверов!")}
                                                   height={35}
                                                   width={35}
                                        />
                                    </div>
                                    {
                                        servers.length > 0 &&
                                        <div className="footer-icon">
                                            <Icon28EditOutline onClick={() => this.setState({editList: true, serversBackup: servers})}
                                                               className="footer-icon__icon"
                                                               height={35}
                                                               width={35}
                                            />
                                        </div>
                                    }
                                </div>
                        }
                    </FixedLayout>
                    {error}
                </div>
                :
                <Spinner/>
        );
    }
}

export default Servers;
