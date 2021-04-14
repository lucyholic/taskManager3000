<template>
  <div>
    <h2 class="pageTitle">Time Summary</h2>
    <div v-if="user && user.user_type_id !== 3">
      <select class="employeeSelection" @change="refreshHours()" v-model="selectedEmployee">
        <option v-for="employee in employees" v-bind:value="employee.value" :key="employee.value">
          {{employee.text}}
        </option>
      </select>
    </div>

    <div :class="user && user.user_type_id !== 3 ? 'center' : 'center top'">
      <button class="chevron" v-on:click="getPreviousWeek()"><img src="../assets/leftChevron.png" /></button>
      <span class="weekRange">{{this.getStartDate(weekNumber)}} to {{this.getEndDate(weekNumber)}}</span>
      <button class="chevron" v-on:click="getNextWeek()"><img src="../assets/rightChevron.png" /></button>
    </div>
    <div class="weekFields">
      <div v-for="(hour, index) in weekHours" :key="`hour-${index}`">
        <label>{{dayShortForms[index]}} {{startOfWeek + index}}</label>
        <input disabled v-bind:value="hour"/>
      </div>
      <div>
        <label>Total</label>
        <input disabled v-bind:value="getTotal()"/>
      </div>
    </div>
  </div>
</template>

<script>

import moment from 'moment'

export default {
  name: 'TimeSummary',
  props: {
    user: {
      type: Object,
      default: () => {return null}
    }
  },
  data() {
    return {
      fullName: this.user.first_name + ' ' + this.user.last_name,
      department: this.user.department,
      dayShortForms: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      weekNumber: 0,
      maxWeekNumber: 0,
      startOfWeek: 0,
      endOfWeek: 0,
      weekHours: [],
      employees: [],
      selectedEmployee: this.user.user_id,
    }
  },
  created() {
    if(this.user && this.user.user_type_id === 3)
    {
      this.initialGetTimeEntry()
    }
    else
    {
      this.getEmployees()
    }
  },
  methods: {
    refreshHours() {
      this.getWeekTimeEntries()
      for(let i = 0; i < this.employees.length; i++) {
        if(this.employees[i].value === this.selectedEmployee) {
          this.fullName = this.employees[i].text
          this.department = this.employees[i].department
          break;
        }
      }
    },
    initialGetTimeEntry() {
      this.weekNumber = moment().isoWeek()
      this.maxWeekNumber = this.weekNumber
      this.getWeekTimeEntries()
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
          this.employees.push({text: employeeName, value: employeeId, department: data[i].department})
        }
        this.selectedEmployee = this.employees[0].value
        this.fullName = this.employees[0].text
        this.departent = this.employees[0].department
        this.initialGetTimeEntry()
      })
    },
    getWeekTimeEntries() {
      this.startOfWeek = new Date(moment().year((new Date()).getFullYear()).isoWeek(this.weekNumber).startOf('isoweek')).getDate()
      this.endOfWeek = new Date(moment().year((new Date()).getFullYear()).isoWeek(this.weekNumber).endOf('isoweek')).getDate()
      this.retrieveWeekTimeEntries(this.weekNumber, this.startOfWeek, this.endOfWeek)
    },
    getPreviousWeek() {
      if(this.weekNumber > 1)
      {
        this.weekNumber -= 1;
        this.getWeekTimeEntries()
      }
    },
    getNextWeek() {
      if(this.weekNumber < this.maxWeekNumber)
      {
        this.weekNumber += 1;
        this.getWeekTimeEntries()
      }
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
    getStartDate(weekNumber) {
      return new Date(moment().year((new Date()).getFullYear()).isoWeek(weekNumber).startOf('isoweek')).toDateString()
    },
    getEndDate(weekNumber) {
      return new Date(moment().year((new Date()).getFullYear()).isoWeek(weekNumber).endOf('isoweek')).toDateString()
    },
    retrieveWeekTimeEntries(weekNumber, startOfWeek, endOfWeek) {
      this.$http.post('/api/timeEntry/retrieveWeekTimeEntries', {userId: this.selectedEmployee, weekNumber: weekNumber, startOfWeek: startOfWeek, endOfWeek: endOfWeek})
      .then((res) => {
        this.weekHours = res.data
        if(this.weekHours.length === 0)
        {
          this.weekHours = [0,0,0,0,0,0,0]
        }
      })
    }
  }
}
</script>

<style scoped>

  .userData {
	text-align: center;
    padding: 20px 0px 20px 0px;
  }
  
  .userData label {
    margin-right: 20px;
  }
  
  .userData input {
    margin-right: 50px;
    color: black;
    background-color: #EBE9E9;
    border: 1px solid black;
  }
  
  .timeStamps div {
    padding: 0px 0px 20px 20px;
  }
  
  .chevron {
    background-color: #F3F8F2;
    border: none;
    margin-left: 10px;
    margin-right: 10px;
    width: 50px;
  }
  
  .center {
    margin: 0;
    position: absolute;
    top: 42%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .top {
    top: 30%;
  }

  .weekRange {
    font-size: 20px;
  }

  .weekFields {
    margin-top: 100px;
    text-align: center;
  }

  .weekFields label {
    display: inline-block;
    width:100px;
    text-align: left;
    margin-bottom: 15px;
  }

  .weekFields input {
    padding-right: 10px;
    text-align: right;
  }

  .formOperations {
    margin-top: 20px;
  }

  .submit {
    background-color:green;
    margin-right: 10px;
  }

  .reset {
    background-color: #898896
  }
  
  input {
    width: 170px;
  }

  .employeeSelection {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 120px;
    width: 150px;
    padding: 3px;
  }

  #selectEmployeeLabel {
    text-align: right;
    clear: both;
    float:left;
    margin-right:15px;
  }
</style>