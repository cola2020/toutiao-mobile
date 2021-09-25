<!--  -->
<template>
    <div class="search-container">
        <!-- Tips: 在 van-search 外层增加 form 标签，
        且 action 不为空，即可在 iOS 输入法中显示搜索按钮。 -->

        <!-- 搜索栏 -->
        <!-- show-action: 是否显示右边的取消 点击之后会触发onCancel事件 -->
        <!-- 小适配 -->
        <form class="search-form" action="/">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            background="#3296FA"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
        />
        <!-- /搜索栏 -->

         <!-- 搜索结果 -->
        <search-result
            v-if="isResultShow"
            :search-text= "searchText"
        />
        <!-- /搜索结果 -->

        <!-- 联想建议 -->
        <!-- 1. 将搜索文字传递给子组件 通信一定要记得动态绑定数据-->
        <!-- 2. 子组件拿到数据加载建议,输入内容发生变化再次加载 -->
        <!-- 3. 将数据显示 -->
        <search-suggestion
            v-else-if="searchText"
            :search-text= "searchText"
            @search="onSearch"
        />
        <!-- /联想建议 -->

        <!-- 历史记录 -->
        <!-- 接收从搜索历史点击传回来的数据，来进行搜索 -->
        <search-history v-else
            :search-histories= "searchHistories"
            @search="onSearch"
        />
        <!--/历史记录 -->

</form>
    </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import SearchHistory from './components/search-history'

import { setItem, getItem } from '@/utils/storege'

export default {
    name: 'SearchIndex',
    components: {
        SearchSuggestion,
        SearchResult,
        SearchHistory
    },
    data () {
        return {
            searchText: '',
            isResultShow: false, // 控制搜索结果的显示
            // 没有数据则返回空数组，防止报错
            searchHistories: getItem('serach-histories') || [] // 搜索记录,数组需要进行去重处理
        };
    },

    computed: {},

    mounted() {},

    created() {},

    methods: {
        // 搜索事件
        onSearch(val) {
            // 更新文本框内容
            this.searchText = val
            // console.log(val);

            // 触发搜索则把内容存储起来
            // 不要有重复历史记录、最新的排在最前面
            const index = this.searchHistories.indexOf(val)
            if (index !== -1) {
                // 删除重复项
                this.searchHistories.splice(index, 1)
            }
            // 存储到数组头部
            this.searchHistories.unshift(val)

            // 登录存储到线上，搜索已经处理
            // 未登录，使用本地存储

            // 同步到本地存储
            setItem('serach-histories', this.searchHistories)

            // 渲染搜索结果
            this.isResultShow = true
        },
        // 点击取消事件
        onCancel() {
            // 回到首页,首页数据需要重新加载
            this.$router.back()
        }
    }
}

</script>
<style lang='less' scoped>
.search-container{
    // 让最上面的文章下来下来显示
    padding-top: 108px;
    .van-search__action{
        color: #fff;
    }
    .search-form{
        .van-search{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1;
        }
    }
}
</style>