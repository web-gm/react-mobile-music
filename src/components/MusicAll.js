import React, { Component } from 'react';
import getHome from '@/api/home'
import getMv from '@/api/get_mv'

import img1 from'@/common/images/home/home_singer.png'
import img2 from'@/common/images/home/home_rank.png'
import img3 from'@/common/images/home/home_ablum.png'
import img4 from'@/common/images/home/home_radio.png'
import img5 from'@/common/images/home/home_vedio.png'
import numImg from'@/common/images/assortment_recent.png'


import { Carousel, Grid  } from 'antd-mobile';

class MusicAll extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            slider_data:[],
            playlist_data:[],
            ablum_data:[],
            song_data:[],
            mv_data:[]

         };
    }
    componentWillMount=()=>{
        var that = this;
        getHome().then(function(res,err){
            var playlist_data = res.playlist.data.v_playlist.length-6
            var num = parseInt(Math.random()*playlist_data)
            if(res){
                console.log(res);
                that.setState({
                    slider_data:res.focus.data.content,
                    playlist_data:(res.playlist.data.v_playlist.slice(num,num+6)),
                    song_data:(res.new_song.data.song_list.slice(0,6)),
                    ablum_data:(res.new_album.data.list.slice(0,6))
                })
            }
        });
        getMv().then(function(data,err){
            console.log(data);
            if(data){
                that.setState({
                    
                    mv_data:data.data.mvlist.slice(0,6)
                })
            }
        })
    };

    //图标跳转
    icon_link=(el,num)=>{
        switch (num) {
            case 0:
                this.props.history.push("/");
                break;
            case 1:
                this.props.history.push("/");
                break;
            case 2:
                this.props.history.push("/");
                break;
            case 3:
                this.props.history.push("/");
                break;
            case 4:
                this.props.history.push("/");
                break;
            default:
                break;
        }
    };
    playlist_link=(el,num)=>{
        console.log(el)
    }
    render(){
        const grid_data=[
            {
                icon:img1,
                text:'歌手'
            },
            {
                icon:img2,
                text:'排行'
            },
            {
                icon:img3,
                text:'分类歌单'
            },
            {
                icon:img4,
                text:'电台'
            },
            {
                icon:img5,
                text:'视频'
            },
        ];
        return(
            
            <div>
                <Carousel
                    autoplay={true}
                    infinite
                    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    // afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.slider_data.map(val => (
                        <a
                        key={val.id}
                        data-jump_id={val.jump_info.url}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={val.pic_info.url}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                    </Carousel>
                    <Grid data={grid_data} columnNum={5} onClick={(el,index)=>this.icon_link(el,index)}/>
                {/**/}
                <Grid data={this.state.playlist_data}
                      columnNum={3}
                      square={false}
                      hasLine={false}
                      onClick={(el,index)=>this.playlist_link(el,index)}
                      renderItem={dataItem => (
                          <div style={{ padding: '5px',position: 'realtive' ,fontSize: '12px' }} data-playlist-id={dataItem.tid}>
                              <div style={{ position: 'relative' }}>
                                  <img src={dataItem.cover_url_medium} style={{ width: '100%' }} alt="" />
                                  <div style={{ position: 'absolute',color:'#fff',bottom:'5px',left:'3px'}} className='listenNum'>
                                    <span>{parseInt(dataItem.access_num/10000)}万</span>
                                  </div>
                              </div>

                              <div style={{ color: '#000',  marginTop: '12px',textAlign:'left',lineHeight:'18px' }}>
                                  <span>{dataItem.title}</span>
                              </div>
                          </div>
                      )}
                />
            </div>
        )
    }
}

export default MusicAll