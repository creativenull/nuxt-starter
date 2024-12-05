<script setup lang="ts">
import { FetchError } from "ofetch";

useHead({ title: "Login" });

const formRef = useTemplateRef("formRef");
const formState = reactive({ email: "", password: "" });
const errorsState = reactive<{ email: string[] }>({ email: [] });

async function onSubmit() {
  errorsState.email = [];

  try {
    const resp = await $fetch("/api/auth/login", { method: "POST", body: formState });

    console.log({ resp });
  } catch (e) {
    if (e instanceof FetchError) {
      errorsState.email.push("Invalid email/password provided.");
      formRef.value?.reset();
    }
  }
}
</script>

<template>
  <div>
    <form ref="formRef" @submit.prevent="onSubmit">
      <label for="email">Email*</label>
      <div>
        <input id="email" v-model="formState.email" required />
        <div v-if="errorsState.email.length > 0">Invalid email/password provided.</div>
      </div>

      <label for="password">Password*</label>
      <div>
        <input id="password" v-model="formState.password" type="password" required />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
</template>
