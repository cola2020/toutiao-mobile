<!-- 更新生日 -->
<template>
    <div class="update-brithday-container">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
            @cancel="$emit('close')"
            @confirm="onConfirm()"
        />
    </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'

export default {
    name: 'updateBrithday',
    components: {},
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            minDate: new Date(1997, 0, 1),
            maxDate: new Date(),
            currentDate: new Date(this.value)
        };
    },

    computed: {},

    mounted() {},

    created() {},

    methods: {
        async onConfirm() {
            this.$toast.loading({
                message: '保存中',
                forbidClick: true
            })
            // 更新 => 修改父组件的birthday => 关闭弹出层
            try {
                const date = dayjs(this.currentDate).format('YYYY-MM-DD')

                await updateUserProfile({
                    // name: this.localName
                    birthday: date
                })
                this.$emit('input', date)

                // this.$emit('update-name', this.localName)
                this.$emit('close')
                this.$toast.success('保存成功')
                // console.log(data);
            } catch (error) {
            }
        }
    }
}

</script>
<style lang='less' scoped>

</style>