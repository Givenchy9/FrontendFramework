<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
        <form @submit.prevent="handleLogin">
          <div class="mb-4">
            <label
              for="username"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              v-model="username"
              placeholder="Enter your username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <div class="mb-6">
            <label
              for="password"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
  
          <button
            type="submit"
            class="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
  
        <p
          v-if="errorMessage"
          class="mt-4 text-sm text-red-500 text-center font-medium"
        >
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // User list (from JSON or other source)
  const users = [
    { id: 1, name: "123", password: "123" },
    { id: 2, name: "john_doe", password: "jd2023secure" },
    { id: 3, name: "jane_smith", password: "jsmith!987" },
    { id: 4, name: "michael_b", password: "mike#2023" },
    { id: 5, name: "emily_w", password: "emily_secure88" },
    { id: 6, name: "chris_t", password: "chrisT@2023" },
    { id: 7, name: "sarah_j", password: "sarah1234" },
    { id: 8, name: "david_k", password: "davidk#567" },
    { id: 9, name: "laura_m", password: "laura!999" },
    { id: 10, name: "steven_p", password: "steven2023" }
  ];
  
  // Form fields and state
  const username = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();
  
  const handleLogin = () => {
    const user = users.find(u => u.name === username.value && u.password === password.value);
  
    if (user) {
      // Store the user's token and name in localStorage
      const token = btoa(`${user.name}:${new Date().toISOString()}`); // Generate a mock token
      localStorage.setItem('authToken', token);
      localStorage.setItem('authUserName', user.name);
  
      // Redirect to home page
      router.push('/');
    } else {
      errorMessage.value = 'Invalid username or password.';
    }
  };
  </script>
  
  
  <style scoped>
  /* Optional styles for better appearance */
  </style>
  