import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import TypeNav from '@/pages/Home/TypeNav/index.vue'
import store from './store'

// import {request1} from '@/api/index'
// // import requestList from '@/api/request'
// // console.log(request1());
// request1().then(response => {console.log(response);})

import '@/mock/mockServer'
import swiper from '@/components/Carousel'
import 'swiper/css/bundle';
import Pagination from '@/components/Pagination'

//引入所有接口
import * as API from '@/api'

//引入elmUL  按需引入
import {Button,MessageBox,Message} from 'element-ui'

//懒加载引入 并注册插件
import VueLazyload from 'vue-lazyload'
import lazyImg from '@/assets/images/icons.png'

Vue.use(VueLazyload,{
  loading:lazyImg,
})

//引入验证表单插件
import v from '@/plugins/validate.js'

Vue.config.productionTip = false
Vue.component(Button.name, Button);
Vue.component(TypeNav.name,TypeNav)
Vue.component(swiper.name,swiper)
Vue.component(Pagination.name,Pagination)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API 
  },
  mounted(){
    console.log(this);
  }
}).$mount('#app')
