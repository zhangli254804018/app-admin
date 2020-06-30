<template>
  <div class="container content-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :search-columns="searchColumns"
      :is-show-detail="false"
      list-role="a60201"
      add-role="a60203"
      edit-role="a60202"
      :operate-columns="operateColumns"
      @onEdit="onEdit"
      @onNew="onNew"
    />
    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}帮助手册`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="helpForm" :loading="loading" :columns="formColumns" :inline="false" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ editId ? '更新' : '新增' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission'
import { Content } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'ContentHelp',
    directives: { permission },
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: Content.helpList,
            searchColumns: {
                title: '标题',
                detail: '内容'
            },
            operateColumns: [{
                text: '删除',
                role: 'a60204',
                onClick: this.onDelete
            }],
            columns: {
                helpType: '类型',
                title: '标题',
                detail: '内容',
                sort: '排序号',
                createUserId: '创始人ID',
                createTime: '创建时间'
            },
            editId: null,
            formColumns: {
                title: {
                    label: '标题',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                },
                detail: {
                    label: '帮助手册内容',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '帮助手册内容不能为空', trigger: 'blur' }
                    ]
                },
                sort: {
                    label: '排序',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '排序不能为空', trigger: 'blur' }
                    ]
                },
                helpType: {
                    label: '手册类型',
                    type: ItemType.SELECT,
                    remote: 'sasa',
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
                await this.$refs.helpForm.validRules()
                const payload = {
                    ...this.$refs.helpForm.getValues(),
                    createUserId: 12345 // 直接获取id
                }
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(Content.helpUpdate, { ...payload, id: this.editId })
                    : await this.$ax.post(Content.helpAdd, payload)
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
            this.$refs.helpForm.setValues(row)
        },
        async onDelete({ id }) {
            if (!id) return
            try {
                await this.$confirm('此操作将删除该帮助手册, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Content.helpDelete, { id })
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
            this.$refs.helpForm.clean()
        }
    }
}
</script>
