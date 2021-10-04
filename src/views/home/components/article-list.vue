<template>
    <div class="article-List" ref="articleList">
    <!-- <div> -->
        <!-- 下拉刷新 -->
        <van-pull-refresh
            v-model="isRefreshing"
            @refresh="onRefresh"
            :success-text="refreshText"
            success-duration='1500'
        >

            <!-- 列表框 -->
            <!-- :error.sync="error"  sync是vue语法,作用是同步数据,不仅是使用还需要修改数据-->
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败,点击重新加载"
                @load="onLoad"
            >
                    <article-item
                        class="article-item-style"
                        v-for="(article,index) in list"
                        :key="index"
                        :article="article" />
            </van-list>
            <!-- 列表框 -->

        </van-pull-refresh>
        <!-- /下拉刷新 -->
    </div>
</template>

<script>
// 获取所有文章的方法
import { getArticles } from '@/api/article'
// 显示文章的组件
import ArticleItem from '@/components/article-item'

// 用于滑动中防抖
import { debounce } from 'lodash'

export default {
    name: 'ArticleList',
    // 组件注册
    components: {
        ArticleItem
    },
    // 组件通信(父子间向子组件发送数据,子组件接收数据)
    props: {
        channel: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            list: [], //存储列表数据的数组
            loading: false, // 控制加载中的 loading 状态
            finished: false, // 控制加载结束的状态
            timestamp: null, // 获取下一页数据的时间戳
            error: false, // 控制数据列表加载失败的提示状态
            isRefreshing: false, // 控制下拉刷新状态
            refreshText: '刷新成功', // 刷新成功提示的文本
            scrollTop: 0 // 记录文章列表距离顶部距离
        };
    },

    methods: {
        // 初始化或者滑动到底部的时候会触发这个(onLoad)方法
        // 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，
        // List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。
        // 因此你需要调整每次获取的数据条数，理想情况下每次请求获取的数据条数应能够填满一屏高度。

        // 加载事件
        async onLoad() {
            try {
                // 1. 请求获取数据
                const { data } = await getArticles({
                    // 频道的id
                    channel_id: this.channel.id,
                    // timestamp: 理解为页码,获取最新页面则是传入最新的时间戳
                    timestamp: this.timestamp || Date.now(),
                    // with_top: 是否包含置顶,进入页面第一次请求时要包含置顶文章
                    with_top: 1
                })

                // console.log(data);
                // 制造错误验证错误提示
                // if (Math.random() > 0.5) {
                //     JSON.parse('fsesedfssdds');
                // }

                // 2. 将请求结果添加到数组中
                const { results } = data.data
                // 注意push 以及展开操作符
                this.list.push(...results)

                // 3. 将加载状态设置为false,这样才能够开启下次加载
                this.loading = false

                // 4. 数据加载玩之后将结束设置为false表示数据已经加载完
                if (results.length) {
                    // 表示还有数据没有加载
                    // 更新获取下一页数据的时间戳
                    this.timestamp = data.data.pre_timestamp
                } else {
                    // 表示没有数据需要加载了 将finished 设置为true
                    this.finished = true
                }

            } catch (error) {
                // 表示发生了错误,关闭加载,并给出一些提示
                this.error = true
                this.loading = false
            }


        },

        // 刷新事件
        async onRefresh() {
            try {
                // 1. 请求获取数据
                const { data } = await getArticles({
                    // 频道的id
                    channel_id: this.channel.id,
                    // 刷新就是获取最新的数据,所以传入当前时间戳
                    timestamp: this.timestamp,
                    // with_top: 是否包含置顶,进入页面第一次请求时要包含置顶文章
                    with_top: 1
                })

                // if (Math.random() > 0.6) {
                //     JSON.parse('fsesedfssdds');
                // }

                // 2. 将获取到的数据追加到列表顶部
                const { results } = data.data
                this.list.unshift(...results)
                // 3. 将下拉刷新的 isRefreshing 设置为false 注意是false 下拉时自己会设置为true
                this.isRefreshing = false

                // this.refreshText = `刷新成功,加载了${results.length}条数据`
            } catch (error) {
                // console.log('请求失败', error);
                this.isRefreshing = false
                this.refreshText = '刷新失败'
            }
        }
    },

    mounted () {
        // 列表滑动时记录滑动的位置，下次回到该页面回到相应的位置
        const artilceList = this.$refs.articleList
        artilceList.onscroll = debounce(() => {
            // console.log(this); // 这里是 vc 对象
            this.scrollTop = artilceList.scrollTop
        }, 50)
    },

    // 缓存专用的钩子函数，用于在回到被缓存的组件时调用
    activated () {
        this.$refs.articleList.scrollTop = this.scrollTop
    }
};
</script>

<style lang="less" scoped>
.article-List{
    // 1. 表示显示文章列表的高度
    // 2. vh是相对于屏幕的高度
    // 3. 搜索框和频道列表是固定定位,在显示 article-List 组件的
    //      home页面有一个paddding将 article-List 组件撑下来
    // 4. 不使用100%是因为他有很多父容器,每个父容器必须拥有固定宽高才能生效
    height: 79vh;
    overflow: auto;
    // 想给文章item加一个上边框以区分文章
    // 在安卓系统上显示有 bug 原本 cell单元格 的边框没有了
    .article-item-style{
        &::before{
            content: '';
            position: absolute;
            top: 0;
            width: 686px;
            height: 2px;
            background-color: #DBDBDB;
        }
    }
}
</style>