<!-- 更新头像 -->
<template>
    <div class="update-photo-container">
        <img :src="image" alt="" ref="image" class="image">
         <van-nav-bar
            class="nav-bar"
            left-text="取消"
            right-text="确认"
            @click-left="$emit('close')"
            @click-right="onConfirm"
         ></van-nav-bar>
    </div>
</template>

<script>
/*
    1. 如果要求 Content-Type 为 multipart/form-data，则必须传递 FormData 数据对象，专门用于文件上传
*/
import { updateUserPhoto } from '@/api/user'

// cropperjs照片裁切的样式以及核心库
// 确保图片在一个 div 容器中
// 确保图片显示的最好
import 'cropperjs/dist/cropper.css';
import Cropper from 'cropperjs';

export default {
    name: '',
    components: {},
    props: {
        file: {
            type: File,
            required: true
        }
    },
    data () {
        return {
            image: window.URL.createObjectURL(this.file),
            cropper: null // 裁切器图片实例
        };
    },

    computed: {},

    mounted() {
        const image = this.$refs.image
        this.cropper = new Cropper(image, {
            viewMode: 1,
            dragMode: 'move',
            aspectRatio: 1,
            // autoCropArea: 1,
            cropBoxMovable: false,
            cropBoxResizable: false,
            background: false,
            movable: true
        })

    },

    created() {},

    methods: {
        // 确认事件，点已确认修改头像
        async onConfirm() {

            this.$toast.loading({
                message: '保存中',
                forbidClick: true,
                duration: 0 // 持久展示
            })
            // console.log('confirm');


            const file = await this.getCroppedCanvas()
            const fd = new FormData()
            fd.append('photo', file)

            // 如果要求 Content-Type 为 multipart/form-data，则必须传递 FormData 数据对象，专门用于文件上传
            // const fd = new FormData()
            // fd.append('photo', this.file)
            await updateUserPhoto(fd)
            // console.log(data)

            this.$emit('update-photo', window.URL.createObjectURL(file))


            this.$emit('close')
            this.$toast.success('保存成功')
        },

        // 获取裁切后的图片
        getCroppedCanvas() {
            return new Promise(resolve => {
                this.cropper.getCroppedCanvas().toBlob((blob) => {
                    resolve(blob)
                })
            })
        }
    }
}

</script>
<style lang='less' scoped>
.update-photo-container{
    .nav-bar{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .image{
        display: block;
        /* This rule is very important, please don't ignore this */
        max-width: 100%;
    }
}
</style>