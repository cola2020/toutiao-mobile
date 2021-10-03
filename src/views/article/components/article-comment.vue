<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <!-- <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    > -->

    <!-- 由于使用假数据,所以就不使用上面那样书写 -->
    <van-list
      finished-text="没有更多了"
    >
      <comment-item v-for="item in list" :key="item.com_id" :comment="item">
        <!-- <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span style="color: #466b9d;" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636;">我出去跟别人说我的是。。。</p>
          <p>
            <span style="margin-right: 10px;">3天前</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />-->
      </comment-item>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
// import { getComments } from '@/api/comment'
import CommentItem from './comment-item'


export default {
    name: 'ArticleComment',
    components: {
        CommentItem
    },
    props: {
        // 接受的文章 id
        source: {
            type: [String, Number, Object],
            required: true
        }
    },
    data() {
        return {
            // 模拟的假数据
            list: [
                {
                    com_id: 12138,
                    aut_id: 1,
                    aut_name: '白龙',
                    pubdate: '2021-9-25',
                    content: 'hello',
                    aut_photo: 'https://pic.imgdb.cn/item/6156664f2ab3f51d91bca683.png',
                    like_count: 10,
                    reply_count: 12,
                    is_liking: false

                },
                {
                    com_id: 12139,
                    aut_id: 1,
                    aut_name: '白龙',
                    pubdate: '2021-9-30T22:08:21',
                    content: 'world',
                    aut_photo: 'https://pic.imgdb.cn/item/6156664f2ab3f51d91bca683.png',
                    like_count: 10,
                    reply_count: 10,
                    is_liking: false
                },
                {
                    com_id: 12134,
                    aut_id: 1,
                    aut_name: '白龙',
                    pubdate: '2021-9-28T22:08:21',
                    content: 'world',
                    aut_photo: 'https://pic.imgdb.cn/item/6156664f2ab3f51d91bca683.png',
                    like_count: 10,
                    reply_count: 13,
                    is_liking: false
                }
            ], // 评论列表
            loading: false, // 上拉加载更多的 loading
            finished: false, // 是否加载结束
            // offset

            articleComment: { // 文章评论相关数据
                list: [],
                loading: false,
                finished: false,
                offset: null, // 请求下一页数据的页码
                totalCount: 0 // 总数据条数
            }
        };
    },

    methods: {
        // 获取评论(存在错误 1. 接口问题 2. 代码问题)
        // List 初始化后会触发一次 load 事件，用于加载第一屏的数据
        // async onLoad () {
        //     try {
        // const articleComment = this.articleComment
        // 1. 请求获取数据
        // this.source = Number(this.source)
        // console.log(this.source);
        // const { data } = await getComments({
        //     type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        //     source: 1323822606880604160 // 源id，文章id或评论id
        //     // offset: null, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        //     // limit: 10 // 每页大小
        // })

        // 2. 将数据添加到列表中
        // console.log(data);
        // const { results } = data.data
        // articleComment.list.push(...results)

        // // 更新总数据条数
        // articleComment.totalCount = data.data.total_count

        // 3. 将加载更多的 loading 设置为 false
        // articleComment.loading = false

        // 4. 判断是否还有数据
        // if (results.length) {
        //     articleComment.offset = data.data.last_id // 更新获取下一页数据的页码
        // } else {
        //     articleComment.finished = true // 没有数据了，关闭加载更多
        // }

        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
    },

    // 在这个时候可以操作 vm 上的数据了
    created () {
        // 把文章的总评论数传递给父组件用于展示
        // console.log(123);
        this.$emit('onload-success', this.list)
    }
};
</script>

<style scoped lang="less">
  .publish-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  }

  .van-list {
    margin-bottom: 45px;
  }
</style>