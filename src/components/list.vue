<template>
    <div>
      <x-header :left-options="{showBack: false}">优惠券</x-header>
      <van-coupon-cell
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
      />
      <van-popup v-model="showList" position="bottom">
        <van-coupon-list
          :coupons="couponList"
          :chosen-coupon="chosenCoupon"
          @change="onChange"
          :show-exchange-bar="false"
          :show-close-button="false"
        />
      </van-popup>
      <group>
        <x-input title="券码" v-model="value" mask="9  9  9  9  9  9" readonly></x-input>
      </group>
 </div>
</template>

<script>
import { XInput, Group, XHeader } from 'vux'
import { baseUrl } from '../config/env'
export default {
  components: {
    XHeader,
    XInput,
    Group
  },
  data () {
    return {
      showList: false,
      chosenCoupon: -1,
      exchangedCoupons: [],
      value: '',
      couponList: this.getcoupons()
    }
  },
  methods: {
    getcoupons () {
      let vm = this
      vm.axios.get(baseUrl + 'customer/coplist?phone=' + sessionStorage.phone)
      .then((res) => {
        if (res.data.code === 0) {
          vm.couponList = res.data.data
        } else {
          this.$vux.toast.show({
            text: res.data.msg,
            type: 'text'
          })
          vm.couponList = []
        }
      })
    },
    onChange (index) {
      this.showList = false
      this.chosenCoupon = index
      this.value = this.couponList[index].code
    }
  }
}
</script>
<style scoped>
.van-cell-group{
  margin-top: 8px;
}
</style>
