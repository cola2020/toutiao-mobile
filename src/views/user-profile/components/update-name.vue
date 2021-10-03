<!-- 更新用户名字 -->
<template>
    <div>

        <van-nav-bar
            title="修改名字"
            left-text="返回"
            right-text="完成"
            left-arrow
            @click-left="onClickLeft"
            @click-right="onConfirm"
        />

        <div class="name-edit-wrap">
            <van-field
            v-model="localName"
            rows="2"
            autosize
            type="textarea"
            maxlength="10"
            placeholder="请输入新的昵称"
            show-word-limit
        />
        </div>
    </div>
</template>

<script>

import { updateUserProfile } from '@/api/user'
export default {
    name: 'UpdataUserNam',
    components: {},
    props: {
        value: {
            type: String,
            required: true
        }

    },
    data () {
        return {
            localName: this.value
        };
    },

    computed: {},

    mounted() {},

    created() {},

    methods: {
        onClickLeft() {
            // 父组件监听关闭弹出层
            this.$emit('close')
        },
        async onConfirm() {
            this.$toast.loading({
                message: '保存中',
                forbidClick: true
            })
            // 更新 => 修改父组件的name => 关闭弹出层
            try {
                await updateUserProfile({
                    name: this.localName
                })
                this.$emit('input', this.localName)

                // this.$emit('update-name', this.localName)
                this.$emit('close')
                this.$toast.success('保存成功')
                // console.log(data);
            } catch (error) {
                // 409 表示用户名重复
                if (error && error.response && error.response.status === 409) {
                    this.$toast.fail('昵称已存在')
                }
            }

        }
    }
}

</script>
<style lang='less' scoped>
.name-edit-wrap{
    padding: 20px;
}
</style>