import jsonp from '../common/js/jsonp'


export default function getMv() {
    var url = 'https://c.y.qq.com/mv/fcgi-bin/getmv_by_tag'
    var data = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        jsonpCallback: 'callBack_mv',
        cmd: 'shoubo',
        lan: 'all'
    }
    return jsonp(url, data, { name: 'callBack_mv' })
}