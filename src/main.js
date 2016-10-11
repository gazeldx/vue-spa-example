// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Login from './components/customer/Login'
import TicketsGrid from './components/customer/tickets/TicketsGrid'
import Ticket from './components/customer/tickets/Ticket'
import TicketsNew from './components/customer/tickets/TicketsNew'

import AgentLogin from './components/agent/Login'
import AgentTicketsGrid from './components/agent/tickets/TicketsGrid'
import AgentTicket from './components/agent/tickets/Ticket'

import AdminLogin from './components/admin/Login'
import AdminTicketsGrid from './components/admin/tickets/TicketsGrid'
import AdminCustomersGrid from './components/admin/customers/CustomersGrid'
import AdminAgentsGrid from './components/admin/agents/AgentsGrid'

import App from './App'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/login', component: Login },
    { path: '/tickets', component: TicketsGrid },
    { path: '/tickets/new', component: TicketsNew },
    { path: '/tickets/:id', component: Ticket, name: 'ticket' },
    { path: '/agent/login', component: AgentLogin },
    { path: '/agent/tickets', component: AgentTicketsGrid },
    { path: '/agent/tickets/:id', component: AgentTicket, name: 'agent_ticket' },
    { path: '/admin/login', component: AdminLogin },
    { path: '/admin/tickets', component: AdminTicketsGrid },
    { path: '/admin/customers', component: AdminCustomersGrid },
    { path: '/admin/agents', component: AdminAgentsGrid },
  ]
})

Vue.mixin({
  methods: {
    createCookie (key, value, expireDays) {
      let expires = ""
      if (expireDays) {
        let date = new Date()
        date.setTime(date.getTime() + (expireDays * 24 * 60 * 60 * 1000))
        expires = "; expires=" + date.toGMTString()
      }
      document.cookie = key + "=" + value + expires + "; path=/"
    },
    readCookie (key) {
      var keyEQ = key + "="
      var ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length)
        }
        if (c.indexOf(keyEQ) == 0) {
          return c.substring(keyEQ.length, c.length)
        }
      }
      return null
    },
    eraseCookie (key) {
      this.createCookie(key, "", -1)
    }
  }
})

// Create and mount root instance. Make sure to inject the router. Route components will be rendered inside <router-view>.
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
