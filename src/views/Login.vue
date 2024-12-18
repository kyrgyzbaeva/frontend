<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      async loginUser() {
        try {
          const response = await axios.post('https://your-backend-url.com/auth/login', {
            email: this.email,
            password: this.password,
          });
          console.log('User logged in', response.data);
          // Save the token in localStorage or a global state
        } catch (error) {
          console.error('Error logging in user:', error);
        }
      },
    },
  };
  </script>