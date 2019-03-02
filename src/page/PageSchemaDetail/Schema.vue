<template>
  <div>
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

<style scoped></style>
