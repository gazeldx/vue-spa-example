<template>
  <div>
    <div class="row"><h2>Customer login</h2></div>
    <div class="row form-inline" role="form">
      <div class="form-group">
        <label class="sr-only" for="email">Email address</label>
        <input v-model="customer.email" type="email" class="form-control" id="email" placeholder="Enter email">
      </div>
      <div class="form-group">
        <label class="sr-only" for="password">Password</label>
        <input v-model="customer.password" type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button @click="doLogin" class="btn btn-default">Sign in</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      customer: { email: '', password: '' }
    }
  },
  methods: {
    doLogin () {
      this.$http.post('http://localhost:3000/sessions', { data: { attributes: this.customer } }, { headers: { 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        let data = JSON.parse(response.data).data
        console.log(data)
//        console.log(data.attributes.token)
        this.createCookie('token', data.attributes.token, 10)
        this.createCookie('customerId', data.id, 10)
        window.location.href = '/tickets'
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
