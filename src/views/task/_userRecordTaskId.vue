<template>
  <div class="container task-container">
    <data-table
      ref="dataTable"
      :url="url"
      :extra-query="{taskId}"
      :is-show-search="false"
      :columns="columns"
      :is-show-operate="false"
      list-role="a50301"
    >
      <template v-slot:table_column__taskStatus="{val}">
        <el-tag v-if="val === -1" type="danger">失败</el-tag>
        <el-tag v-else-if="val === 0" type="primary">进行中</el-tag>
        <el-tag v-else-if="val === 1" type="warning">审批中</el-tag>
        <el-tag v-else-if="val === 2" type="success">完成</el-tag>
        <el-tag v-else type="danger">状态: {{ val }}</el-tag>
      </template>

      <template v-slot:table_column__pngLink1="{ val }">
        <el-image :src="val" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
            {{ val }}
          </div>
        </el-image>
      </template>

      <template v-slot:table_column__pngLink2="{ val }">
        <el-image :src="val" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
            {{ val }}
          </div>
        </el-image>
      </template>
    </data-table>
  </div>
</template>

<script>
import { Task } from '@/api/const'
export default {
    name: 'TaskUserRecordDetail',
    data() {
        return {
            url: Task.userRecordDetail,
            columns: {
                id: 'ID',
                account: {
                    label: '用户账户',
                    width: 140
                },
                userId: '用户ID',
                nickname: {
                    label: '姓名',
                    width: 140
                },
                amount: '任务单价',
                taskId: '任务ID',
                taskTitle: {
                    label: '任务名称',
                    width: 200
                },
                taskStatus: '任务状态',
                auditRemark: {
                    label: '介绍说明',
                    width: 160
                },
                userRemark: {
                    label: '用户提交说明',
                    width: 160
                },
                pngLink1: {
                    label: '任务提交图片1',
                    width: 140
                },
                pngLink2: {
                    label: '任务提交图片2',
                    width: 140
                },
                createTime: {
                    label: '创建时间',
                    width: 180
                },
                auditTime: {
                    label: '订购时间',
                    width: 180
                }
            }
        }
    },
    computed: {
        taskId() {
            return this.$route.params.taskId
        }
    }
}
</script>
