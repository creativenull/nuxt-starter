<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({ error: Object as () => NuxtError });

const handleError = () => clearError({ redirect: "/" });

onMounted(() => {
  console.log({ error: props.error });
});
</script>

<template>
  <div id="global-error" class="container">
    <h2>
      Something went wrong:
      <span v-show="error?.statusCode === 404">{{ error?.statusCode }} Not Found</span>
      <span v-show="error?.statusCode === 403">{{ error?.statusCode }} Not Authorized</span>
      <span v-show="error?.statusCode === 401">{{ error?.statusCode }} Not Authorized</span>
    </h2>
    <button @click="handleError">Go Home</button>
  </div>
</template>

<style scoped>
#global-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
