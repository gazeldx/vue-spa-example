<template>
  <div>
    <div class="row"><h2>New Ticket</h2></div>
    <div class="row">
      <div class="form-group">
        <label for="title">Title</label>
        <input v-model="ticket.title" type="text" class="form-control" id="title">
      </div>
      <div class="form-group">
        <label for="content">Content</label>
        <textarea v-model="ticket.content" class="form-control" rows="3" id="content"></textarea>
      </div>
      <button @click="createTicket" class="btn btn-default">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ticket: {state: 'New', agent_id: 1}
    }
  },
  methods: {
    createTicket: function() {
      this.$http.post('http://localhost:3000/tickets', { data: { type: 'ticket', attributes: this.ticket } }, { headers: { 'X-Api-Key': this.readCookie('token'), 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        window.location.href = '/tickets'
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
