import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {timeConvert} from "../../services/_functions";

import { Offline, Online } from 'react-detect-offline';

import axios from "axios";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Spinner, Group, Cell, List, Gallery, Div, Button } from "@vkontakte/vkui";

class NewsGet extends React.Component {

    state = {
        spinner: true,
        error: null,
        news: null,
        image: null,
        time: null
    };

    newsGet() {
        axios.get(`https://vkfreeviews.000webhostapp.com`)
            .then(data => {
                this.setState({
                    news: data.data.text.replace(/\n/g, '<br />'),
                    time: timeConvert(data.data.date * 1000),
                    spinner: false
                });
            })
            .catch(err => {
            if (err) {
                this.setState({error: `Новости сейчас недоступны!`, spinner: false});
                return console.log(err);
            }
        });
    }

    render() {
        const {id, goBack} = this.props;
        return (
            <Panel id={id}>
                <PanelHeader left={<PanelHeaderBack onClick={() => goBack()}/>}>
                    <PanelHeaderContent status="Новости Minecraft">
                        Steve
                    </PanelHeaderContent>
                </PanelHeader>
                <Online>
                { this.state.spinner === false ?
                    ''
                    :
                    <Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {this.newsGet()}
                        <Spinner size='large' style={{ marginTop: 20 }} />
                    </Div>
                }
                {
                    this.state.time === null ?
                        ''
                        :
                        <Group title={`📅 ${this.state.time}`}>
                            <Div dangerouslySetInnerHTML={{__html: this.state.news}} />
                        </Group>
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
                </Online>
                <Offline>
                    <Div style={{ userSelect: 'none', marginTop: '56px' }}>
                        <Cell align='center'><b>Упс...</b></Cell>
                        <p style={{ whiteSpace: 'pre-wrap', color: '#909499', textAlign: 'center' }}>
                            Пропало подключение с сервером!<br /><br />Эта вкладка будет доступна как появится соединение.
                        </p>
                        <Button level='tertiary' stretched component='a' href='https://vk.com/stevebotmc'>Группа</Button>
                        <Gallery style={{ height: 200 }}>
                            <div style={{
                                backgroundImage: 'url(https://www.minecraft.net/content/dam/archive/0ef629a3446f9a977087c578189097dd-sticker_creeper.png)',
                                backgroundSize: 'contain',
                                backgroundPosition: '50%',
                                backgroundRepeat: 'no-repeat'}}
                            />
                        </Gallery>
                    </Div>
                </Offline>
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

export default connect(null, mapDispatchToProps)(NewsGet);
