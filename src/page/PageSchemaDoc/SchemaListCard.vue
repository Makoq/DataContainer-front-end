<template>
  <div>
    <el-card>
      <!-- {{this.list}} -->
      <el-row>
        <el-col :span="24" style="text-align:left">
          <h1 @click="to">{{ this.list.name }}</h1>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24" style="text-align:left">
          <h4>by lanxv</h4>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align:left">
          <span>{{ this.list.description }}</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    list: Object
  },
  data() {
    return {};
  },
  methods: {
    to() {
      this.$router.push("schema/" + this.list.id + "/detail");
    }
  }
};
</script>
>
<style>
h1:hover {
  color: rgb(8, 184, 190);
  text-decoration: underline;
  cursor: pointer;
  text-decoration: none;
}
h4 {
  color: green;
}
span {
  font-weight: 200;
  font-size: 20px;
}
</style>
