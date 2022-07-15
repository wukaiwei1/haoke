<template>
  <div style="margin-bottom: 50px">
    <!-- 登录时显示 -->
    <userInfo v-if="token">
      <!-- 背景插槽 -->
      <template #bg="scope">
        <img :src="`http://liufusong.top:8080${scope.avatar}`" alt="" />
      </template>
      <!-- pic插槽 -->
      <template v-slot:pic="scope">
        <div class="myavatar">
          <img :src="`http://liufusong.top:8080${scope.avatar}`" alt="" />
        </div>
      </template>
      <!-- userinfo插槽 -->
      <template v-slot:userinfo="scope">
        <div class="my_user">
          <div class="username">{{ scope.nickname }}</div>
          <button type="primary" class="backBtn" @click="loginFn">退出</button>
          <p class="UserText">编辑个人资料<van-icon name="arrow" /></p>
        </div>
      </template>
      <!-- nav插槽 -->
      <template #userNav>
        <van-grid :column-num="3" :icon-size="26" >
          <van-grid-item @click="favorites" icon="star-o" text="我的收藏" />
          <van-grid-item icon="wap-home-o" text="我的出租" />
          <van-grid-item icon="clock-o" text="看房记录" />
          <van-grid-item icon="user-o" text="成为房主" />
          <van-grid-item icon="friends-o" text="个人资料" />
          <van-grid-item icon="phone-circle-o" text="联系我们" />
        </van-grid>
      </template>
    </userInfo>
    <!-- 未登录时显示 -->
    <userInfo v-else> </userInfo>
  </div>
</template>

<script>
// 引入复用组件
import userInfo from '@/components/userinfo.vue'
export default {
  data() {
    return {
      token: null
    }
  },
  mounted() {
    const token = localStorage.getItem('token')
    if (!token) {
      this.$toast('还没有登录,请登录开始租房之旅!')
    }
    this.token = token
  },
  components: {
    userInfo
  },
  methods: {
    // 退出
    loginFn() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否确定退出'
        })
        .then(() => {
          this.$router.push({ path: '/login' })
          // 清空token
          localStorage.removeItem('token')
        })
        .catch(() => {
          // on cancel
        })
    },
    // 我的收藏
    favorites() {
      this.$router.push({
        path: '/favorites'
      })
    }
  }
}
</script>

<style scope less>
.backBtn {
  /* width: 50px; */
  margin-top: -20px !important;
  padding: 0 30px;
  height: 50px !important;
  line-height: 50px !important;
  transform: scale(0.9, 0.9);
  border-radius: 25px !important;
  background-color: #21b97a;
  color: #fff;
  border: 0;
}
.UserText {
  color: #999;
  font-size: 12px;
  margin-top: 40px;
}
</style>
