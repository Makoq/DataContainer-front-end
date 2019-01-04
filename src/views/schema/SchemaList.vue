<template>
  <div class="page">
    <!-- 三个List 应该是可以抽象提取出来的（因为目前的筛选条件是一致的），但是我还是倾向于做成3个List，展现的形式不同，筛选的条件不同。
    <div>筛选条件:</div>

    <div>分页工具：</div>

    <div>总数：{{count}}</div> -->

    <!-- <div
      v-for="(item,index) in list"
      :key="index"
    >
      {{index + "🍆"+item.name+" 🍆" +item.id}}
    </div> -->
    <!-- <el-card>
      
    </el-card> -->

   <div class="sheader">
    <my-header></my-header>
    </div>
 
    <el-row >

      <el-col :span="3">
        &nbsp;
      </el-col>

      <el-col :span="12">
         <transition name="el-zoom-in-top">
          <router-view />
         </transition>
        

      </el-col>

      <el-col :span="6" class="asidecard">
 <br>
        <el-row>
          <el-col :span="24">
            <el-card>
                <div  class="clearfix">
                  <h3>introduce</h3>
                </div>
                <hr>
                <div style="text-align:left">
                  schema is used for ...在数据容器拥有映射服务和重构服务之后，我们便拥有了一系列的结构化数据表达模型。那么我们基于结构化数据能够做点什么呢。
                </div>
                 <el-button style="float:right; padding: 3px 0" type="text"><h5>LearnMore</h5></el-button>

            </el-card>

          </el-col>
        </el-row>
        <br>
         <el-row>
           <el-col :span="24">
             <el-card>
               
                <div  >
                   <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                      prop="title"
                       label="schema"
                      style="width:100%">
                    </el-table-column>

                   </el-table>
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
      tableData: [
        {
          title: "tif schema1"
        },
        {
          title: "tif schema2"
        }
      ]
    };
  },
  methods: {},
  created() {
    this.$API.schemaDocCount({
      success: count => {
        this.count = count;
        // console.log(this.findDto);
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
