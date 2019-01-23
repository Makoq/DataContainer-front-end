<template>
  <div class="header">
    <div class="logo">OpenGMS</div>
    <div class="right-list">
      <a class="right-list-item">Schema</a>
      <a class="right-list-item">Map</a>
      <a class="right-list-item">Refactor</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-header"
};
</script>

<style scoped>
.header {
  position: relative;
  z-index: 1;
}

.logo {
  font: bold 28px arial;
  text-decoration: none;
  line-height: 60px;
  color: #409eff;
  line-height: 80px;
  float: left;
  margin-left: 60px;
}

.right-list {
  float: right;
  line-height: 70px;
}

.right-list-item {
  margin-top: 10px;
  position: relative;
  transition-property: color;
  transition-duration: 0.3s;
  display: inline-block;
  color: rgb(251, 251, 251);
  padding: 0 20px 0 17px;
}
</style>
