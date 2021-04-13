<template>
  <div>
    <h2 class="pageTitle">Manage Employees</h2>
    <table class="usersTable">
      <thead>
        <tr>
          <th>ID</th>
          <th>Department</th>
          <th>Name</th>
          <th>Type</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="el in users" :key="el.user_id">
          <td>{{el.user_id}}</td>
          <td>{{el.department}}</td>
          <td>{{el.first_name}} {{el.last_name}}</td>
          <td>{{el.type}}</td>
          <td><button @click="showModal(el.user_id)">Edit</button></td>
        </tr>
      </tbody>
    </table>
    <div style="text-align:center;margin-top:15px;">
      <button @click="showModal(0)">Add User</button>
    </div>
    <user-form-modal v-if="showForm" :key="modalKey" :user-id="userId" @close="closeModal"></user-form-modal>
  </div>
</template>
<script>
import UserFormModal from "@/components/UserFormModal"
export default {
  name: "ManageUser",
  components: {
    userFormModal: UserFormModal
  },
  data: function () {
    return {
      users: [],
      showForm: false,
      modalKey: 1,
      userId: 0,
    }
  },
  props: {
    user: {
      type: Object,
      default: () => {return null}
    }
  },
  created() {
    if (this.user.user_type !== 'Administrator') {
      this.$router.replace({name: 'Home'})
    }

    this.getAllUsers()
  },
  methods: {
    getAllUsers() {
      this.$http.get('/api/users').then((res) => {
        this.users = res.data
      })
    },
    showModal(userId) {
      this.modalKey++
      this.userId = userId
      this.showForm = true
    },
    closeModal() {
      this.userId = 0
      this.getAllUsers()
      this.showForm = false
      this.modalKey++
    }
  },
}
</script>
<style scoped>
  .usersTable {
      border-collapse: collapse;
      min-width: 1000px;
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
      margin-left: auto;
      margin-right: auto;
      margin-top: 40px;
  }

  .usersTable thead tr {
    background-color: #d3d3d3;
    text-align: left;
  }

  .usersTable th,.usersTable td {
    padding: 12px 17px;
    text-align: center;
  }

  .usersTable tbody tr {
    border-bottom: thin solid #dddddd;
  }

  tbody {
	  background-color: white;
  }
</style>