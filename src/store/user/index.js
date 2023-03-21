import {requestAuthCode,requestRegister,requestLogin,requestUserInfo,requestLoginOut} from '@/api/index'
import { getToken, setToken, removeToken } from '@/utils/token'

const actions = {
    //获取验证码
    async getAuthCode({commit},phone){
        const result = await requestAuthCode(phone)
        if(result.code === 200){
            commit('GETAUTHCODE',result.data)
            return "ok"
        }else{
            return Promise.reject(new Error('验证码获取失败'))
        }
    },
    //注册新用户
    async register({commit},data){
        const reslult = await requestRegister(data)
        if(reslult.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('注册失败'))
        }
    },
    //用户登录
    async userLogin({commit},data){
        const result = await requestLogin(data)
        if(result.code === 200){
            console.log(result.data);
            setToken(result.data.token)
            commit('USERLOGIN',result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('登录失败'))
        }
    },
    //获取用户信息
    async getUserInfo({commit}){
        const result = await requestUserInfo()
        console.log(result);
        if(result.code === 200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('获取用户信息失败'))
        }
    },
    //退出登录
    async loginOut({commit}){
        const reslult = await requestLoginOut()
        if(reslult.code === 200){
            commit('LOGINOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('退出登录失败,token清除失败'))
        }
    }
}

const mutations = {
    GETAUTHCODE(state,code){
        console.log(code);
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userinfo){
        state.userInfo = userinfo
    },
    LOGINOUT(state){
        //清除本次存储token
        removeToken()
        //清除用户信息
        state.userInfo = {}
        //清除仓库的Token
        state.token = ''
    },
}

const state = { 
    code:'',
    token:getToken(),
    userInfo:{},
}

const getters = {

}



export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}