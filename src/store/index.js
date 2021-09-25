import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storege'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
    state: {
        // 一个对象,存储当前用户信息(Token等)
        // 反序列化
        // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
        user: getItem(TOKEN_KEY)

    },
    mutations: {
        setUser(state, data) {
            state.user = data;

            // 为了防止数据刷新丢失,需要把数据备份到本地
            // localStorage只能存储字符串,而data的值是一个对象
            // 这里把对象转换为JSON数据,这个过程称为序列化
            // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))

            setItem(TOKEN_KEY, state.user)
        }
    },
    actions: {
    },
    modules: {
    }
})
