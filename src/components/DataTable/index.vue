<template>
  <div class="data-table">
    <form-render v-if="Config.isSearch" ref="searchForm" class="data-table__header" :inline="true" :columns="Config.searchColumns" @onSubmit="getList">
      <!-- <template /> -->
    </form-render>
    <el-form :inline="true">
      <el-form-item v-if="Config.isShowNew" v-permission="addRole">
        <el-button type="primary" @click="onNew">新增</el-button>
      </el-form-item>
      <el-form-item v-if="Config.isShowSearch">
        <el-button type="primary" @click="onSearch">{{ $t('table.search') }}</el-button>
      </el-form-item>
      <el-form-item v-if="Config.isShowClean">
        <el-button @click="onClean">{{ $t('table.reset') }}</el-button>
      </el-form-item>
      <el-form-item v-if="Config.isImport">
        <el-button type="primary" @click="onImport">{{ $t('table.import') }}</el-button>
      </el-form-item>
      <el-form-item v-if="Config.isExport">
        <el-button type="primary" @click="onExport">{{ $t('table.export ') }}</el-button>
      </el-form-item>
      <slot name="extra-search" />
    </el-form>
    <el-table v-loading="loading" :data="dataList" class="data-table__content" @selection-change="handleSelectionChange">
      <el-table-column v-if="Config.multiple" type="selection" width="55" />
      <el-table-column v-for="(column, key) in Config.columns" :key="key" :width="column.width" :prop="key" :label="column.label || $t(column.lang)">
        <template slot-scope="scope">
          <slot :name="`table_column__${key}`" :column="scope.row" :val="scope.row[key]">
            <span>{{ scope.row[key] }}</span>
          </slot>
        </template>
      </el-table-column>
      <el-table-column
        v-if="Config.isShowOperate"
        fixed="right"
        label="操作"
        :width="Config.operateWidth"
      >
        <template slot-scope="scope">
          <el-button v-if="Config.isShowDetail" v-permission="detailRole" type="text" size="small" @click="onDetail(scope.row)">{{ $t('table.detail') }}</el-button>
          <el-button v-if="Config.isShowEdit" v-permission="editRole" type="text" size="small" @click="onEdit(scope.row)">{{ $t('table.edit') }}</el-button>
          <template v-for="(btn, index) in Config.operateColumns">
            <el-button v-if="handleHidden(btn.hidden, scope.row)" :key="index" v-permission="btn.role" size="small" type="text" @click="btn.onClick(scope.row)">
              {{ handleBtnText(btn.text, btn.lang, scope.row) }}
            </el-button>
          </template>
        </template>
      </el-table-column>

      <!-- <template v-slot:empty>
        <p>sasa</p>
      </template> -->
    </el-table>
    <div v-if="Config.isPagination" class="data-table__pagination">
      <el-pagination
        :hide-on-single-page="true"
        :current-page="cond.current"
        :page-size="cond.size"
        :layout="Config.paginationLayout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission'
