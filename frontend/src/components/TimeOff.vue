<template>
  <div class="employeeManageTimeOff" v-if="user">
    <h2 class="pageTitle">Manage Time Off</h2>
    <table class="timeOffTable">
      <thead>
        <tr>
            <th>Type</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Requested On</th>
            <th>Reason</th>
            <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="timeOff in allTimeOff" :key="timeOff.time_off_id" v-bind:class="{timeOffActive: timeOffActive(timeOff)}">
          <td>{{timeOff.type}}</td>
          <td>{{getSimplifiedDate(timeOff.start_time)}}</td>
          <td>{{getSimplifiedDate(timeOff.end_time)}}</td>
          <td>{{getSimplifiedDate(timeOff.requested_on)}}</td>
          <td>{{timeOff.reason}}</td>
          <td v-if="timeOffActive(timeOff)">In Progress</td>
          <td v-else-if="timeOffPending(timeOff)">Pending</td>
          <td v-else><button class="deleteTimeOff" v-on:click="deleteTimeOff(timeOff.time_off_id)"><img src='../assets/deleteIcon.png'></button></td>
        </tr>
      </tbody>
    </table>
    <button class="requestTimeOff" v-on:click="setRequestTimeOffModalToOpen()">Request Time Off</button>
    <div v-if="modalOpen">
      <EmployeeRequestTimeOffModal v-bind:userId="user.user_id" v-on:unmountRequestTimeOffModal="setRequestTimeOffModalToClose()" v-on:refreshAllTimeOff="getTimeOff()"/>
    </div>
  </div>
</template>

<script>
import EmployeeRequestTimeOffModal from '../components/EmployeeRequestTimeOffModal'

export default {
  name: 'timeOff',
  data: function () {
    return {
      modalOpen: false,
      allTimeOff: [],
    }
  },
  components: {
    EmployeeRequestTimeOffModal
  },
  props: {
    user: {
      type: Object,
      default: () => {return null}
    }
  },
  methods: {
    setRequestTimeOffModalToOpen() {
      this.modalOpen = true;
    },
    setRequestTimeOffModalToClose() {
      this.modalOpen = false;
    },
    getTimeOff() {
      this.$http.post('/api/timeOff/retrieveTimeOff', {userId: this.user.user_id})
      .then((res) => {
        this.allTimeOff = res.data
      })
    },
    getSimplifiedDate(dateString) {
      let date = new Date(dateString)
      return date.toDateString()
    },
    timeOffActive(timeOff) {
      let startDate = new Date(timeOff.start_time).getTime()
      let endDate = new Date(timeOff.end_time).getTime()
      let currentDate = new Date().getTime()

      return currentDate >= startDate && currentDate <= endDate && timeOff.approved_on !== null
    },
    timeOffPending(timeOff) {
      let startDate = new Date(timeOff.start_time).getTime()
      let currentDate = new Date().getTime()

      return currentDate < startDate && timeOff.approved_on !== null
    },
    deleteTimeOff(timeOffId) {
      this.$http.post('/api/timeOff/deleteTimeOff', {timeOffId: timeOffId})
      .then(() => {
        this.getTimeOff()
      })
    }
  },
  mounted () {
    this.getTimeOff()
  }
}
</script>

<style scoped>
  .timeOffTable {
      border-collapse: collapse;
      min-width: 1000px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
  }

  .timeOffTable thead tr {
    background-color: #d3d3d3;
    text-align: left;
  }

  .timeOffTable th,.timeOffTable td {
    padding: 12px 17px;
    text-align: center;
  }

  .timeOffTable tbody tr {
    border-bottom: thin solid #dddddd;
  }

  .deleteTimeOff {
    background-color: white;
    border: none;
    width: 50px;
    height: 50px;
  }

  .requestTimeOff {
    display:block;
    margin-top: 20px;
    background-color: blue;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 100px;
  }

  .timeOffActive {
    background-color: lightgreen;
  }
</style>