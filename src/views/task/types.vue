<template>
  <div class="container task-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :is-search="false"
      list-role="a50201"
      edit-role="a50202"
      :is-show-detail="false"
      @onEdit="onEdit"
    >

      <template v-slot:table_column__iconLink="{ val }">
        <el-image :src="val" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
      </template>

      <template v-slot:table_column__backgroundLink="{ val }">
        <el-image :src="val" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
      </template>
    </data-table>
    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}角色`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="typeForm" :loading="loading" :columns="formColumns" :inline="false" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ taskType ? '更新' : '新增' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Task } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'TaskTypes',
    data() {
        return {
            typeText: '编辑',
            visible: false,
            loading: false,
            url: Task.typeList,
            columns: {
                taskType: '任务类型ID',
                typeName: '类型名称',
                sort: '排序号',
                minVip: '用户等级',
                iconLink: '图标地址',
                backgroundLink: '背景图片'
            },
            taskType: null,
            formColumns: {
                typeName: {
                    label: '类型名称',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '类型名称不能为空', trigger: 'blur' }
                    ]
                },
                sort: {
                    label: '排序号',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '排序号不能为空', trigger: 'blur' }
                    ]
                },
                minVip: {
                    label: '用户等级',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '用户等级不能为空', trigger: 'blur' }
                    ]
                },
                iconLink: {
                    label: '图标地址',
                    type: ItemType.UPLOAD,
                    path: 'task/types',
                    width: 80,
                    height: 80,
                    rules: [
                        { required: true, message: '图标地址不能为空', trigger: 'blur' }
                    ]
                },
                backgroundLink: {
                    label: '背景图片',
                    type: ItemType.UPLOAD,
                    path: 'task/types',
                    width: 500,
                    height: 200,
                    rules: [
                        { required: true, message: '背景图片不能为空', trigger: 'blur' }
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
                await this.$refs.typeForm.validRules()
                const payload = this.$refs.typeForm.getValues()
                this.loading = true
                const res = await this.$ax.post(Task.typeUpdate, { ...payload, taskType: this.taskType })
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
            this.taskType = row.taskType
            this.typeText = '编辑'
            this.visible = true
            await this.$nextTick()
            this.$refs.typeForm.setValues(row)
        },
        onClose() {
            this.taskType = null
            this.visible = false
            this.$refs.typeForm.clean()
        }
    }
}
</script>
