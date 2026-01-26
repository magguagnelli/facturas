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
    <div class="boxLogin">
        <div class="headerBox">
            <img src="/img/PLECA_LOGO.png" />
        </div>
        <div class="bodyBox">
            <form id="form_log" method="POST" action="registro" class="row" data-gtm-form-interact-id="0">
                <div class="col-12 ma-g">
                    <label class="titForm verde_t">
                        <img src="/img/USUARIO.svg" />USUARIO
                    </label>
                    <input type="text" id="user" name="user" class="form-control form-login oro_t" />
                </div>
                <div class="col-12 ma-g">
                    <label class="titForm verde_t">
                        <img src="/img/CONTRASENA.svg" />CONTRASEÑA
                    </label>
                    <input type="password" id="pass" name="pass" class="form-control form-login oro_t" data-gtm-form-interact-field-id="0" />
                    <a href="#" onclick="mostrarRestContrasena()" class="pass-olvide">Olvidé mi contraseña</a>
                </div>
                {/* Si vas a usar reCAPTCHA real, normalmente se integra con script o librería */}
                <div id="recaptcha_log" className="col-12 ma-g">
                {/* placeholder */}
                </div>                                          
                <div class="col-12 t-c">
                    <button id="loginBtn" class="btnGral verde_t" type="submit">
                        <p>INGRESAR</p>
                        <div class="btnIcon">
                            <div class="boxIcon verde">
                                <img src="/img/CONTINUAR.svg" />
                            </div>
                            <span class="s-verde"></span>
                        </div>
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}