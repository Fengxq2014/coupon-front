<template>
    <div class="login">
      <x-header :left-options="{showBack: false}">优惠券</x-header>
        <group title="">
            <box gap="10px 10px">
            <x-input title="手机号" mask="999 9999 9999" v-model="body.telno" :max="13" is-type="china-mobile"></x-input>
            <x-input title="验证码" class="weui-vcode" :max="4" v-model="body.code">
                <x-button v-if="showAccessButton" slot="right" type="primary" mini @click.native="sendCode">{{showAccessTip}}</x-button>
                <x-button v-if="!showAccessButton" disabled type="default" slot="right" mini >{{countdown}}秒后获取</x-button>
            </x-input>
            <x-button @click.native="login">登录</x-button>
            </box>
        </group>
    </div>
</template>
<script>
import { Group, XInput, XButton, Box, XHeader } from 'vux'
import { baseUrl } from '../config/env'
export default {
  components: {
    Group,
    XHeader,
    XInput,
    XButton,
    Box
  },
  data () {
    return {
      showAccessButton: true,
      showAccessTip: '获取验证码',
      countdown: 60,
      body: {
        telno: '',
        code: ''
      }
    }
  },
  methods: {
    checkInfo () {
      let vm = this
      if (vm.body.telno.replace(/\s/g, '').length !== 11) {
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type: 'text'
        })
        return false
      } else if (vm.body.code === '') {
        this.$vux.toast.show({
          text: '请输入验证码',
          type: 'text'
        })
        return false
      } else {
        return true
      }
    },
    sendCode () {
      let vm = this
      let phone = vm.body.telno.replace(/\s/g, '')
      if (phone.length !== 11) {
        this.$vux.toast.show({
          text: '请输入正确的手机号',
          type: 'text'
        })
      } else {
        vm.$vux.loading.show({
          text: '努力加载中...'
        })
        vm.axios.get(baseUrl + 'common/sms/send/' + phone)
        .then((res) => {
          vm.$vux.loading.hide()
          if (res.data.code === 0) {
            vm.showAccessButton = false
            let accessCountdown = setInterval(() => {
              vm.countdown = vm.countdown - 1
              if (vm.countdown === -1) {
                vm.resetCode()
                clearInterval(accessCountdown)
              }
            }, 1000)
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'text'
            })
          }
        })
      }
    },
    resetCode () {
      let vm = this
      vm.showAccessButton = true
      vm.countdown = 60
      vm.showAccessTip = '重新获取'
    },
    login () {
      if (!this.checkInfo()) {
        return
      }
      let vm = this
      let phone = vm.body.telno.replace(/\s/g, '')
      vm.$vux.loading.show({
        text: '努力加载中...'
      })
      this.axios.post(baseUrl + 'customer/login', {phone: phone, code: vm.body.code})
        .then((res) => {
          vm.$vux.loading.hide()
          if (res.data.code === 0) {
            sessionStorage.setItem('phone', phone)
            if (res.data.data.Type === 2) {
              vm.$router.push({path: '/verify'})
            } else if (res.data.data.Type === 1) {
              vm.$router.push({path: '/list'})
            } else {
              this.$vux.toast.show({
                text: '系统错误',
                type: 'text'
              })
            }
          } else {
            this.$vux.toast.show({
              text: res.data.msg,
              type: 'text'
            })
          }
        })
    }
  }
}
</script>

