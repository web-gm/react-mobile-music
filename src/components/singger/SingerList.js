import React, { Component } from 'react';

import get_singerList from '@/api/get_singerList.js'
import LazyLoad from 'react-lazyload';
import '@/common/less/singerlist.less'

class SingerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singer_data:[],
            tag_area_data:[],
            tag_genre_data:[],
            tag_sex_data:[],
            area:-100,
            sex:-100,
            genre:-100,
            cur_page:1,
            sin:0

        };
    }
    get_singerList=(area,sex,genre,sin,cur_page)=>{
        var that = this
        get_singerList(area,sex,genre,sin,cur_page).then(function(res){
            var data = res.singerList.data
            that.setState({
                singer_data:data.singerlist,
                tag_area_data:data.tags.area,
                tag_genre_data:data.tags.genre,
                tag_sex_data:data.tags.sex,
            })
        })
    };
    area_change=(area)=>{
        var that = this
        that.setState({
            area:area
        },()=>{
            that.get_singerList(that.state.area,that.state.sex,that.state.genre,that.state.sin,that.state.cur_page)
        })
    }
    sex_change=(sex)=>{
        var that = this
        that.setState({
            sex:sex
        },()=>{
            that.get_singerList(that.state.area,that.state.sex,that.state.genre,that.state.sin,that.state.cur_page)
        })
    }
    genre_change=(genre)=>{
        var that = this
        that.setState({
            genre:genre
        },()=>{
            that.get_singerList(that.state.area,that.state.sex,that.state.genre,that.state.sin,that.state.cur_page)
        })
    }
    link_change=(id,img)=>{
        console.log(id,img)
        this.props.history.push({ pathname : `/singerDetail/${id}`})
    }
    componentWillMount=()=>{
        var that = this
        window.addEventListener('scroll',function(e){
            if(document.documentElement.scrollTop+window.screen.availHeight >=document.body.scrollHeight-1000){
                get_singerList(that.state.area,that.state.sex,that.state.genre,that.state.sin+80,that.state.cur_page+1).then(function(res){
                    console.log(res)
                    var data = res.singerList.data
                    var newSinger = that.state.singer_data.concat(data.singerlist)
                    that.setState({
                        singer_data:newSinger,
                        tag_area_data:data.tags.area,
                        tag_genre_data:data.tags.genre,
                        tag_sex_data:data.tags.sex,
                        cur_page:that.state.cur_page+1,
                        sin:that.state.sin+80
                    })
                })
            }
        })
        this.get_singerList(that.state.area,that.state.sex,that.state.genre,that.state.sin,that.state.cur_page)
    }
    render() {
        let self = this
        return (
            <div className='singer-list'>
                <header>
                   <div className='tag-parent'>
                       <ul className='tag-wrap' style={{width:22*this.state.tag_area_data.length+'vw'}}>

                           {
                               this.state.tag_area_data.map((item)=>{
                                   return (
                                       <li key={item.id} data-id={item.id} className={item.id===this.state.area?'active':''} onClick={()=>this.area_change(item.id)}>{item.name}</li>
                                   )
                               })
                           }
                       </ul>
                   </div>

                   <div className='tag-parent'>
                       <ul className='tag-wrap' style={{width:22*this.state.tag_sex_data.length+'vw'}}>
                           {
                               this.state.tag_sex_data.map((item)=>{
                                   return (
                                       <li key={item.id} data-id={item.id} className={item.id===this.state.sex?'active':''}  onClick={()=>this.sex_change(item.id)}>{item.name}</li>
                                   )
                               })
                           }
                       </ul>
                   </div>
                   <div className='tag-parent'>
                       <ul className='tag-wrap' style={{width:22*this.state.tag_genre_data.length+'vw'}}>
                           {
                               this.state.tag_genre_data.map((item)=>{
                                   return (
                                       <li key={item.id} data-id={item.id} className={item.id===this.state.genre?'active':''}  onClick={()=>this.genre_change(item.id)}>{item.name}</li>
                                   )
                               })
                           }
                       </ul>
                   </div>
               </header>
                <div>
                    <ul className='singerList'>
                        {
                            this.state.singer_data.map(function (item) {
                                return(
                                        <li key={item.singer_id}
                                            style={{height:15+'vw',padding:2+'vw',lineHeight:15+'vw'}}
                                            onClick={()=>self.link_change(item.singer_mid,item.singer_pic)}
                                        >
                                            <LazyLoad height={200} once >

                                                <div>
                                                    <img src={item.singer_pic}
                                                         alt=""
                                                         style={{width:15+'vw',borderRadius:50+'%'}} />
                                                    <span>{item.singer_name}</span>
                                                </div>
                                            </LazyLoad>

                                        </li>

                                )
                            })
                        }
                    </ul>
                </div>

                
            </div>
        );
    }
}

export default SingerList;