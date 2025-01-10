<template>
    <div>
        <div
            class="fixed top-0 left-0 right-0 bg-gray-700 grid grid-cols-3 py-2 items-center px-4 z-10 dark:bg-gray-800">
            <div class="flex items-center justify-start">
                <router-link to="/" class="inline-block mr-2">
                    <!-- <i class="fa-solid fa-futbol fa-xl pl-10"></i> -->
                    <i class="fa-solid fa-arrow-left"></i>
                </router-link>
            </div>

            <!-- Center Section: Search Bar -->
            <div class="flex items-center justify-center w-full">
                <!-- <Darkmode class="darkmode hidden sm:inline-block w-80 dark:bg-gray-900" /> -->
                <div class="text-center">
        {{ isLoggedIn ? `Welcome, ${loggedInUserName}` : "Please login" }}
      </div>
            </div>

            <div class="flex items-center justify-end space-x-1">
                <button v-if="isLoggedIn" @click="confirmLogout"
                    class="bg-blue-700 hover:bg-cyan-500 text-white font-bold w-40 py-1 px-4 rounded dark:bg-gray-900">
                    <p>Logout</p>
                </button>
                <!-- <button v-else @click="toggleLoginModal"
                    class="bg-blue-400 hover:bg-cyan-500 text-white font-bold w-40 py-1 px-4 rounded dark:bg-gray-900">
                    <p>Login</p>
                </button> -->
            </div>
        </div>
    </div>
</template>