//对axios 二次封装
//引入axios
import axios from 'axios'
//引入nprogress  进度条
import nProgress from 'nprogress'
//引入nprogress 样式
import 'nprogress/nprogress.css'




//创建一个 小型axios
const requestList = axios.create({
    baseURL:'/mock',   
    timeout:3000,

})

//请求拦截器

//config是  请求的配置项
requestList.interceptors.request.use((config) => {

    nProgress.start()
    return config
})


//响应拦截器

requestList.interceptors.response.use(
(response) => {
    
    nProgress.done()
    return response.data
},

(error) => {
    nProgress.done()
    return Promise.reject(new Error(error))
}
)



export default requestList