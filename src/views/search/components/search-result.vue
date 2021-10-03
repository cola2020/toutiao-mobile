<!-- 搜索结果 -->
<template>
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败,点击重新加载"
        @load="onLoad"
    >
  <van-cell v-for="(result,index) in results" :key="index" :title="result.title" />
</van-list>
</template>

<script>
import { getSearchResults } from '@/api/search'
export default {
    name: 'SearchResult',
    props: {
        searchText: {
            type: String,
            required: true
        }
    },
    components: {},
    data () {
        return {
            loading: false,
            finished: false,
            page: 1, // 页码
            per_page: 20, // 每页加载的数据
            results: [], // 存储搜索结果
            error: false // 控制加载失败的失败提示展示状态
        };
    },

    computed: {},

    mounted() {},

    created() {},

    methods: {
        async onLoad() {
            try {
                // 1. 发送请求获取结果
                // 2. 将结果保存到数组中
                // 3. 将本次加载中的 loading 关闭,以开启下次加载
                // 4. 判断是否还有数据
                //    有    则更新下一次请求的页码
                //    没有  将 finished 关闭
                const { data } = await getSearchResults({
                    page: this.page,
                    per_page: this.per_page,
                    q: this.searchText
                })

                // if (Math.random() > 0.5) {
                //     JSON.parse('fsesedfssdds');
                // }

                // 2. 将结果保存到数组中
                // console.log(data);
                const { results } = data.data
                this.results.push(...results)


                // 3. 将本次加载中的 loading 关闭,以开启下次加载
                this.loading = false

                // 4. 判断是否还有数据
                if (results.length) {
                    this.page++
                } else {
                    this.finished = true
                }

            } catch (error) {
                this.loading = false
                this.error = true
            }
        }
    }
}

</script>
<style lang='less' scoped>

</style>