<template>
  <div class="container member-container">
    <data-row :rows="rows" />
    <data-table
      ref="dataTable"
      :url="url"
      :search-columns="searchColumns"
      :columns="columns"
      :is-show-edit="false"
      :operate-width="240"
      list-role="a10101"
      detail-role="a10102"
      :operate-columns="operateColumns"
      @onDetail="onDetail"
    >
      <template v-slot:table_column__avatar="{ val }">
        <el-image :src="val" lazy>
          <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline" />
          </div>
        </el-image>
      </template>

      <template v-slot:table_column__nullity="{val}">
        <el-tag v-if="val === 0" type="success">{{ $t('table.available') }}</el-tag>
        <el-tag v-else type="danger">{{ $t('table.disable') }}</el-tag>
      </template>

      <template v-slot:table_column__robot="{val}">
        <el-tag v-if="val" type="success">{{ $t('table.yes') }}</el-tag>
        <el-tag v-else type="danger">{{ $t('table.no') }}</el-tag>
      </template>
    </data-table>

    <el-dialog
      title="单个登陆日志"
      :visible.sync="visible"
      width="30%"
    >

      <el-form label-width="80px">
        <el-form-item label="登陆IP">
          <el-input v-model="loginIp" readonly />
        </el-form-item>
        <el-form-item label="登陆时间">
          <el-input v-model="loginTime" readonly />
        </el-form-item>
      </el-form>
      <!-- <span>这是一段信息</span> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Member } from '@/api/const'
import { ItemType } from '@/components/FormRender/types'
export default {
    name: 'Member',
    data() {
        return {
            visible: false,
            loginIp: '',
            loginTime: '',
            url: Member.memberList,
            rowRole: 'a10106',
            rows: {
                todayRegCount: 0,
                yesterdayRegCount: 0
            },

            searchColumns: {
                pid: {
                    type: ItemType.INPUT,
                    label: '上级ID'
                },
                nullity: {
                    type: ItemType.SELECT,
                    label: '会员是否可用',
                    options: [
                        { label: '可用', value: 0 },
                        { label: '禁用', value: 1 }
                    ]
                },
                vip: {
                    type: ItemType.INPUT,
                    label: 'VIP等级'
                },
                robot: {
                    type: ItemType.SELECT,
                    label: '是否机器人',
                    options: [
                        { label: '否', value: 0 },
                        { label: '是', value: 1 }
                    ]
                },
                phone: {
                    type: ItemType.INPUT,
                    label: '手机号'
                },
                qq: {
                    type: ItemType.INPUT,
                    label: 'QQ'
                },
                weichat: {
                    type: ItemType.INPUT,
                    label: '微信'
                },
                regTimeBegin: '注册起始时间',
                regTimeEnd: '注册结束时间'
            },

            operateColumns: [{
                text: row => row.nullity ? this.$t('table.available') : this.$t('table.disable'),
                role: 'a10105',
                onClick: this.toggleNullity
            }, {
                lang: 'table.loginRecord',
                role: 'a10103',
                onClick: this.loginRecord
            }, {
                lang: 'table.updatePasswd',
                role: 'a10104',
                onClick: this.updatePasswd
            }]
        }
    },
    computed: {
        ...mapGetters(['roles']),
        lang() {
            return this.$t('table')
        },
        columns() {
            return {
                pid: this.$t('table.parentId'),
                account: {
                    label: this.$t('table.account'),
                    width: 140
                },
                nickname: this.$t('table.nickname'),
                vip: this.$t('table.vip'),
                avatar: {
                    label: this.$t('table.avatar'),
                    width: 140
                },
                weichat: {
                    label: this.$t('table.weichat'),
                    width: 140
                },
                phone: {
                    label: this.$t('table.phone'),
                    width: 140
                },
                qq: this.$t('table.qq'),
                score: this.$t('table.score'),
                totalRecharge: {
                    label: this.$t('table.totalRecharge'),
                    width: 140
                },
                totalWithdrawal: {
                    label: this.$t('table.totalWithdrawal'),
                    width: 140
                },
                regTime: {
                    label: this.$t('table.regTime'),
                    width: 180
                },
                robot: this.$t('table.isRobot'),
                nullity: this.$t('table.nullity')
            }
        }
    },
    created() {
        this.getRegStatistics()
    },
    methods: {
        onDetail({ userId }) {
            this.$router.push(`/member/${userId}`)
        },
        async loginRecord({ userId }) {
            try {
                const res = await this.$ax.post(Member.memberLoginRecord, { id: userId })
                this.loginIp = res.createIp
                this.loginTime = res.createTime
                this.visible = true
            } catch (err) {
                console.log(err)
            }
        },
        async updatePasswd({ userId }) {
            try {
                const { value: passwd } = await this.$prompt('请输入新的密码', '提示', {
                    type: 'warning',
                    inputType: 'password',
                    inputValidator: val => val !== '',
                    inputErrorMessage: '新密码不能为空'
                })
                const res = await this.$ax.post(Member.memberUpdatePasswd, { userId, passwd })
                if (res) {
                    this.$message.success(`修改成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`修改失败`)
                }
            } catch (err) {
                if (err === 'cancel') return
                this.$message.error(`修改失败`)
            }
        },
        async toggleNullity({ userId, nullity }) {
            if (!userId) {
                this.$message.warning('找不到该用户ID')
                return
            }
            try {
                await this.$confirm('此操作将切换该用户是否可用, 是否继续?', '提示', {
                    type: 'warning'
                })
                const res = await this.$ax.post(Member.memberUpdateNullity, { userId, nullity: nullity === 0 ? 1 : 0 })
                if (res) {
                    this.$message.success(`${nullity === 0 ? '禁用' : '启用'}成功`)
                    this.$refs.dataTable.getList()
                } else {
                    this.$message.error(`${nullity === 0 ? '禁用' : '启用'}失败`)
                }
            } catch (err) {
                console.log(err)
                if (err !== 'cancel') {
                    this.$message.error(`${nullity === 0 ? '禁用' : '启用'}失败`)
                }
            }
        },
        async getRegStatistics() {
            try {
                if (!this.roles.includes(this.rowRole)) {
                    return
                }
                const res = await this.$ax.post(Member.getRegStatistics, {})
                if (res.length) {
                    this.rows = res[0]
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

}
</script>
