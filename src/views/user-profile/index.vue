<!-- 展示用户资料 -->
<template>
    <!--
                1. 在组件上使用 v-model
                2. 子组件既要使用这个值，又要修改这个值
                3. 给子组件默认传递了一个名为 value 的值  :value="user.name"
                4. 监听自组建的输入事件 @input = "user.name = $event"
                6. 多个属性需要使用 .sync 修饰符
                7. .sync 相当于床底了一个值给子组件，并且（:genter.sync="user.gender"）
                    1. :gender = "user.name"
                    2. @update:gender="user.gender = $event"
                8. 子组件使用时 this.$emit('update:gender',this.gender),在 7 中的 2 已经修改
                9. 一般把比较常用的值使用v-model，不常用的值使用 .async

                10. 使用 v-if 条件渲染，修改名字之后没有点保存，下次回来的时候名字还在

                // 修改头像
                11. 表单元素设置 hidden 属性直接是 displsy: none
                    1. file 类型的表单设置 accept 类型可以筛选文件类型
                12. 通过点击头像栏触发文件表单的点击事件，来选择文件
                13. 通过监听表单的 chnage 事件来获取选择的图片
                14. 需要做图片预览的时候，使用const blob = window.URL.createObjectURL(this.$refs.file.files[0])
                    来获取图片的 url

    -->
    <div class="user-container">
        <van-nav-bar class="nav-bar" title="个人信息" left-arrow @click-left="$router.back()"/>
        <van-cell-group class="info-container">

            <input type="file" hidden ref="file" accept="image/*" @change="onFileChange">

            <van-cell title="头像" is-link center @click="$refs.file.click()">
                <van-image
                    round
                    width="30"
                    height="30"
                    fit="cover"
                    :src="user.photo"
                />
            </van-cell>

            <van-cell title="昵称" :value="user.name" is-link @click="isEditNameShow = true"/>

            <van-cell
                title="性别"
                :value="user.gender === 0 ? '男': '女'"
                is-link
                @click="isEditGenderShow = true"
            />

            <van-cell title="生日" :value="user.birthday" is-link @click="isEditbirthdayShow = true"/>
        </van-cell-group>

        <!-- 修改头像的弹出层 -->
        <van-popup
            v-model="isEditPhotoShow"
            position="bottom"
            :style="{ height: '100%'}"

        >
            <update-photo
                v-if="isEditPhotoShow"
                :file="file"
                @close="isEditPhotoShow = false"
                @update-photo="user.photo = $event"
            ></update-photo>
        </van-popup>
        <!-- /修改头像的弹出层 -->

        <!-- 修改名字的弹出层 -->
        <van-popup
            v-model="isEditNameShow"
            position="bottom"
            :style="{ height: '100%'}"
        >

            <!-- <update-name
                @close="isEditNameShow = false"
                :name="user.name"
                @update-name="user.name = $event"
            ></update-name> -->

            <update-name
                v-if="isEditNameShow"
                @close="isEditNameShow = false"
                v-model="user.name"
            ></update-name>
        </van-popup>
        <!-- 修改名字的弹出层 -->

        <!-- 修改性别弹出层 -->
        <van-popup
            v-model="isEditGenderShow"
            position="bottom"

        >
            <update-gender
                v-model="user.gender"
                @close="isEditGenderShow = false"
            ></update-gender>
        </van-popup>
        <!-- /修改性别弹出层 -->

        <!-- 修改性别弹出层 -->
        <van-popup
            v-model="isEditbirthdayShow"
            position="bottom"

        >
            <update-brithday
                v-model="user.birthday"
                @close="isEditbirthdayShow = false"
            >
            </update-brithday>
        </van-popup>
        <!-- /修改性别弹出层 -->

    </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import updateGender from './components/update-gender.vue'
import updatePhoto from './components/update-photo.vue'
import updateBrithday from './components/update-birthday.vue'

export default {
    name: 'UserPofile',
    components: { updateName, updateGender, updatePhoto, updateBrithday },
    data () {
        return {
            user: {}, // 用户信息
            isEditNameShow: false, // 是否展示修改名字弹出层
            isEditGenderShow: false, // 是否展示修改性别弹出层
            isEditPhotoShow: false, // 是否显示修改头像弹出层
            isEditbirthdayShow: false, //
            file: null // 存储修改的头像
        };
    },
    methods: {
        // 加载用户的信息
        async loadUserProfile() {
            const { data } = await getUserProfile()
            this.user = data.data
        },

        // 监听文件切换事件
        onFileChange() {
            // console.log(this.$refs.file.value);
            this.isEditPhotoShow = true

            // const blob = window.URL.createObjectURL(this.$refs.file.files[0])

            // 传递文件对象而不路径为了后面组件的使用
            const file = this.$refs.file.files[0]
            this.file = file
            // 解决上一次和这次选择的图片一样不触发事件的问题
            this.$refs.file.value = ''
        }
    },
    created () {
        this.loadUserProfile()
    }
}

</script>
<style lang='less' scoped>
.user-container{
    .nav-bar{
        margin: 20px auto;
        width: 700px;
        border-radius: 20px;
    }

    .info-container{
        margin: 20px auto;
        width: 700px;
        // display: block;
        border-radius: 20px;
        overflow: hidden;
    }

    .van-popup{
        background-color: #EEEEEE;
    }
}
</style>