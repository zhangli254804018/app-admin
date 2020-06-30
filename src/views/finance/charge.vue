<template>
  <div class="container finance-container">
    <data-row :rows="rows" />
    <data-table
      :multiple="true"
      :search-columns="searchColumns"
      :columns="columns"
      :operate-columns="operateColumns"
      :is-show-detail="false"
      :is-export="true"
    />
  </div>
</template>

<script>
import { ItemType } from '@/components/FormRender/types'
export default {
  name: 'FinanceCharge',
  data() {
    return {
      rows: [{
        text: '等待支付',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '支付成功',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '下单总数',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '充值总额',
        value: Math.floor(Math.random() * 10000)
      }],
      searchColumns: {
        phone: {
          type: ItemType.INPUT,
          placeholder: '名称关键词'
        }
      },
      columns: {
        orderId: '订单号',
        account: '账号',
        money: '金额',
        type: '充值方式',
        pic: '支付截图',
        status: '当前状态',
        time: '时间'
      },
      operateColumns: [{
        text: '删除',
        onClick: this.onDel
      }]
    }
  },
  methods: {
    onNew() {
      console.log('onNew')
    },
    onDel(row) {
      console.log('onDel', row)
    }
  }
}
</script>

<style lang="scss">
.member-container {
}
</style>

