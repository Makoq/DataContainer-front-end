<template>
  <div>
    <el-card>
      <el-row>
        <label>udxSchema:</label>
        <el-col :span="24">
          <br />
          Treename:{{ treeObj.name }} &nbsp; description:{{
            treeObj.description
          }}
          <br />
          <br />

          udxNodeSchemas:
          <el-tree
            :data="treeData"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick"
          ></el-tree>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    treeObj: Object
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  computed: {
    treeData() {
      return this.gernerateTree(this.treeObj.udxNodeSchemas);
    }
  },
  methods: {
    handleNodeClick() {
      // console.log(data);
    },

    gernerateTree(udxNodeSchemas) {
      let c = new Array();
      udxNodeSchemas.forEach(element => {
        let obj = {
          label: element.name,
          description: element.description,
          udxNodeInfo: element.udxNodeInfo,
          etype: element.etype,
          children: new Array()
        };
        if (element.childNodes.length != 0) {
          obj.children = this.gernerateTree(element.childNodes);
        }
        c.push(obj);
      });
      return c;
    }
  },

  created() {}
};
</script>
>
<style></style>
