<template>
  <div>
    <!-- user信息 -->
    <div class="My_title">
      <slot name="bg" :avatar="avatar">
        <img src="@/assets/image/bg.png" alt="" />
      </slot>
      <!-- 用户头像 -->
      <div class="my_info">
        <slot name="pic" :avatar="avatar">
          <!-- 头像 -->
          <div class="myavatar">
            <img src="@/assets/image/avatar.png" alt="" />
          </div>
        </slot>
        <!-- 去登录 -->
        <!-- 插槽 -->
        <slot name="userinfo" :nickname="nickname">
          <div class="my_user">
            <div class="username">游客</div>
            <button type="primary" class="btn" @click="loginFn">去登录</button>
          </div>
        </slot>
      </div>
    </div>
    <!-- 导航栏部分 -->
    <van-grid :column-num="3" :icon-size="26">
      <!-- 导航栏插槽 -->
      <slot name="userNav" >
        <van-grid-item
          v-for="(value, index) in 6"
          :key="value"
          :icon="userObj.iconList[index]"
          :text="userObj.textList[index]"
          @click="loginFn"
        />
      </slot>
    </van-grid>
    <!-- pic图片 -->
    <div class="pic">
      <img src="@/assets/image/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/api/user'
export default {
  data() {
    return {
      userObj: {
        textList: [
          '我的收藏',
          '我的出租',
          '看房记录',
          '成为房主',
          '个人资料',
          '联系我们'
        ],
        iconList: [
          'star-o',
          'wap-home-o',
          'clock-o',
          'user-o',
          'friends-o',
          'phone-circle-o'
        ]
      },
      avatar: null,
      nickname: '',
      token: ''
    }
  },
  methods: {
    loginFn() {
      this.$router.push({
        path: '/login'
      })
    }
  },
  mounted() {
    this.token = localStorage.getItem('token')
    if (this.token) {
      const res = userInfo(this.token)
      // 加载中
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        // 一直加载中
        duration: 0
      })
      res.then((res) => {
        // 判断
        if (res.data.status === 200) {
          // 清除提示
          this.$toast.clear()
        } else {
          // 登录失败
          setTimeout(() => {
            this.token = null
            this.$toast(res.data.description)
          }, 500)
        }
        this.avatar = res.data.body.avatar
        this.nickname = res.data.body.nickname
      })
    }
  }
}
</script>

<style scoped lang="less">
// 背景部分
html,
body {
  width: 100%;
  position: relative;
}
.My_title {
  height: 600px;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    // background-size: cover;
  }
  // user部分
  .my_info {
    position: absolute;
    // margin-bottom: -120px;
    bottom: 730px;
    // bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    height: 27%;
    background-color: #fff;
    box-shadow: 0 0 20px 6px #ddd;
    text-align: center;
    .myavatar {
      width: 120px;
      height: 120px;
      transform: translateY(-50%);
      border-radius: 50%;
      border: 8px solid #f5f5f5;
      display: inline-block;
      box-shadow: 0 4px 4px #bdbdbd;

      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }
    }
    .my_user {
      font-size: 14px;
      .username {
        margin: -30px 0 30px 0;
      }
      .btn {
        margin-top: 10px;
        padding: 0 30px;
        height: 60px;
        border: 0;
        line-height: 60px;
        font-size: 26px;
        border-radius: 10px;
        color: #fff;
        background-color: #21b97a;
      }
    }
  }
}
:deep(.van-grid) {
  margin-top: 30px;
}
:deep(.van-hairline--top::after) {
  margin-top: 120px !important;
  border: 0;
}
:deep(.van-grid-item__content::after) {
  border: 0;
}
// pic图片
.pic {
  text-align: center;
  margin-top: 20px;
  img {
    width: 92%;
  }
}
</style>
