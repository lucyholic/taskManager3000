<template>
  <div>
    <div v-if="user.user_id === 0">
      show sign in
      <button @click="login">Login</button>
    </div>
    <div v-else>
      dashboard
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
      userData: {}
    }
  },
  created() {
    
  },
  methods: {
    login() {
      this.userData = {
        "user_id": 1,
        "first_name": "Lucy",
        "last_name": "Kim",
        "login_name": "lkim",
        "login_password": "secret",
        "department_id": 1,
        "user_type_id": 1
      }

      this.$emit('login', this.userData)
    }
  },
}
</script>

<style scoped>

</style>