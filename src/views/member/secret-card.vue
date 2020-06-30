<template>
  <div class="container member-container">
    <data-row :rows="rows" />
    <data-table
      :search-columns="searchColumns"
      :columns="columns"
      :operate-columns="operateColumns"
      :is-show-detail="false"
    />
  </div>
</template>

<script>
import { ItemType } from '@/components/FormRender/types'
export default {
  name: 'SecretCard',
  data() {
    return {
      rows: [{
        text: '未激活',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '待激活',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '已激活',
        value: Math.floor(Math.random() * 10000)
      }],
      searchColumns: {
        new: {
          type: ItemType.BUTTON,
          btnText: '新增',
          btnType: 'primary',
          onClick: this.onNew
        },
        status: {
          type: ItemType.SELECT,
          options: [
            { label: '状态1', value: 1 },
            { label: '状态2', value: 2 }
          ]
        },
        phone: {
          type: ItemType.INPUT,
          placeholder: '搜索手机号'
        }
      },
      columns: {
        password: '密码',
        vip: 'VIP级别',
        account: '会员账号',
        updatedAt: '激活日期',
        createdAt: '创建日期',
        status: '状态'
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

