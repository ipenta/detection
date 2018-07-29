<template lang="html">
  <el-form ref="register" status-icon :model="register" :rules="registerRules" class="logon-form" label-width="80px">
    <el-form-item label="电子邮箱" prop="email">
      <el-input v-model="register.email"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="register.password" auto-complete="off">
        <template slot="prepend">Http://</template>
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="register.password" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      register: {
        email: '',
        password: ''
      },
      registerRules: {}
    }
  },
  methods: {
    submitForm() {},
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
