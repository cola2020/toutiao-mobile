/**
 * 请求模块
 * 基于axios
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'



const request = axios.create({
    // 基准路径
    baseURL: 'http://toutiao-app.itheima.net/',

    // 用户自定义后端传递回来的 json 数据
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        try {
            return JSONBig.parse(data)
        } catch (error) {
            return {
                data
            }
        }
    }]
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    const { user } = store.state;
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    // 这个地方记得添加return
    return config;
}, function (error) {
    // 对请求错误做些什么(请求还未发出)
    // 错误继续往外抛出,由调用的地方进行处理
    return Promise.reject(error);
});

export default request