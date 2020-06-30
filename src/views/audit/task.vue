<template>
  <div class="container audit-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :search-columns="searchColumns"
      list-role="a20201"
      :operate-columns="operateColumns"
      :is-show-detail="false"
    >
      <template v-slot:table_column__status="{val}">
        <el-tag v-if="val === 1" type="success">{{ $t('table.pass' ) }}</el-tag>
        <el-tag v-else-if="val === 2" type="danger">{{ $t('table.close' ) }}</el-tag>
        <el-tag v-else-if="val === 0" type="warning">{{ $t('table.wait') }}</el-tag>
      </template>

      <template v-slot:table_column__top="{val}">
        <el-tag v-if="val" type="success">{{ $t('table.yes' ) }}</el-tag>
        <el-tag v-else type="danger">{{ $t('table.no' ) }}</el-tag>
      </template>
    </data-table>
  </div>
</template>

<script>
import { Audit, Task } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'AuditTask',
    data() {
        return {
            url: Audit.taskList,
            searchColumns: {
                createIp: '创建IP',
                taskType: {
                    type: ItemType.SELECT,
                    label: '任务类型',
                    remote: Task.typeList,
                    props: {
                        value: 'taskType',
                        label: 'typeName'
                    }
                },
                amountMin: '最少单价',
                leftQuantityMin: '最少剩余数量',
                totalQuantityMin: '最少总量',
                nickname: '用户真实姓名',
                account: '用户账户',
                status: {
                    type: ItemType.SELECT,
                    label: '状态',
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
                createIp: {
                    lang: 'table.createIp'
                },
                amount: {
                    lang: 'table.amount'
                },
                leftQuantity: {
                    lang: 'table.leftQuantity'
                },
                typeName: {
                    lang: 'table.typeName'
                },
                status: {
                    lang: 'table.status'
                },
                auditRemark: {
                    label: '否决原因',
                    width: 180
                },
                createTime: {
                    lang: 'table.createTime',
                    width: 180
                },
                userId: {
                    lang: 'table.userId'
                },
                taskDesc: {
                    lang: 'table.taskDesc'
                },
                minVip: {
                    lang: 'table.minVip'
                },
                taskType: {
                    lang: 'table.taskType'
                },
                totalQuantity: {
                    lang: 'table.totalQuantity'
                },
                nickname: {
                    lang: 'table.nickname',
                    width: 140
                },
                // account: {
                //     lang: 'table.account'
                // },
                // taskLink: {
                //     lang: 'table.taskLink'
                // },
                top: {
                    lang: 'table.top'
                }
            },
            operateColumns: [
                {
                    text: '通过',
                    role: 'a20202',
                    onClick: this.handlePass
                },
                {
                    text: '否决',
                    role: 'a20203',
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
                const res = await this.$ax.post(Audit.taskFail, { id, auditRemark })
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
                const res = await this.$ax.post(Audit.taskPass, { id })
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

