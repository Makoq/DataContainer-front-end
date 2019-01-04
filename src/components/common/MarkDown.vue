<template>
  <div>
    <div>
      <mavon-editor
        :ishljs="true"
        v-model="detailMarkdown"
        defaultOpen="edit"
        :toolbarsFlag="false"
        :subfiled="false"
      ></mavon-editor>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailMarkdown: String,
    mode: Boolean
  },
  data() {
    return {
      innerMark: ""
    };
  },
  methods: {},
  created() {
    this.innerMark = this.detailMarkdown;
  }
};
</script>

<style scoped>
</style>
