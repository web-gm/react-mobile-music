import React, { Component } from 'react';
import LazyLoad from "react-lazyload";

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
            <div>

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

export default ListView;