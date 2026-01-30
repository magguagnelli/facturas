import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest, meRequest } from "../lib/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { access_token } = await loginRequest(username, password);

      // 👇 IMPORTANTE: coincide con tu ProtectedRoute (access_token)
      localStorage.setItem("access_token", access_token);

      // opcional: confirmar que el token sirve y traer el usuario
      await meRequest(access_token);

      navigate("/facturas", { replace: true });
    } catch (err: any) {
      localStorage.removeItem("access_token");
      setError(err?.message ?? "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="titSecciones center">
        <h3>INICIO DE SESIÓN</h3>
      </div>

      <div className="boxLogin">
        <div className="headerBox"></div>

        <div className="bodyBox">
          <form id="form_log" className="row" onSubmit={handleLogin}>
            <div className="col-12 ma-g">
              <label className="titForm verde_t">
                <img src="/img/USUARIO.svg" />
                USUARIO
              </label>
              <input
                type="text"
                id="user"
                name="user"
                className="form-control form-login oro_t"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>

            <div className="col-12 ma-g">
              <label className="titForm verde_t">
                <img src="/img/CONTRASENA.svg" />
                CONTRASEÑA
              </label>
              <input
                type="password"
                id="pass"
                name="pass"
                className="form-control form-login oro_t"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="col-12 ma-g">
                <p style={{ color: "red" }}>{error}</p>
              </div>
            )}

            <div className="col-12 t-c">
              <button type="submit" className="btnGral verde_t" disabled={loading}>
                <p>{loading ? "INGRESANDO..." : "INGRESAR"}</p>
                <div className="btnIcon">
                  <div className="boxIcon verde">
                    <img src="/img/CONTINUAR.svg" />
                  </div>
                  <span className="s-verde"></span>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
