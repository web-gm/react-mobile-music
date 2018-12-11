import React, { Component } from 'react';

import get_singerList from '@/api/get_singerList.js'
import { SegmentedControl } from 'antd-mobile';

class SingerList extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    
    render() {
        return (
            <div>
                歌手列表
                <ul>
                    <li></li>
                </ul>
                <ul>

                </ul>
                <ul>

                </ul>
                
            </div>
        );
    }
}

export default SingerList;