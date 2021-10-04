<template>
  <div id="app">
    <!-- 路由的出口 -->
    <!-- <router-view/> -->
    <keep-alive include="LayoutIndex">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">

</style>
