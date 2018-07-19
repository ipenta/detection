<template lang="html">
<el-form ref="form" :model="form" label-width="160px">
  <p>所属工程</p>
  <el-form-item label="工程名称">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="建设单位">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="监理单位">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="施工单位">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="设计单位">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value8: ''
    }
  }
}
</script>

<style lang="css">
</style>
