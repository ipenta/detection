<template lang="html">
<div class="sidebar" style="height:inherit">
  <el-menu :default-active="defaultActive" :router="true" @select="onSelected">
    <el-submenu index="1">
      <template slot="title"><i class="el-icon-menu"></i>机构</template>
      <el-menu-item index="/campus-manae">校区管理</el-menu-item>
      <el-menu-item index="/classroom-manage">教室管理</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title"><i class="el-icon-edit"></i>数据添加</template>
      <el-menu-item index="/project">项目信息</el-menu-item>
      <el-menu-item index="/entry">单位信息</el-menu-item>
      <el-menu-item index="/principal">委托人信息</el-menu-item>
      <el-menu-item index="/principal">检测信息</el-menu-item>
    </el-submenu>
  </el-menu>
</div>
</template>

<script>
export default {
  data () {
    let active = window.sessionStorage.defaultActive || '/campus-manage'
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
