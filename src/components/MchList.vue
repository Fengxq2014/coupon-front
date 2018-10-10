<template>
    <div>
        <x-header :left-options="{showBack: false}" :right-options="{showMore: true}" @on-click-more="showMenus = true">优惠券</x-header>
        <group>
            <datetime v-model="startDate" :start-date="startDateLimit" :end-date="endDateLimit" format="YYYY-MM-DD" title="开始期日" @on-change="startChange"></datetime>
            <datetime v-model="endDate" :start-date="startDate" :end-date="endDateLimit" format="YYYY-MM-DD" title="结束日期" @on-change="endChange"></datetime>
        </group>
        <div style="padding:0 15px;">
            <x-table>
                <thead>
                <tr>
                    <th>日期</th>
                    <th>金额</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in list">
                    <td>{{item.date}}</td>
                    <td>{{item.sum}}</td>
                </tr>
                </tbody>
            </x-table>
        </div>
        <div v-transfer-dom>
        <actionsheet :menus="menus" v-model="showMenus" show-cancel @on-click-menu="click"></actionsheet>
        </div>
    </div>
</template>
<script>
import { XTable, XHeader, Datetime, Group, dateFormat, Actionsheet, TransferDom } from 'vux'
import { baseUrl } from '../config/env'

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    XTable,
    Datetime,
    Group,
    Actionsheet,
    TransferDom
  },
  data () {
    return {
      startDateLimit: dateFormat(new Date().setMonth(new Date().getMonth() - 3), 'YYYY-MM-DD'),
      endDateLimit: dateFormat(new Date(), 'YYYY-MM-DD'),
      startDate: '',
      endDate: '',
      list: [],
      showMenus: false,
      menus: {
        verify: '核销券码',
        mchlist: '已核销列表'
      }
    }
  },
  methods: {
    startChange () {
      this.endDate = ''
    },
    endChange () {
      let vm = this
      vm.$vux.loading.show({
        text: '努力加载中...'
      })
      vm.axios.get(baseUrl + 'mch/list', {params: {phone: sessionStorage.phone, start: vm.startDate, end: vm.endDate}})
      .then((res) => {
        vm.$vux.loading.hide()
        if (res.data.code === 0) {
          vm.showAccessButton = false
          vm.list = res.data.data
        } else {
          this.$vux.toast.show({
            text: res.data.msg,
            type: 'text'
          })
        }
      })
    },
    click (menuKey, menuItem) {
      this.$router.push({path: '/' + menuKey})
    }
  }
}
</script>

