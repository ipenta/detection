<template lang="html">
<div class="main">
  <Header></Header>
  <router-view/>
</div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    'Header': Header
  }
}
</script>

<style lang="css">
.el-menu-item{
  vertical-align: middle;
}
.container{
  padding-top: 40px;
}
</style>
