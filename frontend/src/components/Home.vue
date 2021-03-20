<template>
  <div>
    <div v-if="user.user_id === 0">
      <div>
        <label for="name">Login Name:</label>
        <input type="text" v-model="loginName" name="name">
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="text" v-model="password" name="password">
      </div>
      <button @click="login">Login</button>
      <div class="error">{{errorMsg}}</div>
    </div>
    <div v-else>
      <p class="applicationDescription">Welcome to TaskMaster! Here you can <br> enter your hours and manage your time <br> off requests. You currently have <br> employee privledges. </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    user: {
      type: Object,
      default: () => {return {}}
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
        console.log(res.data)
        if (res.data) {
          this.errorMsg = ''
          this.userData = res.data
          this.$emit('login', this.userData)
        } else {
          this.errorMsg = "Login name or password is incorrect"
          this.loginName = ''
          this.password = ''
        }
      })
    }
  },
}
</script>

<style scoped>
.applicationDescription {
  text-align: center;
  font-size: 20px;
  margin-top: 40px;
}
</style>