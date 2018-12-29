import React, { Component } from 'react';

import { Route, NavLink  } from "react-router-dom";
import { NavBar, Icon } from 'antd-mobile';
import '@/common/less/home.less'
import Player from '@/components/Player'
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentWillMount(){
    }
    render(){
        return(
            <div>
                 <NavBar
                    mode="dark"
                    icon={<Icon type="ellipsis" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" />,
                    ]}
                >
                    <NavLink  to="/home/Mymusic" activeStyle={{
                        fontWeight: "bold",
                    }}>我的</NavLink >
                    <NavLink  to="/home/all" activeStyle={{
                        fontWeight: "bold",
                    }}>音乐馆</NavLink >
                </NavBar>


                {
                    this.props.routes.map((route,key)=>{
                        return   <Route key={key} exact path={route.path} component={route.component} />
                    })
                }
                <Player/>
            </div>
        )
    }
}

export default Home