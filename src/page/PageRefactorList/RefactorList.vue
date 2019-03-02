<template>
  <div class="page">
    <div class="sheader">
      <my-header></my-header>
    </div>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/headers/PageHeader";
export default {
  data() {
    return {
      count: null,
      list: new Object(),
      findDto: {
        //分页工具
        asc: false,
        page: 1,
        pageSize: 10,
        properties: [],
        //查询条件
        description: null,
        name: null
      }
    };
  },
  methods: {},
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
</style>
