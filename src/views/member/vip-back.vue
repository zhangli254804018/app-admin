<template>
  <div class="container member-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :is-show-detail="false"
      :is-show-search="false"
      :is-show-clean="false"
      list-role="a10301"
      edit-role="a10302"
      add-role="a10303"
      :operate-columns="operateColumns"
      @onEdit="onEdit"
      @onNew="onNew"
    >

      <template v-slot:table_column__type="{val}">
        <el-tag v-if="val === 1">vip类型</el-tag>
        <el-tag v-else-if="val === 2">师徒类型</el-tag>
      </template>
    </data-table>

    <el-dialog :title="`${typeText}返佣信息`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="vipForm" :loading="loading" :columns="formColumns" :inline="false" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">{{ $t('table.cancel') }}</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ editId ? $t('table.update') : $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Member } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'VipBack',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: Member.vipBackList,
            operateColumns: [{
                lang: 'table.delete',
                role: 'a10304',
                onClick: this.onDelete
            }],
            editId: null,
            columns: {
                vip: 'VIP等级',
                title: '等级名称',
                level: '层级',
                type: '类型',
                rebate: '回扣比例',
                createTime: '创建时间'
            },
            formColumns: {
                vip: {
                    label: 'VIP等级',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: 'VIP等级不能为空', trigger: 'blur' }
                    ]
                },
                // title: {
                //     label: '等级名称',
                //     type: ItemType.INPUT,
                //     rules: [
                //         { required: true, message: '等级名称不能为空', trigger: 'blur' }
                //     ]
                // },
                level: {
                    label: '层级',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '层级不能为空', trigger: 'blur' }
                    ]
                },
                rebate: {
                    label: '回扣比例',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '回扣比例不能为空', trigger: 'blur' }
                    ]
                },
                type: {
                    label: '类型',
                    type: ItemType.SELECT,
                    options: [
                        { label: 'vip类型', value: 1 },
                        { label: '师徒类型', value: 2 }
                    ],
                    rules: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
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
                await this.$refs.vipForm.validRules()
                const values = this.$refs.vipForm.getValues()
                const payload = {
                    ...values
                }
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(Member.vipBackUpdate, payload)
                    : await this.$ax.post(Member.vipBackAdd, payload)
                if (res) {
                    this.$message.success(`${this.typeText}成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`${this.typeText}失败`)
                }
                this.loading = false
                this.visible = false
            } catch (err) {
                this.loading = false
                console.error(err)
            }
        },
        async onEdit(row) {
            this.visible = true
            await this.$nextTick()
            this.editId = row.vip
            this.typeText = '编辑'
            this.$refs.vipForm.setValues(row)
        },
        async onDelete({ vip, level }) {
            if (!vip || !level) {
                this.$message.warning('找不到需要删除返佣信息')
                return
            }
            try {
                await this.$confirm('此操作将删除该返佣信息, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Member.vipBackDelete, { vip, level })
                if (res) {
                    this.$message.success(`删除成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`删除失败`)
                }
            } catch (err) {
                console.error(err)
            }
        },
        onClose() {
            this.editId = null
            this.typeText = '新增'
            this.visible = false
            this.$refs.vipForm.clean()
        }
    }
}
</script>
