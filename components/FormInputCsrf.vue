<script setup lang="ts">
const { data } = await useFetch("/api/csrf-token", {
  method: "POST",
});
</script>

<template>
  <input type="hidden" name="__csrf" :value="data" />
</template>
