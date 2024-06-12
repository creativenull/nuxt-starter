<script setup lang="ts">
defineProps<{
  user: { id: number; name: string; email: string; avatarUrl: string | null };
}>();

const show = ref(false);
const formEl = ref<HTMLFormElement>();

function handleSubmit(e: Event) {
  e.preventDefault();

  if (window.confirm("Are you sure you want to logout?")) {
    formEl.value?.submit();
  }
}
</script>

<template>
  <div id="app-header-user-root">
    <button class="menu__button" @click="show = !show">
      <img
        width="50"
        height="50"
        src="https://i.pravatar.cc/200?img=52"
        alt="user profile picture"
      />
    </button>
    <article id="app-header-menu" v-show="show">
      <div class="menu-user-info">
        <div>{{ user.name }}</div>
        <div>{{ user.email }}</div>
      </div>
      <hr />
      <div class="menu-items">
        <a href="/about">About</a>
        <a href="#">Contact</a>
        <a href="#">Services</a>
        <hr />
        <form ref="formEl" @submit="handleSubmit" action="/logout" method="POST">
          <FormInputCsrf />
          <button>Logout</button>
        </form>
      </div>
    </article>
  </div>
</template>

<style scoped>
#app-header-user-root {
  position: relative;
}

.menu__button,
.menu__button img {
  border-radius: 9999px;
  margin: 0;
  padding: 0;
  border: 2px solid var(--pico-color-slate-800);
}

#app-header-menu {
  position: absolute;
  left: calc(-200px + 0.5rem);
  top: calc((80px - 50px) * 2.5);
  width: 250px;
  background-color: var(--pico-color-slate-950);
  border: 1px solid var(--pico-color-slate-850);
}

.menu-user-info {
  font-size: 0.75rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.menu-items > a {
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  text-decoration: none;
}

.menu-items form > button {
  padding: 0.25rem 0.75rem;
  margin: 0;
  width: 100%;
  display: flex;
  border: none;
  background-color: transparent;
}

.menu-items > a:hover,
.menu-items form > button:hover {
  background-color: var(--pico-color-slate-850);
}
</style>
