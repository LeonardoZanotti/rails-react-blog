export const API_URL =
	import.meta.env.MODE === "production"
		? "production_url"
		: import.meta.env.VITE_API_URL;
