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
        <tr>
            <td>Vacation</td>
            <td>February 20th, 2021</td>
            <td>March 20th, 2021</td>
            <td>February 10th, 2021</td>
            <td>Visiting family in Europe</td>
            <td>In Progress</td>
        </tr>
          <tr>
            <td>Vacation</td>
            <td>April 15th, 2021</td>
            <td>May 10th, 2021</td>
            <td>February 11th, 2021</td>
            <td>Relaxation</td>
            <td><button class="deleteTimeOff"><img src='../assets/deleteIcon.png'></button></td>
          </tr>
      </tbody>
    </table>
    <button class="requestTimeOff" v-on:click="setRequestTimeOffModalToOpen()">Request Time Off</button>
    <div v-if="modalOpen">
      <EmployeeRequestTimeOffModal v-on:unmountRequestTimeOffModal="setRequestTimeOffModalToClose()" v-on:showPostTimeOffResult="modifyPostResult($event)"/>
    </div>
    <div>{{postResult}}</div>
  </div>
</template>

<script>
import EmployeeRequestTimeOffModal from '../components/EmployeeRequestTimeOffModal'

export default {
  name: 'timeOff',
  data: function () {
    return {
      modalOpen: false,
      postResult: ""
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
    modifyPostResult(resultData) {
      this.postResult = `Posted timeoff request to server and got back: ${resultData.startDate}, ${resultData.endDate}, ${resultData.type}, ${resultData.reason}`
    }
  },
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
</style>