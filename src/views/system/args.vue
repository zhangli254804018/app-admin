<template>
  <div class="container system-container">
    <data-table
      ref="dataTable"
      :url="url"
      list-role="a100501"
      :columns="columns"
      :is-show-operate="false"
    >

      <template v-slot:table_column__userEdit="{ val }">
        <el-tag v-if="val" type="success">可修改</el-tag>
        <el-tag v-else type="danger">不能修改</el-tag>
      </template>

    </data-table>
  </div>
</template>

<script>
import { System } from '@/api/const'
export default {
    name: 'SystemArgs',
    data() {
        return {
            url: System.argsList,
            columns: {
                userEdit: '用户编辑',
                sysRemark: '系统名称',
                sysShow: '显示值',
                sysKey: '标识',
                sysInt: '数字值',
                sysStr: '字符值'
            }
        }
    }
}
</script>
