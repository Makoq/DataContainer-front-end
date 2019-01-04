<template>
  <div>
    <!-- <p>这里是对schema的描述，简介,然后下面加载不同的组件,包括schema的描述，schema的相关映射方法、重构方法</p>
    <p>并且可以存在添加、删除、更新的页面</p> -->
    
    <div>
    <my-header></my-header>
    </div>
    
  
    <router-view />
 


    

  </div>
</template>

<script>
import MyHeader from "@/components/headers/PageHeader";
export default {
  data() {
    return {};
  },
  components: {
    MyHeader
  }
};
</script>

<style scoped>
</style>
