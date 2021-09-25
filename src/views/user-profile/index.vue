<!-- 展示用户资料 -->
<template>
    <div>
        <van-nav-bar title="个人信息" left-arrow right-text="保存" @click-left="$router.back()"/>
            <van-cell-group>
                <van-cell title="头像" is-link center>
                    <van-image
                        round
                        width="30"
                        height="30"
                        fit="cover"
                        :src="user.photo"
                    />
                </van-cell>

                <van-cell title="昵称" :value="user.name" is-link />

                <van-cell
                    title="性别"
                    :value="user.gender === 0 ? '男': '女'"
                    is-link
                />

            <van-cell title="生日" :value="user.birthday" is-link />
        </van-cell-group>
    </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
    name: 'UserPofile',
    components: {},
    data () {
        return {
            // 用户信息
            user: {}
        };
    },
    methods: {
        async loadUserProfile() {
            const { data } = await getUserProfile()
            this.user = data.data
        }
    },
    created () {
        this.loadUserProfile()
    }
}

</script>
<style lang='less' scoped>

</style>