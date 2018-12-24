<template>
  <div>
    detail :
    {{entity}}
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
    this.$API.blanckRequest("schemaDoc/" + this.$route.params.id, {
      success: data => {
        this.entity = data;
      }
    });
  },
  mounted() {}
};
</script>

<style scoped>
</style>
