<template lang="html">
  <div class="container">
    <Breadcrumb :items="breadcrumb"></Breadcrumb>
    <RecordForm :data="data"></RecordForm>
  </div>
</template>
<script>
import Breadcrumb from '@/components/Breadcrumb'
import RecordForm from './RecordForm'
export default {
  data() {
    return {
      breadcrumb: [
        { label: '方案' },
        { label: '方案管理' }
      ],
      data: this.$route.params
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
