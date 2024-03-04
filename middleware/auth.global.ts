const nonAuthRoutes = ['/login', '/logout']


async function getUser() {
  return await $fetch("/api/user", { method: "POST" });
}

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === "/login" || to.path === "/register") {
    try {
      await getUser();
      return navigateTo("/");
    } catch (e) {
      return true;
    }
  }
});
