<template>
    <!-- :to="'/article/' + article.art_id -->
    <!-- 也可以使用 es6 模板字符串进行拼接 -->
    <!-- 还可以使用对象,对象直接放在 to 里面 -->
    <!-- {
            name: "acticle",
            params:{
                articleId: article.art_id
            }

        } -->
    <van-cell
        class="article-item"
        :to="'/article/' + article.art_id"
    >
        <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
        <div slot="label" class="">
            <!-- 有三张封面图片的情况 -->
            <div class="cover-warp" v-if="article.cover.type === 3">
                <div
                    class="cover-item"
                    v-for="(img,index) in article.cover.images"
                    :key="index"
                >
                    <van-image
                        class="cover-item-img"
                        fit="cover"
                        :src="article.cover.images[0]"
                    />
                </div>
            </div>

            <div class="label-infon-warp">
                <span>{{ article.aut_name }}</span>
                <span>{{ article.comm_count }}评论</span>
                <span>{{ article.pubdate | relativeTime}}</span>
            </div>
        </div>
        <!-- 一张封面的情况 -->
        <van-image
            class="cover-right"
            v-if="article.cover.type === 1"
            slot="default"
            fit="cover"
            :src="article.cover.images[0]"
        />
    </van-cell>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
        article: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
.article-item{
    .title{
        font-size: 32px;
    }
    .van-cell__value{
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
    }
    .cover-right{
        width: 232px;
        height: 146px;
    }

    .label-infon-warp span{
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }

    .cover-warp{
        display: flex;
        padding: 30px 0;
        .cover-item{
            flex: 1;
            height: 146px;
            &:not(:last-child){
                padding-right: 4px;
            }
            .cover-item-img{
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>

