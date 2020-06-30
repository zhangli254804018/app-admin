<template>
  <div class="container audit-container">
    <data-table
      :is-search="false"
      :columns="columns"
      :operate-columns="operateColumns"
      :is-show-detail="false"
    />
  </div>
</template>

<script>
export default {
    name: 'AuditMember',
    data() {
        return {
            columns: {
                account: '账号',
                nickname: '昵称',
                realName: '真实姓名',
                idcard: '身份证号',
                idcard0: '手持身份证',
                idcard1: '身份证图1',
                idcard2: '身份证图2'
            },
            operateColumns: [{
                text: '删除',
                onClick: this.onDel
            }]
        }
    },
    methods: {
        onNew() {
            console.log('onNew')
        },
        onDel(row) {
            console.log('onDel', row)
        }
    }
}
</script>

<style lang="scss">
.member-container {
}
</style>

