<template>
  <div>
    <div>筛选条件:</div>

    <div>分页工具：</div>

    <div>总数：{{count}}</div>

    <div
      v-for="(item,index) in list"
      :key="index"
    >
      {{index + "🍆"+item.name+" 🍆" +item.id}}
    </div>

    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: null,
      list: new Object(),
      findDto: {
        //分页工具
        asc: false,
        page: 0,
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
  mounted() {}
};
</script>

<style scoped>
</style>
