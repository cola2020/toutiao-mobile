<template>
    <div class="my-container">
        <!-- 已登录头部 -->
        <!-- 这里的user是存储在vuex容器里面的数据 由于被导入 故可直接使用 -->
        <header v-if="user" class="head user-info">
            <!-- 用户信息 -->
            <div class="data-info">
                <div class="left">
                    <van-image
                        class="avatar"
                        round
                        fit="cover"
                        :src="userInfo.photo"
                    />
                    <span class="name">{{userInfo.name}}</span>
                </div>
                <div class="right">
                    <van-button size="mini" round to="/user/profile">编辑资料</van-button>
                </div>
            </div>
            <!-- 数据(头条、粉丝) -->
            <div class="data-stats">
                <div class="data-item">
                    <span class="count">{{ userInfo.art_count }}</span>
                    <span class="text">头条</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.follow_count }}</span>
                    <span class="text">关注</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.fans_count }}</span>
                    <span class="text">粉丝</span>
                </div>
                <div class="data-item">
                    <span class="count">{{ userInfo.like_count }}</span>
                    <span class="text">获赞</span>
                </div>
            </div>
        </header>

        <!-- 未登录头部 -->
        <header v-else class="head not-login">
            <div class="login-btn" @click="toLogin">
                <img class="mobile-img" src="~@/assets/mobile.png" alt="">
                <span class="text">登录 / 注册</span>
            </div>
        </header>

        <!-- 宫格导航 -->
        <van-grid class="grid-nav mb-9" :column-num="2" clickable>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-shoucang"></i>
                <span slot="text" class="text">收藏夹</span>
            </van-grid-item>
            <van-grid-item class="grid-item">
                <i slot="icon" class="toutiao toutiao-lishi"></i>
                <span slot="text" class="text">历史记录</span>
            </van-grid-item>
        </van-grid>
        <!-- /宫格导航 -->

        <van-cell class="cell-style" title="消息通知" is-link/>
        <van-cell class="cell-style mb-9" title="智能伞兵" is-link/>
        <van-cell
            v-if="user"
            class="logout-cell"
            clickable
            title="退出登录"
            @click="onLogout"
        />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
    name: 'MyIndex',

    data() {
        return {
            userInfo: {}
        };
    },

    mounted() {

    },

    created() {
        if (this.user) {
            this.loadUserInfo();
        }
    },

    computed: {
        ...mapState(['user'])
    },

    methods: {
        // 点击登录跳转到登陆页面
        toLogin() {
            // console.log('he');
            this.$router.push('/login');
        },

        // 退出登录
        onLogout() {
            // console.log(11);
            // 提示 确认则需清除登陆状态 容器中的user与本的存储的
            this.$dialog.confirm({
                title: '不摸了吗'
                // message: '弹窗内容'
            })
                .then(() => {
                    // console.log('comfirm');
                    // 清除登陆状态
                    // 只需要这一步操作 在 store 的setUser有把数据给本地存储设置
                    this.$store.commit('setUser', null);
                })
                .catch(() => {
                    console.log('cancel');
                });
        },

        //获取用户自己的信息
        async loadUserInfo() {
            try {
                // 401用户认证失败 表示token无效
                // 需要传递token
                const { data } = await getUserInfo();
                this.userInfo = data.data;
                // console.log(this.userInfo);
            } catch (error) {
                this.$toast('获取数据失败,请稍后重试!')
            }
        }


    }
};
</script>

<style lang="less" scoped>
    .my-container{
        .head{
            height: 361px;
            // @指向的是src目录,在css中使用需要加上~
            background: url('~@/assets/banner.png');
            // background-size: cover;
        }

        .not-login{
            display: flex;
            justify-content: center;
            align-items: center;

            .login-btn{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .mobile-img{
                    width: 132px;
                    height: 132px;
                    margin-bottom: 15px;
                }
                .text{
                    font-size: 28px;
                    color: #fff;
                }
            }
        }

        .user-info{
            .data-info{
                height: 231px;
                padding: 76px 32px 23px;
                // css3盒子模型
                box-sizing: border-box;
                // background-color: aquamarine;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left{
                    display: flex;
                    align-items: center;

                    .avatar{
                        width: 132px;
                        height: 132px;
                        margin-right: 23px;
                        border: 2px solid #fff;
                    }

                    .name{
                        font-size: 30px;
                        color: #fff;
                    }
                }
            }
            .data-stats{
                height: 130px;
                // background-color: pink;
                display: flex;
                .data-item{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    color: #fff;
                    box-sizing: border-box;

                    .count{
                        font-size: 36px;
                        padding-bottom: 10px;
                    }
                    .text{
                        font-size: 23px;
                    }
                }
            }
        }

        .grid-nav{
            .grid-item{
                height: 141px;
                i.toutiao{
                    font-size: 45px;
                }
                .toutiao-shoucang{
                    color: #ff9d1d;
                }
                .toutiao-lishi{
                    color: #eb5253;
                }
                span.text{
                    font-size: 28px;
                }
            }
        }

        .logout-cell {
            text-align: center;
            color: #d86262;
        }

        .mb-9 {
            margin-bottom: 9px;
        }

        .cell-style{
            height: 101px;
            .van-cell__title{
                span{
                    vertical-align: middle;
                }
            }
        }
    }
</style>