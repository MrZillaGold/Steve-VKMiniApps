import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";

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
        axios.get(`https://vkfreeviews.000webhostapp.com/`).then(data => {
                let currentDate = new Date(data.data.date * 1000);

                let getDate = currentDate.getDate();
                let getMonth = currentDate.getMonth() + 1;
                let getYear = currentDate.getFullYear();

                let month = getMonth > 9 ? getMonth : `0` + getMonth;
                let date = getDate > 9 ? getDate : `0` + getDate;
                let newsTitle = date + '.' + month + '.' + getYear;
                this.setState({
                    news: data.data.text.text.replace(/\n/g, '<br />'),
                    time: newsTitle,
                    spinner: false
                });
            }).catch(err => {
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
                            <Div>
                                <p  className='Container'
                                    dangerouslySetInnerHTML={{__html: this.state.news}}>
                                </p>
                            </Div>
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
                                style={{ height: 210 }}
                            >
                                <div style={{
                                    backgroundImage: 'url(https://3.downloader.disk.yandex.ru/preview/912e14888c438f33ed6269323ccdf2e064952ae55d4b89129f29e4d953ab66ac/inf/OcpZuHPnQP0-O7zZbr93r1ycYyrCD30m82IfiaGo7UIkuZhyU6fBrlZ47h5RKLS_kKIv-5Mt66badzRXBYpGwg%3D%3D?uid=377051847&filename=error.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=377051847&tknv=v2&size=1263x695)',
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
                        <Gallery style={{ height: 210 }}>
                            <div style={{
                                backgroundImage: 'url(https://3.downloader.disk.yandex.ru/preview/912e14888c438f33ed6269323ccdf2e064952ae55d4b89129f29e4d953ab66ac/inf/OcpZuHPnQP0-O7zZbr93r1ycYyrCD30m82IfiaGo7UIkuZhyU6fBrlZ47h5RKLS_kKIv-5Mt66badzRXBYpGwg%3D%3D?uid=377051847&filename=error.png&disposition=inline&hash=&limit=0&content_type=image%2Fpng&owner_uid=377051847&tknv=v2&size=1263x695)',
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
