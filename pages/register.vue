<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
</script>

<template>
  <main>
    <div class="container overflow-auto">
      <div class="title__container">
        <img width="40" height="40" src="/logo.svg" alt="Company Logo" />
        <h1>Register</h1>
      </div>

      <div v-if="$route.query.exists" class="error__container">
        User already registered
      </div>

      <form method="POST">
        <input
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Name"
          :value="$route.query.name ?? ''"
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          :value="$route.query.email ?? ''"
          required
        />

        <div v-if="$route.query.password_mismatch" class="error__container">
          Password did not match
        </div>

        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />

        <div v-if="$route.query.password_mismatch" class="error__container">
          Password did not match
        </div>

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          required
        />
        <button type="submit">Register</button>
        <hr />
        <div class="auth__container">
          <NuxtLink href="/login">
            Already a user? Click here to login!
          </NuxtLink>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error__container {
  font-size: 0.75rem;
  color: #d93526;
  border: 1px solid #d93526;
  padding: 0.5rem;
  margin: 0.75rem 0;
  border-radius: 0.25rem;
}

.title__container {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  gap: 0.75rem;
}

.title__container > img {
  align-self: center;
}

.title__container > h1 {
  margin-bottom: 0;
}

.auth__container {
  text-align: center;
}

@media (min-width: 1280px) {
  .container {
    max-width: 500px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 500px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 500px;
  }
}
</style>
