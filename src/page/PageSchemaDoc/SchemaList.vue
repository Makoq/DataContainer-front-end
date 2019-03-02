<template>
  <div class="page">
    <div class="sheader">
      <my-header></my-header>
    </div>

    <el-row>
      <el-col :span="3">&nbsp;</el-col>
      <!--span:12 动态路由引入ListContent组件，该组件用于循环展示所有Schema -->
      <el-col :span="12">
        <transition name="el-zoom-in-top">
          <!-- routerview -->
          <router-view />
        </transition>
      </el-col>
      <!-- span:6 Schema项呈现页面的介绍和排行榜 -->
      <el-col :span="6" class="asidecard">
        <!--  Schema项展示页面功能介绍-->
        <br />
        <el-row>
          <el-col :span="24">
            <el-card>
              <div class="clearfix">
                <h3>introduce</h3>
              </div>
              <hr />
              <div style="text-align:left">
                schema is used for
                ...在数据容器拥有映射服务和重构服务之后，我们便拥有了一系列的结构化数据表达模型。那么我们基于结构化数据能够做点什么呢。
              </div>
              <el-button style="float:right; padding: 3px 0" type="text">
                <h5>LearnMore</h5>
              </el-button>
            </el-card>
          </el-col>
        </el-row>
        <!-- 受欢Schema项迎排行榜 -->
        <br />
        <el-row>
          <el-col :span="24">
            <el-card>
              <div class="clearfix">
                <h3>Top</h3>
              </div>
              <hr />
              <div style="text-align:left">Recently popular schema...</div>
              <br />
              <div v-for="(item, key) in tableData" :key="key">
                <el-card>{{ item }}</el-card>
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
      //  受欢迎排行榜Schema数据list容器
      tableData: Array()
    };
  },
  mounted() {
    //在页面加载时就利用路由将通过卡片组展示Schema的组件引入
    this.$router.push("/schemaListContent");
    //从后台拿到受欢迎排行榜数据list,并塞给list容器
    this.$axios.get("api/schemaDoc/getTop10").then(rsp => {
      console.log("respppp ");
      console.log(rsp.data);
      rsp.data.forEach(element => {
        this.tableData.push(element.name);
      });
    });
  },
  components: {
    MyHeader //静态引入header
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
