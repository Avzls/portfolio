// Base path for hosting under a GitHub Pages project site
// (e.g. https://user.github.io/<repo>). Empty when hosted at a domain root
// or a *.github.io user site. Injected at build time by the CI workflow.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Prefix a local asset path with the base path. Absolute URLs and empty
// values are returned untouched.
export function asset(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

// Resolve an image/file URL used throughout the site.
// - Absolute URLs (http...) are returned as-is.
// - Legacy "/uploads/..." paths (from the old backend) are remapped to the
//   static "/assets/uploads/..." location.
// - Everything else is treated as a public asset and gets the base path.
export function resolveMedia(url) {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  const normalized = url.startsWith("/uploads/")
    ? url.replace("/uploads/", "/assets/uploads/")
    : url;
  return asset(normalized);
}
