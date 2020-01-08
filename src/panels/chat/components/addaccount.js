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
        if (name === "email") {
            value = value.replace(/[^A-Za-z0-9@_\-.]/g, "").trim();
        }
        this.setState({[name]: value, error: false});
    }

    login = () => {
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
                    this.setState({password: "", error: "Неверный логин или пароль!", loading: false})
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
            if (JSON.stringify(this.props.navigator.params.accounts).includes(JSON.stringify(accountData))) {
                this.setState({error: "Аккаунт с таким никнеймом уже добавлен!"});
            } else {
                this.props.navigator.hideModal();
                return this.props.navigator.params.addAccount(accountData);
            }
        }
    };

    render() {
        const {id, header, onClose} = this.props;
        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const nicknameRegExp = /^[A-Za-z0-9_]/g;

        return (
            <ModalPage id={id} header={header} onClose={onClose}>
                <Online polling={{interval: 1000}} onChange={onClose}>
                    <Group title="Тип аккаунта">
                        <Tabs type="buttons">
                            <TabsItem
                                onClick={() => this.setState({type: 'license', error: false})}
                                selected={this.state.type === 'license'}
                            >
                                Лицензионный
                            </TabsItem>
                            <TabsItem
                                onClick={() => this.setState({type: 'pirate', error: false})}
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
                            this.state.type === "pirate" &&
                            <div className="FormLayout__row-bottom">При использовании данного типа аккаунта, вы не сможете подключаться к лицензионным серверам.</div>
                        }
                        {
                            this.state.error &&
                            <div style={{color: "#e64646", height: "24px"}} className="FormLayout__row-bottom">
                                {this.state.error}
                            </div>
                        }
                        <Button onClick={() => this.login()} disabled={this.state.type === "license" ? this.state.email === "" || !this.state.email.match(emailRegExp) || this.state.password === "" || this.state.loading : this.state.nickname === "" || !this.state.nickname.match(nicknameRegExp) || this.state.nickname.length < 3} style={{marginBottom: "80px"}} size='xl'>
                            <b>{this.state.loading ? "Авторизация...": "Добавить аккаунт"}</b>
                        </Button>
                    </FormLayout>
                </Online>
            </ModalPage>
        );
    }

}

export default AddAccount;