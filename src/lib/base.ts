/** Prefix a root-absolute path with Astro's `base` (import.meta.env.BASE_URL). */
export function withBase(pathname: string): string {
  if (!pathname.startsWith('/')) return pathname;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${pathname}`;
}
