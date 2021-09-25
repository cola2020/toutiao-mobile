<!-- 文章展示页面 -->
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="头条"
      @click-left="onClickLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">{{ article.pubdate|relativeTime }}</div>

          <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow()"
          >已关注</van-button>

          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFollow()"
          >关注</van-button>

        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content">
        </div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <!-- <articleComment :source="article.art_id"/> -->
        <!-- /文章评论 -->

      </div>
      <!-- /加载完成-文章详情 -->



      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap" >
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadActicles">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>



    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        badge="123"
        color="#777"
      />
      <van-icon
        :color="article.is_collected ? 'red' : '#777'"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect()"
      />
      <!-- 点赞图标 -->
      <van-icon
        :color="article.attitude === 1 ? 'red' : '#777'"
        :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onLike()"
      />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById, deleteCollect, addCollect, deleteLike, addLike } from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'

import { getItem } from '@/utils/storege'

// import ArticleComment from './components/article-comment'



export default {
    name: 'ArticleIndex',
    components: {
        // ArticleComment
    },

    // 动态路由传递的参数
    props: {
        // 为什么是两种类型
        // 1. 如果是输入 url 地址跳转到页面则为 String
        // 2. 直接在首页里面点击进入的文章详情则为Number
        articleId: {
            type: [Number, String],
            required: true
        }
    },
    data () {
        return {
            article: [], // 保存文章数据
            loading: true, // 控制显示加载的控件,初始为 true
            errorStatus: 0

        }
    },

    created () {
        this.loadActicles()

    },
    mounted () {},
    methods: {
        // 根据 id 加载文章
        async loadActicles() {
            this.loading = true
            try {
                const { data } = await getArticleById(this.articleId)
                this.article = data.data

                // 注意数据驱动视图渲染具有一定的延迟性
                // 在进行 article-content 节点获取的时候,该节点还未被渲染
                setTimeout(() => {
                    // 预览图片
                    this.PreviewImage()
                    // console.log(this.$refs['article-content'])
                }, 0);


                // 加载成功,停止显示加载
                // this.loading = false
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    this.errorStatus = 404
                }
                // this.loading = false
                console.log(error)
            }
            // 不管加载成功或者失败都要关闭加载状态
            this.loading = false
        },

        // 返回事件
        onClickLeft() {
            this.$router.back()
        },

        // 预览图片
        PreviewImage() {
            const articleContent = this.$refs['article-content']
            const imgs = articleContent.querySelectorAll('img')
            // console.log(imgs);

            // 获取一个装图片 url 的数组便于 PreviewImage 组件显示
            const images = []
            imgs.forEach((img, index) => {
                images.push(img.src)
                img.onclick = () => {
                    ImagePreview({
                        images: images,
                        // 起始位置,从 0 开始
                        startPosition: index
                    });
                }
            })
        },

        // 关注与取消关注事件
        async onFollow() {
            try {
                if (getItem('TOUTIAO_USER')) {
                    // 已登陆
                    // 已关注
                    if (this.article.is_followed) {
                        console.log(2);
                        const { data } = await deleteFollow(this.article.aut_id)
                        console.log(data);
                    // this.article.is_followed = false
                    } else {
                    // 不能关注自己
                        console.log(1);
                        const { data } = await addFollow(this.article.aut_id)
                        console.log(data);
                    // this.article.is_followed = true
                    }
                    this.article.is_followed = !this.article.is_followed
                } else {
                    // 未登录
                    this.$toast('请登录后操作！')
                }

            } catch (error) {
                this.$toast('操作失败请重试!')
            }
        },

        // 收藏与取消收藏事件
        async onCollect() {
            try {
                if (getItem('TOUTIAO_USER')) {
                    // 已经登陆
                    // 已收藏
                    if (this.article.is_collected) {
                        await deleteCollect(this.articleId)
                        this.$toast('取消收藏!')
                    } else {
                        await addCollect(this.articleId)
                        this.$toast('收藏成功!')
                    }
                    this.article.is_collected = !this.article.is_collected

                } else {
                    // 未登录
                    this.$toast('请登录后操作！')
                }
            } catch (error) {
                this.$toast('操作失败请重试!')
            }
        },

        // 点赞与取消点赞事件
        async onLike() {
            try {
                if (getItem('TOUTIAO_USER')) {
                    console.log(1);
                    // 已经登陆
                    // 已点赞
                    if (this.article.attitude === 1) {
                        await deleteLike(this.articleId)
                        this.article.attitude = -1
                        this.$toast.success('取消点赞 !')
                    } else {
                        // 未点赞
                        await addLike(this.articleId)
                        this.article.attitude = 1
                        this.$toast.success('点赞成功 !')
                    }
                } else {
                    // 未登录
                    this.$toast('请登录后操作 ！')
                }
            } catch (error) {
                this.$toast('操作失败请重试 !')
            }
        }


    }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  /deep/.van-nav-bar{
    .van-icon{
       color: #fff;
    }
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
