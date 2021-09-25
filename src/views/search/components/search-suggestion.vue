<!-- 搜索建议 -->
<template>
    <div class="search-suggestion">
        <van-cell
            v-for="(suggestion,index) in suggestions"
            :key="index"
            :title="suggestion"
            icon="search"
            @click="$emit('search',suggestion)"
        >
            <span slot="title" v-html="highLight(suggestion)"></span>
        </van-cell>
    </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
// 按需加载防抖函数
import { debounce } from 'lodash'

export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            suggestions: [] // 联想建议数组
        };
    },

    computed: {},

    watch: {
        searchText: {
            // debounce 防抖函数
            // 参数一: 业务逻辑代码
            // 参数二: 延迟时长
            handler: debounce(function(value) {
                // console.log(value);
                this.loadSearchSuggestions(value)
            }, 500),

            // handler(value) {
            //     this.loadSearchSuggestions(value)
            // },
            immediate: true // 该回调将会在侦听开始之后被立即调用
        }

    },

    mounted() {},

    created() {},

    methods: {
        // 加载联想建议
        // 直接使用this.searchText也可以,下种写法解耦,耦合性没有这么强
        async loadSearchSuggestions(text) {
            try {
                const { data } = await getSearchSuggestions(text)
                // console.log(data);
                this.suggestions = data.data.options
            } catch (error) {
                console.log(error);
                this.$toast('获取数据失败,请稍后重试')
            }
        },

        // 高亮关键字字符串
        highLight(text) {
            const highLightText = `<span class="active">${this.searchText}</span>`

            // 正则表达式/ /之间不能填变量,不会被解析,需要使用原始的 RegEpx 对象
            //  参数1: 需要匹配的字符串
            //  参数1: 匹配参数 g表示全局替换,i表示不区分大小写
            const reg = new RegExp(this.searchText, 'gi')
            return text.replace(reg, highLightText)

        }
    }
}

</script>
<style lang='less' scoped>
.search-suggestion{
    /deep/ span.active{
        color: #3296fa;
    }
}
</style>