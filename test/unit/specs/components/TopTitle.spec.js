// Import Vue and the component being tested
import Vue from 'vue'
import TopTitle from 'src/components/TopTitle'
// Here are some Jasmine 2.0 tests, though you can
// use any test runner / assertion library combo you prefer
describe('TopTitle.vue', () => {
  // Inspect the raw component options
  it('has a created hook', () => {
    expect(typeof TopTitle.created).toBe('function')
  })
  // Evaluate the results of functions in
  // the raw component options
  it('sets the correct default data', () => {
    expect(typeof TopTitle.data).toBe('function')
    const defaultData = TopTitle.data()
    expect(defaultData.systemName).toBe('Customer Support Ticketing System')
  })
  // Inspect the component instance on mount
  xit('correctly sets the message when created', () => {
    const vm = new Vue(TopTitle).$mount()
    expect(vm.message).toBe('bye!')
  })
  // Mount an instance and inspect the render output
  it('renders the correct message', () => {
    const Ctor = Vue.extend(TopTitle)
    const vm = new Ctor().$mount()
    expect(vm.$el.textContent).toBe('Customer Support Ticketing System')
  })
})
