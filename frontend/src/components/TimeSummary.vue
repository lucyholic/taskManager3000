<template>
  <div v-if="user">
    <h2 class="pageTitle">Time Summary</h2>
    <div class="userData">
      <label>Name:</label>
      <input disabled type="text" v-model="fullName">
      <label>Department:</label>
      <input disabled type="text" v-model="user.department">
    </div>

    <div>
      <div v-for="el in entries" :key="el.time_log_id">{{el.type}}: {{el.time_stamp}}</div>
    </div>



    <!-- <div class="center">
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
    </form> -->
  </div>
</template>

<script>
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
      dateStart: new Date("March 14 2021"),
      dateEnd: new Date("March 20 2021"),
      dayShortForms: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      entries: []
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
  },
  created() {
    this.getTimeEntries()
  },
  methods: {
    getTimeEntries() {
      this.$http.get('/api/timeEntry/' + this.user.user_id).then((res) => {
        if (res.status === 200) {
          this.entries = res.data
        }
      })
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