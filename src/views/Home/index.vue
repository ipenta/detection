<template lang="html">
<router-view/>
</template>

<script>
export default {
  computed: {
    msgCount() {
      var type = this.$store.state.message.type
      var msg = this.$store.state.message.content
      if (msg !== '') {
        var param = {
          'type': type,
          message: msg
        }
        console.log(this.$message)
        this.$message(param)
      }
      return this.$store.state.msg.count
    }
  }
}
</script>

<style lang="css">
</style>
