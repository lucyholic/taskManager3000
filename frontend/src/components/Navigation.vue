<template>
  <div>
    <img src='../assets/TaskMaster_Logo.png'>
    <button v-if="user" @click="logout" class="signOut">Sign Out</button>
    <span v-if="user" class="userName">{{user.first_name}} ({{user.department}})</span>
    <div class="topnav">
      <nav>
        <router-link class="navLink" to="/">Home</router-link>
        <router-link v-if="user" class="navLink" to="/timeSummary">Time Summary</router-link>
        
        <router-link v-if="user && user.type_id !== 2" class="navLink" to="/timeOff">Manage Time Off</router-link>
        <router-link v-if="user && user.type_id === 2" class="navLink" to="/manageTimeOff">Manage Time Off</router-link>
        
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
.userName {
  float:right;
  margin-right: 10px;
}
.signOut {
  float:right;
  margin-right:30px;
}

.topnav {
  background-color: #d3d3d3;
  overflow: hidden;
  margin-top: 20px;
  margin-right: 30px;
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
