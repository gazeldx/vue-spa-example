<template>
  <div>
    <div class="row">
      <h2>{{ ticket.title }}</h2>
      Customer: {{ customer.attributes['full-name'] }}
    </div>
    <div class="row">
      <div class="form-group">
        Content: {{ ticket.content }}
      </div>
      <div class="form-group" v-bind:class="ticketItem.attributes['agent-id'] ? 'text-primary' : ''" v-for="ticketItem in ticketItems">
        {{ ticketItem.attributes.content }}
        <br>
        at {{ ticketItem.attributes['created-at'] }}
        <span v-if="ticketItem.attributes['agent-id']">by agent ID: {{ ticketItem.attributes['agent-id'] }}</span>
      </div>
      <div class="form-group">
        <label for="content">Reply</label>
        <textarea v-model="ticketItem.content" class="form-control" rows="3" id="content"></textarea>
      </div>
      <div class="form-inline">
        <button @click="createTicketItem" class="btn btn-default">Submit</button>
        <label for="state">&nbsp;&nbsp;Status</label>
        <select v-model="ticket.state" class="form-control" id="state" @change="updateTicketState">
          <option value="New">New</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Solved">Solved</option>
          <option value="Closed">Closed</option>
        </select>
        <span class="text-success">{{ stateChangedMessage }}{{ ticketItem.agent_id }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ticket: { id: this.$route.params.id, title: '', content: '', 'customer-id': '' },
      ticketItem: { ticket_id: this.$route.params.id, content: '' },
      ticketItems: [],
      customer: { attributes: {} },
      agent: {},
      stateChangedMessage: '',
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost:3000/agent/tickets/' + this.ticket.id, { headers: { 'X-Api-Key': this.readCookie('token') } }).then((response) => {
        let data = JSON.parse(response.data)
        this.ticket = { ...this.ticket, ...data.data.attributes }
        this.customer = data.included.filter((item) => { return item.type == "customers" })[0]
        this.agent = data.included.filter((item) => { return item.type == "agents" })[0]
        this.ticketItems = data.included.filter((item) => { return item.type == "ticket-items" })
      }, (response) => {
        console.log(response.data)
      })
    },
    createTicketItem () {
      this.$http.post('http://localhost:3000/agent/ticket_items', { data: { type: 'ticket_item', attributes: this.ticketItem } }, { headers: { 'X-Api-Key': this.readCookie('token'), 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        console.log(response.data)
        this.$router.go(0)
      }, (response) => {
        console.log(response.data)
      })
    },
    updateTicketState () {
      this.$http.patch('http://localhost:3000/agent/tickets/' + this.ticket.id + '/update_state', { data: { type: 'ticket', attributes: this.ticket } }, { headers: { 'X-Api-Key': this.readCookie('token'), 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        this.stateChangedMessage = 'Status switched to ' + this.ticket.state
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
