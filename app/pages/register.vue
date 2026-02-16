<script setup lang="ts">
import type { FetchError } from "ofetch";
import type { Form } from "#ui/types";
import { RegisterFormSchema } from "#shared/forms/register-schema";

useHead({ title: "Register" });

const { $csrfFetch } = useNuxtApp();
const toast = useToast();
const submitting = ref(false);
const formState = reactive({
  name: "",
  email: "",
  password: "",
});

const form = ref<Form<typeof formState>>();

const showPassword = ref(false);

async function onSubmit() {
  try {
    const result = await $csrfFetch("/api/register", { method: "POST", body: { ...formState } });
    if (result) {
      toast.add({
        title: "User created successfully",
        description: "You can now login with your credentials",
      });

      navigateTo("/login");
    }
  } catch (e) {
    if ((e as FetchError).status === 400) {
      toast.add({
        title: "Error",
        description: (e as FetchError).data.message,
        color: "error",
      });
    }
  }
}
</script>

<template>
  <div class="container">
    <UCard>
      <template #header>
        <h1 class="text-3xl font-medium">Register your account</h1>
      </template>

      <UForm
        :schema="RegisterFormSchema"
        ref="form"
        class="space-y-4"
        :state="formState"
        @submit="onSubmit"
      >
        <UFormField label="Name" name="name" required>
          <UInput v-model.lazy="formState.name" required size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email" required>
          <UInput v-model.lazy="formState.email" required size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password" required>
          <UInput
            v-model.lazy="formState.password"
            :type="showPassword ? 'text' : 'password'"
            required
            size="xl"
            class="w-full"
          >
            <template #trailing>
              <UButton
                @click="showPassword = !showPassword"
                :padded="false"
                color="neutral"
                variant="link"
                :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
              />
            </template>
          </UInput>
        </UFormField>

        <UButton type="submit" size="xl" :loading="submitting" block>Register</UButton>
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
