<script setup lang="ts">
import type { Form } from "#ui/types";
import { FetchError } from "ofetch";

useHead({ title: "Login" });

const formState = reactive({ email: "", password: "" });
const form = ref<Form<typeof formState>>();
const submitting = ref(false);

function cleanup() {
  submitting.value = false;
  formState.email = "";
  formState.password = "";
}

async function onSubmitLogin() {
  submitting.value = true;

  try {
    await $fetch("/api/auth/login", { method: "POST", body: formState });
    window.location.href = "/";
  } catch (e) {
    cleanup();

    if (e instanceof FetchError && e.statusCode === 422) {
      form.value!.setErrors(getFormValidationErrors(e));
    }
  }
}
</script>

<template>
  <div class="container">
    <UCard>
      <template #header>
        <h1>Login</h1>
      </template>

      <UForm class="space-y-4" :state="formState" @submit="onSubmitLogin">
        <UFormGroup label="Email" name="email" required>
          <UInput v-model.lazy="formState.email" required />
        </UFormGroup>

        <UFormGroup label="Password" name="password" required>
          <UInput v-model.lazy="formState.password" type="password" required />
        </UFormGroup>

        <UButton type="submit" size="lg" :loading="submitting" block> Login </UButton>
      </UForm>
    </UCard>
  </div>
</template>

<style scoped>
.container {
  max-width: 65ch;
  margin: 2rem auto;
}
</style>
