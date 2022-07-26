<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar left-arrow class="titleHouse">
      <template #title>
        <!-- 搜索部分 -->
        <div class="search">
          <div class="city">
            {{ $store.state.cityName.label }} <van-icon name="arrow-down" />
          </div>
          <span></span>
          <van-search
            v-model="value"
            placeholder="请输入小区或地址"
            class="searchNav"
          />
        </div>
      </template>
      <template #right>
        <span class="icon_o"><van-icon name="location-o" /> </span>
      </template>
    </van-nav-bar>
    <!-- 下拉列表 -->
    <van-dropdown-menu>
      <!-- 区域部分 -->
      <van-dropdown-item ref="area">
        <template #title> 区域 </template>
        <van-picker :columns="cityArea" value-key="label" ref="areaPicker" />
        <div class="btn">
          <van-button @click="$refs.area.toggle()">取消</van-button>
          <van-button @click="getArea">确认</van-button>
        </div>
      </van-dropdown-item>
      <!-- 方式功能 -->
      <van-dropdown-item ref="mode">
        <template #title>方式</template>
        <van-picker :columns="rentingMode" value-key="label" ref="modePicker" />
        <div class="btn">
          <van-button @click="$refs.mode.toggle()">取消</van-button>
          <van-button @click="getMode">确认</van-button>
        </div>
      </van-dropdown-item>
      <!-- 租金功能 -->
      <van-dropdown-item ref="price">
        <template #title>租金</template>
        <van-picker :columns="housePrice" value-key="label" ref="pricePicker" />
        <div class="btn">
          <van-button @click="$refs.price.toggle()">取消</van-button>
          <van-button @click="getPrice">确认</van-button>
        </div>
      </van-dropdown-item>

      <!-- 筛选功能 -->
      <van-dropdown-item>
        <template #title>
          <span @click="show = true">筛选 </span>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <!-- 筛选弹框 -->
    <van-popup
      closeable
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '80%' }"
    >
      <dl class="FilterMore_dl__1WLj8">
        <dt class="Unit">户型</dt>
        <dd class="UnitInfo">
          <span
            v-for="(item, index) in houseUnit"
            :class="{
              FilterMore_tagActive__2dtPL: moreList.includes(item.value)
            }"
            ref="UnitInfo"
            :key="index"
            @click="AddmoreList(item)"
            >{{ item.label }}</span
          >
        </dd>
        <dt class="Unit">朝向</dt>
        <dd class="UnitInfo">
          <span
            v-for="(item, index) in houseOriented"
            :class="{
              FilterMore_tagActive__2dtPL: moreList.includes(item.value)
            }"
            :key="index"
            @click="AddmoreList(item)"
            >{{ item.label }}</span
          >
        </dd>

        <dt class="Unit">楼层</dt>
        <dd class="UnitInfo">
          <span
            v-for="(item, index) in houseFloor"
            :class="{
              FilterMore_tagActive__2dtPL: moreList.includes(item.value)
            }"
            :key="index"
            @click="AddmoreList(item)"
            >{{ item.label }}</span
          >
        </dd>

        <dt class="Unit">房屋亮点</dt>
        <dd class="UnitInfo" style="border: 1px solid transparent">
          <span
            v-for="(item, index) in characteristic"
            :class="{
              FilterMore_tagActive__2dtPL: moreList.includes(item.value)
            }"
            :key="index"
            @click="AddmoreList(item)"
            >{{ item.label }}</span
          >
        </dd>
      </dl>
      <div class="UnitBtn">
        <van-button @click="moreList = []">清除</van-button>
        <van-button @click="submit">确定</van-button>
      </div>
    </van-popup>
    <!-- 列表数据 -->
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
        <van-tag plain type="danger">{{ item.tags && item.tags[0] }}</van-tag>
      </template>
    </van-card>
  </div>
</template>

<script>
import { myHouse } from '@/api/user'
import { getHouseCondition, getAllhouse } from '@/api/home'

