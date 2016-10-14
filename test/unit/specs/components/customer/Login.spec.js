import Vue from 'vue'
import Login from 'src/components/customer/Login'

describe('Login.vue', () => {
  it('renders the correct title', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Login)
    })
    expect(vm.$el.querySelector('.row h2').textContent).toBe('Customer login')
  })
})
