<script setup lang="ts">
useHead({ title: "Login" });

const formState = reactive({ email: "", password: "" });

function onSubmit() {
  // $fetch("/api/auth/login", { method: "POST", body: formState })
  //   .then((res) => console.log("response", res))
  //   .catch((err) => console.log("error", err));
}
</script>

<template>
  <UForm :state="formState" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="formState.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="formState.password" type="password" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>
