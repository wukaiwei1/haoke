<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar title="发布房源" @click-left="backToPerPage">
      <template v-slot:left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>

    <!-- 表单部分 -->
    <div class="Housefrom">
      <van-cell-group inset>
        <!--房源信息-->
        <van-cell title="房源信息" class="houseTitle" />
        <!-- 小区名称 -->
        <van-cell
          @click="$router.push('/cllSearch')"
          :value="userCommunity.communityName || '请输入小区或地址'"
          title="小区名称"
          is-link
        />
        <!-- 租金 -->
        <van-field
          v-model="rentVal"
          label="租       金"
          right-icon="warning-o"
          placeholder="请输入租金/月"
        >
          <template #right-icon>
            <span>￥/月</span>
          </template>
        </van-field>
        <!-- 建筑面积 -->
        <van-field
          v-model="acreageVal"
          label="建筑面积"
          right-icon="warning-o"
          placeholder="请输入建筑面积"
        >
          <template #right-icon>
            <span>m²</span>
          </template>
        </van-field>
        <!-- 户型 -->
        <van-cell
          is-link
          @click="showType"
          :value="roomTypeText"
          title="户型"
        ></van-cell>
        <van-popup v-model="TypeShow" position="bottom">
          <van-picker
            confirm-button-text="确认"
            cancel-button-text="取消"
            :columns="roomType"
            value-key="label"
            @confirm="TypeShowFirm"
            @cancel="TypeOnCancel"
            :show-toolbar="true"
          >
          </van-picker>
        </van-popup>
        <!-- 所在楼层 -->
        <van-cell
          is-link
          @click="showFloorTip"
          :value="floorText"
          title="所在楼层"
        ></van-cell>
        <van-popup v-model="showFloor" position="bottom">
          <van-picker
            confirm-button-text="确认"
            cancel-button-text="取消"
            :columns="floor"
            value-key="label"
            @confirm="floorShowFirm"
            @cancel="floorHide"
            :show-toolbar="true"
          >
          </van-picker>
        </van-popup>
        <!-- 朝向 -->
        <van-cell
          is-link
          @click="showOriTip"
          :value="orientedText"
          title="朝向"
          label="房屋标题"
        ></van-cell>
        <van-popup v-model="showOriented" position="bottom">
          <van-picker
            confirm-button-text="确认"
            cancel-button-text="取消"
            :columns="oriented"
            value-key="label"
            @confirm="orientedShowFirm"
            @cancel="orientedHide"
            :show-toolbar="true"
          >
          </van-picker>
        </van-popup>
        <!-- 房屋标题 -->
        <div class="huosetit">
          <van-field
            v-model="houseName"
            placeholder="请输入标题 （例如: 整租 小区名 2室 5000元）"
          />
        </div>
        <!-- 文件上传 -->
        <van-cell title="房源信息" />
        <van-uploader :after-read="afterRead" v-model="fileList">
          <div class="fileUp">
            <van-icon name="plus" />
          </div>
        </van-uploader>
        <!-- 房屋配置 -->
        <van-cell title="房屋配置" class="houseBorder" />
        <van-grid :column-num="5" :border="false" class="houseIcon">
          <van-grid-item
            :text="item.label"
            v-for="(item, index) in supporting"
            :key="index"
            @click="addIcon(item, index)"
            :ref="index"
          >
            <template #icon>
              <i class="iconfont" :class="item.icon"></i>
            </template>
          </van-grid-item>
        </van-grid>
        <!-- 房屋描述 -->
        <div class="userHouse">
          <van-cell title="房屋描述" class="houseinfo" />
          <textarea
            placeholder="请输入房屋描述信息"
            v-model="houseInfo"
          ></textarea>
        </div>
        <!-- 底部按钮 -->
        <van-tabbar class="bottomBTn">
          <van-tabbar-item @click="offHouseInfo">取消</van-tabbar-item>
          <van-tabbar-item class="sibBtn" @click="submitHouseInfo"
            >提交</van-tabbar-item
          >
        </van-tabbar>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { setHouseInfo } from '@/api/house'
