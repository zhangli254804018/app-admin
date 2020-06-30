<template>
  <div class="container audit-container">
    <data-table
      ref="dataTable"
      :url="url"
      :search-columns="searchColumns"
      :columns="columns"
      list-role="a20101"
      :is-show-edit="false"
      :is-show-detail="false"
      :operate-columns="operateColumns"
    >
      <template v-slot:table_column__auditStatus="{val}">
        <el-tag v-if="val === 2" type="danger">审批不通过 </el-tag>
        <el-tag v-else-if="val === 0" type="warning">审批中</el-tag>
        <el-tag v-else-if="val === 1" type="success">通过</el-tag>
        <el-tag v-else type="danger">状态: {{ val }}</el-tag>
      </template>
    </data-table></div>
</template>

<script>
import { Audit } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'AuditAccountBind',
    data() {
        return {
            url: Audit.accountBindList,
            columns: {
                userId: '用户ID',
                taskType: '账号类型',
                auditStatus: '审批状态',
                auditRemark: '原因说明',
                createTime: '创建时间',
                submitTime: '提交时间',
                auditTime: '审核时间'
            },
            operateColumns: [
                {
                    text: '通过',
                    // hidden: row => row.auditStatus === 3,
                    role: 'a20102',
                    onClick: this.handlePass
                },
                {
                    text: '否决',
                    role: 'a20103',
                    // hidden: row => row.auditStatus === 3,
                    onClick: this.handleFail
                },
                {
                    text: '解绑',
                    onClick: this.removeStatus
                }
            ],
            searchColumns: {
                userId: '用户ID',
                taskType: '账号类型',
                auditStatus: {
                    type: ItemType.SELECT,
                    label: '审批状态',
                    options: [
                        { value: 2, label: '审批不通过' },
                        { value: 0, label: '审批中' },
                        { value: 1, label: '通过' }
                    ]
                },
                auditRemark: '原因说明',
                createTime: '创建时间',
                submitTime: '提交时间'
            }
        }
    },
    methods: {
        async handlePass({ userId, taskType }) {
            try {
                await this.$confirm('此操作将账号通过审核, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Audit.accountStatusPass, { userId, taskType })
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
        },
        async handleFail({ userId, taskType }) {
            try {
                const { value: auditRemark } = await this.$prompt('请输入不通过原因', '提示', {
                    type: 'warning',
                    inputValidator: val => val !== '',
                    inputErrorMessage: '不通过原因不能为空'
                })
                const res = await this.$ax.post(Audit.accountStatusFail, { userId, taskType, auditRemark })
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
        async removeStatus({ userId, taskType }) {
            if (!userId) {
                this.$message.warning('找不到用户ID')
                return
            }
            try {
                await this.$confirm('此操作将解绑账户审核, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Audit.accountRemoveStatus, { userId, taskType })
                if (res) {
                    this.$message.success(`解绑成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`解绑失败`)
                }
            } catch (err) {
                if (err === 'cancel') return
                console.error(err)
            }
        }
    }
}
</script>
