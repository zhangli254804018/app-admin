<template>
  <div class="container system-container">
    <data-table
      ref="dataTable"
      :url="url"
      list-role="a100701"
      :columns="columns"
      :search-columns="searchColumns"
      :is-show-operate="false"
    />
  </div>
</template>

<script>
import { System } from '@/api/const'
export default {
    name: 'SystemArgs',
    data() {
        return {
            url: System.operationrecord,
            searchColumns: {
                adminName: '管理账户',
                type: '类型',
                remark: '介绍',
                createTimeBegin: '开始时间',
                createTimeEnd: '结束时间',
                createIp: '操作IP地址'
            },
            columns: {
                id: 'ID',
                createIp: '操作IP地址',
                adminId: '管理员ID',
                adminName: '管理账户',
                type: '类型',
                remark: '介绍',
                createTime: '操作时间'
            }
        }
    }
}
</script>
