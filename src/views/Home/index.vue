<template lang="html">
<div class="layout">
  <Header></Header>
  <div class="content">
    <el-row>
      <el-col :span="4" style="height:inherit">
        <Sidebar></Sidebar>
      </el-col>
      <el-col :span="20">
        <router-view class="view"/>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
export default {
  components: {
    Header: Header,
    Sidebar: Sidebar
  }
}
</script>

<style lang="css">
.layout{
  height: inherit;
}
.content {
  z-index: 1;
  overflow-x: hidden;
  height: inherit;
}
.view{
  padding: 5px;
}
.el-row{
  height: inherit;
}
.el-menu-item{
  vertical-align: middle;
}
.container{
  margin-left: 16px;
  margin-right: 16px;
}
.el-table td{
  padding: 6px 0;
}
div.cell{
  overflow: hidden;
}
</style>
