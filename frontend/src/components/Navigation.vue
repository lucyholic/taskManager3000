<template>
  <div>
	<img class="title" src='../assets/taskMasterLogo.png'
	width="250"
	height="50">
    <button v-if="user" @click="logout" class="signOut">Sign Out</button>
    <span v-if="user" class="userName">{{user.first_name}} ({{user.department}})</span>
    <div class="topnav">
      <nav>
        <router-link class="navLink" to="/">Home</router-link>
        <router-link v-if="user" class="navLink" to="/timeSummary">Time Summary</router-link>
        <router-link v-if="user" class="navLink" to="/timeOff">Manage Time Off</router-link>
        <router-link v-if="user && user.type_id === 1" class="navLink" to="/addUser">Admin Menu</router-link>
        <router-link v-if="user && user.type_id === 2" class="navLink" to="/">Manager Menu</router-link>
        <router-link v-if="user && user.department_id === 1" class="navLink" to="/">HR Menu</router-link>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    user: {
      type: Object,
      default: () => {return null}
    }
  },
  data() {
    return {
    }
  },
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>

.title {
	margin-top: 10px;
	margin-left: 10px;
}

.userName {
  float:right;
  margin-top: 20px;
  margin-right: 10px;
}

.signOut {
  float:right;
  margin-top: 10px;
  margin-right: 10px;
}

.topnav {
  background-color: #EBE9E9;
  overflow: hidden;
  border: 2px solid black;
  border-radius: 20px;
  margin: 10px 10px 10px 10px;
}

.topnav .navLink {
  float: left;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav .navLink:hover {
  background-color: white;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}
</style>
