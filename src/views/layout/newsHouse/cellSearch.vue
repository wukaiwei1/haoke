<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入小区或地址"
        @search="onSearch"
        @cancel="onCancel"
      />

      <!-- 结果 -->
      <van-cell-group>
        <van-cell
          :title="item.communityName"
          v-for="(item, index) in CommunityList"
          :key="index"
          @click="updata(item)"
        />
      </van-cell-group>
    </form>
  </div>
</template>

<script>
import { getCommunity } from '@/api/area'
export default {
  data() {
    return {
      // 搜索结果
      value: '',
      //   城市id
      cityId: '',
      //   搜索结果
      CommunityList: []
    }
  },
  methods: {
    //   取消
    onCancel() {
      this.$router.back()
    },
    async onSearch() {
      this.cityId = this.$store.state.cityName.value
      const { data } = await getCommunity(this.value, this.cityId)
      this.CommunityList = data.body
    },
    updata(item) {
      this.$store.commit('setCommunityName', item)
      //   后退一步
      this.$router.back()
    }
  }
}
</script>

<style></style>
