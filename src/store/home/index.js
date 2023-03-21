//引入发送请求的 小型axios
import {requestCategoryList,requestBannerList,requestFloorList}  from '@/api/index.js'


const actions = {
     //请求  三级联动组件 数据
    async createcategorylist({commit}){
        const result = await requestCategoryList()
        if(result.code === 200 && result.message === '成功'){
            console.log(result);
            commit('CREATECATRGORYLIST',result.data)
        }
    },
    // 请求轮播图数据
    async createBannerList({commit}){
        const result = await requestBannerList()
        console.log(result);
        if(result.code === 200){
            commit('CREATEBANNERLIST',result.data)
        }
    },
    //请求底部  轮播图数据
    async createFloorList({commit}){
        const result = await requestFloorList()
        if(result.code === 200){
            commit("CREATEFLOORLIST",result.data)
            console.log(result);
        }
    },
}
const mutations = {
    CREATECATRGORYLIST(state,value){
        state.CategoryList = value
    },
    CREATEBANNERLIST(state,value){
        state.bannerList = value
    },
    CREATEFLOORLIST(state,value){
        state.floorList = value
    }
}
const state = {
    CategoryList:[],
    bannerList:[],
    floorList:[],
    count:1,
}
const getters = {}


export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}