# TaskFlow

API educativa de tareas y autenticación organizada por capas: rutas, controladores, casos de uso, repositorios y entidades.

## Instalación

```bash
npm install
```

Copiar `.env.example` como `.env.dev` y configurar:

```env
PORT=3000
FRONTEND_ORIGIN=http://127.0.0.1:5500
```

Iniciar en desarrollo:

```bash
npm run dev
```

## Rutas

### Tareas

- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `POST /api/v1/tasks`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`

### Autenticación

- `POST /api/v1/auth/registro`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`

## Pruebas manuales

Iniciar servidor y ejecutar solicitudes desde un cliente compatible con archivos HTTP:

- `test/tasks.http`
- `test/auth.http`

Los usuarios se guardan en `src/data/users.json`.

> Esta práctica compara y almacena contraseñas como texto plano sólo con fines educativos. Una aplicación real debe usar hashing seguro y sesiones o tokens.
