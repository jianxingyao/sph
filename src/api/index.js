import requestList from "./request";
import requestMock from './requestMock'


//三级联动数据
export const requestCategoryList = () => requestList({url:'product/getBaseCategoryList',method:'get'})
//home下主轮播图数据
export const requestBannerList = () => requestMock({url:'/banner',method:'get'})
//home下floor的数据
export const requestFloorList = () => requestMock({url:'/floor',method:'get'})
//对search商品的请求
export const requestSearchList = (params) => requestList({url:'/list',method:'post',data:params})
//对商品详情的请求
export const requestGoodsInfo = (skuId) => requestList({url:`/item/${skuId}`,method:'get'})
//对添加购物车的请求
export const requestAddOrUpdateGoShopping = (skuID,skuNum) => requestList({url:`/cart/addToCart/${skuID}/${skuNum}`,method:'post'})
//获取购物车数据
export const requestShoppingCartList = () => requestList({url:'/cart/cartList',method:'get'})
//删除购物车商品
export const requestDeleteShoppingCartgood = (skuId) => requestList({url:`/cart/deleteCart/${skuId}`,method:'delete'})
//改变商品勾选状态
export const requestChangeCheckedById = (skuID,isChecked) => requestList({url:`/cart/checkCart/${skuID}/${isChecked}`,method:'get'})
//获取验证码的接口
export const requestAuthCode = (phone) => requestList({url:`/user/passport/sendCode/${phone}`,method:'get'})
//注册用户
export const requestRegister = (data) => requestList({url:'/user/passport/register',data,method:'post'})
//用户登录
export const requestLogin = (data) => requestList({url:'/user/passport/login',data,method:'post'})
//获取用户的token  返回用户信息
export const requestUserInfo = () => requestList({url:'/user/passport/auth/getUserInfo',method:'get'})
//通知服务端退出登录  
export const requestLoginOut = () => requestList({url:'/user/passport/logout',method:'get'})
//获取用户地址信息
export const requestSiteInfo = () => requestList({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
//获取订单数据
export const requestTradeList = () => requestList({url:'/order/auth/trade',method:'get'})
//提交订单请求
export const reuqestOrderSumbit = (tradeNo,data) => requestList({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
//获取支付订单信息
export const requestPayOrderInfo = (orderId) => requestList({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
//获取支付状态
export const requestOrderState = (orderId) => requestList({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
//获取订单列表
export const requestOrderList = (page,limit) => requestList({url:`/order/auth/${page}/${limit}`,method:'get'})
    
