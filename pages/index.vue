<template>
  <AppHeader />

  <main>
    <div class="intro">
      <AppLogo size="large" />
      <h1>{{ $config.public.appName }}</h1>
    </div>
  </main>
</template>

<style scoped>
.link {
  display: flex;
  gap: 0.5rem;
}

main {
  height: calc(100vh - 80px);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.intro {
  text-align: center;
}
</style>
