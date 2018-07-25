<template lang="html">
  <div class="container">
    <p>检测项目</p>
    <el-form ref="inspectionForm" :model="inspectionForm" label-width="160px">
      <el-form-item label="材料/项目名称" prop="text">
        <el-input v-model="inspectionForm.text"></el-input>
      </el-form-item>
      <el-form-item label="检测类别" prop="type">
        <el-input v-model="inspectionForm.type"></el-input>
      </el-form-item>
      <el-form-item label="收费标准" prop="price">
        <el-input v-model="inspectionForm.price"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unti">
        <el-input v-model="inspectionForm.unit"></el-input>
      </el-form-item>
      <el-form-item label="检验方式" prop="methods">
        <el-input v-model="inspectionForm.methods"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="text" @click="onInspectionSubmit">创建单位</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inspectionForm: {
        text: '',
        type: '',
        price: 0.00,
        unit: '',
        method: []
      }
    }
  },
  methods: {
    onInspectionSubmit: function () {
      this.$store.dispatch('addInspection').then(context => {
        console.log(context)
      })
    }
  }
}
</script>

<style lang="css">
</style>
