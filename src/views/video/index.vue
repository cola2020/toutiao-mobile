<template>
    <div class="video-container">
        <van-nav-bar
            class="page-nav-bar"
            fixed
            title="视频"
            left-text="返回"
            @click-left="onClickLeft"
        >

        </van-nav-bar>
        <div class="list-container">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
            >
                <div v-for="item in list" :key="item" class="list">
                    <van-cell  :title="item" />
                    <div class="video-wrap">
                        <!-- video -->
                    </div>
                </div>
            </van-list>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VideoIndex',

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
                for (let i = 0; i < 5; i++) {
                    this.list.push(this.list.length + 1);
                }

                // 加载状态结束
                this.loading = false;

                // 数据全部加载完成
                if (this.list.length >= 10) {
                    this.finished = true;
                }
            }, 1000);
        },
        onClickLeft() {

        }
    }
};
</script>

<style lang="less" scoped>
.video-container{
    background-color: #FFFFFF;
    .list-container{
        margin-top: 92px;
        .list{
            height: 400px;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            text-align: center;

            .video-wrap{
                height: 280px;
                width: 600px;
                margin: 20px auto;
                border-radius: 10px;
                background-color: wheat;
            }
        }
    }
}

</style>