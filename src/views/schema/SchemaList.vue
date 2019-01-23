<template>
  <div class="page">
    <div class="sheader">
      <my-header></my-header>
    </div>

    <el-row>
      <el-col :span="3">&nbsp;</el-col>

      <el-col :span="12">
        <transition name="el-zoom-in-top">
          <router-view/>
        </transition>
      </el-col>

      <el-col :span="6" class="asidecard">
        <br>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div class="clearfix">
                <h3>introduce</h3>
              </div>
              <hr>
              <div
                style="text-align:left"
              >通用数据展示首页，是对一系列可用数据的展示首页，在本页面，用户可以发现和探索不同的数据名称，发布者以及其数据的描述信息等内容...</div>
              <el-button style="float:right; padding: 3px 0" type="text">
                <h5>LearnMore</h5>
              </el-button>
            </el-card>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="24">
            <el-card>
              <div class="clearfix">
                <h3>Top</h3>
              </div>
              <hr>
              <div style="text-align:left">Recently popular schema...</div>
              <br>
              <div v-for="(item,key) in tableData" :key="key">
                <el-card>{{item}}</el-card>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyHeader from "@/components/headers/PageHeader";
export default {
  data() {
    return {
      count: null,
      list: new Array(),
      findDto: {
        //分页工具
        asc: false,
        page: 1,
        pageSize: 10,
        properties: [],
        //查询条件
        description: null,
        name: null
      },
      tableData: Array()
    };
  },
  methods: {},
  created() {
    this.$API.schemaDocCount({
      success: count => {
        this.count = count;

        this.$API.schemaDoc({
          params: this.findDto,
          success: data => {
            this.list = data.content;
          }
        });
      }
    });
  },
  mounted() {
    this.$router.push("/schemaListContent");
    this.$axios.get("api/schemaDoc/getTop10").then(rsp => {
      rsp.data.forEach(element => {
        this.tableData.push(element.name);
      });
      // this.tableData.push(rsp.data.name)
    });
  },
  components: {
    MyHeader
  }
};
</script>

<style scoped>
.page {
  background-color: rgb(30, 155, 155);
  height: 1400px;
}
.sheader {
  box-shadow: 20px #888888;
}
.clearfix {
  text-align: left;
}
.asidecard .el-card {
  margin-left: 10px;
}
</style>
