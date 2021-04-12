<template>
  <div v-if="user">
    <p class="applicationDescription">
      Welcome to TaskMaster! Here you can enter your hours and manage your time off requests. 
      You currently have {{user.user_type}} priviledges. 
    </p>

    <label>Your current status is '{{status}}'</label>

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
  created() {
    this.getStatus()
  },
  methods: {
    getStatus() {
      if(this.user) {
        switch(this.user.time_log_type) {
          case "In Shift":
          case "Out Break":
          case "Out Lunch":
            this.status = 'In'
            break;
          case "Out Shift":
            this.status = "Out"
            break;
          case "In Break":
            this.status = "Break"
            break;
          case "In Lunch":
            this.status = "Lunch"
            break;
          default:
            break;
        }
      }
    },
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
	margin: 40px;
}

label {
	margin: 0px 10px 0px 20px;
}

button {
	margin-bottom: 10px;
}

</style>