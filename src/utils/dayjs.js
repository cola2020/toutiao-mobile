import Vue from 'vue'
import dayjs from 'dayjs'
// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn') // 全局使用


// 定义一个全局过滤器,然后就可以在任何组件的模板使用它了
// 全局可用的方法,紧供html中的template中使用
// {{ 表达式 | 过滤器}}
// 表达式所返回的结果会传递给过滤器
// 过滤器的返回值会渲染到使用过滤器的位置
Vue.filter('relativeTime', value => {
    return dayjs().to(dayjs(value))
})