// 将px单位转换成 rem 单位的配置文件
module.exports = {
    plugins: {
        // 生成浏览器CSS样式规则前缀
        // vue-cli内部已经配置,无需重复配置
        // autoprefixer: {
        //     // 配置要兼容到的环境信息
        //     browsers: ['Android >= 4.0', 'iOS >= 8']
        // },
        // 配置使用 postcss-pxtorem 插件 作用是把px像素转换成rem像素
        'postcss-pxtorem': {
            // 根元素的值
            // 建议设置为 37.5 如果设置75,页面元素显示很小一个
            // 由于给定的设计稿是750宽度的,且rootValue支持函数,所以我们做如下处理
            // rootValue: 37.5,

            // postcss-pxtorem处理每个css文件会被调用,且css文件的相关信息会传递给该函数
            // 若文件路径包含vant则表示这是vant的css文件,则使用37.5
            // 解构,直接拿到路径
            // indexOf返回该字符串时候有包含的内容,未找到则返回-1
            // 不等于-1说明是包含vant,则以37.5来处理
            rootValue({ file }) {
                // console.log();
                return file.indexOf('vant') !== -1 ? 37.5 : 75
            },
            // 配置要转换的属性,* 表示所有
            propList: ['*'],
            // 配置不要转换的样式资源
            exclude: 'github-markdown'
        }
    }
};