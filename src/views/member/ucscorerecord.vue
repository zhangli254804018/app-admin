
<template>
  <div class="container member-container">
    <data-table
      ref="dataTable"
      :url="url"
      :search-columns="searchColumns"
      :columns="columns"
      list-role="a10501"
      :operate-columns="operateColumns"
    />
  </div>
</template>

<script>
import { Member } from '@/api/const'
export default {
    name: 'UcScoreRecord',
    data() {
        return {
            url: Member.ucscorerecord,
            searchColumns: {
                userId: '用户ID',
                type: '类型',
                remark: '介绍',
                createTime: '创建时间'
            },
            operateColumns: [{
                text: '加减信用值',
                role: 'a10502',
                onClick: this.setScore
            }],
            columns: {
                id: 'ID',
                userId: '用户ID',
                type: '类型',
                scoreValue: '信用分',
                remark: '介绍',
                createAdminId: '创建者ID',
                createTime: '创建时间'
            }
        }
    },
    methods: {
        async setScore({ id }) {
            try {
                this.$message.warning('缺少接口')
                return
                // await this.$confirm('此操作将加减信用值, 是否继续?', '提示', {
                //     type: 'warning'
                // })
                // const res = await this.$ax.post(Member.ucscorerecordSetScore, { id })
                // if (res) {
                //     this.$message.success(`设置成功`)
                //     this.$refs.dataTable.getList()
                // } else {
                //     this.$message.error(`设置失败`)
                // }
            } catch (err) {
                if (err === 'cancel') return
                console.error(err)
            }
        }
    }
}
</script>
