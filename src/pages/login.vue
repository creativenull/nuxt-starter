<script setup lang="ts">
import * as v from "valibot";
import { LoginSchema } from "~/server/validations/auth/login";

useHead({ title: "Login" });

const formState = reactive({
  email: "",
  password: "",
});

const submitting = ref(false);

function cleanup() {
  submitting.value = false;
}

async function onSubmitLogin() {
  submitting.value = true;
  try {
    cleanup();
  } catch (error) {}
}
</script>

<template>
  <div class="container">
    <UCard>
      <template #header>
        <h1>Login</h1>
      </template>

      <UForm
        :schema="v.safeParser(LoginSchema)"
        :state="formState"
        class="space-y-4"
        @submit="onSubmitLogin"
      >
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
