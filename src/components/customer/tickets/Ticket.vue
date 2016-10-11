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
      <button @click="createTicketItem" class="btn btn-default">Submit</button>
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
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http.get('http://localhost:3000/tickets/' + this.ticket.id, { headers: { 'X-Api-Key': this.readCookie('token') } }).then((response) => {
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
      this.$http.post('http://localhost:3000/ticket_items', { data: { type: 'ticket_item', attributes: this.ticketItem } }, { headers: { 'X-Api-Key': this.readCookie('token'), 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        console.log(response.data)
        this.$router.go(0)
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>
