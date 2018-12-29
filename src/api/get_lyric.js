import jsonp from '../common/js/jsonp'

export default function getLyric(musicid) {
    var iframe = document.getElementById('qqIframe')
    iframe.contentWindow.$.ajax({
        url:'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
        data:{
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'yqq',
            needNewCode: 0,
            jsonpCallback: 'MusicJsonCallback_lrc',
            nobase64: 1,
            musicid: musicid,
            songtype: 0,
        },
        success:function (data) {
            console.log(data)

        }
    })

}