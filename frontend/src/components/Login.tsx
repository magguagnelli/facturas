import React from "react";
import './Login.css';

export default function Login() {
  const mostrarRestContrasena = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // TODO: aquí abres modal o navegas a /reset
    console.log("Olvidé mi contraseña");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: login
    console.log("submit login");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <form onSubmit={onSubmit}>
            <div className="col-12 ma-g">
              <label className="titForm verde_t">
                <img src="/img/USUARIO.svg" alt="Usuario" /> USUARIO
              </label>

              <input
                type="text"
                id="user"
                name="user"
                className="form-control form-login oro_t"
              />
            </div>

            <div className="col-12 ma-g">
              <label className="titForm verde_t">
                <img src="/img/CONTRASENA.svg" alt="Contraseña" /> CONTRASEÑA
              </label>

              <input
                type="password"
                id="pass"
                name="pass"
                className="form-control form-login oro_t"
              />

              <a href="#" onClick={mostrarRestContrasena} className="pass-olvide">
                Olvidé mi contraseña
              </a>
            </div>

            {/* Si vas a usar reCAPTCHA real, normalmente se integra con script o librería */}
            <div id="recaptcha_log" className="col-12 ma-g">
              {/* placeholder */}
            </div>

            <div className="col-12 ma-g">
              <button type="submit" className="btnLogin">
                <p>INGRESAR</p>

                <div className="btnIcon">
                  <div className="boxIcon verde">
                    <img src="/img/CONTINUAR.svg" alt="Continuar" />
                  </div>
                  <span className="s-verde" />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
