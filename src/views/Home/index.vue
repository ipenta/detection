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
  margin: 0;
}
.view{
  padding-top: 5px;
}
.el-row{
  height: inherit;
}
.el-menu-item{
  vertical-align: middle;
}
.el-table{
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.el-table td{
  padding: 6px 0;
}
.el-table th{
  background-color: #f6f6f6;
}
div.cell{
  overflow: hidden;
}
.textspan {
  color: #99a9bf;
  padding: 10px 15px;
  float: right;
  font-size: 14px;
}
.el-breadcrumb{
  margin-bottom: 30px!important;
}
.input{
  width: 500px;
}
.single{
  width: 1px;
  height: 40px;
  margin: 0 auto;
  background-color: #aaa;
}
</style>
