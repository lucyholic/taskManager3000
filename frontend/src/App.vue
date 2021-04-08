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
      user: null,
      menuKey: 1,
    }
  },
  created() {
    if (!this.user) {
      this.$router.replace({name: 'Home'})
    }
  },
  methods: {
    login(user) {
      this.user = user
      this.menuKey++
    },
    logout() {
      this.user = null
      this.menuKey++
      this.$router.push({name: 'Home'})
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
  background-color: #F3F8F2;
}

body {
	border: 2px solid black;
	background-color: #3581B8;
	margin: 20px 0px 0px 20px;
}

.pageTitle {
    margin-top: 20px;
    text-align: center;
}

button {
  padding:10px;
  border:none;
  color:#fff;
  background-color: #FCB07E;
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

.copyright {
	text-align: right;
	font-size: 14px;
	padding: 10px 5px 5px 0px;
	margin: 0px;
}

</style>
