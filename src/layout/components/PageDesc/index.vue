<template>
  <div class="page-desc">
    <h2>{{ title }}</h2>
    <p>{{ desc }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$t(`route.${this.$route.meta.title}`) || '这里是页面标题'
    },
    desc() {
      return this.$route.meta.desc || '这里是页面描述'
    }
  }
}
</script>

<style lang="scss">
.page-desc {
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  padding: 0 15px 15px;
  background-color: #fff;
  color: #333;

  h2, p {
    margin: 0;
    padding: 0;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  p {
    color: #999;
    font-size: 14px;
  }
}
</style>
