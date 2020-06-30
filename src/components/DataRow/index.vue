<template>
  <el-row type="flex" class="data-row">
    <el-col v-for="(col, index) in rowData" :key="index">
      <span>{{ col.key }}</span>
      <p>
        <count-to :start-val="0" :end-val="col.value" :duration="duration" />
      </p>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'DataRow',
  components: {
    CountTo
  },
  props: {
    duration: {
      type: Number,
      default: 2000
    },
    rows: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    rowData() {
      return Object.keys(this.rows).map(key => ({
        key: this.$t(`rows.${key}`),
        value: this.rows[key]
      }))
    }
  }
}
</script>

<style lang="scss">
  .data-row {
    color: #999;
    font-size: 14px;
    text-align: center;
    padding: 10px 0 25px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;

    p {
      margin-top: 10px;
      font-size: 16px;
      color: #666;
    }

    .el-col + .el-col {
      border-left: 1px solid #eee;
    }
  }
</style>
