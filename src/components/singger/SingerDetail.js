import React, { Component } from 'react';
class SingerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    componentWillMount=()=>{
        console.log(this.props.match.params)
    }
    render() {
        return (
            <div>
                歌手详情
            </div>
        );
    }
}

export default SingerDetail;