export default {
  name: 'popo',
  data() {
    return {
      show: false,
      favoritesList: Array,
      // 城市id
      cityId: '',
      value: '',
      // 区域数据
      cityArea: [],
      // 方式数据
      rentingMode: [],
      // 租金数据
      housePrice: [],
      // 户型数据
      houseUnit: [],
      // 房屋朝向
      houseOriented: [],
      // 房屋楼层
      houseFloor: [],
      // 房屋亮点数据
      characteristic: [],
      classIndex: '',
      // 发送请求的数据---------------------
      // 点击筛选功能的数据
      moreList: [],
      // 区域的数据
      AckArea: '',
      // 地铁的数据
      subway: '',
      // 方式的数据
      Ackmode: '',
      // 租金的数据
      Ackprice: ''
    }
  },
  mounted() {
    //  获取房屋数据
    this.myHouse()
    // 获取房屋查询条件
    this.getHouseCondition()
  },

  methods: {
    // 获取房屋code
    houseCode(code) {
      // 将房屋code值传入vuex中
      this.$store.commit('getCode', code)
      // 路由跳转页面
      this.$router.push('/house')
    },
    // 获取房屋数据
    async myHouse() {
      try {
        // 加载中
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner', // 一直加载中
          duration: 0
        })
        const res = await myHouse()
        this.favoritesList = res.data.body.slice(0, 20)
        console.log(this.favoritesList)
        // 清除提示
        this.$toast.clear()
      } catch (error) {}
    },
    // 获取房屋查询条件
    async getHouseCondition() {
      try {
        // 加载中
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner', // 一直加载中
          duration: 0
        })
        // 获取城市id
        this.cityId = this.$store.state.cityName.value
        const { data } = await getHouseCondition(this.cityId)
        // 清除提示
        this.$toast.clear()
        // 区域部分数据
        data.body.area.children[0].children = [
          {
            value: null,
            label: null
          }
        ]
        this.cityArea.push(data.body.area)
        // 地铁部分数据
        data.body.subway.children[0].children = [
          {
            value: null,
            label: null
          }
        ]
        this.cityArea.push(data.body.subway)
        console.log(data)
        // 方式部分数据
        this.rentingMode = data.body.rentType
        // 租金部分数据
        this.housePrice = data.body.price
        // 户型部分数据
        this.houseUnit = data.body.roomType
        // 房屋朝向
        this.houseOriented = data.body.oriented
        // 房屋楼层
        this.houseFloor = data.body.floor
        // 房屋亮点数据
        this.characteristic = data.body.characteristic
      } catch (error) {
        console.log(error)
      }
    },
    // 点击筛选的选项功能
    AddmoreList(item) {
      // 将点击功能功能的value保存起来
      if (this.moreList.includes(item.value)) {
        const index = this.moreList.findIndex((result) => {
          return result === item.value
        })
        this.moreList.splice(index, 1)
        return
      }
      this.moreList.push(item.value)
    },
    // 筛选确认按钮
    submit() {
      // 查询房源数据
      if (this.UpdateHouse.length <= 0) {
        return this.$toast('请点击查询条件')
      }
      this.UphouseData()
      const btn = document.querySelector('.van-icon-cross')
      btn.click()
      console.log(btn)
    },
    // 区域确认按钮
    async getArea() {
      // 拿到用的选择的区域
      const area = this.$refs.areaPicker.getValues()
      // area 拿到的是数组，数组中有3个元素，取最后一个的value
      if (area[0].label === '区域') {
        this.AckArea = area[2].value
        this.subway = ''
      }
      if (area[0].label === '地铁') {
        this.subway = area[2].value
        this.AckArea = ''
      }
      // 关闭弹出层
      this.$refs.area.toggle()
      // 查询房源数据
      this.UphouseData()
    },
    // 方式确认按钮
    async getMode() {
      // area 拿到的是数组，数组中有3个元素，取第一个的value
      const mode = this.$refs.modePicker.getValues()
      this.Ackmode = mode[0].value
      // 关闭弹出层
      this.$refs.mode.toggle()
      // 查询房源数据
      this.UphouseData()
    },
    // 租金确认按钮
    getPrice() {
      // 拿到用户选择的金额
      const pic = this.$refs.pricePicker.getValues()
      // pic为一个数组
      this.Ackprice = pic[0].value
      // 关闭弹出层
      this.$refs.price.toggle()
      // 查询房源数据
      this.UphouseData()
    },
    // 根据条件查询房源
    async UphouseData() {
      // 查询房源数据
      try {
        // 加载中
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          loadingType: 'spinner', // 一直加载中
          duration: 0
        })
        const { data } = await getAllhouse(
          // 城市id
          this.cityId,
          // 地区
          this.AckArea,
          // 地铁
          this.subway,
          // 租房方式
          this.Ackmode,
          // 金额
          this.Ackprice,
          // 复合查询
          this.UpdateHouse
        )
        // 清除提示
        this.$toast.clear()
        console.log(data)
        if (data.body.list.length <= 0) {
          this.$toast('没有该房源')
          return
        }
        this.favoritesList = data.body.list
        this.$toast('查询成功')
      } catch (error) {
        this.$toast('查询失败')
      }
    }
  },
  computed: {
    UpdateHouse() {
      const more = this.moreList.join(',')
      return more
    }
  }
}
</script>

