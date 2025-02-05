<script setup lang="ts">
import type { Form } from "#ui/types";
import { FetchError } from "ofetch";

useHead({ title: "Register" });
const { $csrfFetch } = useNuxtApp();

const submitting = ref(false);
const formState = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

const form = ref<Form<typeof formState>>();

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

function onErrorCleanup() {
  submitting.value = false;
}

async function onSubmitRegister() {
  submitting.value = true;

  try {
    await $csrfFetch("/api/auth/register", { method: "POST", body: formState });
    cleanup();
    window.location.href = "/";
  } catch (e) {
    onErrorCleanup();

    if (e instanceof FetchError && e.statusCode === 422) {
      form.value!.setErrors(getFormValidationErrors(e));
    }
  }
}

const showPassword = ref(false);
</script>

<template>
  <div class="container">
    <UCard>
      <template #header>
        <h1>Register your account</h1>
      </template>

      <UForm ref="form" class="space-y-4" :state="formState" @submit="onSubmitRegister">
        <UFormGroup label="First name" name="first_name" required>
          <UInput v-model.lazy="formState.first_name" required size="md" />
        </UFormGroup>

        <UFormGroup label="Last name" name="last_name" required>
          <UInput v-model.lazy="formState.last_name" required size="md" />
        </UFormGroup>

        <UFormGroup label="Email" name="email" required>
          <UInput v-model.lazy="formState.email" required size="md" />
        </UFormGroup>

        <UFormGroup label="Password" name="password" required>
          <UInput
            v-model.lazy="formState.password"
            :type="showPassword ? 'text' : 'password'"
            required
            size="md"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                @click="showPassword = !showPassword"
                :padded="false"
                color="gray"
                variant="link"
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
              />
            </template>
          </UInput>
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
