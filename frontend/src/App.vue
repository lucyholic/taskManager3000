<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
