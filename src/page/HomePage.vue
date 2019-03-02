<template>
  <div class="homepage">
    <div class="top">
      <div class="myheader">
        <my-header></my-header>
      </div>
      <div class="ban">
        <el-row>
          <el-col :span="4">
            <div class="headimg">
              <img
                src="../assets/svg/ban03.svg"
                style="height:10%;width:140%;margin-left:30%"
              />
            </div>
          </el-col>
          <el-col :span="3">
            <div class="headimg">
              <img
                src="../assets/svg/ban02.svg"
                style="height:20%;width:120%;margin-left:60%;margin-top:20%"
              />
            </div>
          </el-col>

          <el-col :span="16" class="title">
            <span>Data Container</span>
            <p>You can refactor and mapping your data here.</p>
          </el-col>
        </el-row>
      </div>
    </div>
    <br />
    <div>
      <h1>Welcome to OpenGMS Data Container</h1>
      <p>
        opengms datacontainer is a tool for the users to refactor and mapping
        their data, and drive their models.
      </p>
      <br />
      <h2>Functional module</h2>
    </div>

    <div class="mainfun">
      <el-row>
        <el-col :span="12">
          <el-card>
            <el-button type="text" @click="tomapping">
              <h1>Mapping Service</h1></el-button
            >

            <el-row>
              <el-col :span="10">
                <img src="../assets/svg/ref.svg" height="200px" width="90%" />
              </el-col>
              <el-col :span="14" class="funword">
                <span
                  >Geo-analysis models are necessary tools for understanding
                  various geo-processes and phenomena in Earth’s environment.
                  Studying, reusing, sharing and integrating geo-analysis models
                  can help researchers solve complicated and synthetic
                  geo-problems with interdisciplinary knowledge, especially for
                  researchers who collaborate with each other to build virtual
                  geographic environments (VGEs).
                </span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <el-button type="text" @click="toref"
              ><h1>Refactor Service</h1></el-button
            >
            <el-row>
              <el-col :span="10">
                <img src="../assets/svg/map.svg" height="200px" width="90%" />
              </el-col>
              <el-col :span="14" class="funword">
                <span
                  >Geo-analysis models are necessary tools for understanding
                  various geo-processes and phenomena in Earth’s environment.
                  Studying, reusing, sharing and integrating geo-analysis models
                  can help researchers solve complicated and synthetic
                  geo-problems with interdisciplinary knowledge, especially for
                  researchers who collaborate with each other to build virtual
                  geographic environments (VGEs).
                </span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card>
            <h1>Data Sharing</h1>
            <el-row>
              <el-col :span="10">
                <img src="../assets/svg/share.svg" height="200px" width="90%" />
              </el-col>
              <el-col :span="14" class="funword">
                <span
                  >Geo-analysis models are necessary tools for understanding
                  various geo-processes and phenomena in Earth’s environment.
                  Studying, reusing, sharing and integrating geo-analysis models
                  can help researchers solve complicated and synthetic
                  geo-problems with interdisciplinary knowledge, especially for
                  researchers who collaborate with each other to build virtual
                  geographic environments (VGEs).
                </span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>
            <h1>Data Visual</h1>
            <el-row>
              <el-col :span="10">
                <img
                  src="../assets/svg/visual.svg"
                  height="200px"
                  width="90%"
                />
              </el-col>
              <el-col :span="14" class="funword">
                <span
                  >Geo-analysis models are necessary tools for understanding
                  various geo-processes and phenomena in Earth’s environment.
                  Studying, reusing, sharing and integrating geo-analysis models
                  can help researchers solve complicated and synthetic
                  geo-problems with interdisciplinary knowledge, especially for
                  researchers who collaborate with each other to build virtual
                  geographic environments (VGEs).
                </span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import MyHeader from "@/components/headers/PageHeader";
export default {
  data() {
    return {};
  },

  methods: {
    tomapping() {
      this.$router.push("/map");
    },
    toref() {
      this.$router.push("/refactor");
    }
  },

  created() {},
  components: {
    MyHeader
  }
};
</script>
<style>
body {
  background-color: #f2f4f9;
}
.myheader .el-menu {
  z-index: 99;
  /* position: fixed; */
  /* background-color: transparent; */
}
.myheader {
  background-color: white;
}

.myheader .el-menu-item {
  font-size: 16px;
  color: black;
}

.homepage {
  height: 1200px;
}
.top {
  background-image: url(../assets/svg/homebanner.svg);

  background-size: cover;
}

.ban {
  margin: 0;
  height: 450px;
  width: 100%;
  /* background-image: url(../assets/svg/homebanner.svg) ;
     
     background-size: cover; */
}
.ban span {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 100px;
}
.ban p {
  font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
  font-size: 30px;
}

.title {
  margin-top: 6%;
}
.mainfun .el-card {
  margin: 40px;

  height: 100%;
  z-index: -1;
}
.el-row h1 {
  margin-left: 0;
}
.funword {
  text-align: left;
  word-wrap: break-word;
}
.headimg {
  animation: headimg 1.3s ease-in-out 2.7s infinite alternate;
}
@keyframes headimg {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(0, 6px);
  }
}
</style>
