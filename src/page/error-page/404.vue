<template>
  <div class="error404">
    <div class="error404-body-con">
      <div>
        <div class="error404-body-con-title">
          4
          <span>0</span> 4
        </div>
        <p class="error404-body-con-message">
          YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST
        </p>
        <div class="error404-btn-con">
          <button @click="goHome" style="width: 200px;" plain>返回首页</button>
          <button
            @click="backPage"
            style="width: 200px;margin-left: 40px;"
            plain
          >
            返回上一页
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
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
@import "./404.less";
</style>
