const authRoutes = ["/dashboard", "/admin"];
const blockedUserRoutes = ["/login", "/register"];

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);

  const url = getRequestURL(event);

  // Ensure the user cannot access these routes when they've logged in
  if (blockedUserRoutes.includes(url.pathname) && session.data.user) {
    return await sendRedirect(event, "/", 302);
  }

  // Ensure user is logged in before accessing these routes
  if (authRoutes.includes(url.pathname) && !session.data.user) {
    return await sendRedirect(event, "/login", 302);
  }
});
