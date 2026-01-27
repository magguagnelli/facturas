export async function api<T>(path: string): Promise<T> {
  const res = await fetch(path);

  if (!res.ok) {
    throw new Error(`Error ${res.status}`);
  }

  return (await res.json()) as T;
}
