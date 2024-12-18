<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div>
          <label for="email">Email:</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="password" type="password" id="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await api.post('/auth/login', {
            email: this.email,
            password: this.password,
          });
          localStorage.setItem('token', response.data.token); // Сохранение токена
          this.$router.push('/'); // Перенаправление на главную страницу
        } catch (error) {
          this.error = 'Invalid email or password';
        }
      },
    },
  };
  </script>