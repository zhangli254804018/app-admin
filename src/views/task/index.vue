<template>
  <div class="container task-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      list-role="a50101"
      add-role="a50102"
      :search-columns="searchColumns"
      :operate-columns="operateColumns"
      :operate-width="240"
      @onNew="onNew"
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

    <el-dialog :title="`新增任务`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="taskForm" :loading="loading" :columns="formColumns" :inline="false" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Task } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'Task',
    data() {
        return {
            visible: false,
            loading: false,
            url: Task.list,
            operateColumns: [{
                text: '任务领取记录查询',
                role: 'a50103',
                onClick: this.toUserRecord
            }, {
                text: '单个任务领取记录',
                role: 'a50104',
                onClick: this.toSingle
            }],
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
                account: {
                    lang: 'table.account'
                },
                taskLink: {
                    lang: 'table.taskLink'
                },
                top: {
                    lang: 'table.top'
                }
            },
            formColumns: {
                title: {
                    label: '标题',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                },
                taskType: {
                    label: '任务类型',
                    type: ItemType.SELECT,
                    remote: Task.typeList,
                    props: {
                        value: 'taskType',
                        label: 'typeName'
                    },
                    rules: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ]
                },
                taskLink: {
                    label: '任务链接',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '任务链接不能为空', trigger: 'blur' }
                    ]
                },
                amount: {
                    label: '任务单价',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '任务单价不能为空', trigger: 'blur' }
                    ]
                },
                totalQuantity: {
                    label: '任务总数',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '任务总数不能为空', trigger: 'blur' }
                    ]
                },
                taskDesc: {
                    label: '任务要求',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '任务要求不能为空', trigger: 'blur' }
                    ]
                }
            }
        }
    },
    methods: {
        onNew() {
            this.visible = true
        },
        async onSubmit() {
            try {
                await this.$refs.taskForm.validRules()
                const payload = {
                    ...this.$refs.taskForm.getValues()
                }
                this.loading = true
                const res = await this.$ax.post(Task.add, payload)
                if (res) {
                    this.$message.success(`新增成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`新增失败`)
                }
                this.loading = false
                this.visible = false
            } catch (err) {
                this.loading = false
                console.error(err)
            }
        },
        onClose() {
            this.visible = false
            this.$refs.taskForm.clean()
        },
        toUserRecord() {
            this.$router.push('/task/user-record')
        },
        toSingle({ id }) {
            // console.log(row)
            this.$router.push(`/task/user-record/${id}`)
        }
    }
}
</script>
