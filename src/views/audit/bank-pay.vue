<template>
  <div class="container audit-container">
    <data-table
      :is-search="false"
      :columns="columns"
      :operate-columns="operateColumns"
      :is-show-detail="false"
    />
  </div>
</template>

<script>
export default {
  name: 'AuditBankPay',
  data() {
    return {
      columns: {
        orderId: '订单号',
        type: '类型',
        account: '账号',
        money: '金额',
        pic: '审核图片'
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

