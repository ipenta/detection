<template lang="html">
  <el-form ref="form" :model="form" :rules="formRules" label-width="160px" class="simple-form">
    <el-form-item label="单位名称" prop="name">
        <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="onClose('form')">取 消</el-button>
      <el-button type="primary" @click="onSubmit('form')">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['content'],
  data() {
    return {
      formid: this.content._id || '',
      form: {
        name: this.content.name || ''
      },
      formRules: {
        name: [
          { required: true, trigger: 'blur' } // 这里需要用到全局变量
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      submit: 'entity/submit'
    }),
    onSubmit: function (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.id = this.formid
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
