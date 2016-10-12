<template>
  <div id="app" class="container">
    <div class="row">
      <router-link to="/tickets" class="btn btn-lg btn-primary" v-if="readCookie('customerId') != null">My Tickets</router-link>
      <router-link to="/agent/tickets" class="btn btn-lg btn-success" v-if="readCookie('agentId') != null">Tickets</router-link>
      <router-link to="/admin/tickets" class="btn btn-lg btn-warning" v-if="readCookie('administratorId') != null">Tickets</router-link>
      <router-link to="/admin/customers" class="btn btn-lg btn-primary" v-if="readCookie('administratorId') != null">Customers</router-link>
      <router-link to="/admin/agents" class="btn btn-lg btn-danger" v-if="readCookie('administratorId') != null">Agents</router-link>
      <router-link to="/login" class="btn btn-lg btn-success" v-if="readCookie('token') == null">Customer Login</router-link>
      <router-link to="/agent/login" class="btn btn-lg btn-danger" v-if="readCookie('token') == null">Agent Login</router-link>
      <router-link to="/admin/login" class="btn btn-lg btn-default" v-if="readCookie('token') == null">Admin Login</router-link>
      <button @click="logout" class="btn btn-lg btn-default" v-if="readCookie('customerId') != null">Customer Logout</button>
      <button @click="agentLogout" class="btn btn-lg btn-default" v-if="readCookie('agentId') != null">Agent Logout</button>
      <button @click="adminLogout" class="btn btn-lg btn-default" v-if="readCookie('administratorId') != null">Admin Logout</button>
    </div>
    <topTitle></topTitle>
    <router-view></router-view>
  </div>
</template>

<script>
import TopTitle from './components/TopTitle'

export default {
  data () {
    return {}
  },
  components: {
    TopTitle
  },
  methods: {
    logout () {
      this.$http.post('http://localhost:3000/delete_session', { data: { attributes: { token: this.readCookie('token') } } }, { headers: { 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        this.eraseCookie('token')
        this.eraseCookie('customerId')
        window.location.href = '/'
      }, (response) => {
        console.log(response.data)
      })
    },
    agentLogout () {
      this.$http.post('http://localhost:3000/agent/delete_session', { data: { attributes: { token: this.readCookie('token') } } }, { headers: { 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        this.eraseCookie('token')
        this.eraseCookie('agentId')
        window.location.href = '/'
      }, (response) => {
        console.log(response.data)
      })
    },
    adminLogout () {
      this.$http.post('http://localhost:3000/admin/delete_session', { data: { attributes: { token: this.readCookie('token') } } }, { headers: { 'Content-Type': 'application/vnd.api+json' } }).then((response) => {
        this.eraseCookie('token')
        this.eraseCookie('administratorId')
        window.location.href = '/'
      }, (response) => {
        console.log(response.data)
      })
    }
  }
}
</script>

<style>
body {
  margin: 10px;
}
</style>
