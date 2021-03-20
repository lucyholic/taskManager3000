import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import TimeEntry from '@/components/TimeEntry'
import TimeOff from '@/components/TimeOff'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/timeEntry',
      name: 'TimeEntry',
      component: TimeEntry,
      props: true
    },
    {
      path: '/timeOff',
      name: 'TimeOff',
      component: TimeOff,
      props: true
    },
  ]
})
