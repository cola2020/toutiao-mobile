/**
 * channel频道请求模块
 */
import request from '@/utils/request';

/**
  * 获取所有channel的方法
  */
export const getComments = params => {
    return request({
        method: 'GET',
        url: '/v1_0/comments',
        params
    });
}