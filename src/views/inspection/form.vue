<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <el-form ref="inspectionForm" :model="inspectionForm" :rules="inspectionFormRules" label-width="160px">
      <el-form-item label="材料/项目名称" prop="text">
        <el-input v-model="inspectionForm.text"></el-input>
      </el-form-item>
      <el-form-item label="检测类别" prop="type">
        <el-input v-model="inspectionForm.type"></el-input>
      </el-form-item>
      <el-form-item label="收费标准" prop="price">
        <el-input type="number" v-model.number="inspectionForm.price"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit">
        <el-input v-model="inspectionForm.unit"></el-input>
      </el-form-item>
      <el-form-item label="检验方式" prop="methods">
        <el-checkbox-group v-model="inspectionForm.methods">
          <el-checkbox v-for="method in methodOptions" :label="method" :key="method">{{method}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <router-link to="/inspection" class="el-button">取消</router-link>
        <el-button type="primary" @click="onSubmit('inspectionForm')">创建项目</el-button>
      </el-form-item>
    </el-form>
    {{inspectionForm}}
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import { mapActions } from 'vuex'
import isEqual from 'lodash.isequal'
import cloneDeep from 'lodash.clonedeep'
import * as inspectionService from '@/service/inspection'
const methodOptions = ['送样检测', '现场检测']
export default {
  data() {
    return {
      breadcrumb: [
        { label: '检测项管理' },
        { label: '表单' }
      ],
      inspectionForm: {
        _id: '',
        text: '',
        type: '',
        price: 0,
        unit: '',
        methods: []
      },
      temp: {},
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
          required: true, message: '审核数量不能为空', trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (/^[1-9]\d*$/.test(value) === false) {
              callback(new Error('请输入一个整数'))
            } else {
              callback()
            }
          },
          trigger: 'change'
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
    if (this.$route.query.id) {
      const that = this
      inspectionService.initFormData({id: this.$route.query.id}).then(data => {
        that.inspectionForm = data
        that.temp = cloneDeep(data)
      })
    }
  },
  methods: {
    ...mapActions({
      submit: 'inspection/submit'
    }),
    onSubmit: function (formName) {
      if (isEqual(this.inspectionForm, this.temp)) {
        this.$message('表单未做修改')
        return
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submit(this.inspectionForm).then(result => {
            this.$router.push('/inspection')
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
