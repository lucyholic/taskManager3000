<template>
  <div>
    <h2 class="pageTitle">Generate Paystub</h2>
    <select class="employeeSelection" v-model="selectedEmployee" @change="refreshPaystub()">
      <option v-for="employee in employees" v-bind:value="employee.value" :key="employee.value">
        {{employee.text}}
      </option>
    </select>
    <table id="payStub">
      <thead>
        <tr>
          <th class="header earningReportHeader" colspan="3">EARNINGS REPORT</th>
        </tr>
        <tr>
          <th class="header nameHeader" colspan="3">{{fullName}}</th>
        </tr>
        <tr>
          <th class="minorHeader">Employee ID</th>
          <th class="minorHeader">Period Ending</th>
          <th class="minorHeader">Pay Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{selectedEmployee}}</td>
          <td>{{getStartDate(weekNumber)}}</td>
          <td>{{getEndDate(weekNumber)}}</td>
        </tr>
        <tr>
          <th class="minorHeader">Wage</th>
          <th class="minorHeader">Hours</th>
          <th class="minorHeader">Current Total</th>
        </tr>
        <tr>
          <td>{{wage}}</td>
          <td>{{totalHours}}</td>
          <td>{{currentTotal}}</td>
        </tr>
      </tbody>
    </table>    
    <br>
    <div class="printPaystub">
      <button v-print="'#payStub'">Print</button>
    </div>
    <br>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'GeneratePaystub',
  data: function () {
    return {
      employees: [],
      selectedEmployee: 0,
      fullName: '',
      wage: 0,
      weekNumber: 0,
      startOfWeek: 0,
      endOfWeek: 0,
      totalHours: 0,
      currentTotal: 0
    }
  },
  methods: {
    refreshPaystub() {
      for(let i = 0; i < this.employees.length; i++) {
        if(this.employees[i].value === this.selectedEmployee) {
          this.fullName = this.employees[i].text
          this.wage = this.employees[i].wage
          break;
        }
      }
      this.retrieveWeekTimeEntries()
    },
    getStartDate(weekNumber) {
      return new Date(moment().year((new Date()).getFullYear()).isoWeek(weekNumber).startOf('isoweek')).toDateString()
    },
    getEndDate(weekNumber) {
      return new Date(moment().year((new Date()).getFullYear()).isoWeek(weekNumber).endOf('isoweek')).toDateString()
    },
    defaultOr(x) {
      return x === undefined ? 0 : x
    },
    getTotal() {
      if(this.weekHours.length == 0)
      {
        return 0;
      }
      else
      {
        return this.weekHours.reduce((previous, next) => this.defaultOr(previous) + this.defaultOr(next))
      }
    },
    retrieveWeekTimeEntries() {
      this.$http.post('/api/timeEntry/retrieveWeekTimeEntries', {userId: this.selectedEmployee, weekNumber: this.weekNumber, startOfWeek: this.startOfWeek, endOfWeek: this.endOfWeek})
      .then((res) => {
        this.weekHours = res.data
        if(this.weekHours.length === 0)
        {
          this.weekHours = [0,0,0,0,0,0,0]
        }
        this.totalHours = this.getTotal()
        this.currentTotal = this.totalHours * this.wage
      })
    },
    getEmployees() {
      this.$http.get('/api/users')
      .then(res => {
        let data = res.data
        this.employees = []
        for(let i = 0; i < data.length; i++)
        {
          let employeeName = data[i].first_name + " " + data[i].last_name
          let employeeId = `${data[i].user_id}`
          let employeeWage = data[i].wage
          this.employees.push({text: employeeName, value: employeeId, wage: employeeWage})
        }
        this.selectedEmployee = this.employees[0].value
        this.fullName = this.employees[0].text
        this.wage = this.employees[0].wage

        this.weekNumber = moment().isoWeek()
        this.startOfWeek = new Date(moment().year((new Date()).getFullYear()).isoWeek(this.weekNumber).startOf('isoweek')).getDate()
        this.endOfWeek = new Date(moment().year((new Date()).getFullYear()).isoWeek(this.weekNumber).endOf('isoweek')).getDate()
      
        this.refreshPaystub()
      })
    }
  },
  mounted() {
    this.getEmployees()
  }
}
</script>

<style scoped>
  .employeeSelection {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 30px;
    width: 150px;
    padding: 3px;
  }

  td {
    padding-top: 5px;
    padding-bottom: 10px;
    padding-left: 10px;
  }

  table {
    border: 1px solid black;
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .header {
    height: 40px;
    text-align: left;
    padding-left: 10px;
  }

  .minorHeader {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    text-align:left;
  }

  .earningReportHeader {
    background-color: grey;
    color: white;
  }

  .nameHeader {
    border-bottom: 1px solid black;
  }

  .printPaystub {
    text-align: center;
  }
</style>