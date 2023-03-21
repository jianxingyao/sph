import {requestGoodsInfo,requestAddOrUpdateGoShopping} from '@/api/index'
import getUUID from "@/utils/uuid_token";
const actions = {
    //请求商品的详情数据
    async getGoodsDetailsInfo({commit},skuId){
        const result = await requestGoodsInfo(skuId)
        console.log(result);
        if(result.code === 200){
            commit('GETGOODSDETAILSINFO',result.data)
        }
    },
    //添加商品到购物车
    async addOrUpdateGoShopping({commit},{skuId,skuNum}){
        const result = await requestAddOrUpdateGoShopping(skuId,skuNum)
        
        if(result.code === 200){
            return '添加成功'
        }else{
            return Promise.reject(new Error('添加失败'))
        }
    },
}

const mutations = {
    GETGOODSDETAILSINFO(state,value){
        state.goodsDetailsInfo = value
    }
}

const state = {
    goodsDetailsInfo:{},
    uuid_token:getUUID(),
}

const getters = {
    //导航面包屑
    categoryView(state){
        return state.goodsDetailsInfo.categoryView || {}
    },
    //商品的详情数据
    skuInfo(state){
        return state.goodsDetailsInfo.skuInfo || {}
    },
    //商品具体都有哪些可购买类型
    spuSaleAttrList(state){
        return state.goodsDetailsInfo.spuSaleAttrList || {}
    },
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}