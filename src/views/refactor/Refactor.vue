<template>
  <div class="page">
    <!-- <p>这里是对refactor的描述，简介,然后下面加载不同的组件,包括refactor的描述，refactor使用说明，refactor相关的schema，在线下载</p>
    <p>后面提供在线调用</p>
    <p>并且可以存在添加、删除、更新的页面</p> -->
      <div class="sheader">
    <my-header></my-header>
    </div>
 
 
    <br>

    <el-row>
      <el-col :span="1">
        &nbsp;

      </el-col>
       <el-col :span="3">
         
           <el-card><H4>NAME:</H4>{{entity.name}}</el-card>
           <br>
            <el-card class="datecard"><H4>CreateDate:</H4><h5>{{entity.createDate}}</h5></el-card>
         <br>
         <el-card class="swbtn">
           
            
          <el-row>
             <el-button type="text" @click="showDetail=!showDetail"><h4>ShowDetail</h4></el-button>
     
          </el-row>
          
          <el-row>
             <el-button type="text" @click="showTree=!showTree"><h4>ShowTree</h4></el-button>

          </el-row>
          
          <el-row>
             <el-button type="text" @click="download"><h4>Download</h4></el-button>
             
          </el-row>

          <el-row>
            <el-button type="text" @click="showInvoke=!showInvoke"><h4>Invoke</h4></el-button>
          </el-row>
           
         </el-card>

       </el-col>
        <el-col :span="1">
        &nbsp;

      </el-col>
        <el-col :span="18">
          
             <transition name="el-zoom-in-center">
                <mark-down
                  v-show="showDetail"
                  :detailMarkdown="entity.detailMarkdown!=null?entity.detailMarkdown:'detail is null'"
                ></mark-down>
                
             </transition>
               
             <schema-tree v-for="(item,key) in listtree" :key="key" v-show="showTree" :treeObj="item"> </schema-tree>
               
               <transition name="el-zoom-out-center">
             <refactorinvoke v-show="showInvoke" :refid="this.$route.params.id"></refactorinvoke>
            </transition> 

        </el-col>
    </el-row>
    <!-- btn back to home -->
    <el-button class="backbtn" @click="backlist" icon="el-icon-arrow-left" circle></el-button>
 
     

    <!-- <router-view/> -->
  </div>
</template>

<script>
import MarkDown from "@/components/common/MarkDown.vue";
import SchemaTree from "@/components/schema/SchemaTree.vue";
import MyHeader from "@/components/headers/PageHeader";
import Refactorinvoke from "@/components/common/Invoke/Refactorinvoke";
export default {
  data() {
    return {
      showDetail: true,
      showTree: false,
      showInvoke: false,
      entity: {
        name: null,
        description: null,
        createDate: null
      },
      treeObj: {
        name: null,
        description: null,
        udxNodeSchemas: []
      },
      listtree: []
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
    shotree() {
      console.log(this.listtree);
    },
    async myFetch(element) {
      let res = await fetch("/api/schemaDoc/" + element + "/getSchema");
      let data = await res.json();
      this.listtree.push(data.data);
      console.log("树");
      return data;
    },
    backlist() {
      this.$router.push("/schemaListContent");
    }
  },
  created() {
    this.$API.blanckRequest("refactor/" + this.$route.params.id, {
      success: data => {
        this.entity = data;

        console.log(data);
        data.supportedUdxSchemas.forEach(element => {
          let res2 = this.myFetch(element);
          console.log(res2 + "得到树啦");
        });

        // data.supportedUdxSchemas.forEach(element => {
        //   let res2 = this.myFetch(element);

        //   // this.$API.blanckRequest("schemaDoc/" + element + "/getSchema", {
        //   //   success: data => {
        //   //     if (data == null) {
        //   //       console.log("null datsa");
        //   //     }
        //   //     console.log("backdata");
        //   //     console.log(data);

        //   //     this.treeObj.name = data.name;
        //   //     this.treeObj.description = data.description;
        //   //     this.treeObj.udxNodeSchemas = data.udxNodeSchemas;

        //   //     this.listtree.push(this.treeObj);
        //   //   }
        //   // });
        // });
        //  data.supportedUdxSchemas.forEach(element => {
        //     console.log("el:")
        //     console.log(element)
        //   });
      }
    });
  },
  components: {
    MarkDown,
    SchemaTree,
    MyHeader,
    Refactorinvoke
  }
};
</script>

<style scoped>
.page {
  background-color: rgb(30, 155, 155);
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
