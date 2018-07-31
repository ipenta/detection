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
        { label: '订单管理' },
        { label: '表单' }
      ]
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

<style lang="css">
</style>
