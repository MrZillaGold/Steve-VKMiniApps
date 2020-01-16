import React from 'react';
import {Group, Avatar, Cell, FixedLayout, Tappable} from "@vkontakte/vkui";
import VKConnect from "@vkontakte/vk-connect";

import Icon28EditOutline from '@vkontakte/icons/dist/28/edit_outline';
import Icon24UserAdded from '@vkontakte/icons/dist/24/user_added';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Icon28UserAddOutline from '@vkontakte/icons/dist/28/user_add_outline';
import Icon24Done from '@vkontakte/icons/dist/24/done';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import "./chat.scss";
import Spinner from "../components/spinner";

class Accounts extends React.Component {

    state = {
        accounts: [],
        selectedAccount: null,
        socket: null,
        loading: true
    };

    async componentDidMount() {
        const accountsStorage = sessionStorage.getItem('chatAccounts') || 0;
        const selectedAccount = sessionStorage.getItem('chatSelectedAccount') || 0;
        if (accountsStorage.length > 1) {
            await this.setState({accounts: JSON.parse(accountsStorage)});
        }
        if (selectedAccount.length > 1) {
            await this.setState({selectedAccount: JSON.parse(selectedAccount)});
        }
        await VKConnect.sendPromise("VKWebAppStorageGet", {keys: ["steveChatAccountsList", "steveChatSelectedAccount"]})
            .then(res => {
                if (res.keys[0].value.length > 1) {
                    this.setState({accounts: JSON.parse(res.keys[0].value)});
                    sessionStorage.setItem('chatAccounts', res.keys[0].value);
                }
                if (res.keys[1].value.length > 1) {
                    this.setState({selectedAccount: JSON.parse(res.keys[1].value)});
                    sessionStorage.setItem('chatSelectedAccount', res.keys[1].value);
                }
            });
        await this.setState({loading: false})
    }

    selectAccount(account) {
        this.setState({selectedAccount: account});
        sessionStorage.setItem('chatSelectedAccount', JSON.stringify(account));
        VKConnect.send("VKWebAppStorageSet", {key: "steveChatSelectedAccount", value: JSON.stringify(account)});
    }

    saveAccountsEdits() {
        sessionStorage.setItem('chatAccounts', JSON.stringify(this.state.accounts));
        VKConnect.send("VKWebAppStorageSet", {key: "steveChatAccountsList", value: JSON.stringify(this.state.accounts)});
        if (this.state.accounts.length === 1) {
            this.selectAccount(this.state.accounts[0])
        }
    }

    addAccount = (data) => {
        const accountslist = [...this.state.accounts];
        accountslist.unshift(data);
        sessionStorage.setItem('chatAccounts', JSON.stringify(accountslist));
        this.selectAccount(data);
        this.setState({accounts: accountslist});
        VKConnect.send("VKWebAppStorageSet", {key: "steveChatAccountsList", value: JSON.stringify(accountslist)});
    };


    render() {
        const {loading, accounts, selectedAccount, editList, accountsBackup, selectedAccountBackup} = this.state;
        const {navigator, socket, visible} = this.props;
        const {addAccount} = this;

        return (
            !loading && visible ?
                <div>
                    <Group style={{marginBottom: "70px"}}>
                        {
                            accounts.length > 0 ?
                                accounts.map((account, index) => (
                                    editList ?
                                        <Cell key={Math.random()} draggable
                                              removable
                                              onDragFinish={({from, to}) => {
                                                  const accountsList = [...this.state.accounts];
                                                  accountsList.splice(from, 1);
                                                  accountsList.splice(to, 0, this.state.accounts[from]);
                                                  this.setState({accounts: accountsList});
                                              }}
                                              before={<Avatar style={{imageRendering: "pixelated"}} type="image" size={64} src={`https://api.ashcon.app/mojang/v2/avatar/${account.type === "license" ? account.session.selectedProfile.name : "steve"}/64`}/>}
                                              onRemove={() => {
                                                  this.setState({accounts: [...accounts.slice(0, index), ...accounts.slice(index + 1)]});
                                                  if (JSON.stringify(account) === JSON.stringify(selectedAccount)) {
                                                      this.selectAccount("");
                                                  }
                                              }}
                                              description={account.type === "license" ? "Лицензионный" : "Пиратский"}>
                                            {account.type === "license" ? account.session.selectedProfile.name : account.username}
                                        </Cell>
                                        :
                                        <Cell key={index}
                                              before={<Avatar type="image" size={64} src={`https://api.ashcon.app/mojang/v2/avatar/${account.type === "license" ? account.session.selectedProfile.name : "steve"}/64`}/>}
                                              size="m"
                                              description={account.type === "license" ? "Лицензионный" : "Пиратский"}
                                              asideContent={
                                                  JSON.stringify(account) === JSON.stringify(selectedAccount) ?
                                                      <div style={{display: "flex", opacity: ".6"}}>
                                                          <Icon24UserAdded style={{marginRight: "5px"}}/>
                                                          Активирован
                                                      </div>
                                                      :
                                                      <Tappable onClick={() => this.selectAccount(account)} style={{display: "flex"}}>
                                                          <Icon24User style={{marginRight: "5px"}}/>
                                                          Активировать
                                                      </Tappable>
                                              }>
                                            {account.type === "license" ? account.session.selectedProfile.name : account.username}
                                        </Cell>
                                ))
                                :
                                !editList &&
                                    <Cell multiline before={<Icon28UserAddOutline height={44} width={44}/>} size="m"
                                          description="Нажмите, чтобы добавить аккаунт."
                                          onClick={() => navigator.showModal("add-account", {addAccount, accounts: accounts, socket})}>
                                        Вы не добавили ни одного аккаунта!
                                    </Cell>
                        }
                    </Group>
                    <FixedLayout vertical="bottom" style={{display: "flex", direction: "rtl"}}>
                        {
                            editList ?
                                <div style={{display: "flex", marginBottom: "10px"}}>
                                    {
                                        accounts !== accountsBackup &&
                                            <div className="footer-icon">
                                                <Icon24Done className="footer-icon__icon" onClick={() => {
                                                    this.setState({editList: false});
                                                    this.saveAccountsEdits()
                                                }} height={35} width={35}/>
                                            </div>
                                    }
                                    <div className="footer-icon">
                                        <Icon24Cancel onClick={() => {this.setState({editList: false, accounts: accountsBackup}); this.selectAccount(selectedAccountBackup)}} className="footer-icon__icon" height={35} width={35}/>
                                    </div>
                                </div>
                                :
                                <div style={{display: "flex", marginBottom: "10px"}}>
                                    <div className="footer-icon">
                                        <Icon28UserAddOutline className="footer-icon__icon" onClick={() => accounts.length < 16 ? navigator.showModal("add-account", {addAccount, accounts: this.state.accounts, socket}) : this.props.error("Нельзя добавить больше 15 аккаунтов!")} height={35} width={35}/>
                                    </div>
                                    {
                                        this.state.accounts.length > 0 &&
                                            <div className="footer-icon">
                                                <Icon28EditOutline onClick={() => this.setState({editList: true, accountsBackup: accounts, selectedAccountBackup: selectedAccount})} className="footer-icon__icon" height={35} width={35}/>
                                            </div>
                                    }
                                </div>
                        }
                    </FixedLayout>
                </div>
                :
                <Spinner/>
        );
    }
}

export default Accounts;
