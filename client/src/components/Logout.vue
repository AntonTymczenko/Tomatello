<template>
</template>

<script>
export default {
  created () {
    localStorage.removeItem('authToken')
    this.$store.state.user = null
    this.$router.push({name: 'Auth'})
  }
}
</script>

<style scoped>
</style>
