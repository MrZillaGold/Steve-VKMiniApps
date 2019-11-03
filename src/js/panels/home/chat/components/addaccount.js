import React from 'react';
import {Online} from 'react-detect-offline';
import {Button, FormLayout, Group, Input, ModalPage, Tabs, TabsItem} from "@vkontakte/vkui";

class AddAccount extends React.Component {

    state = {
        nickname: "",
        email: "",
        password: "",
        type: "license"
    };

    onChange(e) {
        let {name, value} = e.currentTarget;
        if (name === "nickname") {
            value = value.replace(/[^A-Za-z0-9_]/g, "").slice(0, 16);
        }
        this.setState({[name]: value, error: false});
    }

    login() {
        if (this.state.type === "license") {
            this.setState({loading: true});
            this.props.navigator.params.socket.emit('server:connect', {
                method: 'password',
                username: this.state.email,
                password: this.state.password,
                host: "steve.mrzillagold.me",
                port: "25565",
                version: "1.12"
            });
            this.props.navigator.params.socket.once('bot:data', (data) => {
                this.props.navigator.params.socket.emit('server:disconnect');
                if (data === "Неверный логин или пароль от аккаунта.") {
                    this.setState({password: "", error: true, loading: false})
                } else {
                    const accountData = {
                        type: this.state.type,
                        session: data
                    };
                    this.props.navigator.params.addAccount(accountData);
                    this.setState({loading: false});
                    this.props.navigator.hideModal();
                }
            });
        } else {
            const accountData = {
                type: this.state.type,
                username: this.state.nickname
            };
            this.props.navigator.hideModal();
            return this.props.navigator.params.addAccount(accountData);
        }
    }

    render() {
        const {id, header, onClose, navigator} = this.props;
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const nicknameRegExp = /^[A-Za-z0-9_]/g;

        return (
            <Online polling={{interval: 1000}} onChange={() => navigator.hideModal()}>
                <ModalPage id={id} header={header} onClose={onClose}>
                    <Group title="Тип аккаунта">
                        <Tabs type="buttons">
                            <TabsItem
                                onClick={() => this.setState({type: 'license'})}
                                selected={this.state.type === 'license'}
                            >
                                Лицензионный
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.setState({type: 'pirate'})}
                                selected={this.state.type === 'pirate'}
                            >
                                Пиратский
                            </TabsItem>
                        </Tabs>
                    </Group>
                    <FormLayout>
                        {
                            this.state.type === "license" ?
                                <Input
                                    top="Электронная почта"
                                    autoComplete="off"
                                    name="email"
                                    disabled={this.state.spinner}
                                    value={this.state.email}
                                    onChange={this.onChange.bind(this)}
                                    status={this.state.email.match(emailRegExp) || this.state.email === "" ? 'default' : 'error'}
                                    bottom={this.state.email.match(emailRegExp) || this.state.email === "" ? '' : 'Неверный адрес электронной почты!'}
                                />
                                :
                                <Input
                                    top = "Никнейм"
                                    autoComplete="off"
                                    name="nickname"
                                    disabled={this.state.spinner}
                                    value={this.state.nickname}
                                    status={this.state.nickname === "" || this.state.nickname.length > 2 ? 'default' : 'error'}
                                    bottom={`Может содержать только латинские буквы, цифры и символ "_". (От 3 до 16 символов)`}
                                    onChange={this.onChange.bind(this)}
                                />
                        }
                        {
                            this.state.type === "license" ?
                                <Input
                                    top="Пароль"
                                    autoComplete="off"
                                    name="password"
                                    type="password"
                                    disabled={this.state.spinner}
                                    value={this.state.password}
                                    onChange={this.onChange.bind(this)}
                                />
                                :
                                undefined
                        }
                        {
                            this.state.type === "pirate" ?
                                <div className="FormLayout__row-bottom">При использовании данного типа аккаунта, вы не сможете подключаться к лицензионным серверам.</div>
                                :
                                undefined
                        }
                        {
                            this.state.error && this.state.type === "license" ?
                                <div style={{color: "#e64646", height: "24px"}} className="FormLayout__row-bottom">
                                    Неверный логин или пароль!
                                </div>
                                :
                                undefined
                        }
                        <Button onClick={() => this.login.bind(this)} disabled={this.state.type === "license" ? this.state.email === "" || !this.state.email.match(emailRegExp) || this.state.password === "" || this.state.loading : this.state.nickname === "" || !this.state.nickname.match(nicknameRegExp) || this.state.nickname.length < 3} style={{marginBottom: "80px"}} size='xl'>
                            <b>{this.state.loading ? "Авторизация...": "Добавить аккаунт"}</b>
                        </Button>
                    </FormLayout>
                </ModalPage>
            </Online>
        );
    }

}

export default AddAccount;
