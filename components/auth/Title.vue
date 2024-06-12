<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <div class="title__container">
    <NuxtLink to="/">&larr; Back to Home</NuxtLink>
    <div class="label__container">
      <h1>{{ label }}</h1>
      <AppLogo />
    </div>
  </div>
</template>

<style scoped>
.title__container {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.title__container a {
  font-size: 0.75rem;
}

.label__container {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  gap: 0.75rem;
}

.label__container img {
  align-self: center;
}

.label__container h1 {
  margin-bottom: 0;
}
</style>
