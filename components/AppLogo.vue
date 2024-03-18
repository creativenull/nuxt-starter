<script setup lang="ts">
const props = withDefaults(defineProps<{ size?: "small" | "large" }>(), {
  size: "small",
});

let width = 50;
let height = 50;

if (props.size === "large") {
  width = 100;
  height = 100;
}
</script>

<template>
  <img class="logo__img" :width :height src="/logo.png" alt="Logo" />
</template>
