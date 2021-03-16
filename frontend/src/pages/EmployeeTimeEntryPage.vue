<template>
  <div>
    <EmployeeNavigation />
    <EmployeeTimeEntry />
  </div>
</template>

<script>
import EmployeeNavigation from '../components/EmployeeNavigation.vue'
import EmployeeTimeEntry from '../components/EmployeeTimeEntry.vue'

export default {
  name: 'EmployeeTimeEntryPage',
  components: {
    EmployeeNavigation,
    EmployeeTimeEntry
  }
}
</script>