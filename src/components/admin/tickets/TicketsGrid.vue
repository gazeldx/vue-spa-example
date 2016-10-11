<template>
  <div>
    <div class="row"><h2>All Tickets</h2></div>
    <div class="row">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
            <th>Created Time</th>
            <th>Customer</th>
            <th>Agent ID</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets">
            <td><router-link :to="{name: 'agent_ticket', params: {id: ticket.id}}">{{ ticket.attributes.title }}</router-link></td>
            <td>{{ ticket.attributes.content }}</td>
            <td>{{ ticket.attributes.state }}</td>
            <td>{{ ticket.attributes['created-at'] }}</td>
            <td>{{ ticket.attributes['customer-id'] }}</td>
            <td>{{ ticket.attributes['agent-id'] }}</td>
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
      tickets: [],
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost:3000/admin/tickets', { headers: { 'X-Api-Key': this.readCookie('token') } }).then((response) => {
        this.tickets = JSON.parse(response.data).data
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
