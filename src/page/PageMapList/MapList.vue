<template>
  <div>
    <div class="sheader">
      <my-header></my-header>
    </div>

    <div class="maplist">
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
  methods: {
    myfind() {
      let findDto = {
        asc: false,
        description: null,
        name: null,
        page: 0,
        pageSize: 10,
        properties: ["name", "properties"]
      };
      this.$API.schemaDoc({
        params: findDto,
        success: data => {
          this.entity = data.content;
        }
      });
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
  },
  components: {
    MyHeader
  }
};
</script>

<style scoped>
.maplist {
  background-color: rgb(30, 155, 155);
  height: 1400px;
}
</style>
