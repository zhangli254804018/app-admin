<template>
  <div class="container system-container">
    <el-tree
      ref="resTree"
      v-loading="isLoaded"
      :class="{disabled}"
      :data="menusList"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :expand-on-click-node="false"
      :check-strictly="true"
      :default-checked-keys="checkedArr"
      :props="defaultProps"
      @check-change="checkChange"
    />

    <div v-if="!isLoaded" style="text-align: center">
      <el-button :loading="loading" @click="$router.go(-1)">返回</el-button>
      <el-button v-permission="'a100206'" type="primary" :loading="loading" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission'
import { System } from '@/api/const'
export default {
    name: 'SystemRoleResource',
    directives: { permission },
    data() {
        return {
            disabled: false,
            isLoaded: true,
            loading: false,
            allRes: [],
            checkedArr: [],
            defaultProps: {
                children: 'list',
                label: 'simpleTitle'
            }
        }
    },
    computed: {
        roleId() {
            return this.$route.params.roleid
        },
        menusList() {
            return this.allRes.filter(res => res.depth < 2)
        },
        ids() {
            return this.$refs.resTree.getCheckedKeys()
        },
        getChecked() {
            return []
        }
    },
    created() {
        this.getAllRes()
    },
    methods: {
        checkChange(data, flat) {
            if (data.list && data.list.length) {
                this.handleFlats(data.list, flat)
            }
        },
        handleFlats(list, flat) {
            for (let i = 0, j = list.length; i < j; i++) {
                this.$refs.resTree.setChecked(list[i], flat)
            }
        },
        async getAllRes() {
            try {
                this.isLoaded = true
                const res = await this.$ax.post(System.roleOfRes, { roleId: this.roleId })
                this.allRes = res
                this.handleAuth(res)
                this.isLoaded = false
            } catch (err) {
                console.log(err)
                this.isLoaded = false
            }
        },
        async onSubmit() {
            try {
                this.loading = true
                this.disabled = true
                await this.$ax.post(System.roleSaveRes, { roleId: this.roleId, ids: this.ids })
                this.$message({
                    type: 'success',
                    message: '保存成功, 请刷新页面或重新登陆',
                    duration: 2000,
                    onClose: () => {
                        this.disabled = false
                        this.loading = false
                        this.$router.go(-1)
                    }
                })
            } catch (err) {
                this.disabled = false
                this.loading = false
            }
        },
        handleAuth(resources, ids) {
            resources.forEach(res => {
                if (res.auth) this.checkedArr.push(res.id)
                if (res.list && res.list.length) this.handleAuth(res.list)
            })
        }
    }
}
</script>

<style lang="scss">
.system-container {
    .disabled {
        position: relative;
        &::after {
            content: '';
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            position: absolute;
            z-index: 10;
        }
    }

    .el-tree-node__children {
        > .el-tree-node {
            display: flex;

            > .el-tree-node__content {
                width: 240px;
                padding-left: 43px !important;

                .el-tree-node__expand-icon {
                    display: none;
                }
            }

            > .el-tree-node__children {
                flex: 1;

                > .el-tree-node {
                    display: inline-block;

                    > .el-tree-node__content {
                        width: auto;
                        padding: 0 10px !important;
                        margin: 0 20px;
                    }
                }
            }
        }
    }
}
</style>
