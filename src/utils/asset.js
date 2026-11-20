/**
 * Resolves public assets taking into account Vite's base path
 * (e.g., when hosted under /blessy-tuscano/ on GitHub Pages).
 */
export const asset = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
};
