<script setup lang="ts">
useHead({ title: "Home" });
</script>

<template>
  <div class="space-x-2">
    <UButton color="primary" variant="solid" to="/login"> Login </UButton>
    <UButton color="primary" variant="solid" to="/register"> Register </UButton>
  </div>
</template>
