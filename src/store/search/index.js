import { requestSearchList } from "@/api"



const actions = {
    async getSearchList({commit},params){
        const result = await requestSearchList(params)
        if(result.code === 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}
const mutations = {
    GETSEARCHLIST(state,searchList){
        console.log('即将修改search数据');
        state.searchList = searchList
    }
}
const state = {
    searchList:{}
}

const getters = {

    searchGoodsList(state){
        return state.searchList.goodsList || []
    },

    searchAttrsList(state){
        return state.searchList.attrsList || []
    },

    searchTrademarkList(state){
        return state.searchList.trademarkList || []
    }
}




export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}




