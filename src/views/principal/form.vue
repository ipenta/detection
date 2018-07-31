<template lang="html">
<div class="container">
  <Breadcrumb :items="breadcrumb"></Breadcrumb>
  <el-form ref="principalForm" :model="principalForm" :rules="principalFormRules" label-width="160px" class="simple-form">
    <el-form-item label="委托人" prop="name">
        <el-input v-model="principalForm.name"></el-input>
    </el-form-item>
    <el-form-item label="委托电话" prop="phonenum">
        <el-input v-model="principalForm.phonenum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$router.go(-1)">取 消</el-button>
      <el-button type="primary" @click="onSubmit('principalForm')">确 定</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import { isvalidPhone } from '@/utils/validate'
import Breadcrumb from '@/components/Breadcrumb'
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必须：电话不能为空'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      breadcrumb: [
        { label: '委托人管理' },
        { label: '表单' }
      ],
      principalForm: {
        name: '',
        phonenum: ''
      },
      principalFormRules: {
        name: [
          { required: true, message: '必须：请务必填写姓名', trigger: 'blur' },
          { min: 2, message: '长度不能少于 3 个字符', trigger: 'blur' }
        ],
        phonenum: [
          { required: true, trigger: 'blur', validator: validatePhone } // 这里需要用到全局变量
        ]
      }
    }
  },
  methods: {
    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('addPrincipal', this.principalForm).then(msg => {
            if (msg.status === 'success') {
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
</style>
