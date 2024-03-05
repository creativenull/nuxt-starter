<script setup lang="ts">
const user = await useAuthUser();
</script>

<template>
  <h1>Hello World</h1>

  <div v-if="user">
    <span style="display: block">{{ user?.name }}</span>
    <span style="display: block">{{ user?.email }}</span>
  </div>

  <div v-if="!user" class="link">
    <NuxtLink href="/login">Login</NuxtLink>
    <NuxtLink href="/register">Register</NuxtLink>
  </div>

  <div v-else>
    <form action="/logout" method="POST">
      <button>Logout</button>
    </form>
  </div>
</template>

<style scoped>
.link {
  display: flex;
  gap: 0.5rem;
}
</style>
