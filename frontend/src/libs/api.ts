type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE = import.meta.env.VITE_API_BASE ?? ""; 
// En Databricks normalmente conviene usar "" y pegarle al mismo host.

export async function api<T>(
  path: string,
  options: { method?: HttpMethod; body?: unknown; headers?: Record<string, string> } = {}
): Promise<T> {
  const { method = "GET", body, headers = {} } = options;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  // Si la API regresa vacío (204)
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
