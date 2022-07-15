<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <van-tabbar route active-color="rgb(33, 185, 122)" inactive-color="#333">
      <van-tabbar-item to="/layout/home" name="home" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item to="/layout/hunting" name="search" icon="search"
        >找房</van-tabbar-item
      >
      <van-tabbar-item to="/layout/zixun" name="setting" icon="setting-o"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item to="/layout/my" name="friends" icon="friends-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
