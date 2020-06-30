<template>
  <div class="container system-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :is-show-detail="false"
      :search-columns="searchColumns"
      :operate-columns="operateColumns"
      list-role="a100601"
      add-role="a100603"
      edit-role="a100602"
      @onNew="onNew"
      @onEdit="onEdit"
    />
    <el-dialog :title="`${typeText}资源`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="resourceForm" :loading="loading" :columns="formColumns" :inline="false" />
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
    name: 'SystemResource',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: System.resourceList,
            operateColumns: [{
                text: '删除',
                role: 'a100604',
                onClick: this.onDelete
            }],
            searchColumns: {
                pid: '父级ID',
                depth: {
                    label: '页面深度',
                    type: ItemType.SELECT,
                    options: [
                        { label: '全部', value: 0 },
                        { label: '一级页面', value: 1 },
                        { label: '二级页面', value: 2 },
                        { label: '三级页面', value: 3 }
                    ]
                },
                simpleTitle: '简单标题',
                allTitle: '详细标题',
                h5Role: '前端角色'
            },
            columns: {
                id: '资源ID',
                pid: '父级ID',
                simpleTitle: '简单标题',
                link: '地址',
                h5Role: '前端资源',
                depth: '层级',
                needCheck: '是否需要校验',
                allTitle: '详细标题',
                createTime: '创建时间'
            },
            editId: null,
            formColumns: {
                pid: {
                    label: '父级ID',
                    type: ItemType.SELECT,
                    remote: System.resourceList,
                    cond: { size: 1000 },
                    props: {
                        value: 'id',
                        label: 'simpleTitle'
                    },
                    rules: [
                        { required: true, message: '父级ID不能为空', trigger: 'blur' }
                    ]
                },
                simpleTitle: {
                    label: '简单标题',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '简单标题不能为空', trigger: 'blur' }
                    ]
                },
                allTitle: {
                    label: '详细标题',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '详细标题不能为空', trigger: 'blur' }
                    ]
                },
                depth: {
                    label: '层级',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '层级不能为空', trigger: 'blur' }
                    ]
                },
                link: {
                    label: '地址',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '地址不能为空', trigger: 'blur' }
                    ]
                },
                h5Role: {
                    label: '前端资源',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '前端资源不能为空', trigger: 'blur' }
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
                await this.$refs.resourceForm.validRules()
                const payload = {
                    ...this.$refs.resourceForm.getValues()
                }
                // if (this.editId) {
                //     delete payload.h5Role
                //     delete payload.link
                // }
                this.loading = true
                const res = typeof this.editId === 'number'
                    ? await this.$ax.post(System.resourceUpdate, { ...payload, id: this.editId })
                    : await this.$ax.post(System.resourceAdd, payload)
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
            this.$refs.resourceForm.setValues(row)
        },
        async onDelete({ id }) {
            if (!id) {
                this.$message.warning('找不到需要删除的资源ID')
                return
            }
            try {
                await this.$confirm('此操作将删除该资源, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(System.resourceDelete, { id })
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
            this.$refs.resourceForm.clean()
        }
    }
}
</script>