import { getHousePic } from '@/api/plugin'
import { newsHouse } from '@/api/user'
export default {
  name: 'house',
  data() {
    return {
      // 标识房屋配置的点击次数
      flag: true,
      // 房屋户型显示数据
      roomTypeText: '请选择',
      // 房屋楼层显示数据
      floorText: '请选择',
      // 房屋朝向显示数据
      orientedText: '请选择',
      // 房屋户型弹框显隐
      TypeShow: false,
      // 房屋楼层弹框显隐
      showFloor: false,
      // 房屋朝向弹框显隐
      showOriented: false,
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
        { name: '床', icon: 'icon-shafa' }
      ],
      // 用户提交的租金信息
      rentVal: '',
      // 用户提交的建筑面积
      acreageVal: '',
      // 用户提交的房屋标题
      houseName: '',
      // 用户提交的房屋描述
      houseInfo: '',
      // 用户提交的房屋图片
      houseImg: [],
      // 用户提交的房屋配置
      userSupporting: [],
      // 用户提交的房屋户型
      userRoomType: '',
      // 用户提交的楼层
      userFloor: '',
      // 用户提交的朝向
      userOriented: '',
      // 用户提交的社区
      // userCommunity: this.$store.state.CommunityName || '',
      // 房屋楼层数据
      floor: [],
      // 房屋朝向
      oriented: [],
      // 房屋户型
      roomType: [],
      // 房屋配置
      supporting: [],
      // 文件上传
      fileList: []
    }
  },
  created() {
    // 发布所需要的条件
    this.setHouseInfo()
  },
  methods: {
    // 返回上一步
    backToPerPage() {
      this.$router.back()
    },

    // 获取发布所需要的条件
    async setHouseInfo() {
      const { data } = await setHouseInfo()
      console.log(data)
      // 房屋楼层
      this.floor = data.body.floor
      // 房屋朝向
      this.oriented = data.body.oriented
      // 房屋户型
      this.roomType = data.body.roomType
      // 房屋配置
      this.supporting = data.body.supporting
      // 处理房屋配置数据
      this.house.forEach((item) => {
        this.supporting.forEach((e) => {
          // console.log(e)
          if (e.label === item.name) return (e.icon = item.icon)
        })
      })
    },
    // 文件上传完毕后会触发 after-read 回调函数
    async afterRead(res) {
      const form = new FormData()
      form.append('file', res.file)
      const { data } = await getHousePic(form)
      this.houseImg.push(data.body[0])
    },
    // 房屋户型弹框
    showType() {
      this.TypeShow = true
    },
    // 房屋户型弹框确认回调
    TypeShowFirm(e) {
      // 拿到用户选择的户型value
      this.userRoomType = e.value
      // 关闭弹框
      this.TypeShow = false
      // 将用户选择的信息展示
      this.roomTypeText = e.label
    },
    // 房屋户型弹框取消回调
    TypeOnCancel() {
      this.TypeShow = false
    },
    // 房屋楼层弹框
    showFloorTip() {
      this.showFloor = true
    },
    // 房屋楼层弹框确认回调
    floorShowFirm(e) {
      // 拿到用户选择的户型value
      this.userFloor = e.value
      // 关闭弹框
      this.showFloor = false
      // 将用户选择的信息展示
      this.floorText = e.label
    },
    // 房屋楼层弹框取消回调
    floorHide() {
      // 关闭弹框
      this.showFloor = false
    },
    // 房屋朝向弹框
    showOriTip() {
      this.showOriented = true
    },
    // 房屋朝向确认回调
    orientedShowFirm(e) {
      // 拿到用户选择的户型value
      this.userOriented = e.value
      // 关闭弹框
      this.showOriented = false
      // 将用户选择的信息展示
      this.orientedText = e.label
    },
    // 房屋朝向取消回调
    orientedHide() {
      // 关闭弹框
      this.showOriented = false
    },
    // 点击提交按钮  发布房源
    async submitHouseInfo() {
      try {
        console.log(this.newHouserInfo)
        const { data } = await newsHouse(this.newHouserInfo)
        this.$toast('发布成功！')
        this.$router.push('/')
        this.$store.commit('setCommunityName', '')
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    // 点击取消按钮
    offHouseInfo() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '放弃发布房源',
          confirmButtonText: '继续编辑',
          confirmButtonColor: '#1c93ea'
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // 返回上一步
          this.$router.back()
        })
    },
    // 点击房屋配置
    addIcon(item, index) {
      this.userSupporting.push(item.label)
      const flag = this.$refs[index][0].$el.className
      // 点击添加颜色类名
      if (flag === 'van-grid-item') {
        this.$refs[index][0].$el.className = 'van-grid-item iconRed'
        //
      } else {
        this.$refs[index][0].$el.className = 'van-grid-item'
      }
    }
  },
  computed: {
    userCommunity() {
      return this.$store.state.Community || ''
    },
    newHouserInfo() {
      // 用户输入房源的数据-------------
      const userHouseInfo = {
        // 租金
        price: this.rentVal,
        // 面积
        size: this.acreageVal,
        // 标题
        title: this.houseName,
        // 描述
        description: this.houseInfo,
        // 房屋图片
        houseImg: this.houseImg.join('|'),
        // 房屋配置
        supporting: this.userSupporting.join('|'),
        // 房屋户型
        roomType: this.userRoomType,
        // 房屋楼层
        floor: this.userFloor,
        // 房屋朝向
        oriented: this.userOriented,
        // 房屋的小区
        community: this.userCommunity.community
      }
      return userHouseInfo
    }
  }
}
</script>

