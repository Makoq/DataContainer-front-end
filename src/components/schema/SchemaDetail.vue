<template>
  <div class="page">
    <!-- detail :
    {{entity}}-->


  <el-row>
    <el-col :span="1">&nbsp;</el-col>
    <el-col :span="3">
     <br>
      <el-card>
      <el-row>
        <el-col :span="24">

          <!-- <router-link to="markdown" ><h4>markdown</h4></router-link> -->
          <h4 @click="addmarkdown">SchemaDetail</h4>
        </el-col>
      </el-row>
      <br>

      <el-row>
        <el-col :span="24">
          <!-- <router-link :to="{path:'schematree'}"><h4>tree</h4></router-link> -->
          <h4 @click="addtree">SchemaTree</h4>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <!-- <router-link :to="{path:'table'}"><h4>table</h4></router-link> -->
          <h4 @click="addRefMap">Refactor&Map</h4>
        </el-col>
      </el-row>

      </el-card>
       
    </el-col>
    <el-col :span="1">&nbsp;</el-col>


    <el-col :span="18">
       <br>
      <transition name="el-zoom-in-top">
      <router-view :refs="refs" :maps="maps" :treeObj="treeObj" :detailMarkdown="markdowndetail!=null?markdowndetail:'detail is null'"  ></router-view>
      </transition>
    </el-col>
  </el-row>

  <el-button class="backbtn" @click="backlist" icon="el-icon-arrow-left" circle></el-button>





  </div>
</template>

<script>
export default {
  data() {
    return {
      entity: {
        name: null,
        description: null,
        createDate: null
      },
      markdowndetail: "",
      maps: new Array(),
      refs: new Array(),

      // tree
      treeObj: {
        name: null,
        description: null,
        udxNodeSchemas: []
      },
      defaultProps: {
        children: "children",
        label: "label"
      },
      on: true
    };
  },
  methods: {
    addmarkdown() {
      this.$router.push(
        "/schema/" + this.$route.params.id + "/detail/markdown"
      );
    },
    addtree() {
      this.$router.push(
        "/schema/" + this.$route.params.id + "/detail/schematree"
      );
    },

    addRefMap() {
      this.$router.push("/schema/" + this.$route.params.id + "/detail/table");
    },
    backlist() {
      this.$router.push("/schemaListContent");
    }
  },
  created() {
    // let _this=this;
    // console.log(_this)
    this.$API.blanckRequest("schemaDoc/" + this.$route.params.id, {
      success: data => {
        this.entity = data;
        this.markdowndetail = data.detailMarkDown;

        this.treeObj.name = data.udxSchema.name;
        this.treeObj.description = data.udxSchema.description;
        this.treeObj.udxNodeSchemas = data.udxSchema.udxNodeSchemas;

        // 获取mapid
        this.$API.schemaDocRelated({
          method: "get",
          params: {
            id: this.entity.id
          },
          success: ({ maps, refactors }) => {
            maps.forEach(el => {
              this.maps.push(el);
            });
            refactors.forEach(el => {
              console.log(el);
              if (el == null) {
                //TODO当refactor或map为空时，在表格里的显示
              } else {
                this.refs.push(el);
              }
            });
          }
        });
      }
    });

    // this.$router.push("detail/markdown")
  },
  mounted() {
    // this.$route.path.replace("#");
  }
};
</script>

<style scoped>
label {
  color: rgb(34, 150, 34);
}
.page {
  background-color: rgb(30, 155, 155);
  height: 1400px;
}
h4 {
  text-align: left;
  text-decoration-line: none;
  cursor: pointer;
}
.el-button {
  margin-left: 90%;
}
</style>
