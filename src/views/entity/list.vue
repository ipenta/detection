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
        { label: '相关单位管理' },
        { label: '列表' }
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
