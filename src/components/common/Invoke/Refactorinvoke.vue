<template>
  <div  >
    <el-card>
     <h1>Refactor Services</h1>
     <hr>

        <el-row>
            <el-col :span="5">
                <div style="height:400px">
                        <el-steps :active="active" finish-status="success" direction="vertical">
                            <el-step title="Input Data" description="upload refactor data.."> 
                                
                            </el-step>
                            
                            <el-step title="Invoke Refactor" description="run refactor online.."> 
                            </el-step>
                            <el-step title="Download" description="download the data online..">  
                            </el-step>
                        </el-steps>
                    </div>
            </el-col>
             <el-col :span="19">
                <el-row>
                     <el-card>
                    <el-upload
                        class="upload-demo"
                        action="/api/file/upload/run"
                        :on-success="uploadSuccess"
                    >
                    <el-button size="small" type="primary"><i class="el-icon-upload el-icon--right"></i>&nbsp;upload</el-button>
                    <div slot="tip" class="el-upload__tip">Please upload refactor files.</div>
                    </el-upload>
                     </el-card>

                </el-row>

                <el-row>

                    <el-card  >
                        <el-button 
                       size="small" 
                       type="primary"
                        @click="runRef"
                    
                        v-loading.fullscreen.lock="fullscreenLoading"
                    >
                    <i class="el-icon-refresh"></i>&nbsp;
                    run</el-button>
                        <br><br>
                        <el-radio-group  v-for="(item,key) in downloadurl" :key="key" v-model="redioitem" @change="changeradio(key)" >
                            <el-card><el-radio :label="'OutPutData'+(key+1)+'.xml'"></el-radio> </el-card>
                        </el-radio-group>
                    </el-card>
                </el-row>

                <el-row>
                 <el-card>

                 
                    <el-button size="small" 
                    type="primary"
                     @click="downloadmap">
                        <i class="el-icon-sold-out"></i>&nbsp;
                        download</el-button>
                    </el-card>
                </el-row>
             

             </el-col>


        </el-row>
    
    </el-card>
  </div>
</template>
<script>
import qs from "qs";
export default {
  props: {
    refid: String
  },
  data() {
    return {
      uploadPath: "",

      outname: "outputData",
      fullscreenLoading: false,
      runresult: "",
      downloadurl: Array(),
      downloadradio: 0,
      refmethod: "",
      active: 0,
      methodjson: Array,
      redioitem: "OutPutData1.xml",
      refdata: {
        id: this.refid,
        input: Array(),
        method: Array(),
        output: Array()
      }
    };
  },
  methods: {
    uploadSuccess(resp) {
      // console.log("refe "+resp.data)
      if (resp.msg == "成功") {
        this.refdata.input.push(resp.data);
        this.$message({
          message: "数据上传成功成功",
          type: "success"
        });

        if (this.active++ > 2) this.active = 0;
      } else {
        this.$message({
          message: "数据上传成功失败",
          type: "success"
        });
      }

      if (this.refdata.input.length > 0) {
        for (var i = 0; i < this.refdata.input.length; i++) {
          this.refdata.output.push("OutPutData" + (i + 1) + ".xml");
        }
      }
    },

    runRef() {
      if (this.refdata.input == "") {
        this.$message("请先上传数据");
      } else {
        this.fullscreenLoading = true;
        this.$axios
          .get("api/refactor/invoke", {
            params: this.refdata,
            paramsSerializer: params => {
              return qs.stringify(params, {
                indices: false
              });
            }
          })
          .then(resp => {
            if (resp.msg == "成功") {
              this.fullscreenLoading = false;
              this.runresult = resp.data.processResponse.info;
              this.downloadurl.push(resp.data.outputs);

              this.$message({
                message: "映射调用成功",
                type: "success"
              });
              if (this.active++ > 2) this.active = 0;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    downloadmap() {
      if (this.downloadurl == "") {
        this.$message("请先上传数据并运行");
      } else {
        let data = new FormData();
        data.append("path", this.downloadurl[this.downloadradio]);
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

        if (this.active++ > 2) this.active = 0;
      }
    },
    changeradio(value) {
      this.downloadradio = value;
    }
  },
  mounted() {
    this.$axios
      .get("api/refactor/" + this.refid + "/getMethod")
      .then(res => {
        this.refmethod = res.data;

        this.methodjson = this.$x2js.xml2js(res.data);

        // 拿到第一个method
        this.refdata.method = this.methodjson.RefactorMethodInfo.Method[0]._name;
      })
      .then(() => {});
  }
};
</script>
<style  scoped>
.maptyperadio {
  margin-left: 0%;
}

.el-card .el-button {
  width: 200px;
  height: 50px;
}
</style>