import conf from './conf'
import { mapGetters } from 'vuex'
export default {
    name: 'DataTable',
    directives: { permission },
    props: {
        url: {
            // 接口地址
            type: String,
            default: ''
        },
        columns: {
            // 表格字段
            type: Object,
            default: () => ({})
        },
        extraQuery: {
            // 额外查询参数
            type: Object,
            default: () => ({})
        },
        multiple: {
            // 是否支持多选
            type: Boolean,
            default: conf.multiple
        },
        isSearch: {
            // 是否需要搜索栏
            type: Boolean,
            default: conf.isSearch
        },
        isShowSearch: {
            // 是否需要搜索
            type: Boolean,
            default: conf.isShowSearch
        },
        isShowNew: {
            type: Boolean,
            default: conf.isShowClean
        },
        isShowClean: {
            // 是否需要重置
            type: Boolean,
            default: conf.isShowClean
        },
        isExport: {
            // 是否有导出按钮
            type: Boolean,
            default: conf.isExport
        },
        isImport: {
            // 是否有导入按钮
            type: Boolean,
            default: conf.isImport
        },
        isShowOperate: {
            // 是否显示操作栏
            type: Boolean,
            default: conf.isShowOperate
        },
        operateWidth: {
            // 操作栏宽度
            type: Number,
            default: conf.operateWidth
        },
        operateColumns: {
            // 额外操作栏内容
            type: Array,
            default: () => []
        },
        isShowDetail: {
            // 是否显示详情按钮
            type: Boolean,
            default: conf.isShowDetail
        },
        isShowEdit: {
            // 是否显示详情按钮
            type: Boolean,
            default: conf.isShowEdit
        },
        searchColumns: {
            // 搜索栏
            type: Object,
            default: () => ({})
        },
        isPagination: {
            // 是否显示分页
            type: Boolean,
            default: conf.isPagination
        },
        paginationLayout: {
            // 分页模版
            type: String,
            default: conf.paginationLayout
        },
        // 权限
        listRole: {
            type: String,
            default: ''
        },
        addRole: {
            type: String,
            default: ''
        },
        detailRole: {
            type: String,
            default: ''
        },
        editRole: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            loading: false,
            cond: {
                size: conf.size,
                current: conf.page
            },
            total: 0,
            dataList: []
        }
    },
    computed: {
        ...mapGetters(['language', 'roles']),
        Config() {
            const columns = {}
            Object.keys(this.columns).forEach(key => {
                let item = this.columns[key]
                if (typeof item === 'string') {
                    item = {
                        label: item
                    }
                }
                columns[key] = {
                    ...item
                }
            })
            return {
                ...conf,
                url: this.url,
                columns,
                multiple: this.multiple,
                isSearch: this.isSearch,
                extraQuery: this.extraQuery,
                isExport: this.isExport,
                isImport: this.isImport,
                isShowSearch: this.isShowSearch,
                isShowNew: this.isShowNew,
                isShowClean: this.isShowClean,
                isShowEdit: this.isShowEdit,
                isShowDetail: this.isShowDetail,
                isShowOperate: this.isShowOperate,
                operateColumns: this.operateColumns,
                searchColumns: this.searchColumns,
                operateWidth: this.operateWidth,
                isPagination: this.isPagination,
                paginationLayout: this.paginationLayout
            }
        }
    },
    watch: {
        language() {
            this.getList()
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            if (!this.Config.url) {
                this.$message.warning('接口地址不能为空')
                return
            }
            if (!this.roles.includes(this.listRole)) {
                this.$message.warning('您没有该表格访问权限')
                return
            }
            await this.$nextTick()
            const cond = this.Config.isSearch
                ? this.$refs.searchForm.getValues()
                : {}
            this.loading = true
            try {
                const res = await this.$ax.post(this.url, {
                    ...this.cond,
                    ...cond,
                    ...this.extraQuery
                })
                this.dataList = res.list
                this.cond.current = res.pageNum
                this.cond.size = res.pageSize
                this.total = res.total
            } catch (err) {
                console.log(err)
            }
            this.loading = false
        },
        onDetail(row) {
            this.$emit('onDetail', row)
        },
        onEdit(row) {
            this.$emit('onEdit', row)
        },
        onSearch() {
            this.$emit('onSearch', {
                ...this.cond,
                ...this.Config.extraQuery
            })
            this.getList()
        },
        onClean() {
            this.$refs.searchForm.clean()
            this.cond.current = conf.current
            this.cond.size = conf.size
            this.$emit('onClean')
            this.getList()
        },
        onNew() {
            this.$emit('onNew')
        },
        onImport() {
            this.$emit('onImport')
        },
        onExport() {
            this.$emit('onExport')
        },
        handleSelectionChange(rows) {
            this.$emit('handleSelectionChange', rows)
        },
        handleSizeChange(size) {
            this.cond.size = size
            this.getList()
        },
        handleCurrentChange(page) {
            this.cond.current = page
            this.getList()
        },
        handleHidden(cb, row) {
            if (typeof cb === 'undefined') return true
            else if (typeof cb === 'boolean') return cb
            else return cb(row)
        },
        handleBtnText(text, lang, row) {
            if (!text) return this.$t(lang)
            if (typeof text === 'string') return text
            return text(row)
        }
    }
}
</script>

<style lang="scss">
.data-table {
  &__header{}
  &__content{
    margin-bottom: 20px;
  }
  &__pagination{}
}
</style>
