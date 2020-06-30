<template>
  <div class="container content-container">
    <el-form v-permission="addRole" :inline="true">
      <el-form-item>
        <el-button type="primary" @click="visible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="fetching" :data="dataList">
      <el-table-column label="图片">
        <template slot-scope="scope">
          <el-image :src="scope.row.link" :lazy="true" :preview-src-list="previewList" :alt="scope.row.remark" />
        </template>
      </el-table-column>
      <el-table-column prop="picWidth" label="图片宽度" />
      <el-table-column prop="picHeight" label="图片高度" />
      <el-table-column prop="qrWidth" label="二维码宽度" />
      <el-table-column prop="axisX" label="二维码坐标X" />
      <el-table-column prop="axisY" label="二维码坐标Y" />
      <el-table-column prop="remark" label="介绍说明" />
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button v-permission="editRole" type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
          <el-button v-permission="delRole" type="text" size="small" @click="onDelete(scope.row.link)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="`${typeText}图片`" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" @close="onClose">
      <el-form ref="inviteForm" label-width="120px" :model="forms" :rules="rules">
        <el-form-item label="图片" prop="link">
          <upload v-model="forms.link" type="invite/picture" :disabled="isEdit" />
        </el-form-item>
        <el-form-item label="图片宽度" prop="picWidth">
          <el-input v-model.number="forms.picWidth" placeholder="请输入图片宽度" />
        </el-form-item>
        <el-form-item label="图片高度" prop="picHeight">
          <el-input v-model.number="forms.picHeight" placeholder="请输入图片高度" />
        </el-form-item>
        <el-form-item label="二维码宽度" prop="qrWidth">
          <el-input v-model.number="forms.qrWidth" placeholder="请输入二维码宽度" />
        </el-form-item>
        <el-form-item label="二维码坐标X" prop="axisX">
          <el-input v-model.number="forms.axisX" placeholder="请输入二维码坐标X" />
        </el-form-item>
        <el-form-item label="二维码坐标Y" prop="axisY">
          <el-input v-model.number="forms.axisY" placeholder="请输入二维码坐标Y" />
        </el-form-item>
        <el-form-item label="介绍说明" prop="remark">
          <el-input v-model="forms.remark" placeholder="请输入介绍说明" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="loading" @click="onClose">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">{{ isEdit ? '更新' : '新增' }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import permission from '@/directive/permission'
import { mapGetters } from 'vuex'
import { Content } from '@/api/const'
export default {
    name: 'ContentInvite',
    directives: { permission },
    data() {
        return {
            listRole: 'a60401',
            addRole: 'a60403',
            editRole: 'a60402',
            delRole: 'a60404',
            previewList: [],
            fetching: false,
            dataList: [],
            typeText: '新增',
            visible: false,
            loading: false,
            isEdit: null,
            rules: {
                link: [
                    { required: true, message: '图片不能为空', trigger: ['blur', 'change'] }
                ],
                picWidth: [
                    { required: true, message: '图片宽度不能为空', trigger: 'blur' }
                ],
                picHeight: [
                    { required: true, message: '图片高度不能为空', trigger: 'blur' }
                ],
                axisX: [
                    { required: true, message: '二维码坐标X不能为空', trigger: 'blur' }
                ],
                axisY: [
                    { required: true, message: '二维码坐标Y不能为空', trigger: 'blur' }
                ],
                qrWidth: [
                    { required: true, message: '二维码宽度不能为空', trigger: 'blur' }
                ],
                remark: [
                    { required: true, message: '介绍说明不能为空', trigger: 'blur' }
                ]
            },
            forms: {
                picWidth: '',
                picHeight: '',
                axisX: '',
                axisY: '',
                qrWidth: '',
                remark: '',
                link: ''
            }
        }
    },
    computed: {
        ...mapGetters(['roles'])
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            if (!this.roles.includes(this.listRole)) {
                this.$message.warning('您没有该表格访问权限')
                return
            }
            this.fetching = true
            this.$ax.post(Content.inviteList, {}).then(res => {
                this.dataList = res
                this.previewList = res.map(item => item.link)
                this.fetching = false
            }).catch(() => {
                this.fetching = false
            })
        },
        async onSubmit() {
            try {
                await this.$refs.inviteForm.validate()
                this.loading = true
                const res = this.isEdit
                    ? await this.$ax.post(Content.inviteUpdate, this.forms)
                    : await this.$ax.post(Content.inviteAdd, this.forms)
                if (res) {
                    this.$message.success(`${this.typeText}成功`)
                    this.getList()
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
            this.isEdit = true
            this.typeText = '编辑'
            this.forms = { ...row }
        },
        async onDelete(link) {
            if (!link) return
            try {
                await this.$confirm('此操作将删除该图片, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Content.inviteDelete, { link })
                if (res) {
                    this.$message.success(`删除成功`)
                    this.getList()
                } else {
                    this.$message.error(`删除失败`)
                }
            } catch (err) {
                console.error(err)
            }
        },
        onClose() {
            this.isEdit = false
            this.typeText = '新增'
            this.visible = false
            this.forms = {
                picWidth: '',
                picHeight: '',
                axisX: '',
                axisY: '',
                qrWidth: '',
                remark: '',
                link: ''
            }
            this.$refs.inviteForm.clearValidate()
        }
    }
}
</script>
