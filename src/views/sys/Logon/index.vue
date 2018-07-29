<template lang="html">
  <el-form ref="form" status-icon :model="form" :rules="formRules" class="logon-form" label-width="80px">
    <el-form-item label="电子邮箱" prop="email">
      <el-input v-model="form.email" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('form')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { validEmail } from '@/utils/validate'
export default {
  data() {
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('必须：不能为空'))
      } else if (!validEmail(value)) {
        callback(new Error('请输入正确的email地址'))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        password: ''
      },
      formRules: {
        email: [
          { required: true, message: '必须：不能为空', trigger: 'blur' },
          { validator: validateEmail, message: '请输入正确的email地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '必须：不能为空', trigger: 'blur' },
          { max: 12, message: '最多不能超过12个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('logon', this.form).then(result => {
            this.$router.push('/')
          })
        }
      })
    },
    resetForm() {}
  }
}
</script>

<style lang="css">
.logon-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 35px 35px 15px;
    margin: 120px auto;
}
</style>
