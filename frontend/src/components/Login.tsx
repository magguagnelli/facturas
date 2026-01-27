import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const mostrarRestContrasena = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // TODO: aquí navega a /reset o abre un modal
    console.log("Olvidé mi contraseña");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: aquí tu lógica real de login
    console.log({ user, pass });
  };
  const navigate = useNavigate();
  function handleLogin() {
    // lógica de login (validaciones, fetch, etc.)
    navigate("/facturas");          // 👈 AQUÍ
  }

  return (
   <> 
    <div class="titSecciones center">
        <h3>INICIO DE SESIÓN</h3>
    </div>
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
                <div id="recaptcha_log" class="col-12 ma-g">
                {/* placeholder */}
                </div>                                          
                <div class="col-12 t-c">
                    <button onClick={handleLogin} id="" class="btnGral verde_t" type="submit">
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
    </div></>
  );
}