import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import VKConnect from "@vkontakte/vkui-connect-promise";

import {goBack, openPopout, closePopout, openModal} from "../../store/router/actions";

import Panel from "@vkontakte/vkui/dist/components/Panel/Panel";
import PanelHeader from "@vkontakte/vkui/dist/components/PanelHeader/PanelHeader";
import PanelHeaderBack from "@vkontakte/vkui/dist/components/PanelHeaderBack/PanelHeaderBack";
import Spinner from "@vkontakte/vkui/dist/components/Spinner/Spinner";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell";
import List from "@vkontakte/vkui/dist/components/List/List";
import Gallery from "@vkontakte/vkui/dist/components/Gallery/Gallery";
import PanelHeaderContent from "@vkontakte/vkui/dist/components//PanelHeaderContent/PanelHeaderContent";
import Div from "@vkontakte/vkui/dist/components/Div/Div";


class NewsGet extends React.Component {

    state = {
        spinner: true,
        error: null,
        news: null,
        image: null,
        time: null
    };

    newsGet() {
        VKConnect.send("VKWebAppCallAPIMethod", {"method": "wall.get", "params": { "owner_id": "-155462018", "count": "1", "extended": "1", "v": "5.60", "access_token": "9dcb2aba64305966548c91cea3a21fe1911d6b5f139ecdde5a0f5112a7b3c061832c91678dfdd97773ed1"}})
            .then(data => {
                let attachments = (data.data.response.items[0].attachments === undefined) ? 0 : data.data.response.items[0].attachments[0].type;

                let currentDate = new Date(data.data.response.items[0].date * 1000);

                let getDate = currentDate.getDate();
                let getMonth = currentDate.getMonth() + 1;
                let getYear = currentDate.getFullYear();

                let month = getMonth > 9 ? getMonth : `0` + getMonth;
                let date = getDate > 9 ? getDate : `0` + getDate;
                let newsTitle = date + '.' + month + '.' + getYear;

                if (attachments !== 'photo') {
                    this.setState({news: data.data.response.items[0].text, spinner: false});
                } else {
                    this.setState({
                        news: data.data.response.items[0].text.replace(/\n/g, '<br />'),
                        image: data.data.response.items[0].attachments[0].photo.photo_1280,
                        time: newsTitle,
                        spinner: false
                    });
                }
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
                                        style={{ userSelect: 'none' }}
                                        dangerouslySetInnerHTML={{__html: this.state.news}}>
                                    </p>
                                    <Group title=' '>
                                        <Gallery
                                            style={{ height: 150 }}
                                        >
                                            <div style={{
                                                backgroundImage: 'url(' + this.state.image + ')',
                                                backgroundSize: 'contain',
                                                backgroundPosition: '50%',
                                                backgroundRepeat: 'no-repeat'}}
                                            />
                                        </Gallery>
                                    </Group>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewsGet);
