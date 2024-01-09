export default defineNuxtRouteMiddleware((to) => {
  const maxAge = 28800;
  const token = useCookie('token', { maxAge });

  if (token.value && to?.name === 'auth') {
    return navigateTo('/admin');
  }

  // if token doesn't exist redirect to log in
  if (!token.value && to?.name !== 'auth') {
    // abortNavigation();
    return navigateTo('/auth');
  }
});