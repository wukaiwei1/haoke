<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar
      :title="(houseList && houseList.desc && houseList.desc[3]) || '暂无信息'"
      @click-left="backToPerPage"
    >
      <template v-slot:left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 图片 -->
    <div class="Housepic">
      <img :src="`http://liufusong.top:8080${houseList.houseImg}`" alt="" />
    </div>
    <!-- 信息 -->
    <div class="message">
      <div class="title">
        <h4>{{ houseList.title || '暂无' }}</h4>
        <span>近地铁</span>
      </div>
      <div class="price">
        <van-grid :column-num="3" :border="false">
          <van-grid-item text="租金">
            <template #icon>
              <span>{{ houseList.price || '暂无' }}/月</span>
            </template>
          </van-grid-item>
          <van-grid-item text="房型">
            <template #icon>
              <span>{{
                (houseList && houseList.desc && houseList.desc[0]) || '暂无'
              }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="面积">
            <template #icon>
              <span>{{
                (houseList && houseList.desc && houseList.desc[1]) || '暂无'
              }}</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="info">
        <div class="picInfo">
          <div><span>装修: </span> 精装</div>
          <div>
            <span>朝向: </span>
            {{ (houseList && houseList.desc && houseList.desc[2]) || '暂无' }}
          </div>
        </div>
        <div class="picInfo">
          <div><span>楼层: </span> 中楼层</div>
          <div><span>类型: </span> 普通住宅</div>
        </div>
      </div>
    </div>
    <!-- 地图位置 -->
    <div class="HouseDetail_map">
      <h4>小区:天山星城</h4>
      <!-- 地图 -->
      <div class="map"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      houseList: [],
      info: []
    }
  },
  created() {
    this.houseList =
      (this.$store && this.$store.state && this.$store.state.houseCode) || []
  },
  methods: {
    backToPerPage() {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
// body {
//   background-color: #333 !important;
// }
// 标题部分
:deep(.van-nav-bar__content) {
  background-color: #21b97a;
  //   margin-bottom: 42px;
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
// 房屋图片部分
.Housepic {
  height: 500px;
  img {
    width: 100%;
    height: 100%;
  }
}
// 信息部分
.message {
  padding: 30px;
  padding-bottom: 0;
  .title {
    h4 {
      margin: 32px 0;
      margin-bottom: 10px;
      font-size: 32px;
      color: #333;
      font-weight: normal;
    }
    span {
      padding: 4px 5px;
      font-size: 24px;
      color: #39becd;
      border-radius: 6px;
      background-color: #e1f5f8;
    }
  }
  .price {
    margin: 30px 0;
    padding: 30px 0;
    // background-color: pink;
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
    :deep(.van-grid-item__content) {
      padding: 0;
    }
    :deep(.van-grid-item__icon-wrapper) {
      color: #fa5741;
      font-size: 36px;
      font-weight: 700;
    }
    :deep(.van-grid-item__text) {
      margin-top: 10px;
      color: #999;
      font-size: 28px;
    }
  }
  .picInfo {
    display: flex;
    justify-content: flex-start;
    margin: 20px;
    font-size: 26px;
    color: #333;
    div {
      width: 50%;
      span {
        color: #999;
      }
    }
  }
}
//小区位置
.HouseDetail_map {
  margin-top: 20px;
  font-size: 28px;
  border-top: 20px solid #f6f5f6;
  font-weight: normal;
  color: #666;
  h4 {
    margin: 0 30px;
    line-height: 2;
  }
  .map {
    height: 290px;
    width: 100%;
    background-color: pink;
  }
}
</style>
