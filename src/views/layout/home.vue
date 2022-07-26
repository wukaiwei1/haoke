<template>
  <div style="margin-bottom: 50px">
    <!-- 轮播图部分 -->
    <van-swipe
      :autoplay="2000"
      indicator-color="#fff"
      class="swipers"
      lazy-render
    >
      <van-swipe-item v-for="item in picList" :key="item.id" class="itemPic">
        <img :src="`http://liufusong.top:8080${item.imgSrc}`" />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索部分 -->
    <div class="search">
      <div class="city" @click="getCity">
        {{ cityName }} <van-icon name="arrow-down" />
      </div>
      <span></span>
      <van-search
        v-model="value"
        placeholder="请输入小区或地址"
        class="searchNav"
      />
      <span class="icon_o"><van-icon name="location-o" /> </span>
    </div>
    <!-- 导航部分 -->
    <van-grid class="homeNav">
      <van-grid-item class="navIcon" icon="wap-home-o" text="整租" />
      <van-grid-item class="navIcon" icon="friends-o" text="合租" />
      <van-grid-item
        class="navIcon"
        icon="browsing-history-o"
        text="地图找房"
      />
      <van-grid-item
        class="navIcon"
        icon="home-o"
        text="去出租"
        @click="$router.push('/addHouse')"
      />
    </van-grid>
    <!-- 租房小组 -->
    <div class="more">
      <!-- 标题 -->
      <div class="title">
        <h4>租房小组</h4>
        <button @click="$router.push('/addHouse')">更多</button>
      </div>
      <div class="content">
        <van-row gutter="20">
          <van-col
            span="12"
            v-for="item in moreObj"
            :key="item.id"
            class="itemPic"
          >
            <div class="pic">
              <img :src="`http://liufusong.top:8080${item.imgSrc}`" alt="" />
            </div>
            <div class="txt">
              <p>{{ item.title }}</p>
              <p>{{ item.desc }}</p>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { slideshow, groups } from '@/api/home'
export default {
  data() {
    return {
      // 轮播图
      picList: Array,
      value: '',
      // 租房小组
      moreObj: [],
      // 当前城市
      cityName: '北京'
    }
  },
  async mounted() {
    // 获取轮播图资源
    const res = await slideshow()
    this.picList = res.data.body
    // 获取租房小组资源
    const getmore = await groups()
    this.moreObj = getmore.data.body
    // 获取vuex中的城市名
    this.$store.state.cityName
      ? (this.cityName = this.$store.state.cityName.label)
      : (this.cityName = '北京')
  },
  methods: {
    getCity() {
      this.$router.push('/cityList')
    }
  }
}
</script>

<style scoped lang="less">
.swipers {
  position: relative;
  height: 424px;
  .itemPic {
    width: 100%;
    height: 60px;
    img {
      width: 100%;
    }
  }

  :deep(.van-swipe__indicator) {
    width: 16px !important;
    border-radius: 50% !important;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
//搜索栏
.search {
  display: flex;
  width: 80%;
  height: 60px;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-55%);
  background-color: #fff;
  text-align: center;
  line-height: 60px;
  border-radius: 10px;
  .searchNav {
    // margin-left: 20px;
    padding: 0;
    box-sizing: border-box;
    width: 80%;
    height: 100%;
    line-height: 1 !important;
    border: 0;
    background-color: transparent;
  }
  .van-cell {
    line-height: 1;
  }
  .city {
    padding-left: 20px;
  }
  .van-search__content {
    background-color: transparent;
    // border-left: 1px solid #ccc;
  }
  > div {
    width: 100px;
    font-size: 28px;
  }
  .van-icon-arrow-down {
    margin-top: 3px;
    transform: scale(1);
  }
  span {
    margin-top: 15px;
    width: 25px;
    height: 30px;
    border-right: 1px solid #ccc;
  }
  .icon_o {
    position: absolute;
    right: -96px;
    top: -18px;
    width: 55px;
    height: 55px;
    text-align: center;
    line-height: 55px;
    border-radius: 50%;
    border: 5px solid #fff;
    color: #fff;
    // background-color: pink;
  }
}
// 导航部分
.homeNav {
  // margin-top: 50px;
  :deep(.van-grid-item__content::after) {
    border: 0;
  }
  :deep(.van-grid-item__icon) {
    width: 120px;
    height: 120px;
    color: #05b069;
    border-radius: 50%;
    background-color: #f2fbf7 !important;
    text-align: center;
    line-height: 120px;
  }
  :deep(.van-grid-item__text) {
    color: #333;
    font-size: 28px;
  }
}
:deep(.van-hairline--top::after) {
  border: 0 !important;
}
// 更多部分
.more {
  padding: 0 20px;
  background-color: #f6f5f6;
  // 标题
  .title {
    display: flex;
    padding: 30px 0px 30px 20px;
    justify-content: space-between;
    font-size: 30px;
    font-weight: normal;
    h4 {
      margin: 0;
    }
    button {
      margin: 0;
      padding: 0;
      border: 0;
      color: #787d82;
      font-size: 28px;
      background-color: transparent;
    }
  }
  // 内容部分
  .content {
    .van-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
    }
    .itemPic {
      width: 342px;
      display: flex;
      margin: 0 20px 20px 0;
      background-color: #fff;
      .pic {
        margin: 0 20px;
        width: 100px;
        height: 120px;
        padding-top: 30px;

        img {
          width: 100%;
        }
      }
      .txt {
        text-align: center;
        padding-top: 50px;
        padding-left: 20px;
        p {
          line-height: 1;
          margin: 0;
          color: #333;
          font-size: 28px;
        }
      }
    }
    .itemPic:nth-child(2n) {
      margin-right: 0;
      padding-left: 0 !important;
    }
  }
}
</style>
