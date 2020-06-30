<template>
  <div class="container charge-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :is-show-detail="false"
      :is-show-search="false"
      :is-show-clean="false"
      add-role="a30403"
      list-role="a30401"
      edit-role="a30402"
      :operate-columns="operateColumns"
      @onNew="onNew"
      @onEdit="onEdit"
    >

      <template v-slot:table_column__status="{val}">
        <el-tag v-if="val" type="success">启用</el-tag>
        <el-tag v-else type="danger">关闭</el-tag>
      </template>
    </data-table>
    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}角色`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="channelForm" :loading="loading" :columns="formColumns" :inline="false">
        <template v-slot:form-item__status>
          <el-switch v-model="status" :active-value="1" :inactive-value="0" />
        </template>
      </form-render>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ editId ? '更新' : '新增' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Charge } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'ChargeChannel',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: Charge.channelList,
            operateColumns: [{
                text: '删除',
                role: 'a30404',
                onClick: this.onDelete
            }],
            columns: {
                id: 'ID',
                channelId: '渠道标识',
                channelTitle: '渠道名称',
                vips: '用户等级',
                remark: '详细说明',
                sort: '排序',
                type: '类型',
                status: '状态',
                createTime: '创建时间'
            },
            status: 0,
            editId: null,
            formColumns: {
                channelTitle: {
                    label: '渠道名称',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '渠道名称不能为空', trigger: 'blur' }
                    ]
                },
                remark: {
                    label: '详细说明',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '详细说明不能为空', trigger: 'blur' }
                    ]
                },
                sort: {
                    label: '排序',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '排序不能为空', trigger: 'blur' }
                    ]
                },
                vips: {
                    label: '用户等级',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '用户等级不能为空', trigger: 'blur' }
                    ]
                },
                type: {
                    label: '类型',
                    type: ItemType.SELECT,
                    options: [
                        { label: '类型1', value: 1 }
                    ],
                    rules: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ]
                },
                status: '状态',
                channelId: {
                    label: '渠道标识',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '渠道标识不能为空', trigger: 'blur' }
                    ]
                }
            }
        }
    },
    watch: {
        status(val) {
            this.$refs.channelForm.setValue('status', val)
        }
    },
    methods: {
        onNew() {
            this.visible = true
        },
        async onSubmit() {
            try {
                await this.$refs.channelForm.validRules()
                const payload = {
                    ...this.$refs.channelForm.getValues()
                }
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(Charge.channelUpdate, { ...payload, id: this.editId })
                    : await this.$ax.post(Charge.channelAdd, payload)
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
            this.status = row.status
            this.editId = row.id
            this.typeText = '编辑'
            this.$refs.channelForm.setValues(row)
        },
        async onDelete({ id }) {
            if (!id) {
                this.$message.warning('找不到需要删除的角色ID')
                return
            }
            try {
                await this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Charge.channelDelete, { id })
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
            this.status = 0
            this.visible = false
            this.$refs.channelForm.clean()
        }
    }
}
</script>
