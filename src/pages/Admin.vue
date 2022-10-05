<template>
  <div class="admin-page">
    <div class="create-user">
      <div class="form">
        <div class="mb-3">
          <p class="text-lg bold mb-1">Create an user</p>
        </div>
        <div class="input-group">
          <p class="input-group__label">Username*</p>
          <input v-model="username" type="text" placeholder="user1" class="input-group__input">
        </div>
        <div class="input-group">
          <p class="input-group__label">Password*</p>
          <input v-model="password" type="password" placeholder="password1" class="input-group__input">
        </div>
        <div class="input-group mb-0">
          <input v-model="isAdmin" type="checkbox">
          <span> Admin</span>
        </div>
        <Button @submit="createUser">Create</Button>
      </div>
    </div>

    <div class="table-scroll-x">
      <table>
        <tr>
          <th>ID</th>
          <th class="grow">Username</th>
          <th>Role</th>
          <th>Last login</th>
          <th></th>
        </tr>
        <tr v-for="(user, index) in users" :key="index">
          <td>
            <p>{{ user.id }}</p>
          </td>
          <td>
            <p>{{ user.username }}</p>
          </td>
          <td>
            <p>{{ user.role }}</p>
          </td>
          <td>
            <p>{{ user.lastLogin }}</p>
          </td>
          <td>
            <Button @submit="deleteUser(user)">Delete</Button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {CREATE_USER, DELETE_USER, FETCH_USERS} from "@/store/actions.type";
import {mapGetters} from "vuex";
import Button from "@/components/Button";

export default {
  name: "Admin",
  components: {Button},
  data() {
    return {
      username: null,
      password: null,
      isAdmin: false
    }
  },
  async created() {
    await this.$store.dispatch(FETCH_USERS)
  },
  methods: {
    createUser() {
      this.$store.dispatch(CREATE_USER, {
        username: this.username,
        password: this.password,
        role: this.isAdmin ? 'admin' : 'user'
      }).then(() => {
        this.username = null
        this.password = null
        this.isAdmin = false
      })
    },
    deleteUser(user) {
      this.$store.dispatch(DELETE_USER, user.id)
    }
  },
  computed: {
    ...mapGetters(['users'])
  }
}
</script>