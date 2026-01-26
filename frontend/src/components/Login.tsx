import React from "react";
import './Login.css';

const Login: React.FC = () => {
  return 
    <div class="boxLogin" style="display:block">
        <div class="headerBox">
            <img src="assets/img/PLECA_LOGO.png">
        </div>
        <div class="bodyBox">
            <form id="form_log" method="POST" action="registro" class="row" data-gtm-form-interact-id="0">
                <div class="col-12 ma-g">
                    <label class="titForm verde_t"><img src="assets/img/USUARIO.svg">USUARIO</label>
                    <input type="text" id="user" name="user" class="form-control form-login oro_t">
                </div>
                <div class="col-12 ma-g">
                    <label class="titForm verde_t"><img src="assets/img/CONTRASENA.svg">CONTRASEÑA</label>
                    <input type="password" id="pass" name="pass" class="form-control form-login oro_t" data-gtm-form-interact-field-id="0">
                    <a href="#" onclick="mostrarRestContrasena()" class="pass-olvide">Olvidé mi contraseña</a>
                </div>
                
                    <div id="recaptcha_log" class="col-12 ma-g g-recaptcha" data-sitekey="6Lf15TgpAAAAAEDQQnfHOgr8kvxEAxRN4ri4VKAv"><div style="width: 304px; height: 78px;"><div><iframe title="reCAPTCHA" width="304" height="78" role="presentation" name="a-3s3sztd6ke8i" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox allow-storage-access-by-user-activation" src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6Lf15TgpAAAAAEDQQnfHOgr8kvxEAxRN4ri4VKAv&amp;co=aHR0cHM6Ly9hcHAtcmVnaXN0cm8uaW1zc2JpZW5lc3Rhci5nb2IubXg6NDQz&amp;hl=es-419&amp;v=N67nZn4AqZkNcbeMu4prBgzg&amp;size=normal&amp;anchor-ms=20000&amp;execute-ms=30000&amp;cb=pd1mfxjz90f0"></iframe></div><textarea id="g-recaptcha-response-1" name="g-recaptcha-response" class="g-recaptcha-response" style="width: 250px; height: 40px; border: 1px solid rgb(193, 193, 193); margin: 10px 25px; padding: 0px; resize: none; display: none;"></textarea></div></div>
                    
                        <div class="col-12 t-c">
                            <button id="loginBtn" class="btnGral verde_t" type="submit">
                                <p>INGRESAR</p>
                                <div class="btnIcon">
                                    <div class="boxIcon verde"><img src="assets/img/CONTINUAR.svg"></div>
                                    <span class="s-verde"></span>
                                </div>
                            </button>
                        </div>
            </form>
        </div>
    </div>
};

export default Login;
