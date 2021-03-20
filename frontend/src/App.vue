<template>
  <div id="app">
    <navigation :user="user" :key="menuKey" @logout="logout"></navigation>
    <router-view :user="user" @login="login"></router-view>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation' 
export default {
  name: 'App',
  components: {
    navigation: Navigation
  },
  data() {
    return {
      user: {user_id: 0, first_name: ''},
      menuKey: 1,
      defaultUser: {user_id: 0, first_name: ''},
    }
  },
  methods: {
    login(user) {
      this.user = user
      this.menuKey++
    },
    logout() {
      this.user = this.defaultUser
      this.menuKey++
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 30px;
  margin-left: 30px;
}
.pageTitle {
    margin-top: 40px;
    text-align: center;
}

button {
  padding:10px;
  border:none;
  color:#fff;
  font-weight:600;
  border-radius:7px;
  width: 100px;
}

input {
  padding: 3px;
  padding-left: 10px;
  border: 2px solid #D3D3D3;
  border-radius:10px;
}

input:focus {
  outline-width: 0;
}

</style>
