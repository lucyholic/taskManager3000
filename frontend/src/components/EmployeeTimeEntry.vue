<template>
  <div>
    <h2 class="pageTitle">Time Entry</h2>
    <div class="userData">
      <label>Name:</label>
      <input disabled type="text" v-model="name">
      <label>Department:</label>
      <input disabled type="text" v-model="department">
      <label>Employee ID:</label>
      <input disabled type="text" v-model="employeeNumber">
    </div>
    <div class="center">
      <button class="chevron"><img src="../assets/leftChevron.png" /></button>
      <span class="weekRange">{{dateStart.toDateString()}} to {{dateEnd.toDateString()}}</span>
      <button class="chevron"><img src="../assets/rightChevron.png" /></button>
    </div>
    <form class="weekFields">
      <div v-for="date in dateRange" :key="date.id">
        <label>{{dayShortForms[date.getDay()]}} {{date.getDate()}}</label>
        <input v-bind:name="dayShortForms[date.getDay()]"/>
      </div>
      <div>
        <label>Total</label>
        <input disabled />
      </div>
      <div class="formOperations">
        <button type="submit" class="submit">Submit</button>
        <button type="reset" class="reset">Reset</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'EmployeeTimeEntry',
  data: function () {
    return {
      name: "Adrian Barsi",
      department: "I.T",
      employeeNumber: "123123",
      dateStart: new Date("March 14 2021"),
      dateEnd: new Date("March 20 2021"),
      dayShortForms: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  },
  computed: {
    dateRange: function() {
      let dateRange = [];
      for (let i = 0; i <= 6; i++) {
        let newDate = new Date(this.dateStart.toDateString())
        newDate.setDate(this.dateStart.getDate() + i)
        dateRange.push(newDate)
      }
      return dateRange
    }
  }
}
</script>

<style scoped>
  .userData {
    text-align: center;
    margin-top: 40px;
  }
  .userData label {
    margin-right: 20px;
  }
  .userData input {
    margin-right: 50px;
  }
  .chevron {
    background-color: white;
    border: none;
    margin-left: 10px;
    margin-right: 10px;
  }
  .center {
    margin: 0;
    position: absolute;
    top: 42%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .weekRange {
    font-size: 20px;
  }

  .weekFields {
    margin-top: 110px;
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
</style>