<template>
  <div class="container content-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :search-columns="searchColumns"
      :is-show-detail="false"
      list-role="a60101"
      edit-role="a60102"
      add-role="a60103"
      :operate-columns="operateColumns"
      @onEdit="onEdit"
      @onNew="onNew"
    >
      <template v-slot:table_column__nullity="{val}">
        <el-tag v-if="!val" type="success">启用</el-tag>
        <el-tag v-else type="danger">不启用</el-tag>
      </template>
    </data-table>
    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}公告`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="noticeForm" :rules="rules" :loading="loading" :columns="formColumns" :inline="false" :label-width="120">
        <template v-slot:form-item__nullity>
          <el-switch v-model="formColumns.nullity.value" :active-value="0" :inactive-value="1" />
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
import { Content } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'ContentNotice',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: Content.noticeList,
            searchColumns: {
                title: '标题'
            },
            operateColumns: [{
                text: '删除',
                role: 'a60104',
                onClick: this.onDelete
            }],
            columns: {
                title: '标题',
                detail: '内容',
                sort: '排序号',
                nullity: '状态',
                beginTime: '公告开始时间',
                endTime: '公告结束时间',
                createTime: '创建时间'
            },
            editId: null,
            extraForm: {
                beginTime: '',
                endTime: '',
                nullity: 0
            },
            formColumns: {
                title: {
                    label: '标题',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                },
                detail: {
                    label: '公告详细内容',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '公告详细内容不能为空', trigger: 'blur' }
                    ]
                },
                // beginTime: '公告开始时间',
                // endTime: '公告结束时间',
                beginTime: {
                    label: '公告开始时间',
                    type: ItemType.INPUT,
                    // type: ItemType.DATETIME,
                    rules: [
                        { required: true, message: '公告开始不能为空', trigger: 'blur' }
                    ]
                },
                endTime: {
                    label: '公告结束时间',
                    type: ItemType.INPUT,
                    // type: ItemType.DATETIME,
                    rules: [
                        { required: true, message: '公告结束不能为空', trigger: 'blur' }
                    ]
                },
                nullity: {
                    value: 0,
                    label: '是否启用'
                },
                sort: {
                    label: '排序',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '排序不能为空', trigger: 'blur' }
                    ]
                }
            }
        }
    },
    watch: {
        extraForm: {
            deep: true,
            handler(val, old) {
                Object.keys(val).forEach(key => {
                    this.$refs.noticeForm.setValue(key, val[key])
                })
            }
        }
    },
    methods: {
        onNew() {
            this.visible = true
        },
        async onSubmit() {
            try {
                await this.$refs.noticeForm.validRules()
                const payload = {
                    ...this.$refs.noticeForm.getValues()
                    // ...this.extraForm
                }
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(Content.noticeUpdate, { ...payload, id: this.editId })
                    : await this.$ax.post(Content.noticeAdd, payload)
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
            this.extraForm.nullity = row.nullity
            this.editId = row.id
            this.typeText = '编辑'
            this.$refs.noticeForm.setValues(row)
        },
        async onDelete({ id }) {
            if (!id) return
            try {
                await this.$confirm('此操作将删除该公告, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Content.noticeDelete, { id })
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
            this.extraForm.nullity = 0
            this.visible = false
            this.$refs.noticeForm.clean()
        }
    }
}
</script>
