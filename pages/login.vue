<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });

const res = await useFetch("/api/csrf-token", { method: "POST" });
const route = useRoute();
const invalid = ref(!!route.query.invalid ?? false);
</script>

<template>
  <main>
    <div class="container overflow-auto">
      <div class="title__container">
        <img width="40" height="40" src="/logo.svg" alt="Company Logo" />
        <h1>Sign In</h1>
      </div>

      <form action="/login" method="POST">
        <FormInputCsrf />
        <input
          :value="$route.query.email ?? ''"
          @input.once="invalid = false"
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          :aria-invalid="invalid ? true : undefined"
          aria-describedby="invalid-email"
          required
        />
        <small v-if="invalid" id="invalid-email">Invalid email/password</small>
        <input
          @input.once="invalid = false"
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          :aria-invalid="invalid ? true : undefined"
          required
        />
        <fieldset>
          <label htmlFor="remember-me">
            <input
              name="remember_user"
              type="checkbox"
              role="switch"
              id="remember-me"
            />
            Remember me
          </label>
        </fieldset>
        <button type="submit">Login</button>
        <hr />
        <div class="auth__container">
          <NuxtLink href="/register">
            Not a user? Click here to regiser!
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
