import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局样式表
import './styles/index.less'
// 引入Vant
import Vant from 'vant'
// 加载vant核心组件库
import 'vant/lib/index.css'
// 动态设置 REM 基准值 不用返回值 导入即可  导入的是包里面的index.js
// 本质是一个立即执行函数 获取设备的宽高 给html页面设置字体大小
import 'amfe-flexible'

// 加载 dayjs 的初始化配置
import './utils/dayjs'

//注册使用
Vue.use(Vant);



Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')




