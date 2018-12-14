import React, { Component } from 'react';
import {getSingerDetail,getSingerDetailMusic,getSingerDetailAlbum,getSingerDetailMv} from '@/api/get_singerDetail'
import { NavBar, Icon, Tabs } from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky';

import '@/common/less/singerDetail.less'
function renderTabBar(props) {
    return (<Sticky>
        {({ style,distanceFromTop}) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
    </Sticky>);
}
class SingerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            mid:'',
            name:'',
            imgUrl:'',
            text:'',
            song_list:[],
            song_total:0,
            album_list:[],
            album_total:0,
            mv_list:[],
            mv_total:0,
            fans:0

        };
    }
    componentWillMount=()=>{
        console.log(this.props.match.params)
        this.setState({
            mid:this.props.match.params['id'],
            imgUrl:`http://y.gtimg.cn/music/photo_new/T001R500x500M000${this.props.match.params['id']}.webp`
        })
        var that = this
        getSingerDetail(that.props.match.params['id']).then(function (res) {
            that.setState({
                id:res.data.singer_id,
                mid:res.data.singer_mid,
                name:res.data.singer_name,
                text:res.data.SingerDesc,
                song_total:res.data.total,
                album_total:res.data.albumTotal,
                mv_total:res.data.mvTotal,
                fans:res.data.fans
            })

        })
        getSingerDetailMv(that.props.match.params['id'],'0','listen').then(function (res) {
            console.log(res)
        })
    }
    render() {
        const tabs = [
            { title: `歌曲 ${this.state.song_total}` },
            { title: `专辑 ${this.state.album_total}`},
            { title: `MV ${this.state.mv_total}`},
            { title: '详情'}
        ];

        return (
            <div className='singer-detail'>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.goBack()}
                    rightContent={[
                        <Icon key='0' type="ellipsis" />,
                    ]}
                >{this.state.name}</NavBar>

                <header>
                    <img src={this.state.imgUrl} alt=""/>
                    <div className='info'>
                        <p className='name'>{this.state.name}</p>
                        <p className='font'>{parseFloat(this.state.fans/10000).toFixed(1)}万粉丝</p>
                    </div>
                </header>
                <StickyContainer>
                    <Tabs tabs={tabs}
                          initialPage={0}
                          onChange={(tab, index) => { console.log('onChange', index, tab); }}
                          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                          renderTabBar={renderTabBar}
                          tabBarActiveTextColor='#31c27c'
                    >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '1150px', backgroundColor: '#fff' }}>
                            Content of first tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            Content of second tab
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
                            Content of third tab
                        </div>
                    </Tabs>
                </StickyContainer>

            </div>
        );
    }
}

export default SingerDetail;