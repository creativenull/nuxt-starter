<script setup lang="ts">
import { FetchError } from "ofetch";

useHead({ title: "Login" });

const formState = reactive({
  name: "",
  email: "",
  password: "",
  confirm_password: "",
});

const errorsState = ref({
  name: [],
  email: [],
  password: [],
});

const handleFetchError = useValibotErrorHandler(errorsState);

async function onSubmit() {
  try {
    const resp = await $fetch("/api/auth/register", { method: "POST", body: formState });

    console.log({ resp });
  } catch (e) {
    if (e instanceof FetchError) {
      handleFetchError(e);
    }
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label for="name">Name*</label>
      <div>
        <input id="name" v-model="formState.name" required />
        <div v-if="errorsState.name.length > 0">
          {{ errorsState.name }}
        </div>
      </div>

      <label for="email">Email*</label>
      <div>
        <input id="email" v-model="formState.email" type="email" required />
        <div v-if="errorsState.email.length > 0">
          {{ errorsState.email }}
        </div>
      </div>

      <label for="password">Password*</label>
      <div>
        <input id="password" v-model="formState.password" type="password" required />
        <div v-if="errorsState.password.length > 0">
          {{ errorsState.password }}
        </div>
      </div>

      <label for="confirm_password">Confirm password*</label>
      <div>
        <input
          id="confirm_password"
          v-model="formState.confirm_password"
          type="password"
          required
        />
      </div>

      <button type="submit">Register</button>
    </form>
  </div>
</template>
