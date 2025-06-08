# 🏥 Sistema de Reservas de Horas Médicas (Microservicios con Node.js y MongoDB)

Este proyecto demuestra una arquitectura simple de microservicios para gestionar reservas de horas médicas. Cada servicio está desacoplado y comunica con los demás mediante REST, centralizado mediante un API Gateway.

## 📦 Servicios

- **api-gateway**: Punto de entrada único. Aplica autenticación JWT y enruta a los servicios.
- **usuarios-service**: Registro y autenticación de usuarios (pacientes y médicos).
- **agenda-service**: Gestión de disponibilidad horaria para médicos.
- **reservas-service**: Reservas de horas médicas, validadas contra la disponibilidad.
- **Bases de datos MongoDB** para cada servicio.
- Orquestado mediante **Docker Compose**.

---

## 🚀 Requisitos Previos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Estructura esperada

Coloca los siguientes archivos y carpetas en el mismo directorio:

```
/api-gateway
/usuarios-service
/agenda-service
/reservas-service
docker-compose.yml
```

---

## ▶️ Cómo ejecutar el sistema

1. Abre una terminal y ubícate en la carpeta raíz del proyecto.
2. Ejecuta:

```bash
docker-compose up --build
```

3. Espera a que todos los servicios estén disponibles (pueden tardar unos segundos en inicializar).

---

## 🌐 Endpoints disponibles (a través de API Gateway)

El API Gateway se expone en: `http://localhost:3000`

### usuarios (`/usuarios`)
- `POST /usuarios` — Crear usuario
- `POST /usuarios/login` — Login de usuario
- `GET /usuarios` — Obtener todos los usuarios
- `GET /usuarios/:id` — Obtener un usuario por ID
- `PUT /usuarios/:id` — Actualizar usuario
- `DELETE /usuarios/:id` — Eliminar usuario

### agenda (`/agenda`)
- `POST /agenda` — Definir disponibilidad horaria
- `GET /agenda/:medicoId` — Obtener disponibilidad de un médico
- `GET /agenda/:medicoId/:fecha` — Obtener disponibilidad por fecha

### reservas (`/reservas`)
- `POST /reservas` — Crear una reserva
- `GET /reservas` — Listar reservas
- `DELETE /reservas/:id` — Cancelar reserva

---

## 🧪 Datos de ejemplo

### Crear médico:
```json
{
  "nombre": "Dr. Juan Pérez",
  "correo": "juan@hospital.com",
  "password": "clave123",
  "tipo": "medico"
}
```

### Definir disponibilidad:
```json
{
  "medicoId": "ID_DEL_MEDICO",
  "fecha": "2025-06-10",
  "horas": ["09:00", "10:00", "11:30"]
}
```

### Crear reserva:
```json
{
  "pacienteId": "ID_DEL_PACIENTE",
  "medicoId": "ID_DEL_MEDICO",
  "fecha": "2025-06-10",
  "hora": "10:00"
}
```

---

## 🔐 Autenticación

- El API Gateway verifica el token JWT (salvo para `/usuarios` y `/usuarios/login`)
- Para llamadas autenticadas, usar:

```
Authorization: Bearer <token>
```

---

## 🧹 Detener el sistema

```bash
docker-compose down
```

---

## ✅ Autor

Este sistema fue generado automáticamente como ejemplo educativo para ilustrar microservicios con Node.js y MongoDB.