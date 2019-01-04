<template>
  <div class="about">
    <h1>This is an about page</h1>

    <el-upload
      ref="uploadSchema"
      action="/api/schemaDoc/getSchemaFromFile"
      :on-success="onSuccessSchema"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
    </el-upload>

    <el-button @click="createSchema">创建Schema</el-button>

    <br>
    <br>
    <br>

    <el-upload
      ref="uploadMapZip"
      action="/api/file/upload/map"
      :on-success="onSuccessMap"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
    </el-upload>

    <el-button @click="getSchemaList">加载Schema</el-button>

    <el-select
      v-model="mapSupportedSchema"
      placeholder="请选择Map对应的Schema"
    >
      <el-option
        v-for="item in items"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <el-button @click="createMap">创建Map</el-button>

    <el-upload
      ref="uploadRefactorZip"
      action="/api/file/upload/refactor"
      :on-success="onSuccessRefactor"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
    </el-upload>

    <el-select
      v-model="refactorSupportedSchema"
      multiple
      placeholder="请选择"
    >
      <el-option
        v-for="item in items"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <el-button @click="createMap">创建Refactor</el-button>

  </div>
</template>

<script>
export default {
  name: "about",
  components: {},
  data() {
    return {
      entity: null,
      udxSchema: new Object(),
      items: new Array(),
      mapSupportedSchema: "",
      refactorSupportedSchema: [],
      mapStorePath: "",
      refactorStorePath: ""
    };
  },
  methods: {
    onSuccessSchema(response) {
      this.udxSchema = response.data;
    },
    createSchema() {
      //这里的udxNodeSchemas目前是由上传原来版本的XML文件获取
      //后期要考虑接入陈坤师兄的electron项目
      let addDTO = {
        description: "test",
        detailMarkDown: "test",
        name: "test",
        udxSchema: this.udxSchema
      };
      this.$API.schemaDoc({
        method: "postJSON",
        data: addDTO,
        success: data => {
          console.log(data);
        }
      });
    },

    onSuccessMap(response) {
      this.mapStorePath = response.data;
    },

    getSchemaList() {
      //这里加载的是默认的前10个元素，还是要考虑把加入分页，所以shcemaList的组件要注意抽象
      this.$API.schemaDoc({
        params: {},
        success: data => {
          this.items = data.content;
        }
      });
    },

    createMap() {
      //上传Map需要先上传Zip包
      //同时需要选择一个SchemaDoc。
      let addDTO = {
        description: "test",
        detailMarkDown: "test",
        name: "test",
        storePath: this.mapStorePath,
        supportedUdxSchema: this.mapSupportedSchema
      };
      this.$API.map({
        method: "postJSON",
        data: addDTO,
        success: data => {
          console.log(data);
        }
      });
    },

    onSuccessRefactor(response) {
      this.refactorStorePath = response.data;
    },

    createRefactor() {
      //上传Map需要先上传Zip包
      let addDTO = {
        description: "test",
        detailMarkDown: "test",
        name: "test",
        storePath: this.refactorStorePath,
        supportedUdxSchema: this.refactorSupportedSchema
      };
      addDTO.supportedUdxSchema.push("");
      this.$API.refactor({
        method: "postJSON",
        data: addDTO,
        success: data => {
          console.log(data);
        }
      });
    }
  },
  created() {}
};
</script>
