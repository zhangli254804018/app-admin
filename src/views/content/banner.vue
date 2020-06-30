<template>
  <div class="container content-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :search-columns="searchColumns"
      :is-show-detail="false"
      list-role="a60301"
      add-role="a60303"
      edit-role="a60302"
      :operate-columns="operateColumns"
      @onEdit="onEdit"
      @onNew="onNew"
    >
      <template v-slot:table_column__imgLink="{ val }">
        <el-image :src="val" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
      </template>

      <template v-slot:table_column__nullity="{val}">
        <el-tag v-if="!val" type="success">正常</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </data-table>

    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}广告`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="bannerForm" :rules="rules" :loading="loading" :columns="formColumns" :inline="false" />
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
    name: 'ContentBanner',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: Content.bannerList,
            searchColumns: {
                title: '标题',
                nullity: {
                    type: ItemType.SELECT,
                    label: '是否可用',
                    options: [
                        { label: '正常', value: 0 },
                        { label: '禁用', value: 1 }
                    ]
                }
            },
            operateColumns: [{
                text: '删除',
                role: 'a60304',
                onClick: this.onDelete
            }],
            columns: {
                adType: '类型',
                title: '标题',
                jumpLink: '页面',
                imgLink: '图片',
                nullity: '是否启用',
                createTime: '创建时间'
            },
            rules: {},
            editId: null,
            formColumns: {
                title: {
                    label: '标题',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ]
                },
                jumpLink: {
                    label: '跳转链接',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '跳转链接不能为空', trigger: 'blur' }
                    ]
                },
                imgLink: {
                    label: '图片地址',
                    type: ItemType.UPLOAD,
                    width: 712,
                    height: 356,
                    path: 'content/ad',
                    rules: [
                        { required: true, message: '图片地址不能为空', trigger: 'blur' }
                    ]
                },
                adType: {
                    label: '广告类型',
                    type: ItemType.SELECT,
                    options: [],
                    remote: 'sas',
                    rules: [
                        { required: true, message: '广告类型不能为空', trigger: 'blur' }
                    ]
                },
                sort: {
                    label: '排序',
                    type: ItemType.INPUT
                }
            }
        }
    },
    created() {
    // this.getAdtypes()
    },
    methods: {
        onNew() {
            this.visible = true
        },
        async onSubmit() {
            try {
                await this.$refs.bannerForm.validRules()
                const payload = this.$refs.bannerForm.getValues()
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(Content.bannerUpdate, { ...payload, id: this.editId })
                    : await this.$ax.post(Content.bannerAdd, payload)
                if (res) {
                    this.$message.success(`${this.typeText}成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`${this.typeText}失败`)
                }
                this.loading = false
                this.visible = false
            } catch (err) {
                console.error(err)
                this.loading = false
            }
        },
        async onEdit(row) {
            this.visible = true
            await this.$nextTick()
            this.editId = row.id
            this.typeText = '编辑'
            this.$refs.bannerForm.setValues(row)
        },
        async onDelete({ id }) {
            if (!id) return
            try {
                await this.$confirm('此操作将删除该广告, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Content.bannerDelete, { id })
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
            this.$refs.bannerForm.clean()
        }
    }
}
</script>
