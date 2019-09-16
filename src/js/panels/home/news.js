import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

import {timeConvert} from "../../services/_functions";

import { Offline, Online } from 'react-detect-offline';
import OfflineBlock from './offline';

import axios from "axios";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import { Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, Group, Cell, List, Gallery, Div } from "@vkontakte/vkui";

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
                    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                        {this.newsGet()}
                        <img src={require('./img/loading.svg')} alt="Загрузка..." style={{ marginTop: 50, height: '100px', width: '100px' }} />
                    </div>
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
                    <OfflineBlock />
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
