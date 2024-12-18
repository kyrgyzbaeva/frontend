<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="email" type="email" placeholder="Enter your email" />
        <input v-model="password" type="password" placeholder="Enter your password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      handleRegister() {
        if (!this.email || !this.password) {
          alert("Please fill in both fields");
          return;
        }
  
        // Отправляем запрос на регистрацию
        this.$axios.post('https://backendnodejs-production-8ed1.up.railway.app/auth/register', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log('Registered successfully!', response.data);
          // Направьте на страницу логина или домашнюю страницу
          this.$router.push('/login');
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
      }
    }
  };
  </script>