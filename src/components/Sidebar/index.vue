<template lang="html">
<div class="sidebar" style="height:inherit">
  <el-menu :default-active="defaultActive" :router="true" @select="onSelected">
    <el-menu-item index="/record"><i class="el-icon-menu"></i>委托管理</el-menu-item>
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-edit"></i>数据</template>
      <el-menu-item index="/project">项目信息</el-menu-item>
      <el-menu-item index="/entity">单位信息</el-menu-item>
      <el-menu-item index="/principal">委托人信息</el-menu-item>
      <el-menu-item index="/inspection">验证项信息</el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
export default {
  data () {
    let active = window.sessionStorage.defaultActive || '/'
    return {
      defaultActive: active
    }
  },
  methods: {
    onSelected (index) {
      window.sessionStorage.defaultActive = index
    }
  }
}
</script>

<style lang="css">
.sidebar{
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
  border-right: 1px solid #e6e6e6;
}
.el-menu{
  border: 0;
}
</style>
