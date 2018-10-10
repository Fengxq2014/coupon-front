<template>
    <div>
        <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true">优惠券</x-header>
        <group>
            <box gap="10px 10px">
                <x-input title="券码" v-model="value" mask="9  9  9  9  9  9" readonly></x-input>
                <x-button @click.native="verify">兑换</x-button>
            </box>
        </group>
        <van-number-keyboard
            :show="show"
            @blur="show = false"
            @input="onInput"
            @delete="onDelete"
            :hide-on-click-outside=false
        />
        <div v-transfer-dom>
        <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="click"></actionsheet>
        </div>
    </div>
</template>
<script>
import { Group, XInput, XButton, XHeader, Box, Actionsheet, TransferDom } from 'vux'
import { baseUrl } from '../config/env'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    XHeader,
    XInput,
    XButton,
    Box,
    Actionsheet,
    TransferDom
  },
  data () {
    return {
      value: '',
      show: true,
      l: 6,
      showMenus: false,
      menus: {
        verify: '核销券码',
        mchlist: '已核销列表'
      }
    }
  },
  methods: {
    onInput (value) {
      this.value += value
    },
    onDelete () {
      this.value = this.value.substring(0, this.value.length - 1)
    },
    verify () {
      let vm = this
      let value = vm.value.replace(/\s/g, '')
      if (value.length !== vm.l) {
        this.$vux.toast.show({
          text: '请输入正确的券码',
          type: 'text'
        })
      } else {
        vm.$vux.loading.show({
          text: '努力加载中...'
        })
        vm.axios.post(baseUrl + 'mch/consume', {code: [...value].reverse().join(''), mchid: sessionStorage.phone})
        .then((res) => {
          vm.$vux.loading.hide()
          if (res.data.code === 0) {
            vm.$router.push({path: '/success'})
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'text'
            })
          }
        })
      }
    },
    click (menuKey, menuItem) {
      this.$router.push({path: '/' + menuKey})
    }
  }
}
</script>

