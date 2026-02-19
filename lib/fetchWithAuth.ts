import { getAuthToken } from "./auth";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  const token = getAuthToken();

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const res = await fetch(url, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Error en la petición");
  }

  return data;
}
