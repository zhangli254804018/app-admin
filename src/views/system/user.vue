<template>
  <div class="container system-container">
    <data-table
      ref="dataTable"
      :url="url"
      :columns="columns"
      :search-columns="searchColumns"
      :is-show-detail="false"
      :operate-width="150"
      :operate-columns="operateColumns"
      list-role="a100101"
      edit-role="a100102"
      add-role="a100103"
      @onEdit="onEdit"
      @onNew="onNew"
    >
      <template v-slot:table_column__nullity="{val}">
        <el-tag v-if="!val" type="success">启用</el-tag>
        <el-tag v-else type="danger">禁用</el-tag>
      </template>
    </data-table>
    <!-- 广告表单 -->
    <el-dialog :title="`${typeText}用户`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <form-render ref="userForm" :loading="loading" :columns="formColumns" :inline="false" />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ editId ? '更新' : '新增' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MD5 from 'md5'
import { System } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'SystemUser',
    data() {
        return {
            typeText: '新增',
            visible: false,
            loading: false,
            url: System.userList,
            searchColumns: {
                username: '账号',
                roleName: '角色名称',
                nullity: {
                    type: ItemType.SELECT,
                    label: '是否启用',
                    options: [
                        { value: 0, label: '启用' },
                        { value: 1, label: '禁用' }
                    ]
                }
            },
            operateColumns: [{
                text: row => row.nullity === 0 ? '禁用' : '启用',
                role: 'a100105',
                onClick: this.toggleStatus
            }, {
                text: '删除',
                role: 'a100104',
                onClick: this.onDelete
            }],
            columns: {
                id: '用户ID',
                username: '账号',
                nickname: '昵称',
                roleName: '角色名称',
                nullity: '是否启用',
                createTime: '创建时间',
                lastLoginTime: '最后登录时间',
                lastLoginIp: '最后登录IP'
            },
            editId: null,
            temp: null,
            formColumns: {
                username: {
                    label: '账号',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ]
                },
                nickname: {
                    label: '真实姓名',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '真实姓名不能为空', trigger: 'blur' }
                    ]
                },
                passwd: {
                    label: '密码',
                    type: ItemType.INPUT,
                    rules: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
                roleId: {
                    label: '所属角色',
                    type: ItemType.SELECT,
                    remote: System.roleList,
                    props: {
                        value: 'id',
                        label: 'roleName'
                    },
                    rules: [
                        { required: true, message: '角色ID不能为空', trigger: 'blur' }
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
                await this.$refs.userForm.validRules()
                const values = this.$refs.userForm.getValues()
                const payload = {
                    ...values,
                    passwd: MD5(values.passwd)
                }
                this.loading = true
                const res = this.editId
                    ? await this.$ax.post(System.userUpdate, { ...payload, id: this.editId, nullity: this.temp.nullity })
                    : await this.$ax.post(System.userAdd, payload)
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
            this.temp = row
            await this.$nextTick()
            this.editId = row.id
            this.typeText = '编辑'
            this.$refs.userForm.setValues(row)
        },
        async onDelete({ id }) {
            if (!id) {
                this.$message.warning('找不到需要删除的用户ID')
                return
            }
            try {
                await this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(System.userDelete, { id })
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
        async toggleStatus({ id, nullity }) {
            if (!id) {
                this.$message.warning('找不到该用户ID')
                return
            }
            try {
                await this.$confirm('此操作将切换该用户是否可用, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(System.userToggleNullity, { id, nullity: nullity === 0 ? 1 : 0 })
                if (res) {
                    this.$message.success(`${nullity === 0 ? '禁用' : '启用'}成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`${nullity === 0 ? '禁用' : '启用'}失败`)
                }
            } catch (err) {
                if (err !== 'cancel') {
                    this.$message.error(`${nullity === 0 ? '禁用' : '启用'}失败`)
                }
            }
        },
        onClose() {
            this.temp = null
            this.editId = null
            this.typeText = '新增'
            this.visible = false
            this.$refs.userForm.clean()
        }
    }
}
</script>
