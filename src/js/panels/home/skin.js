import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import axios from 'axios';

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Input from "@vkontakte/vkui/dist/components/Input/Input";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import Button from "@vkontakte/vkui/dist/components/Button/Button";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import List from "@vkontakte/vkui/dist/components/List/List";
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import PanelHeaderContent from "@vkontakte/vkui/dist/components//PanelHeaderContent/PanelHeaderContent";


class SkinGet extends React.Component {

    state = {
        nickname: '',
        username: null,
        spinner: null,
        error: null,
        skin: null,
        value: null
    };

    onChange(e) {
        const {name, value} = e.currentTarget;
        this.setState({[name]: value});
    }

    onClick () {
        if (this.state.nickname.length === 0){
            return this.setState({ value: 'error' });
        }
        this.setState({spinner: true, skin: null, username: null, error: null, value: null});
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.ashcon.app/mojang/v2/user/${this.state.nickname}`).then(res => {
            return res.data;
        }).then(data => {
            this.setState({skin: data.textures.skin.url, username: data.username, spinner: null});
        }).catch(err => {
            this.setState({spinner: null});
            if (err.response.status === 404) {
                this.setState({error: `Игрок с никнеймом ${this.state.nickname} не существует!`});
                return console.log(`Игрок с никнеймом ${this.state.nickname} не существует!`);
            }
            if (err.response.status === 400) {
                this.setState({error: `Никнейм может состоять только из английских букв, цифр и символа '_'`});
                return console.log(`Произошла ошибка 400 (Bad Request!), проверьте вводимые данные!`);
            }
            if (err.response.status > 0 && err.response.status !== 200) {
                this.setState({error: `Произошла ошибка: ${err.response.status}, может об этом нужно куда-то сообщить?`});
                return console.log(`Произошла ошибка: ${err.response.status}, может об этом нужно куда-то сообщить?`);
            }
        });
    }

    render() {
        const {nickname, id, goBack} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Просмотр скина">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <FormLayout>
                    <Input
                        top='Никнейм'
                        name='nickname'
                        value={nickname}
                        onChange={this.onChange.bind(this)}
                        status={this.state.value === 'error' ? 'error' : 'default'}
                        bottom={this.state.value === 'error' ? 'Пожалуйста, введите никнейм игрока' : 'Никнейм может содержать только латинские буквы, цифры и символ "_".'}
                        placeholder="Введите никнейм"
                        maxLength='16'
                        pattern='^[A-Za-z0-9_]+$'
                    />

                    {
                        this.state.nickname.length > 2 && this.state.nickname.match('^[A-Za-z0-9_]+$') ?
                            <Button onClick={this.onClick.bind(this)} size='xl'>Посмотреть скин</Button>
                            :
                            <Button disabled onClick={this.onClick.bind(this)} size='xl'>Посмотреть скин</Button>
                    }
                    { this.state.spinner === null ?
                        '' :
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <Spinner size='large' style={{ marginTop: 20 }} />
                        </div>
                    }
                    {
                        this.state.error === null ?
                            '' :
                            <Group>
                                <List>
                                    <Cell align='center'><b>Упс...</b></Cell>
                                </List>
                                <p style={{ color: '#909499', textAlign: 'center' }}>{this.state.error}</p>
                                <Gallery
                                    style={{ height: 200 }}
                                >
                                    <div style={{
                                        backgroundImage: 'url(https://www.minecraft.net/content/dam/archive/0ef629a3446f9a977087c578189097dd-sticker_creeper.png)',
                                        backgroundSize: 'contain',
                                        backgroundPosition: '50%',
                                        height: '200px',
                                        width: '100%',
                                        backgroundRepeat: 'no-repeat'}}
                                    />
                                </Gallery>
                            </Group>
                    }
                    {
                        this.state.username === null ?
                            ''
                            :
                            <Group top={`Скин игрока ${this.state.username}`}>
                                <Gallery
                                    bullets="dark"
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                        height: '200px',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    <div style={{
                                        backgroundImage: 'url(https://mc-heads.net/body/' + this.state.username + '/200)',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        height: '200px',
                                        width: 'auto',
                                        display: 'block',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    />
                                    <div style={{
                                        backgroundImage: 'url(https://mc-heads.net/player/' + this.state.username + '/200)',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        height: '200px',
                                        width: 'auto',
                                        display: 'block',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    />
                                    <div style={{
                                        backgroundImage: 'url(https://mc-heads.net/head/' + this.state.username + '/300)',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        height: '200px',
                                        width: 'auto',
                                        display: 'block',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    />
                                    <div style={{
                                        backgroundImage: 'url(https://mc-heads.net/avatar/' + this.state.username + '/200)',
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        height: '200px',
                                        width: 'auto',
                                        display: 'block',
                                        backgroundRepeat: 'no-repeat'
                                    }}
                                    />
                                </Gallery>
                                <Group>
                                    <Cell
                                        multiline
                                        before={<Avatar type='app' size={64} src={`https://mc-heads.net/head/${this.state.username}/150`} style={{backgroundColor: 'transparent'}}/>}
                                        size="l"
                                        description="Вы можете скачать этот скин в диалоге с ботом!"
                                        bottomContent={
                                            <div style={{ display: 'flex' }}>
                                                <Button component="a" target="_blank" href="https://vk.com/im?sel=-175914098" stretched>Перейти в диалог</Button>
                                            </div>
                                        }
                                    >
                                        Скачать скин
                                    </Cell>
                                </Group>
                            </Group>

                    }
                </FormLayout>
            </Panel>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({goBack, openPopout, closePopout, openModal}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        accessToken: state.vkui.accessToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkinGet);