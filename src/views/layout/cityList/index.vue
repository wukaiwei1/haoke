<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      title="收藏列表"
      @click-left="backToPerPage"
      :fixed="true"
      z-index="99999"
    >
      <template v-slot:left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>

    <van-index-bar
      sticky
      :sticky-offset-top="45"
      :index-list="indexList"
      highlight-color="#21b97a"
    >
      <!-- 当前城市 -->
      <van-index-anchor index="当前城市" />
      <van-cell :title="cityName" />
      <!-- 热门城市 -->
      <van-index-anchor index="热" />
      <van-cell
        :title="item.label"
        v-for="item in hotCityList"
        :key="item.pinyin"
        @click="changeCity(item.label)"
      />
      <!-- 所有城市 -->
      <div v-for="(item, index) in allAreaList" :key="index">
        <van-index-anchor :index="index"></van-index-anchor>
        <van-cell
          :title="e"
          v-for="(e, index) in item"
          :key="index"
          @click="changeCity(e)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCity, getHotCity } from '@/api/area'
export default {
  name: 'city',
  data() {
    return {
      // 所有城市列表
      cityList: [],
      // 热门城市列表
      hotCityList: [],
      // 索引数据
      indexList: [],
      // 渲染列表数据
      test: {},
      // 渲染索引数据
      list: [],
      cityName: '北京'
    }
  },
  created() {
    //   获取城市列表
    this.getCity()
    // 获取热门城市列表
    this.getHotCity()
    // 获取vuex中的城市名
    this.$store.state.cityName
      ? (this.cityName = this.$store.state.cityName.label)
      : (this.cityName = '北京')
  },
  methods: {
    //   返回上一步
    backToPerPage() {
      this.$router.back()
    },
    // 获取城市列表数据
    async getCity() {
      const res = await getCity('1')
      //   获取城市数据
      this.cityList = res.data.body
      console.log(this.cityList)
      this.cityList.sort((a, b) =>
        a.short[0] < b.short[0] ? -1 : a.short[0] > b.short[0] ? 1 : 0
      )
      // 获取数据的索引
      this.cityList.forEach((item) => {
        const key = item.short[0].toUpperCase()
        if (this.indexList.indexOf(key) === -1) {
          this.indexList.push(key)
        }
        this.indexList.sort((a, b) => {
          return a < b ? -1 : a > b ? 1 : 0
        })
      })
      this.indexList.unshift('#', '热')
    },
    // 获取热门城市列表数据
    async getHotCity() {
      const res = await getHotCity()
      // 获取城市数据
      this.hotCityList = res.data.body
    },
    // 点击切换城市
    changeCity(mycity) {
      // 将数据存入vuex
      const index = this.cityList.findIndex((item) => item.label === mycity)
      this.$store.commit('setCityName', this.cityList[index])
      // 跳转首页
      this.$router.push('/layout/home')
    }
  },
  computed: {
    // 渲染数据
    allAreaList() {
      this.indexList.forEach((item) => {
        if (item === '热' || item === '#') {
          return
        }
        if (!this.test[item]) {
          this.test[item] = []
        }
      })
      this.cityList.forEach((item) => {
        const key = item.short[0].toUpperCase()
        if (this.test[key]) {
          this.test[key].push(item.label)
        }
      })
      return this.test
    }
  }
}
</script>

<style scoped lang="less">
// 标题
:deep(.van-nav-bar__content) {
  // position: fixed;
  // top: 0;
  // height: 90px;
  // width: 100%;
  background-color: #21b97a;
  // z-index: 99999999;
  // margin-bottom: 42px;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-nav-bar__title {
    font-size: 36px;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
:deep(.van-index-bar) {
  padding-top: 90px;
}
:deep(.van-index-bar__index) {
  padding-top: 20px;
}
:deep(.van-index-anchor) {
  background-color: #f8f9f9;
}
:deep(.van-index-bar__index) {
  cursor: pointer;
}
</style>
