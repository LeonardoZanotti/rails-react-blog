export const API_URL =
  process.env.NODE_ENV === "production"
    ? "production_url"
    : import.meta.env.VITE_API_URL;
