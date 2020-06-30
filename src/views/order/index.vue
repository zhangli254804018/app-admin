<template>
  <div class="container order-container">
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
  name: 'Order',
  data() {
    return {
      rows: [{
        text: '下单',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '待提交',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '审核',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '成功',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '失败',
        value: Math.floor(Math.random() * 10000)
      }, {
        text: '全部',
        value: Math.floor(Math.random() * 10000)
      }],
      searchColumns: {
        status: {
          type: ItemType.RADIO,
          label: '类型筛选',
          value: 1,
          options: [
            { label: '全部', value: 1 },
            { label: '抖音', value: 2 },
            { label: '微信', value: 3 },
            { label: '其他', value: 4 }
          ]
        },
        keyword: {
          type: ItemType.INPUT,
          placeholder: '名称关键词'
        }
      },
      columns: {
        type: '类型',
        task: '任务类型',
        userinfo: '用户信息',
        content: '提交内容',
        pic: '提交图片',
        reply: '回复内容',
        status: '当前状态'
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

