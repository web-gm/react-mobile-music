import React, { Component } from 'react';
import '@/common/less/player.less'
import {Modal,List} from 'antd-mobile'
class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            result:[]
        };
    }
    componentWillMount(){


        var params = {};

        var no = 0;
        var that = this


        this.player = new window.Player(params);

        var target = "web";




    }
    playfunction=()=>{
        this.player.loop = false;
        this.player.play([
            106350845, // 免费歌曲
            106350846, // 免费歌曲
            106350847, // 免费歌曲
            106350848, // 免费歌曲
            106350849, // 免费歌曲
            106350850, // 免费歌曲
            204174153, // 已购买数字专辑
            204459077, // 未购买数字专辑
            58, // 下架歌曲
            4334444 // 版权原因下架歌曲
        ], {
            index: 2,
            target: 'web'
        });
    }

    render(){
        return(
            <div className='player'>
                <div className='p-img'></div>
                <div className='p-singer-name'></div>
                <div className='p-btn'>
                    <button className='playing'></button>
                </div>
                <div className='p-list'>
                    <button></button>
                </div>
                <Modal
                    popup
                    visible={this.state.modal2}
                    onClose={this.onClose('modal2')}
                    animationType="slide-up"
                    afterClose={() => { alert('afterClose'); }}
                >
                    <List renderHeader={() => <div>委托买入</div>} className="popup-list">
                        {['股票名称', '股票代码', '买入价格'].map((i, index) => (
                            <List.Item key={index}>{i}</List.Item>
                        ))}
                        <List.Item>
                            <Button type="primary" onClick={this.onClose('modal2')}>买入</Button>
                        </List.Item>
                    </List>
                </Modal>
                {/*<div className="action-list">*/}
                    {/*<button className="btn js_demo1">歌曲id</button>*/}
                    {/*<button className="btn js_demo2">歌曲mid</button>*/}
                    {/*<button className="btn js_demo3" onClick={()=>this.playfunction()}>列表</button>*/}
                    {/*<button className="btn js_demo4">无效id</button>*/}
                    {/*<button className="btn js_demo5">歌曲链接</button>*/}
                    {/*<button className="btn js_demo6">循环播放</button>*/}
                    {/*<button className="btn js_showdata">歌曲数据</button>*/}
                {/*</div>*/}

                {/*<div></div>*/}
            </div>
        )
    }
}

export default Home