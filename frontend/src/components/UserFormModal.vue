<template>
  <modal name="userForm" class="userForm" width="600" height="500" v-bind:clickToClose="false">
    <button class="closeButton" v-on:click="hide()">&#10006;</button>
    <div class="pageTitle">{{title}}</div>
	  <div>
      <label for="firstName">First Name: </label>
      <input type="text" id="firstName" v-model="userData.first_name">
	  </div>
	  <div>
      <label for="lastName">Last Name: </label>
      <input type="text" id="lastName" v-model="userData.last_name">
	  </div>
	  <div>
      <label for="loginName">Login Name: </label>
      <input type="text" id="loginName" v-model="userData.login_name">
		<div v-show="loginNameError !== ''">{{loginNameError}}</div>
	  </div>
	  <div>
      <label for="password">Password: </label>
      <input type="text" id="password" v-model="userData.login_password">
	  </div>
	  <div>
      <label for="department">Department: </label>
      <select id="department" v-model="userData.department_id">
        <option v-for="el in departments" :key="el.department_id" :value="el.department_id" :label="el.department"></option>
      </select>
	  </div>
	  <div>
      <label for="employeeType">Employee Type: </label>
      <select id="employeeType" v-model="userData.type_id">
        <option v-for="el in employeeTypes" :key="el.type_id" :value="el.type_id" :label="el.type"></option>
      </select>
	  </div>
	  <div>
      <label for="wage">Wage: </label>
      <input type="text" id="wage" v-model="userData.wage">
	  </div>
	  <button :disabled="disableButton" @click="saveUser">{{title}}</button>
  </modal>
</template>

<script>
export default {
  props: {
    userId: {
      default: 0,
      type: Number
    },
  },
  data() {
    return {
      title: '',
      userData: {
        user_id: 0,
        first_name: '',
        last_name: '',
        login_name: '',
        login_passwrd: 'secret',
        department_id: 0,
        type_id: 0,
        wage: 0.00,
      },
      loginNameError: '',
      successMessage: '',
      departments: [],
      employeeTypes: [],
      userNames: [],
      computedLoginName: '',
    }
  },
  watch: {
    computedLoginName(val) {
      this.userData.login_name = val
    },
    "userData.first_name": function(val) {
      if (val !== '') {
        this.getLoginName()
      }
    },
    "userData.last_name": function(val) {
      if (val !== '') {
        this.getLoginName()
      }
    }
  },
  computed: {
    disableButton() {
      const duplicatedLoginName = this.userNames.find(el => el.login_name === this.userData.login_name && el.user_id !== this.userId)

      if (duplicatedLoginName) {
        this.loginNameError = 'Duplicated login name'
      } else {
        this.loginNameError = ''
      }

      if (this.userData.first_name === '' || this.userData.last_name === '' || this.userData.login_name === '' || this.userData.login_password === ''
        || duplicatedLoginName || this.userData.department_id === 0 || this.userData.type_id === 0) {
          return true
        }

      return false
    }
  },
  created() {
    if (this.userId === 0) {
      this.title = 'Add User'
    } else {
      this.title = "Update User"
    }

    this.computedLoginName = this.userData.login_name

    this.getDepartments()
    this.getEmployeeTypes()
    this.getUserNames()
    this.getUserData()
  },
  mounted() {
    this.$modal.show('userForm')
  },
  methods: {
    getUserData() {
      if (this.userId !== 0) {
        this.$http.get('/api/users/' + this.userId).then((res) => {
          this.userData = res.data[0]
        })
      }
    },
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
      console.log(this.userId, this.userData);
      if (this.userId === 0) {
        this.$http.post('/api/users/add', {user: this.userData}).then((res) => {
          if (res.data) {
            this.hide()
          }
        })
      } else {
        this.$http.put('/api/users/' + this.userId, {user: this.userData}).then((res) => {
          if (res.data) {
            this.hide()
          }
        })
      }
    },
    hide() {
      this.$modal.hide('userForm')
      this.$emit('close')
    },
    getLoginName() {
      let output = ''
      if (this.userData.first_name !== '' && this.userData.last_name !== '') {
        output = (this.userData.first_name.substring(0, 1) + this.userData.last_name).toLowerCase()
      }
      this.computedLoginName = output
    }
  },
}
</script>

<style scoped>
.userForm {
	text-align: center;
	margin: 10px 0px 20px 20px;
}

input {
	margin: 10px;
}

select {
	margin: 10px;
}

button {
	margin-top: 10px;
}

.closeButton {
    color: black;
    font-size: 15px;
    float: right;
    margin-top: 10px;
    background-color:white;
    width: 30px;
    margin-right: 20px;
}
</style>