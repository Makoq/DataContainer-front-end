<template>
  <div>
    <br>
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12">
        <el-card>
          <h3>RefactorList has showed all Refactor methods..</h3>
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12">
        <el-table :data="list" style="width:100%" @row-click="detail" stripe>
          <el-table-column prop="name" label="NAME" style="100%"></el-table-column>

          <el-table-column prop="description" label="Description" style="100%"></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="6">&nbsp;</el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="6">&nbsp;</el-col>
      <el-col :span="12">
        <el-card>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :current-page="findDto.page"
            :page-size="findDto.pageSize"
            :total="count"
          ></el-pagination>
        </el-card>
      </el-col>
      <el-col :span="6">&nbsp;</el-col>
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
      this.$router.push("refactor/" + row.id);
    },
    handleCurrentChange(currentpage) {
      this.findDto.page = currentpage;

      this.$API.schemaDoc({
        params: this.findDto,

        success: data => {
          this.list = data.content;
        }
      });
    },
    handleSizeChange(size) {
      this.pageSize = size;
    }
  },
  created() {
    this.$API.refactorCount({
      success: count => {
        this.count = count;
        this.$API.refactor({
          params: this.findDto,
          success: data => {
            this.list = data.content;
          }
        });
      }
    });
  },
  mounted() {
    this.$router.push("/refactorListContent");
  }
};
</script>
>

<style>
</style>
