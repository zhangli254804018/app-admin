<template>
  <div class="container audit-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :search-columns="searchColumns"
      list-role="a20301"
      :operate-columns="operateColumns"
      :is-show-detail="false"
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
import { Audit } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'AuditTaskUserRecord',
    data() {
        return {
            url: Audit.taskUserRecordList,
            searchColumns: {
                taskTitle: '任务名称',
                account: '审核者账户',
                nickname: '审核者姓名',
                remark: '关键字',
                taskStatus: {
                    type: ItemType.SELECT,
                    label: '任务状态',
                    options: [
                        { value: 0, label: '审批中' },
                        { value: 1, label: '通过' },
                        { value: 2, label: '关闭' }
                    ]
                },
                createTimeBegin: '创建起始时间',
                createTimeEnd: '创建结束时间'
            },
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
                    label: '审核时间',
                    width: 180
                }
            },
            operateColumns: [
                {
                    text: '通过',
                    role: 'a20302',
                    onClick: this.handlePass
                },
                {
                    text: '否决',
                    role: 'a20303',
                    onClick: this.handleFail
                }
            ]
        }
    },
    methods: {
        async handleFail({ id }) {
            try {
                const { value: auditRemark } = await this.$prompt('请输入不通过原因', '提示', {
                    type: 'warning',
                    inputValidator: val => val !== '',
                    inputErrorMessage: '不通过原因不能为空'
                })
                const res = await this.$ax.post(Audit.taskUserRecordFail, { id, auditRemark })
                if (res) {
                    this.$message.success(`设置不通过成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`设置不通过失败`)
                }
            } catch (err) {
                if (err === 'cancel') return
                console.error(err)
            }
        },
        async handlePass({ id }) {
            try {
                await this.$confirm('此操作将任务通过审核, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Audit.taskUserRecordPass, { id })
                if (res) {
                    this.$message.success(`设置通过成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`设置通过失败`)
                }
            } catch (err) {
                if (err === 'cancel') return
                console.error(err)
            }
        }
    }
}
</script>

<style lang="scss">
.member-container {
}
</style>

