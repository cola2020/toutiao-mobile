<!-- 搜索历史 -->
<template>
    <div class="search-history">
        <van-cell title="历史记录" >
            <div v-if="isDeleteShow">
                <span >全部删除</span>
                &nbsp;&nbsp;
                <span @click="isDeleteShow = false">完成</span>
            </div>
            <van-icon name="delete-o" v-else @click="isDeleteShow = true"/>
        </van-cell>

        <van-cell
            :title="item"
            v-for="(item, index) in searchHistories"
            :key="index"
            @click="onHistoryClick(item, index)"
        >
            <van-icon name="close" v-show="isDeleteShow"></van-icon>
        </van-cell>

    </div>
</template>

<script>
import { setItem } from '@/utils/storege'
export default {
    name: 'SearchHistory',
    components: {},
    props: {
        searchHistories: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            isDeleteShow: false
        };
    },

    computed: {},

    mounted() {},

    created() {},

    methods: {
        onHistoryClick (item, index) {
            // 如果是删除状态，则执行删除操作
            if (this.isDeleteShow) {
                this.searchHistories.splice(index, 1)
                setItem('serach-histories', this.searchHistories)
            } else {
                // 否则执行搜索操作
                // this.onSearch(item)
                // 传递数据 子传父亲
                this.$emit('search', item);
            }
        }
    }
}

</script>
<style lang='less' scoped>

</style>