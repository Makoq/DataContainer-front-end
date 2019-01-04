<template>
<div>
    <el-card>
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
    </el-card>

    <el-card>
        <el-button @click="createSchema">创建Schema</el-button>
    </el-card>


</div>
</template>
<script>
export default {};
</script>
<style>
</style>
