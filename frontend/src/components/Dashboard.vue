<template>
  <div v-if="user">
    <p class="applicationDescription">Welcome to TaskMaster! Here you can <br> enter your hours and manage your time <br> off requests. You currently have <br> employee privledges. </p>

    Your current status is '{{status}}'

    <button v-if="status === 'Out'" @click="punch('shift')">In Shift</button>
    <button v-if="status === 'In'" @click="punch('shift')">Out Shift</button>
    <button v-if="status === 'In'" @click="punch('break')">In Break</button>
    <button v-if="status === 'Break'" @click="punch('break')">Out Break</button>
    <button v-if="status === 'In'" @click="punch('lunch')">In Lunch</button>
    <button v-if="status === 'Lunch'" @click="punch('lunch')">Out Lunch</button>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  props: {
    user: {
      type: Object,
      default: () => {return null}
    }
  },
  data() {
    return {
      status: 'Out',
    }
  },
  methods: {
    punch(type) {
      let afterStatus = ''
      let typeId = 0
      switch (type) {
        case "shift":
          if (this.status === 'In') {
            typeId = 2
            afterStatus = 'Out'
          } else {
            typeId = 1
            afterStatus = 'In'
          }
          break;
        case "lunch":
          if (this.status === 'In') {
            typeId = 5
            afterStatus = 'Lunch'
          } else {
            typeId = 6
            afterStatus = 'In'
          }
          break;
        case "break":
          if (this.status === 'In') {
            typeId = 3
            afterStatus = 'Break'
          } else {
            typeId = 4
            afterStatus = 'In'
          }
          break;
        default:
          break;
      }

      this.$http.post('/api/timeEntry/' + this.user.user_id, {
        typeId: typeId,
      }).then((res) => {
        if (res.status === 200 && res.data.affectedRows === 1) {
          this.status = afterStatus
        }
      })
    }
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