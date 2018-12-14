import jsonp from '../common/js/jsonp'


export function getSingerDetail(singermid) {
    var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    var data = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5page',
        order: 'listen',
        from: 'h5',
        num: 15,
        begin: 0,
        jsonpCallback: 'callBack_singerD',
        singermid: singermid
    }
    return jsonp(url, data, {name: 'callBack_singerD'})
}

export function getSingerDetailMusic(singermid, begin, order) {
    var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    var data = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        order: order,
        num: 30,
        begin: begin,
        jsonpCallback: 'callBack_singerM',
        singermid: singermid
    }
    return jsonp(url, data, {name: 'callBack_singerM'})
}

export function getSingerDetailAlbum(singermid, begin, order) {
    var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    var data = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        needNewCode: 0,
        platform: 'yqq',
        jsonpCallback: 'callBack_singerA',
        data: {
            "singerAlbum": {
                "method": "get_singer_album",
                "param": {"singermid": singermid, "order": order, "begin": begin, "num": 30, "exstatus": 1},
                "module": "music.web_singer_info_svr"
            }
        }
    }
    return jsonp(url, data, {name: 'callBack_singerA'})
}

export function getSingerDetailMv(singermid, begin, order) {
    var url = 'https://c.y.qq.com/mv/fcgi-bin/fcg_singer_mv.fcg'
    var data = {
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        jsonpCallback: 'callBack_singerMV',
        order: order,
        num: 30,
        begin: begin,
        singermid: singermid,
        cid: 205360581
    }
    return jsonp(url, data, {name: 'callBack_singerMV'})
}