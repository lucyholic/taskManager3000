import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import TimeSummary from '@/components/TimeSummary'
import TimeOff from '@/components/TimeOff'
import ManageUsers from '@/components/ManageUsers'
import ManageTimeOff from '@/components/ManageTimeOff'
import GeneratePaystub from '@/components/GeneratePaystub'

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
      path: '/timeSummary',
      name: 'TimeSummary',
      component: TimeSummary,
      props: true
    },
    {
      path: '/timeOff',
      name: 'TimeOff',
      component: TimeOff,
      props: true
    },
    {
      path: '/manageUsers',
      name: 'manageUsers',
      component: ManageUsers,
      props: true
    },
    {
      path: '/manageTimeOff',
      name: 'ManageTimeOff',
      component: ManageTimeOff,
      props: true
    },
    {
      path: '/generatePaystub',
      name: 'GeneratePaystub',
      component: GeneratePaystub,
      props: true
    }
  ]
})
