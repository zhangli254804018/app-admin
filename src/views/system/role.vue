<template>
  <div class="container system-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :is-show-detail="false"
      :is-show-search="false"
      :is-show-clean="false"
      list-role="a100201"
      edit-role="a100202"
      add-role="a100203"
      :operate-columns="operateColumns"
      @onNew="onNew"
      @onEdit="onEdit"
    />
    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}角色`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="roleForm" :loading="loading" :columns="formColumns" :inline="false" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ editId ? '更新' : '新增' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { System } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'SystemRole',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: System.roleList,
            operateColumns: [{
                text: '删除',
                role: 'a100204',
                onClick: this.onDelete
            }, {
                text: '资源配置',
                role: 'a100205',
                onClick: this.toResource
            }],
            columns: {
                id: '角色ID',
                roleName: '角色名称',
                createTime: '创建时间'
            },
            editId: null,
            formColumns: {
                roleName: {
                    label: '角色名称',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
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
                await this.$refs.roleForm.validRules()
                const payload = {
                    ...this.$refs.roleForm.getValues()
                }
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(System.roleUpdate, { ...payload, id: this.editId })
                    : await this.$ax.post(System.roleAdd, payload)
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
            this.editId = row.id
            this.typeText = '编辑'
            this.$refs.roleForm.setValues(row)
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
                const res = await this.$ax.post(System.roleDelete, { id })
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
        toResource({ id }) {
            this.$router.push(`/system/role/${id}/resource`)
        },
        onClose() {
            this.editId = null
            this.typeText = '新增'
            this.visible = false
            this.$refs.roleForm.clean()
        }
    }
}
</script>
