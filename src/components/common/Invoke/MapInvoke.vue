<template>
  <div  >
    <el-card>
     <h1>Map Serviceds</h1>
     <hr>
  <el-row>
    <el-col :span="5">
        <div style="height:450px">
                        <el-steps :active="active" finish-status="success" direction="vertical">
                            <el-step title="Choose Map Type" description="upload refactor data.."> 
                                
                            </el-step>
                            <el-step title="Input Data" description="upload refactor data.."> 
                                
                            </el-step>
                            
                            <el-step title="Invoke Map" description="run refactor online.."> 
                            </el-step>
                            <el-step title="Download" description="download the data online..">  
                            </el-step>
                        </el-steps>
                    </div>
    </el-col>
    <el-col :span="19">
      <el-row>
        <el-card>
          <el-radio-group v-model="defaultRadio" class="maptyperadio" @change="changeType">
          <el-radio-button label="src2udx" >Src Data to Udx Data</el-radio-button>
          <el-radio-button label="udx2src"  >Udx Data to Src Data</el-radio-button>
        </el-radio-group>
        </el-card>
     </el-row>

      <el-row>
         <el-card>
          <el-upload
            class="upload-demo"
            action="/api/file/upload/run"
            :on-success="uploadSuccess"
          >
          <el-button size="small" type="primary"><i class="el-icon-upload el-icon--right"></i>&nbsp;upload</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
         </el-card>
        </el-row>

        <el-row>
            <el-card>
                    <el-button 
                    size="small" 
                       type="primary"
                    @click="runMap"
                      
                      v-loading.fullscreen.lock="fullscreenLoading"
                    >
                     <i class="el-icon-refresh"></i>&nbsp;
                    run</el-button><br><br>
                     <el-input placeholder="none result" v-model="runresult" :disabled="true"></el-input>
            </el-card>
         </el-row>

         <el-row>
            <el-card>
           
              <el-button  
              size="small" 
              type="primary"
              @click="downloadmap">
               <i class="el-icon-sold-out"></i>&nbsp;
              download</el-button>
              </el-card>
          </el-row>

        



    </el-col>
  </el-row>

     

     
     <!-- <el-row>
       <h4>Custom Output Data Name</h4>
       <el-col :span="12">
          <el-input v-model="outname" placeholder="Output Data Name"></el-input>
       </el-col>
      <el-col :span="12">
        <el-switch
        v-model="switchRadio"
        active-text="Defalt"
        inactive-text="Custom">
      </el-switch>
      </el-col>
       
     </el-row> -->
     

     
    
      
    
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    mapid: String
  },
  data() {
    return {
      active: 1,
      uploadPath: "",
      defaultRadio: "src2udx",
      outname: "outputData",
      fullscreenLoading: false,
      runresult: "",
      downloadurl: "",
      mapdata: {
        callType: "src2udx",
        id: this.mapid,
        input: null,
        output: "outputData.xml"
      }
    };
  },
  methods: {
    uploadSuccess(resp) {
      if (resp.msg == "成功") {
        this.mapdata.input = resp.data;
        this.$message({
          message: "数据上传成功成功",
          type: "success"
        });

        if (this.active++ > 3) this.active = 1;
      } else {
        this.$message({
          message: "数据上传成功失败",
          type: "success"
        });
      }
    },
    changeType(value) {
      this.mapdata.callType = value;
    },
    runMap() {
      if (this.mapdata.input == null) {
        this.$message("请先上传数据");
      } else {
        this.fullscreenLoading = true;
        this.$axios
          .get("api/map/invoke", {
            params: this.mapdata
          })
          .then(resp => {
            if (resp.msg == "成功") {
              this.fullscreenLoading = false;
              this.runresult = resp.data.processResponse.info;
              this.downloadurl = resp.data.output;
              this.$message({
                message: "映射调用成功",
                type: "success"
              });
              if (this.active++ > 3) this.active = 1;
            }
            console.log(resp.msg);
            console.log(resp.data);
          });
      }
    },
    downloadmap() {
      if (this.downloadurl == "") {
        this.$message("请先上传数据并运行");
      } else {
        let data = new FormData();
        data.append("path", this.downloadurl);
        this.$API.download({
          method: "post",
          responseType: "blob",
          data: data,
          success: el => {
            let url = window.URL.createObjectURL(el);
            let link = document.createElement("a");
            link.style.display = "none";
            link.href = url;
            link.setAttribute("download", "outPutData.xml");
            document.body.appendChild(link);
            link.click();
          }
        });
        if (this.active++ > 3) this.active = 1;
      }
    }
  },
  mounted() {
    console.log(this.mapid);
  }
};
</script>
<style scoped>
.maptyperadio {
  margin-left: 0%;
}

.el-card .el-button {
  width: 200px;
  height: 50px;
}
</style>
