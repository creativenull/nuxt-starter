<script setup lang="ts">
import type { Form } from "#ui/types";

useHead({ title: "Register" });

const submitting = ref(false);
const formState = reactive({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

const form = ref<Form<typeof formState>>();

const showPassword = ref(false);
</script>

<template>
  <div class="container">
    <UCard>
      <template #header>
        <h1 class="text-3xl font-medium">Register your account</h1>
      </template>

      <UForm ref="form" class="space-y-4" :state="formState">
        <UFormField label="First name" name="first_name" required>
          <UInput v-model.lazy="formState.first_name" required size="xl" class="w-full" />
        </UFormField>

        <UFormField label="Last name" name="last_name" required>
          <UInput v-model.lazy="formState.last_name" required size="xl" class="w-full" />
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
