<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
</script>

<template>
  <main>
    <div class="container overflow-auto">
      <div class="title__container">
        <AppLogo />
        <h1>Register</h1>
      </div>

      <form action="/register" method="POST">
        <FormInputCsrf />
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
          :aria-invalid="$route.query.exists ? true : undefined"
          aria-describedby="email-exists"
          required
        />
        <small v-if="$route.query.exists" id="email-exists">
          User with this email already exists
        </small>

        <input
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          :aria-invalid="
            $route.query.password_mismatch || $route.query.validation_failed
              ? true
              : undefined
          "
          aria-describedby="invalid-password"
          required
        />

        <small v-if="$route.query.password_mismatch" id="invalid-password">
          Passwords mismatch
        </small>
        <small
          v-else-if="$route.query.validation_failed && $route.query.reason"
          id="invalid-password"
        >
          {{ $route.query.reason }}
        </small>

        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          aria-label="Confirm Password"
          :aria-invalid="
            $route.query.password_mismatch || $route.query.validation_failed
              ? true
              : undefined
          "
          required
          aria-describedby="invalid-confirm-password"
        />

        <small
          v-if="$route.query.password_mismatch"
          id="invalid-confirm-password"
        >
          Passwords mismatch
        </small>
        <small
          v-else-if="$route.query.validation_failed && $route.query.reason"
          id="invalid-confirm-password"
        >
          {{ $route.query.reason }}
        </small>

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
