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
      <button @click="signIn" class="btn btn-default">Sign in</button>
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
    signIn () {
      // TODO: Should show notice message if login failed.
      this.$http.post('http://localhost:3000/sessions', { data: { attributes: this.customer } }, { headers: { 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        let data = JSON.parse(response.data).data
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
