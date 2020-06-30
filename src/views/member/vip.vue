<template>
  <div class="container member-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :is-show-detail="false"
      :is-show-search="false"
      :is-show-clean="false"
      list-role="a10201"
      edit-role="a10202"
      :operate-columns="operateColumns"
      @onEdit="onEdit"
      @onNew="onNew"
    />

    <el-dialog :title="`${typeText}角色`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
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
    name: 'MemberVip',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: Member.vipList,
            operateColumns: [{
                // text: this.$t('table.delete'),
                lang: 'table.delete',
                onClick: this.onDelete
            }],
            editId: null,
            formColumns: {
                vip: {
                    // label: 'VIP等级',
                    lang: 'form.memberVip.vip',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: 'VIP等级不能为空', trigger: 'blur' }
                    ]
                },
                title: {
                    lang: 'form.memberVip.title',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '等级名称不能为空', trigger: 'blur' }
                    ]
                },
                rechargeAmount: {
                    lang: 'table.rechargeAmount',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '充值金额不能为空', trigger: 'blur' }
                    ]
                },
                dayTaskCount: {
                    lang: 'table.dayTaskCount',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '每日任务次数不能为空', trigger: 'blur' }
                    ]
                }
            }
        }
    },
    computed: {
        columns() {
            return {
                vip: this.$t('table.vip'),
                title: this.$t('table.vipTitle'),
                rechargeAmount: this.$t('table.rechargeAmount'),
                dayTaskCount: this.$t('table.dayTaskCount')
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
                    ...values,
                    vip: ~~values.vip,
                    dayTaskCount: ~~values.dayTaskCount,
                    rechargeAmount: ~~values.rechargeAmount
                }
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(Member.vipUpdate, payload)
                    : await this.$ax.post(Member.vipAdd, payload)
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
        async onDelete({ vip }) {
            if (!vip) {
                this.$message.warning('找不到需要删除的角色ID')
                return
            }
            try {
                await this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Member.vipDelete, { vip })
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
