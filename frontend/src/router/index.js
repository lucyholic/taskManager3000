import Vue from 'vue'
import Router from 'vue-router'
import EmployeeHomePage from '@/pages/EmployeeHomePage'
import EmployeeTimeEntryPage from '@/pages/EmployeeTimeEntryPage'
import EmployeeManageTimeOffPage from '@/pages/EmployeeManageTimeOffPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EmployeeHomePage',
      component: EmployeeHomePage
    },
    {
      path: '/employeeTimeEntry',
      name: 'EmployeeTimeEntryPage',
      component: EmployeeTimeEntryPage
    },
    {
      path: '/employeeManageTimeOff',
      name: 'EmployeeManageTimeOffPage',
      component: EmployeeManageTimeOffPage
    }
  ]
})
