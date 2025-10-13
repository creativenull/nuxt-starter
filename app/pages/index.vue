<script setup lang="ts">
useHead({ title: "Home" });
const { loggedIn, clear } = useUserSession();
</script>

<template>
  <UContainer>
    <div class="space-x-2">
      <UButton v-if="!loggedIn" color="primary" variant="solid" to="/login"> Login </UButton>
      <UButton v-if="!loggedIn" color="primary" variant="solid" to="/register"> Register </UButton>
      <UButton v-if="loggedIn" color="primary" variant="solid" @click="clear"> Logout </UButton>
    </div>
  </UContainer>
</template>
