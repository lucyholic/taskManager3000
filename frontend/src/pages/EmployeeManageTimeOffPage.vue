<template>
  <div>
    <EmployeeNavigation />
    <EmployeeManageTimeOff />
  </div>
</template>

<script>
import EmployeeNavigation from '../components/EmployeeNavigation.vue'
import EmployeeManageTimeOff from '../components/EmployeeManageTimeOff.vue'

export default {
  name: 'EmployeeManageTimeOffPage',
  components: {
    EmployeeNavigation,
    EmployeeManageTimeOff
  }
}
</script>