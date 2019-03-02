<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
    >
      <el-menu-item index="/"><strong>OpenGMS</strong> </el-menu-item>

      <el-menu-item index="/schema">Schema Service</el-menu-item>
      <el-menu-item index="/map">Mapping Service</el-menu-item>
      <el-menu-item index="/refactor">Refactor Service</el-menu-item>
      <el-menu-item index="4">Visualization Service</el-menu-item>

      <el-menu-item index="5" class="log">SignIn</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  }
};
</script>

<style>
.log {
  left: 30%;
}
</style>