<style scoped lang="less">
// 导航栏
.titleHouse {
  background-color: #21b97a;
  span {
    margin-top: 4px;
    width: 25px;
    height: 30px;
    border-right: 1px solid #ccc;
  }
  :deep(.van-nav-bar__arrow) {
    color: #fff;
  }
  :deep(.van-icon-location-o) {
    margin-top: 3px;
    color: #fff;
    font-size: 48px;
  }
  .icon_o {
    position: absolute;
    right: 24px;
    top: 8px;
    width: 55px;
    height: 55px;
    text-align: center;
    line-height: 55px;
    border-radius: 50%;
    border: 5px solid #fff;
    color: #fff;
    // background-color: pink;
  }
  // 搜索框
  :deep(.van-nav-bar__title) {
    max-width: 80%;
    border-radius: 15px;
  }
  .search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    height: 70px;
    width: 90%;
    background-color: #fff;

    .city {
      padding-left: 20px;
    }
    .van-search__content {
      background-color: #fff;
    }
    :deep(.van-icon-search) {
      color: #9c9fa1;
    }
    :deep(.van-icon-arrow-down) {
      color: #9c9fa1;
    }
  }
  // :deep(.van-nav-bar__title) {
  //   width: 100%;
  // }
}
// 列表部分
:deep(.van-card__title) {
  font-size: 30px;
  color: #394043;
  font-weight: 700;
}
:deep(.van-card) {
  padding: 20px 20px;
  border-bottom: 1px solid #ccc;
  margin: 0;
}
:deep(.van-card__thumb) {
  margin-right: 30px !important;
}
:deep(.van-card__price) {
  color: red;
}
.btn {
  display: flex;
  button {
    flex: 2;
    color: #fff;
    background: #21b97a;
    &:nth-child(1) {
      flex: 1;
      color: #21b97a;
      background: #fff;
    }
  }
}
:deep(.van-dropdown-menu__bar--opened) {
  z-index: 10;
}
:deep(.van-overlay) {
  background-color: rgba(0, 0, 0, 0.2);
}
// 筛选弹框部分
.FilterMore_dl__1WLj8 {
  .Unit {
    margin: 40px 0;
    color: #333;
    font-size: 30px;
    text-indent: 2em;
  }
}
.UnitInfo {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 60px;
  padding: 0 20px 0 60px;
  border-bottom: 2px solid #ccc;
  span {
    margin: 0 36px 30px 0;
    width: 140px;
    height: 64px;
    border-radius: 6px;
    line-height: 64px;
    text-align: center;
    font-size: 24px;
    color: #888888;
    border: 2px solid #ddd;
  }
}
// 弹框按钮
.UnitBtn {
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  button {
    flex: 2;
    color: #fff;
    background: #21b97a;
    &:nth-child(1) {
      flex: 1;
      color: #21b97a;
      background: #fff;
    }
  }
}

// 点击筛选的功能样式
.FilterMore_tagActive__2dtPL {
  border: 1px solid #21b97a;
  color: #21b97a;
  background-color: #defaef;
}
:deep(.van-icon-cross) {
  display: none;
}
</style>
