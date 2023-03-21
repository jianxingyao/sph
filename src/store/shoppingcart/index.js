import { requestShoppingCartList,requestAddOrUpdateGoShopping,requestDeleteShoppingCartgood,requestChangeCheckedById } from "@/api"


const actions = {
    //获取购物车 数据
    async getShoppingCartData({commit}){
        const result = await requestShoppingCartList()
        console.log(result);
        if(result.code === 200){
            commit('GETSHOPPINGCARTDATA',result.data)
        }
    },
    //对购物车进行 数据更新
    async updateShoppingCart({commit},{skuId,goodsChangeNum:skuNum}){
        const result = await requestAddOrUpdateGoShopping(skuId,skuNum)
        console.log('result',result);
        if(result.code === 200){
            return '更新成功'
        }else{
            return Promise.reject('添加失败')
        }
    },
    //删除购物车商品
    async deleteShoppingCart({commit},skuId){
        console.log(skuId);
        const result = await requestDeleteShoppingCartgood(skuId)
        if(result.code === 200){
            return '删除成功'
        }else{
            return Promise.reject(new Error('删除失败'))
        }
    },
    //改变商品勾选状态
    async changeCheckedGood({commit},{skuId,checked}){
        console.log(skuId,checked);
        const result = await requestChangeCheckedById(skuId,checked)
        if(result.code === 200){
            return '状态已改变'
        }else{
            return Promise.reject(new Error('状态改变失败'))
        }
    },
    //删除所有选中商品
    async deleteAllPitchCommodity({dispatch,getters}){
        let PromiseAll = []
       
        getters.shoppingInfoList.forEach( item => {
            console.log(item);
            let promise = item.isChecked == 1 ? dispatch('deleteShoppingCart',item.skuId) : ''
            PromiseAll.push(promise)
        })

        return Promise.all(PromiseAll)
    },
    //所有商品 全部 勾选 或者 全不 勾选
    async checkedAllupdate({dispatch,getters},checked){
        let PromiseAll = []
        getters.shoppingInfoList.forEach( item => {
            let promise = dispatch('changeCheckedGood',{skuId:item.skuId,checked})
            PromiseAll.push(promise)
        })

        return Promise.all(PromiseAll)
    }

}

const mutations = {
    GETSHOPPINGCARTDATA(state,shopCartData){
        state.shoppingCartList = shopCartData
    }
}

const state = {
    //最原始的请求购物车列表数据
    shoppingCartList:[]
}

const getters = {
    //cartInfoList
    shoppingInfoList(state){
        //最终返回的列表数组
        let shoppingInfoArr = null
        //第一步剖析
        let dataObj =  state.shoppingCartList[0]
        
        //有 就进一步解刨 没有就返回空数组
        if(dataObj){
            //进一步解刨 这个数组 
            shoppingInfoArr = dataObj.cartInfoList
        }else{
            shoppingInfoArr = []
        }
        return shoppingInfoArr
    }
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}