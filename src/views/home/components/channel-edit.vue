<template>
    <div class="channel-edit">
        <!-- 我的频道 -->
        <van-cell :border="false">
            <div class="title-text" slot="title">我的关注</div>
            <!-- 默认插入到cell的右侧 -->
            <van-button
                class="edit-btn"
                type="info"
                size="mini"
                @click="isEdit = !isEdit"
            >
                {{ isEdit ? '完成' : '编辑' }}
            </van-button>
        </van-cell>

        <van-grid class="my-grid" :gutter="10">
            <van-grid-item
                class="grid-item"
                v-for="(channel,index) in myChannel"
                :key="index"
                @click="onMyChannelClick(channel,index)"
            >
                <!-- 注意我们此时使用v-show -->
                <van-icon
                    slot="icon"
                    name="clear"
                    v-show="isEdit && !fixedchannels.includes(channel.id)"
                >
                </van-icon>
                <!-- 第一个active是css类名 第二个是传递过来的active -->
                <span
                    class="text"
                    slot="text"
                    :class="{ active: index === active}"
                >
                    {{channel.name}}
                </span>
            </van-grid-item>
        </van-grid>
        <!-- /我的频道 -->

        <!-- 频道推荐 -->
        <van-cell class="recommend-cell" :border="false">
            <div class="title-text" slot="title">频道推荐</div>
            <span>点击频道以添加</span>
        </van-cell>

        <van-grid class="recommend-grid" :gutter="10">
            <van-grid-item
                class="grid-item"
                v-for="(channel,index) in recommendChannels"
                :key="index"
                :text="channel.name"
                @click="onChannelAdd(channel)" />
        </van-grid>
        <!-- /频道推荐 -->
    </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storege'

export default {
    name: 'ChannelEdit',

    components: { },

    props: {
        myChannel: {
            type: Array,
            required: true
        },
        active: {
            type: Number,
            required: true
        }
    },

    data() {
        return {
            allChannel: [], // 存储所有频道
            isEdit: false, // 控制我的频道右上角清除icon显示状态
            fixedchannels: [0] // 存储不可以被清除的频道的id
        };
    },

    mounted() {

    },


    created () {
        this.loadAllChannel()
    },

    methods: {
        // 加载所有频道
        async loadAllChannel() {
            try {
                const { data } = await getAllChannels()
                this.allChannel = data.data.channels
                // console.log(this.allChannel);
                // console.log(this.myChannel);
            } catch (error) {
            }
        },

        // 点击添加频道(推荐频道的点击事件)
        async onChannelAdd(channel) {
            // console.log(channel);
            // 响应式,不需要将channel从所有频道中删除,原因是计算属性
            // 计算属性中的数据只要发生变化,就会从新计算

            // 1. 将点击的 channel 添加到 mychannels
            this.myChannel.push(channel)

            // 2 .数据持久化处理
            // 登录将数据存储到线上
            // 没有登陆则存储到本地
            if (this.user) {
                // 已经登陆
                try {
                    await addUserChannel({
                        id: channel.id, // 频道id
                        seq: this.myChannel.length // 序号
                    })
                } catch (error) {
                    // console.log();
                    this.$toast('保存失败,请稍后重试')
                }
            } else {
                // 没有登陆
                setItem('TOUTIAO_CHANNELS', this.myChannel)
            }
        },

        // 我的频道点击事件
        onMyChannelClick(channel, index) {
            if (this.isEdit) {
                // 1. 如果是固定数组则不能删除
                if (this.fixedchannels.includes(channel.id)) {
                    return
                }

                // 2. 编辑状态下,点击删除
                this.myChannel.splice(index, 1)


                // 3 .如果删除的频道在激活的频道前面,则删除后激活的频道会改变
                // 原因是删除频道不会影响到active的改变 -1来解决
                // 第三个参数是为了控制频道编辑弹出层的状态
                if (this.active >= index) {
                    this.$emit('update-active', this.active - 1, true);
                }

                // 4 .数据持久化
                this.deleteChannel(channel)

            } else {
                // 非编辑状态 修改home的active
                this.$emit('update-active', index, false);
            }

        },

        // 频道删除
        async deleteChannel(channel) {
            try {
                if (this.user) {
                    await deleteUserChannel(channel.id)
                } else {
                // 没有登陆
                    setItem('TOUTIAO_CHANNELS', this.myChannel)
                }
            } catch (error) {
                this.$toast('操作失败,请稍后重试')
            }
        }
    },
    computed: {
        ...mapState(['user']),

        // 简洁写法
        // 找出剩余频道
        recommendChannels() {
            return this.allChannel.filter(channel => {
                return !this.myChannel.find(myChannel => {
                    return myChannel.id === channel.id
                })
            })
        }


        // recommendChannels() {
        //     const channels = []
        //     // 1. 首先对所有channel进行遍历
        //     // 2. 判断每个channel是否在myChannel中出现
        //     // 3. 没有出现则添加到存储推荐频道列表
        //     // 4. 注意find方法返回的是值
        //     // 5. 所以频道不包括推荐频道
        //     this.allChannel.forEach(channel => {
        //         const ret = this.myChannel.find(myChannel => {
        //             return myChannel.id === channel.id
        //         })
        //         if (!ret) {
        //             // 错误示范
        //             // channel.push(ret)
        //             channels.push(channel)
        //         }
        //     })
        //     return channels
        // }
    }

};
</script>

<style lang="less" scoped>
.channel-edit{
    padding: 120px 0;

    .title-text{
        font-size: 32px;
        color: #333;
    }

    .edit-btn{
        width: 104px;
        height: 48px;
        line-height: 48px;
        font-size: 26px;
    }

    /deep/ .grid-item{
        width: 160px;
        height: 86px;
        .van-grid-item__content{
            // 文字不换行
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item__text, .text{
                font-size: 28px;
                color: #222;
                margin-top: 0;
                line-height: 1;
            }
            .active{
                color: #3296fa;
            }
        }
    }

    /deep/ .my-grid{
        margin-top: 20px;
        .grid-item{
            .van-icon-clear{
                position: absolute;
                top: -10px;
                right: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
            .van-grid-item__icon-wrapper{
                position: unset;
            }
        }
    }

    /deep/ .recommend-grid{
        margin-top: 20px;
        .grid-item{
            .van-grid-item__content{
                flex-direction: row;
                .van-icon-plus{
                    font-size: 28px;
                    margin-right: 6px;
                }
            }
        }
    }

    .recommend-cell{
        margin-top: 20px;
    }
}
</style>