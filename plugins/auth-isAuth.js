export default function ({ route, redirect, app }) {
  const allowedRoutes = ['/login']

  if (allowedRoutes.includes(route.path)) {
    return
  }

  // Disable middleware if no route was matched to allow 404/error page
  if (!route.matched.some((match) => match.components)) {
    return
  }

  // If we're not logged in, redirect to /login
  if (!app.$auth.loggedIn) {
    redirect(302, '/login', {
      next: route.fullPath,
    })
  }
}
