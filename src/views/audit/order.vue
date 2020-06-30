<template>
  <div class="container audit-container">
    <data-table
      :multiple="true"
      :columns="columns"
      :operate-columns="operateColumns"
      :is-show-detail="false"
      @handleSelectionChange="handleSelectionChange"
    >
      <template slot="extra-search">
        <el-form-item>
          <el-button type="primary" :disabled="!selected.length">批量通过</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="!selected.length">拒绝</el-button>
        </el-form-item>
      </template>
    </data-table>
  </div>
</template>

<script>
export default {
  name: 'AuditOrder',
  data() {
    return {
      selected: [],
      columns: {
        name: '任务名称',
        prize: '任务奖励',
        peoples: '参与者',
        open: '打开次数',
        data: '接口数据',
        content: '审核内容',
        pic: '审核图片',
        createdAt: '提交时间'
      },
      operateColumns: [{
        text: '删除',
        onClick: this.onDel
      }]
    }
  },
  methods: {
    handleSelectionChange(rows) {
      console.log(rows)
      this.selected = rows
    },
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

