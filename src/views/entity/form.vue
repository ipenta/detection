<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <el-form ref="inspectionForm" :model="inspectionVO" :rules="inspectionFormRules" label-width="160px">
      <el-form-item label="材料/项目名称" prop="text">
        <el-input v-model="inspectionVO.text"></el-input>
      </el-form-item>
      <el-form-item label="检测类别" prop="type">
        <el-input v-model="inspectionVO.type"></el-input>
      </el-form-item>
      <el-form-item label="收费标准" prop="price">
        <el-input v-model.number="inspectionVO.price"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model="inspectionVO.unit"></el-input>
      </el-form-item>
      <el-form-item label="检验方式" prop="methods">
        <el-checkbox-group v-model="inspectionVO.methods">
          <el-checkbox v-for="method in methodOptions" :label="method" :key="method">{{method}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button @click="$router.go(-1)">放弃</el-button>
        <el-button type="primary" @click="onSubmit('inspectionForm')">创建项目</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
const methodOptions = ['送样检测', '现场检测']
export default {
  data() {
    return {
      breadcrumb: [
        { label: '检测项管理' },
        { label: '表单' }
      ],
      inspectionVO: {
        text: '',
        type: '',
        price: 0,
        unit: '',
        methods: []
      },
      methodOptions: methodOptions,
      inspectionFormRules: {
        text: [{
          required: true,
          message: '请输入检测类别',
          trigger: 'blur'
        }],
        type: [{
          required: true,
          message: '请输入材料、项目名称',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入收费标准'
        }, {
          type: 'number',
          message: '必须为数值',
          trigger: 'blur'
        }],
        unit: [{
          required: true,
          message: '请输入计量单位',
          trigger: 'blur'
        }],
        methods: [{
          required: true,
          type: 'array',
          message: '请输入至少选择一个',
          trigger: 'change'
        }]
      }
    }
  },
  mounted: function () {
    console.log(this.$route)
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('addInspection', this.inspectionVO).then(msg => {
            if (msg.status === 'success') {
              this.$router.go(-1)
              this.$refs[formName].resetFields()
            }
          })
        }
      })
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
.el-form{
  width: 600px!important;
}
</style>
