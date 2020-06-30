<template>
  <div class="container charge-container">
    <data-table
      :url="url"
      :search-columns="searchColumns"
      :columns="columns"
      :operate-columns="operateColumns"
      :is-show-detail="false"
    >
      <template slot="table_column__nullity" slot-scope="{val}">
        <el-tag v-if="val" type="success">可用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </data-table>
  </div>
</template>

<script>
import { Account } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
  name: 'ChargeMember',
  data() {
    return {
      url: Account.getList,
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
        account: '账号',
        nickname: '昵称',
        score: '可用余额',
        totalRecharge: '充值总额',
        regTime: '注册日期',
        nullity: '状态'
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

