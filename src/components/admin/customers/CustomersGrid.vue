<template>
  <div>
    <div class="row"><h2>All Customers</h2></div>
    <div class="row">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Email</th>
            <th>Full Name</th>
            <th>Created Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in customers">
            <td>{{ customer.attributes.email }}</td>
            <td>{{ customer.attributes['full-name'] }}</td>
            <td>{{ customer.attributes['created-at'] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      customers: [],
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost:3000/admin/customers', { headers: { 'X-Api-Key': this.readCookie('token') } }).then((response) => {
        this.customers = JSON.parse(response.data).data
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
