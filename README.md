# Login App

Formulario de inicio de sesión desarrollado como proyecto integrador del taller de control de versiones con Git y GitHub.

## Funcionalidades

- Formulario con usuario, contraseña y botón de ingreso.
- Validación de campos vacíos con mensajes de error.
- Manejo de sesión con `sessionStorage` (expira a los 15 minutos o al cerrar la pestaña).
- Cierre de sesión.

> La sesión es simulada en el navegador: no hay servidor ni autenticación real, y la contraseña nunca se almacena.

## Estrategia de ramas: GitHub Flow

- La rama `main` siempre contiene código estable y desplegable.
- Cada funcionalidad se desarrolla en una rama corta, por ejemplo `feature/formulario-login`.
- Los cambios llegan a `main` solo mediante un Pull Request revisado por otra persona.
- Cada Pull Request ejecuta una verificación automática con GitHub Actions.

**Justificación:** el equipo es pequeño y el proyecto es una aplicación web sencilla con integraciones frecuentes. GitHub Flow evita la complejidad de ramas como `develop` o `release` de Git Flow, mantiene un historial claro y se apoya en la revisión por Pull Request y en la verificación automática.

## Convención de commits

Se usa Conventional Commits: `feat:`, `fix:`, `docs:`, `style:`, `refactor:` y `ci:`.