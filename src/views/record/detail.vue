<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <RecordForm></RecordForm>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
import RecordForm from '@/components/RecordForm'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '方案' },
        { label: '方案管理' }
      ]
    }
  },
  components: {
    Breadcrumb: Breadcrumb,
    RecordForm: RecordForm
  }
}
</script>

<style lang="css">
</style>
