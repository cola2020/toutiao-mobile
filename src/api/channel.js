/**
 * channel频道请求模块
 */
import request from '@/utils/request'

/**
 * 获取所有channel的方法
 */
export const getAllChannels = () => {
    return request({
        method: 'GET',
        url: '/v1_0/channels'
    })
}

/**
 * 添加channel
 */
export const addUserChannel = (channel) => {
    return request({
        method: 'PATCH',
        url: '/v1_0/user/channels',
        data: {
            channels: [channel]
        }
    })
}

/**
 * 删除channel
 */
export const deleteUserChannel = (channelId) => {
    return request({
        method: 'DELETE',
        url: `/v1_0/user/channels/${channelId}`
    })
}

