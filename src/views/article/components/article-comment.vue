<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="item in list" :key="item" :title="item">
        <van-image
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
        <van-icon slot="right-icon" name="like-o" />
      </van-cell> -->
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
import { getComments } from '@/api/comment'

export default {
    name: 'ArticleComment',
    props: {
        // 接受的文章 id
        source: {
            type: [String, Number, Object],
            required: true
        }
    },
    data() {
        return {
            list: [], // 评论列表
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
        // 获取评论
        async onLoad () {
            try {
                // const articleComment = this.articleComment
                // 1. 请求获取数据
                // console.log(JSONBig.parse(this.scource));
                // console.log();
                // console.log(this.source);
                this.source = Number(this.source)
                // console.log(this.source);
                const { data } = await getComments({
                    type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
                    // 1323822606880604200
                    source: 1323822606880604160 // 源id，文章id或评论id
                    // offset: null, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
                    // limit: 10 // 每页大小
                })

                // 2. 将数据添加到列表中
                console.log(data);
                // const { results } = data.data
                // articleComment.list.push(...results)

                // 更新总数据条数
                // articleComment.totalCount = data.data.total_count

                // // 3. 将加载更多的 loading 设置为 false
                // articleComment.loading = false

                // // 4. 判断是否还有数据
                // if (results.length) {
                //     articleComment.offset = data.data.last_id // 更新获取下一页数据的页码
                // } else {
                //     articleComment.finished = true // 没有数据了，关闭加载更多
                // }
            } catch (error) {
                console.log(error);
            }
        }
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