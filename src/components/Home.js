import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            msg:'我是一个User组件'
        };
    }
    componentWillMount(){
    }
    render(){
        return(
            <div>


                {
                    this.props.routes.map((route,key)=>{
                        return   <Route key={key} exact path={route.path} component={route.component} />
                    })
                }

            </div>
        )
    }
}

export default Home