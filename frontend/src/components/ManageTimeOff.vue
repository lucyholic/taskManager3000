<template>
  <div>
    <h2 class="pageTitle">Manage Time Offs</h2>
    <table class="timeOffTable">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Requested On</th>
          <th>Reason</th>
          <th>Approved</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="timeOff in allTimeOff" :key="timeOff.time_off_id + '-' + (timeOff.approved_on === null)" v-bind:class="{timeOffApproved: (timeOff.approved_on !== null)}">
            <td>{{timeOff.first_name + ' ' + timeOff.last_name}}</td>
            <td>{{timeOff.type}}</td>
            <td>{{getSimplifiedDate(timeOff.start_time)}}</td>
            <td>{{getSimplifiedDate(timeOff.end_time)}}</td>
            <td>{{getSimplifiedDate(timeOff.requested_on)}}</td>
            <td>{{timeOff.reason}}</td>
            <td v-if="timeOff.approved_on === null"><input type="checkbox" v-on:click.prevent="modifyApproval(timeOff.time_off_id, true)"></td>
            <td v-else><input type="checkbox" v-on:click.prevent="modifyApproval(timeOff.time_off_id, false)" checked></td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "ManageTimeOff",
    data: function () {
      return {
        allTimeOff: [],
      }
    },
    props: {
      user: {
        type: Object,
        default: () => {return null}
      }
    },
    methods: {
      getAllTimeOff() {
        this.$http.get('/api/timeOff/manageGetTimeOff')
        .then((res) => {
          this.allTimeOff = res.data
        })
      },
      getSimplifiedDate(dateString) {
        let date = new Date(dateString)
        return date.toDateString()
      },
      modifyApproval(timeOffId, toApprove) {
       this.$http.post('/api/timeOff/modifyApproval', {userId: this.user.user_id, timeOffId: timeOffId, toApprove: toApprove})
       .then(() => {
         this.getAllTimeOff()
       })
      }
    },
    mounted () {
      this.getAllTimeOff()
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

  .timeOffApproved {
    background-color: lightgreen;
  }
</style>