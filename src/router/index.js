//引入vue
import { getToken } from "@/utils/token";
import vue from "vue";
//引入vueRouter
import VueRouter from "vue-router";
import store from "@/store";

import routes from './routers'
//注册插件
vue.use(VueRouter)



//把VueRouter身上的 push和replace方法备份
const rewritePush = VueRouter.prototype.push
const rewriteReplace = VueRouter.prototype.replace
//重写push方法


VueRouter.prototype.push = function(options,resolve,reject){
    if(resolve && reject){
        rewritePush.call(this,options,resolve,reject)
    }else{
        rewritePush.call(this,options,()=>{},()=>{})
    }
}

VueRouter.prototype.replace = function(options,resolve,reject){
    if(resolve && reject){
        rewriteReplace.call(this,options,resolve,reject)
    }else{
        rewriteReplace.call(this,options,()=>{},()=>{})
    }
}

const router =  new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return {  y: 0 }
    },
})


router.beforeEach( (to,from,next) => {
    const token = store.state.User.token
    const name = store.state.User.userInfo.name
    //用户登录了
    if(token){
        //用户登录了想去 登录页 和 注册页
        if(to.path === '/login' || to.path === '/register'){
            next(`${from.path}`)
        }else{
            //用户登录了 有用户信息
            if(name){
                next()
            }else{
                //发送获取用户信息请求
                store.dispatch('User/getUserInfo')
                //成功获取用户信息
                .then(
                    response =>{
                        next()
                    }
                )
                //获取用户信息失败  token失效了
                .catch(
                    error => {
                        store.dispatch('User/loginOut')
                        next('/login')
                    }
                )
            }
        }

    }else{
        //如果用户未登录  那就不能去 订单  支付  结算  支付成功等页面
        let toPath = to.path
        //正则判断   切换的路由是否  在黑名单
        let reg = /(trade|pay|center)/
        const flang = reg.exec(toPath)
       
        if(flang){
            next(`/login?redirect=${toPath}`)
        }else{
            next()
        }
        
    }
})

export default router