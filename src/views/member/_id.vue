<template>
  <div class="container member-container">
    <el-form v-if="infos" label-width="120px">
      <el-row>
        <el-col v-for="(val, key) in infos" :key="key" :span="12">
          <el-form-item v-if="key !== 'passwd'" :label="$t(`table.${key}`)">
            <el-input :value="val" readonly />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <div style="text-align: center;">
      <el-button @click="back">返回</el-button>
    </div>
  </div>
</template>

<script>
import { Member } from '@/api/const'
export default {
  name: 'MemberDetail',
  data() {
    return {
      infos: null
    }
  },
  computed: {
    userId() {
      return this.$route.params.userId
    }
  },
  async created() {
    if (!this.userId || !Number(this.userId)) {
      await this.$message.error('用户ID有误')
      this.$router.push('/member')
      return
    }
    this.getInfo()
  },
  methods: {
    back() {
      this.$router.push('/member')
    },
    async getInfo() {
      try {
        const res = await this.$ax.post(Member.memberInfo, { id: this.userId })
        this.infos = res
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
