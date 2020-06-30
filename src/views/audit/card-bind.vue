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
  name: 'AuditCardBind',
  data() {
    return {
      columns: {
        type: '类型',
        account: '账号',
        info: '银行信息',
        alipay: '支付宝信息'
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

