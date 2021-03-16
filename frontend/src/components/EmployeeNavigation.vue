<template>
  <div>
    <span class="title">TaskMaster</span>
    <a href="/test/" class="signOut">Sign Out</a>
    <span class="userName">{{name}}</span>
    <div class="topnav">
      <nav>
          <a href="/#/">Home</a>
          <a href="/#/employeeTimeEntry">Time Entry</a>
          <a href="/#/employeeManageTimeOff">Manage Time Off</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmployeeNavigation',
  data: function () {
    return {
      name: "Adrian Barsi"
    }
  }
}
</script>

<style scoped>
.title {
  text-align: left;
  font-size: 24px;
}
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

.topnav a {
  float: left;
  color: black;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: white;
}

.topnav a.active {
  background-color: #4CAF50;
  color: white;
}
</style>
