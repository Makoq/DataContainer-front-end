<template>
  <div>
    <el-card>
        <el-row>
          <el-col :span="12">
            <el-table
              ref="mapTable"
              :data="maps"
              style="width:100% "
              @cell-click="(item)=>{to(item,'map')}"
            >
              <el-table-column prop="name" label="Map" width="180"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <el-table ref="refactorTable" :data="refs" style="width:100%" @cell-click="(item)=>{to(item,'ref')}">
              <el-table-column prop="name" label="Refactor" width="180"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card>
  </div>
</template>

<script>
export default {
  props: {
    maps: Array,
    refs: Array
  },
  data() {
    return {
      innerMark: "",
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    to(item, type) {
      if (type === "map") {
        this.$router.push({ path: "/map/" + item.id });
      } else {
        this.$router.push({ path: "/refactor/" + item.id });
      }
    }
  },
  created() {
    this.innerMark = this.detailMarkdown;
  }
};
</script>

<style scoped>
</style>
