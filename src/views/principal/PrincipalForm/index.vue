<template lang="html">
  <el-form ref="form" :model="form" :rules="formRules" label-width="160px" class="simple-form">
    <el-form-item label="委托人" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="委托电话" prop="phonenum">
        <el-input v-model="form.phonenum"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="onClose('form')">取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { isvalidPhone } from '@/utils/validate'
import { mapActions } from 'vuex'
export default {
  props: ['content'],
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
      form: {
        _id: this.content._id || '',
        name: this.content.name || '',
        phonenum: this.content.phonenum || ''
      },
      formRules: {
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
  computed: {
    contents: function () {
      return this.content
    }
  },
  methods: {
    ...mapActions({
      submit: 'principal/submit'
    }),
    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form)
          this.submit(this.form).then(response => {
            this.$refs[formName].resetFields()
            this.$emit('close')
          })
        }
      })
    },
    onClose: function (formName) {
      this.$refs[formName].resetFields()
      this.$emit('close')
    }
  }
}
</script>

<style lang="css">
</style>
