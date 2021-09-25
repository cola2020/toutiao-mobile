import request from '@/utils/request'
// import store from '@/store'
/**
 * 用户登录
 */
export const login = (data) => {
    return request({
        method: 'POST',
        url: '/v1_0/authorizations',
        data: data
    })
}

/**
 * 发动验证码
 */
export const sendSms = (mobile) => {
    return request({
        method: 'GET',
        url: `/v1_0/sms/codes/${mobile}`
    })
}


/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user'
        // 发送请求头数据
        // 该接口授权才能访问
        // 注意token的数据格式
        // headers: {
        //     Authorization: `Bearer ${store.state.user.token}`
        // }
    })
}


/**
 *  获取用户频道列表
 */
export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/channels'

    })
}


/**
 *  关注用户
 */
export const addFollow = (target) => {
    return request({
        method: 'POST',
        url: '/v1_0/user/followings',
        data: {
            target
        }
    })
}

/**
 *  取消关注用户
 */
export const deleteFollow = (target) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/followings/${target}`
    })
}

/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/v1_0/user/profile'
    })
}