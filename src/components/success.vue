<template>
<div class="weui-msg">
    <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
    <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">操作成功</h2>
        <p class="weui-msg__desc"><router-link to="/verify">继续核销</router-link></p>
        <br>
        <p class="weui-msg__desc"><router-link to="/mchlist">已核销列表</router-link></p>
    </div>

    <div class="weui-msg__extra-area">
        <div class="weui-footer">
            <p class="weui-footer__text">Copyright © 2008-2018</p>
        </div>
    </div>
</div>
</template>

<script>
import { Icon } from 'vux'
export default {
  components: {
    Icon
  }
}
</script>
<style scoped>
@import url(https://res.wx.qq.com/open/libs/weui/1.1.3/weui.min.css);
</style>
