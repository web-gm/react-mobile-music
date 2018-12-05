import React, { Component } from 'react';
import { Grid } from 'antd-mobile';

const data = [{
    icon:'',
    text:'本地音乐'
},{
    icon:'',
    text:'下载音乐'
},
    {
        icon:'',
        text:'最近播放'
    }
    ,
    {
        icon:'',
        text:'我喜欢'
    }
    ,
    {
        icon:'',
        text:'已购音乐'
    }
    ,
    {
        icon:'',
        text:'跑步电台'
    }
    ]

class Mymusic extends Component{
    render(){
        return(
            <div>
                <Grid data={data} hasLine={false} columnNum={3}/>
            </div>
        )
    }
}
export default Mymusic