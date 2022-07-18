<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="收藏列表" @click-left="backToPerPage">
      <template v-slot:left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 信息列表 -->
    <van-card
      v-for="(item, index) in favoritesList"
      :key="index"
      :price="`${item.price}元/月`"
      :desc="item.desc"
      :title="item.title"
      :thumb="`http://liufusong.top:8080${item.houseImg}`"
      @click="houseCode(item.houseCode)"
    >
      <template #tags>
        <van-tag plain type="danger">近地铁</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script>
import { favorites } from '@/api/user'
export default {
  data() {
    return {
      favoritesList: Array
    }
  },
  async mounted() {
    try {
      // 加载中
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        // 一直加载中
        duration: 0
      })
      // const res = await favorites(token)
      const res = await favorites()
      this.favoritesList = res.data.body
      // 清除提示
      this.$toast.clear()
    } catch (error) {}
  },
  methods: {
    // 返回
    backToPerPage() {
      this.$router.back()
    },
    // 获取房屋code
    houseCode(code) {
      // 将房屋code值传入vuex中
      this.$store.commit('getCode', code)
      // 路由跳转页面
      this.$router.push('/house')
    }
  }
}
</script>

<style scoped lang="less">
// 标题部分
:deep(.van-nav-bar__content) {
  background-color: #21b97a;
  margin-bottom: 42px;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__title {
    font-size: 36px;
  }
  /deep/ .van-icon {
    color: #fff !important;
  }
}
// 列表部分
:deep(.van-card__title) {
  font-size: 30px;
  color: #394043;
  font-weight: 700;
}
:deep(.van-card__thumb) {
  margin-right: 30px !important;
}
</style>
