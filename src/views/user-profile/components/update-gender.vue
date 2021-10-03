<!-- 更新用户性别 -->
<template>
    <div>
        <van-picker
            title="标题"
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            :default-index="defaultIndex"
            @change="onGenderChange"
            @cancel="$emit('close')"
        />
    </div>
</template>

<script>
/*
    1. 监听 change 事件来获取选择的性别
*/
import { updateUserProfile } from '@/api/user'
export default {
    name: 'UpdataUserNam',
    components: {},
    props: {
        value: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            // 默认选中的索引值
            defaultIndex: this.value,
            localGender: 0,
            columns: ['男', '女']
        };
    },
    methods: {
        // 监听选中的项被修改事件
        onGenderChange(picker, value, index) {
            // console.log(picker, value, index);
            this.localGender = index
        },

        // 修改性别
        async onConfirm() {
            this.$toast.loading({
                message: '保存中',
                forbidClick: true
            })
            // 更新 => 修改父组件的gender => 关闭弹出层
            try {
                await updateUserProfile({
                    // name: this.localName
                    gender: this.localGender
                })
                this.$emit('input', this.localGender)

                // this.$emit('update-name', this.localName)
                this.$emit('close')
                this.$toast.success('保存成功')
                // console.log(data);
            } catch (error) {
            }
        }

    },

    computed: {},

    mounted() {},

    created() {}


}

</script>
<style lang='less' scoped>


</style>