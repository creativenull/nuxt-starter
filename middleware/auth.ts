export default defineNuxtRouteMiddleware(async (to, _from) => {
  try {
    const user = await $fetch("/api/user", { method: "POST" });

    if (!user || to.path === "/login" || to.path === "/register") {
      return await navigateTo("/");
    }
  } catch (e) {}
});
