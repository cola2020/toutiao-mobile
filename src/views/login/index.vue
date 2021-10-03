<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="page-nav-bar" title="登录"  left-text="返回"  >
            <van-icon slot="left" name="cross" @click="$router.push('/')"></van-icon>
        </van-nav-bar>
        <!-- /导航栏 -->

        <!-- 登陆表单 -->
        <van-form ref="loginForm" @submit="onLogin">
            <van-field
                v-model="user.mobile"
                type="number"
                name="mobile"
                placeholder="请输入手机号"
                :rules="userFormRules.mobile"
                maxlength="11"

            >
                <i slot="left-icon" class="toutiao toutiao-shouji"></i>
            </van-field>

            <van-field
                v-model="user.code"
                type="number"
                name="code"
                placeholder="请填写验证码"
                :rules="userFormRules.code"
            >
                <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
                <template #button>
                    <!-- time: 倒计时事件 -->
                    <van-count-down
                        v-if="isCountDownShow"
                        :time="1000 * 60"
                        format="ss s"
                        @finish="isCountDownShow = false"
                    />
                    <van-button
                        v-else
                        class="send-sms-btn"
                        round size="small"
                        type="default"
                        native-type="button"
                        @click="onSendSms()"
                    >发送验证码
                    </van-button>
                </template>
            </van-field>

            <div class="login-btn-warp">
                <van-button class="login-btn" round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
        <!-- /登陆表单 -->
    </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
    name: 'LoginIndex',

    data() {
        return {
            // 控制显示倒计时显示
            isCountDownShow: false,
            user: {
                mobile: '13911111112',
                code: '246810'
            },
            userFormRules: {
                mobile: [
                    { required: true, message: '请填写用户名' },
                    { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
                ],
                code: [
                    { required: true, message: '请填写验证码' },
                    { pattern: /^\d{6}$/, message: '验证码格式错误' }
                ]
            }

        };
    },

    methods: {
        // 登录事件
        async onLogin () {
            // 1. 获取表单数据
            const user = this.user;

            // 2. 表单验证
            // 表单提交时,自动出发表单验证
            // 验证通过则触发 submit
            // 失败则不会触发

            // 登录状态提示
            this.$toast.loading({
                message: '登录中',
                forbidclick: true,
                duration: 0
            })

            // 3. 提交表单登录
            try {
                const { data } = await login(user);
                // console.log('登陆成功', res);
                // 将返回的 token 值存储到vuex
                this.$store.commit('setUser', data.data);
                // 新的toast开启会关闭旧的toast
                this.$toast.success('登陆成功');

                // 登录成功后跳转回原来的页面
                // 不严谨
                // this.$router.back();
                this.$router.replace(this.$route.query.redirect || '/');

            } catch (error) {
                if (error.response.status === 400) {
                    this.$toast.fail('手机号或验证码错误');
                    // console.log('手机号或验证码错误');
                } else {
                    this.$toast.fail('登陆失败,请稍后重试');
                }
            }
        },

        // 点击发送验证码
        async onSendSms() {
            // 1. 校验手机号是否有效
            try {
                await this.$refs.loginForm.validate('mobile');
                // console.log('ss');
            } catch (error) {
                // 如果进入这里,则停止执行
                // return console.log(error);
                return error
            }
            // 2. 显示倒计时
            this.isCountDownShow = true
            // 3. 请求发送验证码
            try {
                await sendSms(this.user.mobile);
                this.$toast('发送成功');
            } catch (error) {
                this.isCountDownShow = false;
                if (error.response.status === 429) {
                    this.$toast('发送过于频繁,一分钟之后再尝试');
                } else {
                }
            }
        }

    }

}
</script>

<style lang="less" scoped>
    .login-container{
        .toutiao{
            // height: 37px;
            font-size: 37px;
        }

        .send-sms-btn{
            background-color: #ededed;
            width: 160px;
            height: 46px;
            line-height: 46px;
        }

        .login-btn-warp{
            margin: 53px 33px;
            .login-btn{
                background-color: #3296fa;
                // border: none;
            }
        }

        .van-nav-bar {
            .van-icon{
                color: #fff;
            }
        }
    }

    .van-field i{
        padding-right: 10px;
    }
</style>>

