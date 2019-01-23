<template>
  <div class="error500">
    <div class="error500-body-con">
      <div>
        <div class="error500-body-con-title">
          <i>500</i>
        </div>
        <p class="error500-body-con-message">Oops! the server is wrong</p>
        <div class="error500-btn-con">
          <button @click="goHome" style="width: 200px;" plain>返回首页</button>
          <button @click="backPage" style="width: 200px;margin-left: 40px;" plain>返回上一页</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error500",
  methods: {
    backPage() {
      this.$router.go(-1);
    },
    goHome() {
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./500";
</style>
