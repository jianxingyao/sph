import { requestSiteInfo, requestTradeList } from "@/api"

const actions = {
    //获取用户地址信息
    async getSiteInfo({commit}){
        const result = await requestSiteInfo()
        if(result.code === 200){
            commit('GETSITEINFO',result.data)
        }
    },
    //获取用户订单列表
    async getOrderList({commit}){
        const result = await requestTradeList()
        if(result.code === 200){
            commit('GETORDERLIST',result.data)
        }
    },
}

const mutations = {
    GETSITEINFO(state,address){
        state.address = address
    },
    GETORDERLIST(state,tradeList){
        state.tradeList = tradeList
    },
}

const state = {
    address:[],
    tradeList:[],
}

const getters = {
    //商品信息
    detailArrayList(state){
        return state.tradeList.detailArrayList || []
    }

}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}