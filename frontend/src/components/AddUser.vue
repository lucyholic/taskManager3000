<template>
<div>
  <div>Add User</div>
  <div>
    <label for="firstName">First Name: </label>
    <input type="text" id="firstName" v-model="newUser.firstName">
  </div>
  <div>
    <label for="lastName">Last Name: </label>
    <input type="text" id="lastName" v-model="newUser.lastName">
  </div>
  <div>
    <label for="loginName">Login Name: </label>
    <input type="text" id="loginName" v-model="newUser.loginName">
    <div v-show="loginNameError !== ''">{{loginNameError}}</div>
  </div>
  <div>
    <label for="password">Password: </label>
    <input type="text" id="password" v-model="newUser.password">
  </div>
  <div>
    <label for="department">Department: </label>
    <select id="department" v-model="newUser.department">
      <option v-for="el in departments" :key="el.department_id" :value="el.department_id" :label="el.department"></option>
    </select>
  </div>
  <div>
    <label for="employeeType">Employee Type: </label>
    <select id="employeeType" v-model="newUser.employeeType">
      <option v-for="el in employeeTypes" :key="el.type_id" :value="el.type_id" :label="el.type"></option>
    </select>
  </div>
  <div>
    <label for="wage">Wage: </label>
    <input type="text" id="wage" v-model="newUser.wage">
  </div>
  <button :disabled="disableButton" @click="saveUser">Add</button>
  <div v-show="successMessage !== ''"> {{successMessage}} </div>
</div>
</template>

<script>
export default {
  name: "AddUser",
  props: {
    user: {
      type: Object,
      default: () => {return null}
    }
  },
  data() {
    return {
      newUser: {
        firstName: '',
        lastName: '',
        loginName: '',
        password: 'secret',
        department: 0,
        employeeType: 0,
        wage: 0.00,
      },
      loginNameError: '',
      successMessage: '',
      departments: [],
      employeeTypes: [],
      userNames: [],
    }
  },
  watch: {
    computedLoginName(val) {
      this.newUser.loginName = val
    }
  },
  computed: {
    computedLoginName() {
      let output = ''
      if (this.newUser.firstName !== '' && this.newUser.lastName !== '') {
        output = (this.newUser.firstName.substring(0, 1) + this.newUser.lastName).toLowerCase()
      }
      return output
    },
    disableButton() {
      const duplicatedLoginName = this.userNames.find(el => el.login_name === this.user.loginName)

      if (duplicatedLoginName) {
        this.loginNameError = 'Duplicated login name'
      } else {
        this.loginNameError = ''
      }

      if (this.newUser.firstName === '' || this.newUser.lastName === '' || this.newUser.loginName === '' || this.newUser.password === ''
        || duplicatedLoginName || this.newUser.department === 0 || this.newUser.employeeType === 0) {
          return true
        }

      return false
    }
  },
  created() {
    if (this.user.type !== 'Administrator') {
      this.$router.replace({name: 'Home'})
    }
    this.getDepartments()
    this.getEmployeeTypes()
    this.getUserNames()
  },
  methods: {
    getDepartments() {
      this.$http.get('/api/departments').then((res) => {
        this.departments = res.data
      })
    },
    getEmployeeTypes() {
      this.$http.get('/api/employeeTypes').then((res) => {
        this.employeeTypes = res.data
      })
    },
    getUserNames() {
      this.$http.get('/api/users').then((res) => {
        this.userNames = res.data
      })
    },
    saveUser() {
      this.$http.post('/api/users/add', {user: this.newUser}).then((res) => {
        if (res.data) {
          this.newUser = {
            firstName: '',
            lastName: '',
            loginName: '',
            password: 'secret',
            department: 0,
            employeeType: 0,
            wage: 0.00,
          }
          this.successMessage = "New user added"
        }
      })
    },
  },
}
</script>

<style scoped>

</style>