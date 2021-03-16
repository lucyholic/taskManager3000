<template>
  <div>
    <EmployeeNavigation />
    <h2 class="pageTitle">Home</h2>
    <p class="applicationDescription">Welcome to TaskMaster! Here you can <br> enter your hours and manage your time <br> off requests. You currently have <br> employee privledges. </p>
  </div>
</template>

<script>
import EmployeeNavigation from '../components/EmployeeNavigation.vue'

export default {
  name: 'EmployeeHomePage',
  components: {
    EmployeeNavigation
  }
}
</script>

<style scoped>

.applicationDescription {
  text-align: center;
  font-size: 20px;
  margin-top: 40px;
}

</style>