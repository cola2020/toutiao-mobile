## 第一次提交

线上地址: http://121.41.113.77:9001

默认账号: 13911111112

验证码: 246810

### 介绍

toutiao-m 是基于 vue 的移动端项目，所使用到的技术有

1. vue vue-Router vueX
2. axios
3. vant-ui

### 基本功能

1. 登录
2. 浏览、搜索文章
3. 浏览、管理自己的信息
4. 关注用户，收藏、点赞喜爱的文章



该项目可以帮助你了解

1. 代码封装
2. 样式穿透

### 下载依赖

```
npm install
```

### 启动
```
npm run serve
```

### 浏览

在浏览器中键入 http://localhost:8080 即可预览项目



### 其他应该注意的事情

1. 本项目是观看自 b 站 up 主 ' 李闹的 ' 头条移动端视频并仿写，有兴趣可移至 b 站浏览，地址：

   https://b23.tv/zA8nBD

2. 视频中的接口于 9 月份开始维护，代码中的接口是由群友提供，且一些功能无法正常完成(也有可能接口有效，代码书写有误)

3. 整个项目还未完成

4. 如有问题欲 探讨请添加 QQ 1834563532



## 第二次提交

### bug

1. 在显示评论的接口中，使用文章的 id 会有 bug ，原因是 id 常常超过了 js 能够存储的最大整数位，

2. 在使用 id 获取文章详情的时候，传递的是是 经过大数处理的 articleId，这里的大数处理说的是后端传递过来的全部文章数据的 id 转换成 使用插件处理后的数组进行表示，使用这样的 id 可以获取正确的文章详情，但使用这样的 id 却无法获取评论



## 第三次提交

### 新增

1. 新加 问答，视频页面布局
2. 增加了修改用户头像，性别，昵称等功能
   1. 修改用户性别接口好像有问题，返回数据成功但是刷新之后就失效
3. 新增评论，使用的假数据

### 优化

1. 使用  keep-alive 缓存组件



## 第四次提交

### 新增

1. 增加 main-dev.js 和 main-prod.js 以区 开发发环境 和 生产环境 
2. 新增修改用户生日和裁剪图片用作头像

### 上线

1. 项目已经上线，地址为121.41.113.77:9001

### 优化

1. 在生产环境加入`import 'vant/lib/icon/local.css'`，解决打包后 图标 显示问题



## 第五次提交

### 优化

1. 进一步使用 keep-alive 缓存列表组件，使浏览文章详情之后返回列表无需重复加载
2. 解决返回列表组件时默认回到顶部的问题，优化了用户体验