<style scoped lang="less">
.iconRed {
  color: #21b97a;
  :deep(.van-grid-item__text) {
    color: #21b97a;
  }
}
// 标题部分

:deep(.van-nav-bar__content) {
  background-color: #21b97a;
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

// 表单部分
:deep(.van-cell-group--inset) {
  margin: 0;
}
:deep(.van-cell::after) {
  border-bottom: 4px solid #ebedf0;
}
.Housefrom {
  .houseTitle {
    color: #21b97a;
  }
  :deep(.van-picker__toolbar) {
    border-bottom: 1px solid #ccc;
  }
  :deep(.van-picker__cancel) {
    color: #108ee9;
    font-size: 34px;
  }
  :deep(.van-picker__confirm) {
    color: #108ee9;
    font-size: 34px;
  }
  :deep(.van-cell__label) {
    margin-top: 21px;
    color: #333;
    font-size: 14px;
  }
  .huosetit {
    border: 0;
  }
  .fileUp {
    margin-top: 20px;
    margin-left: 14px;
    width: 160px;
    height: 160px;
    border: 1px solid #dddddd;
    text-align: center;
    line-height: 160px;
    .van-icon-plus {
      color: #dddddd;
    }
  }
  .houseBorder {
    border-bottom: 1px solid #ebedf0;
  }
  // 房屋配套
  .houseIcon {
    :deep(.van-grid-item__content) {
      padding: 20px;
    }
    .iconfont {
      font-size: 40px;
    }
  }
  // 房屋描述
  .userHouse {
    height: 400px;
    margin-bottom: 1.3rem;
    border-top: 40px solid #f6f5f6;
    border-bottom: 40px solid #f6f5f6;

    .houseinfo {
      border-bottom: 1px solid #ebedf0;
    }
    textarea {
      padding: 0 30px;
      height: 300px;
      width: 92%;
      border: 0;
      font-size: 28px;
      line-height: 3;
      // 禁止拉伸
      resize: none;
    }
  }
  :deep(.van-uploader__preview) {
    margin-top: 20px;
  }
  :deep(.van-uploader__preview) {
    margin-left: 20px;
  }
  // 底部按钮
  .bottomBTn {
    .van-tabbar-item--active {
      color: #21b97a;
      font-size: 30px;
    }
    .sibBtn {
      color: #fff;
      font-size: 30px;
      background-color: #21b97a;
    }
  }
}
// :deep(.van-button__text) {
//   color: #1c93ea;
// }
</style>
