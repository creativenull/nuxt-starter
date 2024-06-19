<script setup lang="ts">
definePageMeta({ middleware: ["auth"] });
useHead({ title: "Login" });

const route = useRoute();
const invalid = ref(!!route.query.invalid ?? false);
</script>

<template>
  <main>
    <div class="container overflow-auto">
      <AuthTitle label="Login" />

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
              :checked="$route.query.remember_user === 'true' ?? false"
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
        <div style="text-align: center">
          <NuxtLink href="/register"> Not a user? Click here to regiser! </NuxtLink>
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
