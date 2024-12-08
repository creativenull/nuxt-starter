<script setup lang="ts">
const appName = useRuntimeConfig().public.appName ?? "";
const titleTemplate = (titleChunk: string | undefined): string =>
  titleChunk ? `${titleChunk} - ${appName}` : appName;

useHead({ titleTemplate });
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
