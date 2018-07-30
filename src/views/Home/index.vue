<template lang="html">
<div class="layout">
  <Header></Header>
  <div class="content">
    <el-row>
      <el-col :span="4" style="height:inherit">
        <Sidebar></Sidebar>
      </el-col>
      <el-col :span="20">
        <router-view/>
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
.el-row{
  height: inherit;
}
.el-menu-item{
  vertical-align: middle;
}
.container{
  padding-top: 40px;
}
</style>
