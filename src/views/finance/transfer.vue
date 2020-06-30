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
  name: 'FinanceTransfer',
  data() {
    return {
      rows: [{
        text: '总额',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '总数',
        value: Math.floor(Math.random() * 10000)
      }],
      searchColumns: {
        phone: {
          type: ItemType.INPUT,
          placeholder: '名称关键词'
        }
      },
      columns: {
        people1: '转账人',
        level: '级别',
        people2: '收款人',
        money: '转账金额',
        balance: '转账人之前余额',
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

