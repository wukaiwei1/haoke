<template>
  <div>
    <!-- 标题导航部分 -->
    <van-nav-bar title="账号登录" @click-left="backToPerPage">
      <template v-slot:left>
        <van-icon name="arrow-left" color="#fff" />
      </template>
    </van-nav-bar>

    <!-- form表单部分 -->
    <van-form @submit="login" class="form">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: false, message: '请输入账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: false, message: '请填写密码' }]"
      />
      <div style="margin: 16px" class="btn">
        <van-button block type="info" native-type="submit" class="btnCl"
          >登 录</van-button
        >
        <a href="#" class="info">还没有账号，去注册~</a>
      </div>
    </van-form>

    <!-- 按钮提交部分 -->
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    backToPerPage() {
      this.$router.back()
    },
    async login() {
      // 非空判断
      if (this.username.trim() === '' && this.password.trim() === '') {
        return this.$toast('用户名和密码不能为空')
      }
      // 用户名匹配规则
      const test = /^[a-zA-Z0-9]{5,8}$/
      if (!this.username.match(test)) {
        this.$toast('用户名格式5-8位的字母\n和数字')
        return
      }
      // 发起请求
      const res = login(this.username, this.password)
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
          this.$toast.success({
            message: '登录成功',
            duration: 2000,
            // 关闭时的回调函数
            onClose: () => {
              // 路由跳转
              this.$router.push({ path: '/layout/my' })
            }
          })
          // 成功后存入token
          localStorage.setItem('token', res.data.body.token)
        } else {
          // 登录失败
          setTimeout(() => {
            this.$toast(res.data.description)
          }, 500)
        }
        console.log(res)
      })
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
// 表单部分
.form {
  :deep(.van-field__control) {
    height: 120px;
    font-size: 34px;
  }
  :deep(.van-cell) {
    padding-top: 0;
  }
  .btnCl {
    background-color: #21b97a;
    height: 100px;
  }
  .van-button--info {
    border: 2px solid transparent;
    font-size: 36px;
  }
  .btn {
    text-align: center;
  }
  .info {
    display: block;
    margin-top: 60px;
    font-size: 28px;
    color: #666;
  }
}
:deep(.van-toast) {
  border-radius: 1px !important;
}
</style>
