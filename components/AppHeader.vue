<script setup lang="ts">
const user = await useAuthUser();
</script>

<template>
  <header>
    <div class="logo">
      <NuxtLink class="logo__a" href="/">
        <img
          class="logo__img"
          width="40"
          height="40"
          src="/logo.svg"
          alt="Company Logo"
        />
        <span class="logo__span">{{ $config.public.appName }}</span>
      </NuxtLink>
    </div>

    <div v-if="!user" class="user-links">
      <NuxtLink class="contrast" href="/login">Login/Register</NuxtLink>
    </div>

    <div v-else class="user-links">
      <AppHeaderUser :user />
    </div>
  </header>
</template>

<style scoped>
header {
  height: 80px;
  background-color: var(--pico-color-slate-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.75rem;
}

.logo__a {
  text-decoration: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--pico-color-slate-800);
}

.logo__span {
  font-size: 1.25rem;
}

.user-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.user-links a {
  font-size: 0.75rem;
}

.user-links button {
  font-size: 0.75rem;
  margin: 0;
  padding: 0;
  background: none;
  border: none;
  color: var(--pico-color-slate-800);
  text-decoration: underline;
}

/* Dark color scheme (Auto) */
/* Automatically enabled if user has Dark mode enabled */
@media only screen and (prefers-color-scheme: dark) {
  header {
    background-color: var(--pico-color-slate-950);
  }

  .logo__a {
    color: var(--pico-color-slate-100);
  }

  .user-links button {
    color: var(--pico-color-slate-100);
  }
}

/* Dark color scheme (Forced) */
/* Enabled if forced with data-theme="dark" */
header[data-theme="dark"] {
  background-color: var(--pico-color-slate-950);
}

header[data-theme="dark"] .logo__a {
  color: var(--pico-color-slate-100);
}

header[data-theme="dark"] .user-links button {
  color: var(--pico-color-slate-100);
}
</style>
