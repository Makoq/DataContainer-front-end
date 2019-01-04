<template>
  <div>
    <!-- detail :
    {{entity}} -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      entity: new Object()
    };
  },
  methods: {},
  created() {
    this.$API.blanckRequest("map/" + this.$route.params.id, {
      success: data => {
        console.log(data);
        this.entity = data;
      }
    });
  },
  mounted() {}
};
</script>

<style scoped>
</style>
