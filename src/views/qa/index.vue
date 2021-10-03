<template>
    <div class="qa-container">
        <van-nav-bar class="page-nav-bar" fixed>
            <van-button
                class="search-btn"
                round
                slot="title"
                size="small"
                icon="search"
                >
            </van-button>
        </van-nav-bar>
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
            <van-cell class="qa-item" v-for="item in list" :key="item" >
                <span>关于消息的订阅预发布的问题</span>
            </van-cell>
        </van-list>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            loading: false,
            finished: false
        };
    },
    methods: {
        onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            setTimeout(() => {
                for (let i = 0; i < 14; i++) {
                    this.list.push(this.list.length + 1);
                }

                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 40) {
                    this.finished = true;
                }
            }, 1000);
        }
    }
};
</script>

<style lang="less" scoped>
.qa-container{
    padding-top: 92px;
    padding-bottom: 100px;
    // background-color: #FFFFFF;

    .qa-item{
        height: 140px;
        width: 80%;
        line-height: 100px;
        overflow: hidden;
        margin: 40px auto;
        border-radius: 20px;
        background-color: #FFFFFF;

    }
    .page-nav-bar{
        .search-btn{
            width: 400px;
            height: 64px;
            // background-color: #5babfb;
            border: none;
            font-size: 28px;
            .van-icon{
                font-size: 32px;
            }
            line-height: 64px;
        }
    }
}
</style>