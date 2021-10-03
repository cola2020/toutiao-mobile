/**
 * 请求模块
 * 基于axios
 */
import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

// 创建新的请求对象，使用旧的会触发拦截器
// 如果是永久的，发送请求新的 token 的方法 401 的话，那么会进入 401 处理，造成死循环
const RefreshTokenReq = axios.create({
    baseURL: 'http://toutiao-app.itheima.net/'
})

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

// 添加响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
    return response;
}, async function (error) {

    const status = error.response.status
    if (status === 400) {
        // 客户端请求参数错误
        Toast.fail('客户端请求参数错误')
    } else if (status === 401) {
        // token 无效
        // 如果没有 user 或者 user.token 表示没有登录，直接登录
        const { user } = store.state;
        if (!user || !user.token) {
            return redirectLogin()
        }
        // 如果有 Refresh_token，则请求过去新的token
        try {
            const { data } = await RefreshTokenReq({
                method: 'PUT',
                url: '/v1_0/authorizations',
                headers: {
                    Authorization: `Bearer ${user.refresh_token}`
                }
            })
            // console.log(data);
            // 拿到新的 token 之后更新的容器里面
            user.token = data.data.token
            store.commit('setUser', user)
            // 把失败的请求重新发送

            // 使用 request 发送请求
            // error.config 有相应的信息
            return request(error.config)
        } catch (error) {

        }

    } else if (status === 403) {
        // 没有权限
        Toast.fail('没有操作权限')

    } else if (status >= 500) {
        // 服务器异常
        Toast.fail('服务器异常,请稍后重试!')
    }

    // 抛出异常
    return Promise.reject(error);
});

function redirectLogin() {
    router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}

export default request