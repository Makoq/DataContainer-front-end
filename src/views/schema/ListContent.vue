<template>
  <div>
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
          :total="count"
        ></el-pagination>
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
      this.$router.push("schema/" + row.id + "/detail");
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
    this.$API.schemaDocCount({
      success: count => {
        this.count = count;

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
