<script setup lang="ts">
import { FetchError } from "ofetch";

const router = useRouter();

const login = reactive({
  email: "",
  password: "",
  remember: false,
});

const errors = ref("");

async function onSubmit() {
  errors.value = "";

  try {
    await $fetch("/api/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: { ...login },
    });

    router.push("/");
  } catch (e) {
    if (e instanceof FetchError) {
      errors.value = e.data.message;
      login.password = "";
    }
  }
}
</script>

<template>
  <main>
    <div class="container overflow-auto">
      <div class="title__container">
        <img width="40" height="40" src="/logo.svg" alt="Company Logo" />
        <h1>Sign In</h1>
      </div>

      <div v-if="errors" class="error__container">
        {{ errors }}
      </div>

      <form @submit.prevent="onSubmit">
        <input
          v-model="login.email"
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          autoComplete="email"
          required
        />
        <input
          v-model="login.password"
          name="password"
          type="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          required
        />
        <fieldset>
          <label htmlFor="remember">
            <input
              v-model="login.remember"
              name="remember_me"
              type="checkbox"
              role="switch"
              id="remember"
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
