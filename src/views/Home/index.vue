<template lang="html">
<div class="main">
  <ul class="menu">
    <li><router-link to="/record">记录</router-link></li>
    <li><router-link to="/entry/1">新增条目</router-link></li>
  </ul>
  <router-view/>
</div>
</template>

<script>
export default {
}
</script>

<style lang="css">
.menu{
  position: absolute;
  height: 40px;
  margin: 0 0 0 15px;
  padding: 0;
}
.menu li{
  list-style: none;
  float: right;
  text-align: center;
  vertical-align: middle;
  margin: 0 15px;
  line-height: 40px;
}
.container{
  padding-top: 40px;
}
</style>
