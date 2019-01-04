<template>
  <div>
    <div>
      <mavon-editor defaultOpen="preview"
       :editable="false" 
        :ishljs="true"
        v-model="detailMarkdown"
       
        :toolbarsFlag="false"
        :subfield="false"></mavon-editor>
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
