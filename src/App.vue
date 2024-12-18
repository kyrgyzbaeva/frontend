<template>
  <div id="app">
    <h1>Diary App</h1>
    <router-link to="/login">Login</router-link> | 
    <router-link to="/register">Register</router-link>
    <router-view />
  </div>
</template>
  
  <script>
  export default {
    name: "App",
  };
  </script>
  
  <style>
  /* Добавьте базовые стили */
  body {
    margin: 0;
    font-family: Arial, sans-serif;
  }
  </style>