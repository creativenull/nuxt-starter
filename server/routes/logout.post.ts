export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);

  if (!(formData.get("__csrf") ?? null)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid token provided",
    });
  }

  const session = await getUserSession(event);
  await session.clear();

  return await sendRedirect(event, "/");
});
