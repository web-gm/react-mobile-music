
import Home from '../components/Home';
import Mymusic from '../components/Mymusic';
import MusicAll from '../components/MusicAll';
import SingerList from '../components/singger/SingerList'
import SingerDetail from '../components/singger/SingerDetail'


let routes = [
    {
        path: "/home",
        component: Home,
        routes:[   /*嵌套路由*/
            {
                path: "/home/Mymusic",
                component: Mymusic,
                exact:true,
            },
            {
                path: "/home/all",
                exact:true,
                component: MusicAll
            },

        ]
    },
    {
        path:'/singerList',
        component:SingerList,
        exact:true,
        
    },
    {
        path:'/singerDetail/:id',
        component:SingerDetail,
        exact:true,
        
    }


];

export default routes;