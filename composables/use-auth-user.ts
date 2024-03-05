export async function useAuthUser() {
  const user = await useFetch("/api/user", { method: "POST" });
  return user.data.value;
}
