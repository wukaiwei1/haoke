<template>
  <div class="app" style="margin-bottom: 250px">
    <!-- 标题 -->
    <van-nav-bar
      :title="(houseList && houseList.community) || '暂无信息'"
      @click-left="backToPerPage"
    >
      <template v-slot:left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 图片 -->
    <div class="Housepic">
      <img
        :src="`http://liufusong.top:8080${
          houseList.houseImg && houseList.houseImg[0]
        }`"
        alt=""
      />
    </div>
    <!-- 信息 -->
    <div class="message">
      <div class="title">
        <h4>{{ houseList.title || '暂无' }}</h4>
        <span>{{ (houseList.tags && houseList.tags[0]) || '暂无' }}</span>
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
              <span>{{ (houseList && houseList.roomType) || '暂无' }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="面积">
            <template #icon>
              <span>{{ (houseList && houseList.size) || '暂无' }}/平米</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="info">
        <div class="picInfo">
          <div><span>装修: </span> 精装</div>
          <div>
            <span>朝向: </span>
            {{ (houseList.oriented && houseList.oriented[0]) || '暂无' }}
          </div>
        </div>
        <div class="picInfo">
          <div>
            <span>楼层: </span> {{ (houseList && houseList.floor) || '暂无' }}
          </div>
          <div><span>类型: </span> 普通住宅</div>
        </div>
      </div>
    </div>
    <!-- 地图位置 -->
    <div class="HouseDetail_map">
      <h4>小区:天山星城</h4>
      <!-- 地图 -->
      <div class="map"></div>
      <!-- 房屋配套 -->
      <van-cell-group class="houseTit">
        <van-cell title="房源配套" class="title" />
        <van-grid :column-num="5" :border="false">
          <van-grid-item
            :text="item.name"
            v-for="(item, index) in info"
            :key="index"
          >
            <template #icon>
              <i class="iconfont" :class="item.icon"></i>
            </template>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
    </div>
    <!-- 房源 -->
    <div class="HouseDetail_set">
      <van-cell title="房源概况" class="title" />
      <!-- 房东信息 -->
      <van-row class="userRow">
        <van-col span="12" class="huseInfo">
          <img src="../../../assets/image/houserUser.png" alt="" />
          <div class="wang">
            <span>王女士</span>
            <p><van-icon name="shield-o" />已认证房东</p>
          </div>
        </van-col>
        <van-col span="12" class="faxiaoxi">
          <van-button>发消息</van-button>
        </van-col>
      </van-row>
      <div class="dome">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div class="houseLove">
      <van-cell title="猜你喜欢" class="title" />
      <van-card
        :price="`${(houseList && houseList.price) || '暂无'}元/月`"
        :desc="houseList.desc"
        :title="houseList.title"
        :thumb="`http://liufusong.top:8080${houseList.houseImg}`"
      >
        <template #tags>
          <van-tag plain type="danger">近地铁</van-tag>
        </template>
      </van-card>
      <van-card
        :price="`${(houseList && houseList.price) || '暂无'}元/月`"
        :desc="houseList.desc"
        :title="houseList.title"
        :thumb="`http://liufusong.top:8080${houseList.houseImg}`"
      >
        <template #tags>
          <van-tag plain type="danger">近地铁</van-tag>
        </template>
      </van-card>

      <van-card
        :price="`${(houseList && houseList.price) || '暂无'}元/月`"
        :desc="houseList.desc"
        :title="houseList.title"
        :thumb="`http://liufusong.top:8080${houseList.houseImg}`"
      >
        <template #tags>
          <van-tag plain type="danger">近地铁</van-tag>
        </template>
      </van-card>
    </div>
    <!-- 底部按钮 -->
    <van-tabbar>
      <van-tabbar-item @click.prevent="changeHouse">
        <van-icon name="star" :class="{ colorChange: isFavorite === true }" />
        收藏
      </van-tabbar-item>
      <van-tabbar-item>在线咨询</van-tabbar-item>
      <van-tabbar-item>电话预约</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { getHouse, addHouse, removeHouse, isAddHouse } from '@/api/house'
