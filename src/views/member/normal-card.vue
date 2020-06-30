<template>
  <div class="container member-container">
    <data-table
      :url="url"
      :search-columns="searchColumns"
      :columns="columns"
      :operate-columns="operateColumns"
      :is-show-detail="false"
    />
  </div>
</template>

<script>
import { ItemType } from '@/components/FormRender/types'
import { Account } from '@/api/const'
export default {
  name: 'NormalCard',
  data() {
    return {
      url: Account.vipList,
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
        title: '名称',
        vip: '级别',
        rechargeAmount: '充值金额',
        backgroundColor: '背景色',
        frontColor: '前景色',
        member: '会员人数'
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

