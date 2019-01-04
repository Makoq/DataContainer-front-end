<template>
  <div  >
      <el-row>
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
        prop="id"
        label="ID"
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
       </el-row>
       <el-row>
        <div>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :current-page="findDto.page"
             
            :page-size="findDto.pageSize"
            :total="count">
             </el-pagination>
        </div>
       </el-row>
       
     

  </div>
</template>
<script>
export default {
  data() {
    return {
      count: null,
      list: new Array(),
      findDto: {
        //分页工具
        asc: false,
        page: 1,
        pageSize: 3,
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
      this.$router.push("map/" + row.id);
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
    this.$API.mapCount({
      success: count => {
        this.count = count;
        this.$API.map({
          params: this.findDto,
          success: data => {
            this.list = data.content;
          }
        });
      }
    });
  },
  mounted() {
    this.$router.push("/mapListContent");
  }
};
</script>
>

<style>
</style>
