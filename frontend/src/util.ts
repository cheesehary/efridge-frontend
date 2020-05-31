export const getCookie = (name: string): string => {
  const cookies = document.cookie.split(';');
  const cookie = cookies.find((c) => c.startsWith(name));
  if (!cookie) return '';
  return cookie.substring(name.length + 1);
};