export default {
  name: 'setHouse',
  data() {
    return {
      houseList: '',
      // 房屋配套初始值
      house: [
        { name: '衣柜', icon: 'icon-yigui' },
        { name: '洗衣机', icon: 'icon-xiyiji' },
        { name: '空调', icon: 'icon-kongtiao' },
        { name: '天然气', icon: 'icon-tianranqi' },
        { name: '冰箱', icon: 'icon-bingxiang' },
        { name: '暖气', icon: 'icon-nuanqi-' },
        { name: '电视', icon: 'icon-dianshiji' },
        { name: '热水器', icon: 'icon-reshuiqi' },
        { name: '宽带', icon: 'icon-kuandai' },
        { name: '沙发', icon: 'icon-shafa' }
      ],
      // 接收房屋配套数据
      houseIcon: [],
      // 最终渲染的房屋配套数据
      info: [],
      isFavorite: null
      // 收藏||取消收藏
      // isHouse: true
    }
  },
  async created() {
    try {
      // 加载中
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        // 一直加载中
        duration: 0
      })
      // 从vuex中获取房屋code值
      const code = this.$store.state.houseCode
      // 获取房屋数据
      const res = await getHouse(code)
      // 清除提示
      this.$toast.clear()
      // 渲染数据
      this.houseList = res.data.body
      console.log(this.houseList)
      // 房屋配套数据
      this.houseIcon = res.data.body.supporting
      this.houseIcon.forEach((item) => {
        const index = this.house.findIndex((res) => {
          return res.name === item
        })
        this.info.push(this.house[index])
      })
    } catch (error) {
      console.log('数据请求错误')
    }
    // 查询房屋是否被收藏
    try {
      // 从vuex中获取房屋code值
      const code = this.$store.state.houseCode
      // 获取房屋数据
      const res = await isAddHouse(code)
      this.isFavorite = res.data.body.isFavorite
    } catch (error) {}
  },
  methods: {
    backToPerPage() {
      this.$router.back()
    },
    // 取消收藏||加入收藏
    async changeHouse() {
      if (this.isFavorite) {
        // 从vuex中获取房屋code值
        const code = this.$store.state.houseCode
        // 取消收藏 removeHouse
        await removeHouse(code)
        // 取消颜色类名
        this.isFavorite = false
        // 提示
        this.$toast('取消收藏成功')
      } else {
        // 从vuex中获取房屋code值
        const code = this.$store.state.houseCode
        // 添加收藏 addHouse
        await addHouse(code)
        // 添加颜色类名
        this.isFavorite = true
        // 提示
        this.$toast('添加收藏成功')
      }
    }
  }
}
</script>

<style scoped lang="less">
.app {
  background-color: #f6f5f6;
  height: 200vh;
  padding-bottom: 50px;
}
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
  background-color: #fff;
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
  // border-top: 20px solid #f6f5f6;
  background-color: #fff;
  font-weight: normal;
  color: #666;
  h4 {
    margin: 0 30px;
    line-height: 2;
  }
  .map {
    height: 290px;
    width: 100%;
    background-color: skyblue;
  }
}
// 房屋配套
.title {
  padding: 20px 0;
  font-size: 30px;
  font-weight: 700;
  border-bottom: 2px solid #cecece;
  color: #333;
}
.houseTit {
  margin: 0 30px;
  :deep(.van-grid-item__text) {
    color: #333;
    font-size: 28px;
    margin-top: 20px;
  }
  .iconfont {
    font-size: 46px;
    color: #333;
  }
}
// 房屋概况
.HouseDetail_set {
  margin-top: 20px;
  padding: 0 30px;
  background-color: #fff;
  .userRow {
    margin-top: 40px;
    padding-bottom: 20px;
    .huseInfo {
      display: flex;
      img {
        margin-right: 30px;
        width: 100px;
        height: 100px;
      }
      .wang {
        font-size: 28px;
        p {
          font-size: 22px;
          color: red;
        }
      }
    }
    .faxiaoxi {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .van-button {
        height: 60px;
        color: #33be85;
        font-size: 28px;
        padding: 6px 30px;
        border-radius: 5px;
        border: 2px solid #33be85;
      }
    }
  }
  .dome {
    font-size: 28px;
    color: #333;
    padding: 20px 0;
    margin-bottom: 20px;
  }
}
// 猜你喜欢
.houseLove {
  padding: 0 30px;
  background-color: #fff;
  :deep(.van-card__header) {
    padding: 0;
    background-color: #fff;
  }
  :deep(.van-card) {
    padding: 0;
  }
}
.colorChange {
  color: red;
}
// 底部导航
.van-hairline--top-bottom {
  border-top: 2px solid #ccc;
  .van-tabbar-item {
    height: 100px;
    font-size: 34px;
    color: #999;
    &:nth-child(2) {
      border-left: 2px solid #ccc;
      border-right: 2px solid #ccc;
    }
    &:nth-child(3) {
      background-color: #21b97a;
      color: #fff;
    }
    .van-icon-star {
      font-size: 32px;
    }
  }
}
</style>
