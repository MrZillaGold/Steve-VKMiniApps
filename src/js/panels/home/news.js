import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import VKConnect from "@vkontakte/vkui-connect-promise";
const VK = window.VK;

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
        time: null
    };

    newsGet() {
        let script = document.createElement('script');
        script.src = "https://vk.com/js/api/openapi.js?136";
        document.body.appendChild(script);

        script.onload = function() {
            VK.init({
                apiId: 7078246
            });
            VK.Api.call('wall.get', {owner_id: -155462018, count: 1, extended: 1, v: "5.60"}, function(data) {
                if (data.response) {

                    let currentDate = new Date(data.response.items[0].date * 1000);

                    let getDate = currentDate.getDate();
                    let getMonth = currentDate.getMonth() + 1;
                    let getYear = currentDate.getFullYear();

                    let month = getMonth > 9 ? getMonth : `0` + getMonth;
                    let date = getDate > 9 ? getDate : `0` + getDate;
                    let newsTitle = date + '.' + month + '.' + getYear;

                    this.setState({
                        news: data.response.items[0].text.replace(/\n/g, '<br />'),
                        time: newsTitle,
                        spinner: false
                    });
                }
            });
        }
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
