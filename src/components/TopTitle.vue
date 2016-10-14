<template>
  <div class="row">
    <h1>{{ systemName }}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      systemName: 'Customer Support Ticketing System'
    }
  },
  created () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
