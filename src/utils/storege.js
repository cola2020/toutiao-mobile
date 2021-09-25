/**
 * 封装本地操作存储模块
 */

/**
 * 存储数据
 */
export const setItem = (key, value) => {
    if (typeof (value) === 'object') {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = (key) => {
    const data = window.localStorage.getItem(key);
    // 判断数据是不是json数据是比较麻烦的事情,使用如下方法处理
    try {
        return JSON.parse(data)
    } catch (error) {
        // 不是 json 格式字符串则使用原来的数据
        return data
    }
}

/**
 * 删除数据
 */
export const removeItem = (key) => {
    window.localStorage.removeItem(key)
}