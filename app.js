const CLAVE_SESION = "loginApp.sesion";
const DURACION_MINUTOS = 15;

const vistaLogin = document.getElementById("vista-login");
const vistaSesion = document.getElementById("vista-sesion");
const form = document.getElementById("form-login");
const inputUsuario = document.getElementById("usuario");
const inputClave = document.getElementById("clave");
const errorUsuario = document.getElementById("error-usuario");
const errorClave = document.getElementById("error-clave");
const btnIngresar = document.getElementById("btn-ingresar");
const btnVerClave = document.getElementById("ver-clave");
const btnSalir = document.getElementById("btn-salir");
const nombreUsuario = document.getElementById("nombre-usuario");
const horaInicio = document.getElementById("hora-inicio");

/* ---------- Manejo de sesión (sessionStorage) ---------- */

function guardarSesion(usuario) {
  const ahora = Date.now();
  const sesion = {
    usuario,
    inicio: ahora,
    expira: ahora + DURACION_MINUTOS * 60 * 1000,
  };
  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));
  return sesion;
}

function obtenerSesion() {
  try {
    const sesion = JSON.parse(sessionStorage.getItem(CLAVE_SESION));
    if (!sesion) return null;
    if (Date.now() > sesion.expira) {
      cerrarSesion();
      return null;
    }
    return sesion;
  } catch {
    return null;
  }
}

function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION);
}

function mostrarVista(sesion) {
  const activa = Boolean(sesion);
  vistaLogin.classList.toggle("oculto", activa);
  vistaSesion.classList.toggle("oculto", !activa);

  if (activa) {
    nombreUsuario.textContent = sesion.usuario;
    horaInicio.textContent = new Date(sesion.inicio).toLocaleTimeString("es-CO");
  }
}

/* ---------- Validación de campos vacíos ---------- */

function marcarError(input, etiquetaError, mensaje) {
  etiquetaError.textContent = mensaje;
  input.parentElement.classList.toggle("invalido", mensaje !== "");
}

function validarFormulario() {
  const usuario = inputUsuario.value.trim();
  const clave = inputClave.value;

  marcarError(inputUsuario, errorUsuario, usuario === "" ? "El usuario es obligatorio." : "");
  marcarError(inputClave, errorClave, clave === "" ? "La contraseña es obligatoria." : "");

  if (usuario === "") inputUsuario.focus();
  else if (clave === "") inputClave.focus();

  return usuario !== "" && clave !== "";
}

function sacudirTarjeta() {
  vistaLogin.classList.remove("sacudir");
  void vistaLogin.offsetWidth; // reinicia la animación
  vistaLogin.classList.add("sacudir");
}

/* ---------- Eventos ---------- */

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!validarFormulario()) {
    sacudirTarjeta();
    return;
  }

  btnIngresar.classList.add("cargando");
  btnIngresar.disabled = true;

  // Se simula la espera de una respuesta del servidor
  setTimeout(() => {
    const sesion = guardarSesion(inputUsuario.value.trim());
    form.reset();
    btnIngresar.classList.remove("cargando");
    btnIngresar.disabled = false;
    mostrarVista(sesion);
  }, 900);
});

inputUsuario.addEventListener("input", () => marcarError(inputUsuario, errorUsuario, ""));
inputClave.addEventListener("input", () => marcarError(inputClave, errorClave, ""));

btnVerClave.addEventListener("click", () => {
  const oculta = inputClave.type === "password";
  inputClave.type = oculta ? "text" : "password";
  btnVerClave.textContent = oculta ? "🙈" : "👁️";
});

btnSalir.addEventListener("click", () => {
  cerrarSesion();
  mostrarVista(null);
});

/* ---------- Al cargar la página ---------- */
mostrarVista(obtenerSesion());