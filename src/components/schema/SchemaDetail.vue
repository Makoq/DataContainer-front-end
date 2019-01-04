<template>
  <div class="page">
    <!-- detail :
    {{entity}}-->
    <!-- <hr> -->
    <!-- <div> -->
      <!-- <el-card>
        <el-row>
          <label>id:</label>
          <el-col :span="24">
            <br>
            {{entity.id}}
          </el-col>
        </el-row>
      </el-card>

      <el-card>
        <el-row>
          <label>name:</label>
          <el-col :span="24">
            <br>
            {{entity.name}}
          </el-col>
        </el-row>
      </el-card>

      <el-card>
        <el-row>
          <label>description:</label>
          <el-col :span="24">
            <br>
            {{entity.description}}
          </el-col>
        </el-row>
      </el-card>

      <el-card>
        <el-row>
          <label>createDate:</label>
          <el-col :span="24">
            <br>
            {{entity.createDate}}
          </el-col>
        </el-row>
      </el-card> -->

<!-- tree -->
      <!-- <el-card>
        <el-row>
          <label>udxSchema:</label>
          <el-col :span="24">
            <br>
            Treename:{{treeObj.name}}
            &nbsp;
            description:{{treeObj.description}}
            <br>
            <br>udxNodeSchemas:
            <el-tree
              :data="treeObj.data"
              :props="defaultProps"
              accordion
              @node-click="handleNodeClick"
            ></el-tree>
          </el-col>
        </el-row>
      </el-card> -->
<!-- table -->
      <!-- <el-card>
        <el-row>
          <el-col :span="12">
            <el-table
              ref="mapTable"
              :data="maps"
              style="width:100% "
              @cell-click="(item)=>{to(item,'map')}"
            >
              <el-table-column prop="name" label="Map" width="180"></el-table-column>
            </el-table>
          </el-col>
          <el-col :span="12">
            <el-table ref="refactorTable" :data="refs" style="width:100%" @cell-click="(item)=>{to(item,'ref')}">
              <el-table-column prop="name" label="Refactor" width="180"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-card> -->


<!-- markdown -->
      <!-- <el-card>
        <mavon-editor
          :ishljs="true"
          v-model="entity.detailMarkDown"
          defaultOpen="edit"
          :toolbarsFlag="false"
          :subfiled="false"
        ></mavon-editor>
      </el-card>
 -->

<!-- 
    </div> -->

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
        <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        router
        >
         <el-menu-item index="markdown">
            <span slot="title">markdown</span>
          </el-menu-item>

          <el-menu-item index="table">
            <span slot="title">table</span>
          </el-menu-item>

          <el-menu-item index="schematree">
            <span slot="title">schematree</span>
          </el-menu-item>
      
        </el-menu> -->
      </el-card>
       
    </el-col>
    <el-col :span="1">&nbsp;</el-col>


    <el-col :span="18">
       <br>
      <transition name="el-zoom-in-top">
      <router-view :refs="refs" :maps="maps" :treeObj="treeObj" :detailMarkdown="markdowndetail!=null?markdowndetail:'detail is null'"></router-view>
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
      }
    };
  },
  methods: {
    addmarkdown() {
      this.$router.push("markdown");
    },
    addtree() {
      this.$router.push("schematree");
    },
    addRefMap() {
      this.$router.push("table");
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
    this.$router.push("detail/markdown");
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
