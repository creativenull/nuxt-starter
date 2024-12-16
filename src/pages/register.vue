<script setup lang="ts">
import * as v from "valibot";
import { RegisterSchema } from "~/server/validations/auth/register";

useHead({ title: "Register" });

const submitting = ref(false);
const formState = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirm: "",
});

function clearForm() {
  formState.first_name = "";
  formState.last_name = "";
  formState.email = "";
  formState.password = "";
}

function cleanup() {
  clearForm();
  submitting.value = false;
}

function cleanupError() {
  formState.password_confirm = "";
  submitting.value = false;
}

async function onSubmitRegister() {
  submitting.value = true;

  try {
    const response = await $fetch("/api/auth/register", { method: "POST", body: formState });
    console.log({ response });
    cleanup();
  } catch (error) {
    console.log({ error });
    cleanupError();
  }
}
</script>

<template>
  <div class="container">
    <UCard>
      <template #header>
        <h1>Register your account</h1>
      </template>

      <UForm
        :schema="v.safeParser(RegisterSchema)"
        :state="formState"
        class="space-y-4"
        @submit="onSubmitRegister"
      >
        <UFormGroup label="First name" name="first_name" required>
          <UInput v-model.lazy="formState.first_name" required />
        </UFormGroup>

        <UFormGroup label="Last name" name="last_name" required>
          <UInput v-model.lazy="formState.last_name" required />
        </UFormGroup>

        <UFormGroup label="Email" name="email" required>
          <UInput v-model.lazy="formState.email" required />
        </UFormGroup>

        <UFormGroup label="Password" name="password" required>
          <UInput v-model.lazy="formState.password" type="password" required />
        </UFormGroup>

        <UFormGroup label="Re-enter password" name="password_confirm" required>
          <UInput v-model.lazy="formState.password_confirm" type="password" required />
        </UFormGroup>

        <UButton type="submit" size="lg" :loading="submitting" block>Register</UButton>
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
