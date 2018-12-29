import {observable, action} from 'mobx'

class PlayerStore {
    @observable status = '1'
    @observable playList = []
    @observable currentTime = ''
    @observable index = 1
    @observable player = new window.Player({'target':'web'});
    @observable target = "web";


}
export default new PlayerStore()