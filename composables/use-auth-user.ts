export async function useAuthUser() {
  const res = await useFetch("/api/user", { method: "POST" });
  return res.data.value;
}
