export const getCookie = (name: string): string => {
  const cookies = document.cookie.split(';').map((c) => c.trim());
  const cookie = cookies.find((c) => c.startsWith(name));
  if (!cookie) return '';
  return cookie.substring(name.length + 1);
};

export const setCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}`;
};
