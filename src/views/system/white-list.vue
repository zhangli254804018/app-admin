<template>
  <div class="container system-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :is-show-detail="false"
      :search-columns="searchColumns"
      :operate-columns="operateColumns"
      list-role="a100401"
      edit-role="a100402"
      add-role="a100403"
      @onEdit="onEdit"
      @onNew="onNew"
    >

      <template v-slot:table_column__status="{val}">
        <el-tag v-if="val === 1" type="success">{{ $t('table.open' ) }}</el-tag>
        <el-tag v-else-if="val === 2" type="danger">{{ $t('table.close' ) }}</el-tag>
        <el-tag v-else type="warning">其他</el-tag>
      </template>

    </data-table>
    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}角色`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="wlForm" :loading="loading" :columns="formColumns" :inline="false">
        <template v-slot:form-item__status>
          <el-switch v-model="status" :active-value="1" :inactive-value="2" />
        </template>
      </form-render>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ editIp ? '更新' : '新增' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { System } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'SystemWhiteList',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: System.wlList,
            operateColumns: [{
                text: '删除',
                role: 'a100404',
                onClick: this.onDelete
            }],
            searchColumns: {
                ip: 'IP',
                type: {
                    type: ItemType.SELECT,
                    label: '类型',
                    options: [
                        { value: 0, label: '类型0' },
                        { value: 1, label: '类型1' },
                        { value: 2, label: '类型2' }
                    ]
                },
                remark: '介绍',
                status: {
                    type: ItemType.SELECT,
                    label: '状态',
                    options: [
                        { value: 1, label: '正常' },
                        { value: 2, label: '关闭' }
                    ]
                }
            },
            columns: {
                ip: 'IP',
                remark: {
                    lang: 'table.remark'
                },
                type: {
                    lang: 'table.type'
                },
                status: {
                    lang: 'table.status'
                },
                createTime: {
                    lang: 'table.createTime'
                },
                updateTime: {
                    lang: 'table.updateTime'
                }
            },
            status: 1,
            editIp: null,
            formColumns: {
                ip: {
                    label: 'IP',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: 'IP不能为空', trigger: 'blur' }
                    ]
                },
                type: {
                    label: '类型',
                    type: ItemType.SELECT,
                    options: [
                        { value: 0, label: '类型0' },
                        { value: 1, label: '类型1' },
                        { value: 2, label: '类型2' }
                    ],
                    rules: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ]
                },
                remark: {
                    label: '介绍',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '介绍不能为空', trigger: 'blur' }
                    ]
                },
                status: '状态'
            }
        }
    },
    watch: {
        status(val) {
            this.$refs.wlForm.setValue('status', val)
        }
    },
    methods: {
        onNew() {
            this.visible = true
        },
        async onSubmit() {
            try {
                await this.$refs.wlForm.validRules()
                const payload = {
                    ...this.$refs.wlForm.getValues()
                }
                this.loading = true
                const res = this.editIp
                    ? await this.$ax.post(System.wlUpdate, payload)
                    : await this.$ax.post(System.wlAdd, payload)
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
            this.editIp = row.ip
            this.typeText = '编辑'
            this.$refs.wlForm.setValues(row)
        },
        async onDelete({ ip }) {
            if (!ip) {
                this.$message.warning('找不到需要删除的IP')
                return
            }
            try {
                await this.$confirm('此操作将删除该IP, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(System.wlDelete, { ip })
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
            this.editIp = null
            this.typeText = '新增'
            this.visible = false
            this.$refs.wlForm.clean()
        }
    }
}
</script>
