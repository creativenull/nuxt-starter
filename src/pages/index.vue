<script setup lang="ts">
useHead({ title: "Home" });
const { loggedIn, clear } = useUserSession();
</script>

<template>
  <div v-if="!loggedIn" class="space-x-2">
    <UButton color="primary" variant="solid" to="/login"> Login </UButton>
    <UButton color="primary" variant="solid" to="/register"> Register </UButton>
  </div>
  <div v-else class="space-x-2">
    <UButton color="primary" variant="solid" @click="clear"> Logout </UButton>
  </div>
</template>
