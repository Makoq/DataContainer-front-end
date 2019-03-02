<template>
  <div class="page">
    <div class="sheader">
      <my-header></my-header>
    </div>

    <br />

    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="3">
        <el-card>
          <H4>NAME:</H4>
          {{ entity.name }}
        </el-card>
        <br />
        <el-card class="datecard">
          <H4>CreateDate:</H4>
          <h5>{{ entity.createDate }}</h5>
        </el-card>
        <br />
        <el-card>
          <el-row>
            <el-button type="text" @click="showDetail = !showDetail">
              <h4>ShowDetail</h4>
            </el-button>
          </el-row>

          <el-row>
            <el-button type="text" @click="showTree = !showTree">
              <h4>ShowTree</h4>
            </el-button>
          </el-row>

          <el-row>
            <el-button type="text" @click="download">
              <h4>Download</h4>
            </el-button>
          </el-row>

          <el-row>
            <el-button type="text" @click="showInvoke = !showInvoke">
              <h4>Invoke</h4>
            </el-button>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="18">
        <transition name="el-zoom-in-center">
          <mark-down
            v-show="showDetail"
            :detailMarkdown="
              markdowndetail != null ? markdowndetail : 'detail is null'
            "
          ></mark-down>
        </transition>
        <transition name="el-zoom-out-center">
          <schema-tree v-show="showTree" :treeObj="treeObj"></schema-tree>
        </transition>

        <transition name="el-zoom-out-center">
          <map-invoke
            v-show="showInvoke"
            :mapid="this.$route.params.id"
          ></map-invoke>
        </transition>
      </el-col>
    </el-row>
    <!-- btn back to home -->
    <el-button
      class="backbtn"
      @click="backlist"
      icon="el-icon-arrow-left"
      circle
    ></el-button>
  </div>
</template>

<script>
import MarkDown from "@/components/common/MarkDown.vue";
import SchemaTree from "@/components/trees/SchemaTree.vue";
import MyHeader from "@/components/headers/PageHeader";
import MapInvoke from "@/components/common/Invoke/MapInvoke";
export default {
  data() {
    return {
      showDetail: true,
      showTree: false,
      showInvoke: false,
      markdowndetail: "",
      entity: {
        name: null,
        description: null,
        createDate: null
      },
      treeObj: {
        name: null,
        description: null,
        udxNodeSchemas: []
      }
    };
  },
  methods: {
    download() {
      let data = new FormData();
      data.append("path", this.entity.storePath);
      this.$API.download({
        method: "post",
        responseType: "blob",
        data: data,
        success: el => {
          let url = window.URL.createObjectURL(el);
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.setAttribute("download", "tiff.zip");
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    backlist() {
      this.$router.push("/schemaListContent");
    }
  },
  created() {
    this.$API.blanckRequest("map/" + this.$route.params.id, {
      success: data => {
        this.entity = data;
        this.markdowndetail = data.detailMarkDown;

        this.$API.blanckRequest(
          "schemaDoc/" + this.entity.supportedUdxSchema + "/getSchema",
          {
            success: data => {
              if (data == null) {
                console.log("null datsa");
              }
              this.treeObj.name = data.name;
              this.treeObj.description = data.description;
              this.treeObj.udxNodeSchemas = data.udxNodeSchemas;
            }
          }
        );
      }
    });
  },
  components: {
    MarkDown,
    SchemaTree,
    MyHeader,
    MapInvoke
  }
};
</script>

<style scoped>
.page {
  background-color: rgb(30, 155, 155);
  /* background-image: url("../../assets/svg/bak.svg"); */
  background-size: cover;
  height: 1400px;
}
.backbtn {
  margin-left: 90%;
}
.el-card {
  text-align: left;
}
.datecard {
  word-wrap: break-word;
}
</style>
