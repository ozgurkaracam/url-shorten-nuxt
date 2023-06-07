<template>
  <nav class="fixed top-0 right-0 left-0">
    <div class="bg-gray-900 text-white flex h-16 border-b border-b-white">
      <div class="container flex items-center justify-between">
        <NuxtLink to="/" class="cursor-pointer text-3xl font-bold"
          >Shorten</NuxtLink
        >
        <div class="items-center flex space-x-8">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/">About</NuxtLink>
          <NuxtLink to="/dashboard" v-if="user">Dashboard</NuxtLink>
          <NuxtLink v-if="!user" to="login" class="btn">Login</NuxtLink>
          <NuxtLink v-else @click="logout" class="cursor-pointer"
            >Logout
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup lang="ts">
const user = useSupabaseUser();
const auth = useSupabaseAuthClient();
const logout = async () => {
  const { data, error } = await auth.auth.signOut();
  console.log(data);
};
</script>