<template>
  <div v-if="user.user_id !== 0">
    Welcome, {{user.first_name}}!
    <button @click="logout">Log out</button>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    user: {
      type: Object,
      default: () => {return {user_id: 0, first_name: ''}}
    }
  },
  created() {

  },
  methods: {
    logout() {
      this.$emit('logout')
    }
  }
}
</script>

<style scoped>

</style>