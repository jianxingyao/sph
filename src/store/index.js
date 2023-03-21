import Vue from "vue";
import Vuex from 'vuex'
import Home from './home'
import Search from './search'
import Detail from './detail'
import ShoppingCart from './shoppingcart'
import User from './user'
import Trade from './trade'

Vue.use(Vuex)



export default new Vuex.Store({
    modules:{
        Home,
        User,
        Trade,
        Detail,
        Search,
        ShoppingCart,
    }
})