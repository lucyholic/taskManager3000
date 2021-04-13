<template>
  <div>
    <div v-if="!user">
      <div>
        <label for="name">Login Name:</label>
        <input type="text" v-model="loginName" name="name">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="text" v-model="password" name="password">
      </div>
	  
      <div class="error">{{errorMsg}}</div>
      <button @click="login">Login</button>
    </div>
    <div v-else>
      <dashboard :user="user" @punch="punch"></dashboard>
    </div>
  </div>
</template>

<script>
import Dashboard from '@/components/Dashboard'
export default {
  name: "Home",
  components: {
    dashboard: Dashboard
  },
  props: {
    user: {
      type: Object,
      default: () => {return null}
    }
  },
  data() {
    return {
      loginName: '',
      password: '',
      userData: {},
      errorMsg: '',
    }
  },
  created() {

  },
  methods: {
    login() {
      this.$http.post('/api/users/login', {
        loginName: this.loginName, 
        password: this.password
      }).then((res) => {
        if (res.data) {
          this.errorMsg = ''
          this.loginName = ''
          this.password = ''
          this.userData = res.data
          this.$emit('login', this.userData)
        } else {
          this.errorMsg = "Login name or password is incorrect"
          this.loginName = ''
          this.password = ''
        }
      })
    },
    punch(status) {
      this.$emit('punch', status)
    }
  },
}
</script>

<style scoped>

label {
	margin-left: 20px;
}

input{	
	margin-top: 5px;
	margin-left: 5px;
}

.error {
	color: red;
	margin-top: 5px;
	margin-left: 20px;
	font-size: 15px;
}

button {
	margin: 10px 20px;
}

</style>