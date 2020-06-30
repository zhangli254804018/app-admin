<template>
  <div class="container audit-container">
    <data-table
      ref="dataTable"
      :url="url"
      :search-columns="searchColumns"
      :columns="columns"
      :operate-columns="operateColumns"
      :operate-width="140"
      :is-show-detail="false"
      list-role="a20601"
    >

      <template v-slot:table_column__status="{val}">
        <el-tag v-if="val === 1" type="success">通过</el-tag>
        <el-tag v-else-if="val === -1" type="danger">关闭</el-tag>
        <el-tag v-else-if="val === 0" type="primary">审批中</el-tag>
        <el-tag v-else-if="val === 3" type="success">出款成功</el-tag>
        <el-tag v-else-if="val === 2" type="success">出款中</el-tag>
        <el-tag v-else type="danger">状态: {{ val }}</el-tag>
      </template>
    </data-table>
  </div>
</template>

<script>

// --**status状态  account提现人账号 accountName提现人姓名 bankName银行名称 auditAdmin审核管理员账号 successAdmin出款人账号 payType支付方式 remark介绍说明 createTimeBegin创建开始时间 createTimeEnd创建结束时间
// auditTimeBegin审核开始时间 auditTimeEnd审核结束时间

import { ItemType } from '@/components/FormRender/types'
import { Audit } from '@/api/const'
export default {
    name: 'AuditWithdraw',
    data() {
        return {
            url: Audit.withdrawList,
            searchColumns: {
                status: {
                    type: ItemType.SELECT,
                    label: '状态',
                    options: [
                        { value: 1, label: '通过' },
                        { value: -1, label: '关闭' },
                        { value: 0, label: '审批中' },
                        { value: 3, label: '出款成功' },
                        { value: 2, label: '出款中' }
                    ]
                },
                account: '提现人账号',
                accountName: '提现人姓名',
                bankName: '银行名称',
                auditAdmin: '审核管理员账号',
                successAdmin: '出款人账号',
                payType: '支付方式',
                remark: '介绍说明',
                createTimeBegin: '创建开始时间',
                createTimeEnd: '创建结束时间',
                auditTimeBegin: '审核开始时间',
                auditTimeEnd: '审核结束时间 '
            },

            columns: {
                id: 'ID',
                amount: '取现金额',
                createIp: '创建IP',
                accountName: '提现人姓名',
                auditAdminId: '审核管理员ID',
                auditAdmin: '审核管理员账号',
                bankName: '银行名称',
                auditRemark: '审核意见',
                remark: '说明',
                userId: '用户ID',
                feeRate: '手续费比例',
                feeAmount: '手续费',
                payType: '支付方式',
                payAmount: '支付费用',
                createTime: {
                    label: '创建时间',
                    width: 180
                },
                successAdmin: '出款人账户',
                account: {
                    label: '提现人账号',
                    width: 140
                },
                status: '状态'
            },
            operateColumns: [
                {
                    text: '通过',
                    role: 'a20602',
                    hidden: row => row.status === 0,
                    onClick: this.handlePass
                },
                {
                    text: '否决',
                    role: 'a20603',
                    hidden: row => row.status === 0,
                    onClick: this.handleFail
                },
                {
                    text: '出款中',
                    role: 'a20604',
                    hidden: row => row.status === 1,
                    onClick: this.handlePay
                },
                {
                    text: '出款成功',
                    role: 'a20605',
                    hidden: row => row.status === 2,
                    onClick: this.handlePaysuc
                }
            ]
        }
    },
    methods: {
        async handlePay({ id }) {
            try {
                await this.$confirm('此操作将提现修改成出款中, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Audit.withdrawPay, { id })
                if (res) {
                    this.$message.success(`修改成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`修改失败`)
                }
            } catch (err) {
                if (err === 'cancel') return
                console.error(err)
            }
        },
        async handlePaysuc({ id }) {
            try {
                await this.$confirm('此操作将提现修改成出款成功, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Audit.withdrawPaysuc, { id })
                if (res) {
                    this.$message.success(`修改成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`修改失败`)
                }
            } catch (err) {
                if (err === 'cancel') return
                console.error(err)
            }
        },
        async handleFail({ id }) {
            try {
                const { value: auditRemark } = await this.$prompt('请输入不通过原因', '提示', {
                    type: 'warning',
                    inputValidator: val => val !== '',
                    inputErrorMessage: '不通过原因不能为空'
                })
                const res = await this.$ax.post(Audit.withdrawFail, { id, auditRemark })
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
                await this.$confirm('此操作将提现通过审核, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Audit.withdrawPass, { id })
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

