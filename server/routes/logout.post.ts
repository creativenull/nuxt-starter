export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  await session.clear();
  return await sendRedirect(event, "/", 302);
});
