<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '检测项管理' },
        { label: '表单' }
      ]
    }
  },
  methods: {
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
.el-form{
  width: 600px!important;
}
</style>
