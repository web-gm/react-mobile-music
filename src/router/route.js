
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



];

export default routes;