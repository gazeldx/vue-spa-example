<template>
  <div>
    <div class="row"><h2>All Agents</h2></div>
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
          <tr v-for="agent in agents">
            <td>{{ agent.attributes.email }}</td>
            <td>{{ agent.attributes['full-name'] }}</td>
            <td>{{ agent.attributes['created-at'] }}</td>
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
      agents: [],
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost:3000/admin/agents', { headers: { 'X-Api-Key': this.readCookie('token') } }).then((response) => {
        this.agents = JSON.parse(response.data).data
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
