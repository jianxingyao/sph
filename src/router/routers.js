
import Home from '../pages/Home/index.vue'
import Login from '../pages/Login/index.vue'
import Search from '../pages/Search/index.vue'
import Register from '../pages/Register/index.vue'
import Detail from '../pages/Detail/index.vue'
import AddCartSuccess from '../pages/AddCartSuccess/index.vue'
import ShopCart from '../pages/ShopCart/index.vue'
import Trade from '@/pages/Trade/index.vue'
import Pay from '../pages/Pay/index.vue'
import PaySuccess from '@/pages/PaySuccess/index.vue'
import Center from '@/pages/Center'

//二级路由引入
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

export default [

    {
        path:'/home',
        component:Home,
        meta:{isShow:true},
    },
    {
        path:'/login',
        component:Login
    },
    {
        path:'/register',
        component:Register
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component:Search,
        meta:{isShow:true},
        // props(route){
        //     console.log(route);
        // }
    },
    {
        name:'detail',
        path:'/detail/:skuid',
        component:Detail,
        meta:{isShow:true},
    },
    {
        name:'addcartsuccess',
        path:'/addcartsuccess',
        component:AddCartSuccess,
        meta:{isShow:true},
    },
    {
        name:'shopcart',
        path:'/shopcart',
        component:ShopCart,
        meta:{isShow:true},
    },
    {
        name:'trade',
        path:'/trade',
        component:Trade,
        meta:{isShow:true},
    },
    {
        name:'pay',
        path:'/pay',
        component:Pay,
        meta:{isShow:true},
    },
    {
        name:'paysuccess',
        path:'/paysuccess',
        component:PaySuccess,
        meta:{isShow:true},
    },
    {
        name:'center',
        path:'/center',
        component:Center,
        children:[
            {
                path:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            },
        ],
        meta:{isShow:true},
    },

]