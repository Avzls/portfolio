const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Resolve an image/file URL coming from the API.
// - Uploaded files (e.g. "/uploads/portfolio/x.jpg") live on the API server.
// - Local theme assets (e.g. "/assets/logos/x.png") are served by Next.js
//   from the public folder, so strip the leading slash.
// - Absolute URLs (http...) and empty values are returned as-is.
export function resolveMedia(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/uploads/")) return `${API_URL}${url}`;
  if (url.startsWith("/")) return url.slice(1);
  return url;
}
