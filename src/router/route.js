
import Home from '../components/Home';
import Mymusic from '../components/Mymusic';
import MusicAll from '../components/MusicAll';



let routes = [
    {
        path: "/home",
        component: Home,
        routes:[   /*嵌套路由*/
            {
                path: "/home/Mymusic",
                component: Mymusic
            },
            {
                path: "/home/",
                component: MusicAll
            },

        ]
    },



];

export default routes;