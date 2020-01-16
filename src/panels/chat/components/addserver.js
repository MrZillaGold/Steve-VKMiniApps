import React from 'react';
import {Online} from 'react-detect-offline';
import {Button, FormLayout, Input, ModalPage, Select} from "@vkontakte/vkui";
import {fixInput, ipRegExp1, ipRegExp2, ipRegExp3, ipRegExp4, serverData} from "../../../services/_functions";

const supportedVersions = ["1.8.8", "1.9", "1.9.2", "1.9.4", "1.10", "1.10.1", "1.10.2", "1.11", "1.11.2", "1.12", "1.12.1", "1.12.2"];

class AddServer extends React.Component {

    state = {
        ip: "",
        version: "1.12.2"
    };

    onChange(e) {
        fixInput();
        let {name, value} = e.currentTarget;
        if (name === "ip") {
            value = value.replace(/[^а-яА-ЯёЁa-zA-Z0-9.:-]/g, "").slice(0, 100);
        }
        if (name === "port") {
            value = value.replace(/[^0-9]/g, "").slice(0, 6);
        }
        this.setState({[name]: value, error: false});
    }

    getServerData() {
        const serverInfo = serverData(this.state.ip, this.state.version);
        if (JSON.stringify(this.props.navigator.params.servers).includes(JSON.stringify(serverInfo))) {
            this.setState({error: true})
        } else {
            this.props.navigator.params.addServer(serverInfo);
            return this.props.navigator.hideModal();
        }
    }


    render() {
        const {id, navigator, header, onClose} = this.props;
        const {version, ip, spinner, error} = this.state;

        return (
            <Online polling={{interval: 1000}} onChange={() => navigator.hideModal()}>
                <ModalPage id={id} header={header} onClose={onClose}>
                    <FormLayout>
                        <div className="FormLayout__row--s-default">
                            <div style={{display: "flex"}}>
                                <div style={{flexGrow: 1}}>
                                    <Input
                                        top="Данные сервера"
                                        name="ip"
                                        autoComplete="off"
                                        status={ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4) || ip === "" ? 'default' : 'error'}
                                        disabled={spinner}
                                        value={ip}
                                        placeholder="IP-Адрес"
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                                <div>
                                    <Select name="version" value={version} onChange={this.onChange.bind(this)}>
                                        {
                                            supportedVersions.map((version) =>
                                                <option key={version} value={version}>{version}</option>
                                            ).reverse()
                                        }
                                    </Select>
                                </div>
                            </div>
                            <div style={{color: "#e64646", height: "24px"}} className="FormLayout__row-bottom">
                                {!(ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4) || ip === "") && "Неверный IP-Адрес!"}
                                {error ? "Этот сервер уже добавлен!" : undefined}
                            </div>
                            <Button onClick={() => this.getServerData()} disabled={ip === "" || !(ip.match(ipRegExp1) || ip.match(ipRegExp2) || ip.match(ipRegExp3) || ip.match(ipRegExp4))} size='xl'>
                                <b>Добавить сервер</b>
                            </Button>
                        </div>
                    </FormLayout>
                </ModalPage>
            </Online>
        );
    }

}

export default AddServer;
