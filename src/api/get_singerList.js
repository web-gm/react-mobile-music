import jsonp from '../common/js/jsonp'


export default function getSingerList(area,sex,genre,sin,cur_page) {
    var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
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
        jsonpCallback: 'callBack_singer',
        data: {"comm":{"ct":24,"cv":10000},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":area,"sex":sex,"genre":genre,"index":-100,"sin":sin,"cur_page":cur_page}}}
    }
    return jsonp(url, data, { name: 'callBack_singer' })
}