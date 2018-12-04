
import Home from '../components/Home';
import Mymusic from '../components/Mymusic';
import MusicAll from '../components/MusicAll';



let routes = [
    {
        path: "/",
        component: Home,
        redirect:'/home',
        routes:[   /*嵌套路由*/
            {
                path: "/home/Mymusic",
                component: Mymusic
            },
            {
                path: "/home/",
                exact:true,
                component: MusicAll
            },

        ]
    },



];

export default routes;