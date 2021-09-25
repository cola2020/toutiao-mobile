<template>
    <div class="home-container">
         <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" fixed>
            <van-button
                class="search-btn"
                round
                slot="title"
                size="small"
                icon="search"
                to="/search"
                >
            </van-button>
            <!-- <div
                class="search-container"
                slot="title"
            ></div> -->
        </van-nav-bar>
        <!-- /导航栏 -->

        <!-- 频道列表 -->
        <!-- sticky: 通过 sticky 属性可以开启粘性布局，粘性布局下，标签页滚动到顶部时会自动吸顶 -->
        <!-- animated: 通过 animated 属性可以开启切换标签内容时的转场动画 -->
        <!-- swipeable: 通过 swipeable 属性可以开启滑动切换标签页 -->
        <van-tabs class="channel-tab" v-model="active"  animated swipeable>
            <van-tab
                v-for="channel in channels"
                :key="channel.id"
                :title="channel.name"
            >
                <!-- 文章列表 -->
                <article-list :channel="channel" />
                <!-- /文章列表 -->

            </van-tab>
            <!-- 占位盒子,为了tab栏上的选项能够显示完整 -->
            <div class="placeholder" slot="nav-right"></div>
            <!-- 汉堡按钮 -->
            <div
                class="hamburger-btn"
                slot="nav-right"
                @click="editChannel()"
            >
                <i class="toutiao toutiao-gengduo"></i>
            </div>
        </van-tabs>
        <!-- /频道列表 -->

        <!-- 频道编辑弹出层 -->
        <van-popup
            v-model="isChannelEditShow"
            closeable
            position="bottom"
            :style="{ height: '100%' }"
        >
            <channel-edit
                :my-channel="channels"
                :active="active"
                @update-active = "onUpdateActive"/>
        </van-popup>
        <!-- /频道编辑弹出层 -->
    </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storege'


export default {
    name: 'HomeIndex',
    components: {
        ArticleList,
        ChannelEdit
    },

    data() {
        return {
            active: 0,
            channels: [], // 保存用户频道列表
            isChannelEditShow: false // 控制编辑频道弹出层的显示状态
        };
    },

    computed: {
        ...mapState(['user'])
    },

    methods: {
        // 加载用户的频道列表
        async loadUserChannels() {
            try {
                // const { data } = await getUserChannels()
                // this.channels = data.data.channels
                // console.log(this.channels);

                // 没有登陆则取本地存储
                // 都没有则取默认的文章列表进行展示
                let channels = [];
                if (this.user) {
                    // 登录,则取线上的数据
                    const { data } = await getUserChannels()
                    channels = data.data.channels

                } else {
                    const localChannels = getItem('TOUTIAO_CHANNELS')
                    if (localChannels) {
                        channels = localChannels
                    } else {
                        // 匿名状态下返回默认的channels
                        const { data } = await getUserChannels()
                        channels = data.data.channels
                    }
                }
                this.channels = channels

            } catch (error) {
                this.$toast('获取频道失败,请刷新重试')
            }
        },

        //  修改弹出层的显示状态
        editChannel() {
            this.isChannelEditShow = true
        },

        // 更新active
        // 默认参数
        onUpdateActive(index, isChannelEditShow = true) {
            // console.log('home', index);
            this.active = index
            this.isChannelEditShow = isChannelEditShow
        }
    },

    mounted() {

    },

    created () {
        this.loadUserChannels();
    }


};
</script>

<style lang="less" scoped>
.home-container{
    padding-top: 174px;
    padding-bottom: 100px;
    .search-container{
        width: 400px;
        height: 64px;
        border: 1px solid #000;
    }
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

    /deep/ .channel-tab{
        .van-tabs__wrap{
            height: 82px;
            position: fixed;
            top: 92px;
            left: 0;
            right: 0;
            z-index: 1;

        }
        .van-tab{
            min-width: 200px;
            border-left: 1px solid #edeff3;
            font-size: 30px;
            color: #777777;
        }
        .van-tab--active{
            color: #3296fa;
        }
        .van-tabs__line{
            width: 31px;
            background-color: yellowgreen;
            bottom: 8px;
        }
        .van-tabs__nav--line{
            padding-bottom: 0;
        }
        // 清除navlist自带的padding
        .van-tabs__nav--complete{
            padding-left: 0;
            // 在模拟器中生效
            // 在真机上未生效(Android10)
            padding-right: 0px;
        }
        .hamburger-btn{
            position: fixed;
            right: 0;
            width: 66px;
            height: 82px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            opacity: 0.902;
            i.toutiao{
                font-size: 36px;
            }
            &:before{
                content:'';
                position: absolute;
                left: 0;
                width: 2px;
                height: 100%;
                // 作用？
                background-size: contain;
                background: url(~@/assets/gray-line.png);
            }
        }
        .placeholder{
            width: 66px;
            height: 82px;
            // 不参与空间计算
            flex-shrink: 0;
        }
    }
}
</style>