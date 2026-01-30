const API_URL = "http://localhost:8000";

export async function loginRequest(username: string, password: string) {
  // FastAPI con OAuth2PasswordRequestForm espera x-www-form-urlencoded
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
  });

  if (!res.ok) {
    let msg = "Credenciales inválidas";
    try {
      const data = await res.json();
      msg = data?.detail ?? msg;
    } catch {}
    throw new Error(msg);
  }

  return (await res.json()) as { access_token: string; token_type: string };
}

export async function meRequest(accessToken: string) {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Token inválido");
  return (await res.json()) as { username: string };
}
