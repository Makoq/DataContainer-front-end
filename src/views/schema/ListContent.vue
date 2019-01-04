<template>
  <div  >
      <!-- <el-row>
          <el-col :span="20"></el-col>
         <el-col :span="24">
          <el-table
        :data="list"
        style="width:100%"
        @row-click="detail"
        stripe

        >
        <el-table-column
        prop="name"
        label="NAME"
        width="180"
        >

        </el-table-column>
        
        <el-table-column
        prop="description"
        label="Description"
        width="180"
        >

        </el-table-column>

        </el-table>
  
         </el-col>
       </el-row> -->

        <div v-for="(item,index) in list" :key="index">
          <br>
          <list-card :list="item"></list-card>
        </div>
     
    <br>
       <el-row>
        <el-card>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :current-page="findDto.page"
             
            :page-size="findDto.pageSize"
            :total="count">
             </el-pagination>
        </el-card>
       </el-row>

      
       

  </div>
</template>
<script>
import ListCard from "@/views/schema/SchemaListCard";
export default {
  data() {
    return {
      count: null,
      list: new Array(),
      findDto: {
        //分页工具
        asc: false,
        page: 1,
        pageSize: 5,
        properties: [],
        //查询条件
        description: null,
        name: null
      }
    };
  },
  methods: {
    detail(row) {
      //   console.log(row.id)
      this.$router.push("schema/" + row.id + "/detail");
    },
    handleCurrentChange(currentpage) {
      //   console.log(currentpage)

      this.findDto.page = currentpage;

      // console.log(this.findDto.page)
      this.$API.schemaDoc({
        params: this.findDto,

        success: data => {
          console.log(data.content);
          this.list = data.content;
        }
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
    }
  },
  created() {
    this.$API.schemaDocCount({
      success: count => {
        this.count = count;
        // console.log(this.findDto);
        this.$API.schemaDoc({
          params: this.findDto,
          success: data => {
            this.list = data.content;
            this.list.aut;
          }
        });
      }
    });
  },
  mounted() {
    this.$router.push("/schemaListContent");
  },
  components: {
    ListCard
  }
};
</script>
>

<style>
</style>
