# 🚗 ParkControl

**Sistema web de gestión, facturación y control de pagos para parqueaderos.**

ParkControl es una aplicación web diseñada para administrar las operaciones de un parqueadero, permitiendo gestionar vehículos, registrar ingresos y salidas, calcular tarifas según el tiempo de permanencia, generar facturas y controlar los pagos realizados.

El proyecto utiliza una arquitectura cliente-servidor basada en servicios independientes, implementados mediante contenedores Docker para facilitar su configuración, ejecución y comunicación.

---

## 📌 Características principales

- **Gestión de vehículos:** registro y consulta de vehículos mediante su placa y tipo.
- **Control de ingresos y salidas:** registro de entrada y salida de vehículos del parqueadero.
- **Cálculo de tarifas:** cálculo automático del valor a pagar según el tiempo de permanencia y las tarifas configuradas.
- **Facturación:** generación de comprobantes asociados a los servicios de parqueadero.
- **Gestión de pagos:** registro de pagos mediante diferentes métodos, como efectivo y transferencia.
- **Historial de operaciones:** consulta de facturas, ingresos, salidas y transacciones.
- **Panel de control:** visualización de información general sobre ocupación y recaudos.

## 🛠️ Tecnologías utilizadas

| Componente | Tecnología |
|---|---|
| Frontend | Angular |
| Backend | NestJS |
| Lenguaje | TypeScript |
| Base de datos | PostgreSQL 16 |
| Contenedores | Docker |
| Orquestación | Docker Compose |
| Servidor web | Nginx |
| Comunicación | API REST / HTTP |

## 🏗️ Arquitectura del proyecto

ParkControl utiliza una arquitectura distribuida en tres servicios independientes, cada uno ejecutado en su propio contenedor Docker.

### Componentes

**1. Frontend – Angular**

Responsable de la interfaz de usuario y la interacción con el sistema. Permite gestionar vehículos, registrar operaciones, consultar facturas y visualizar información del parqueadero.

**2. Backend – NestJS**

Encargado de procesar las solicitudes del frontend, implementar las reglas de negocio, calcular las tarifas, gestionar las facturas y registrar los pagos. Se comunica con PostgreSQL para almacenar y consultar la información.

**3. Base de datos – PostgreSQL**

Almacena la información relacionada con vehículos, registros de estacionamiento, tarifas, facturas y transacciones.

### Comunicación entre contenedores

Los servicios se ejecutan dentro de una red virtual de tipo `bridge`, administrada por Docker Compose.

- Angular se comunica con NestJS mediante solicitudes HTTP.
- NestJS se conecta a PostgreSQL utilizando el nombre del servicio `database` como dirección del servidor.
- PostgreSQL conserva los datos mediante un volumen persistente de Docker.

## 📂 Estructura del proyecto

```text
ParkControl/
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── .dockerignore
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── .dockerignore
│   └── package.json
│
├── database/
│
├── docker-compose.yml
├── .env
├── .env.example
├── .gitignore
└── README.md
```

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalados:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Docker Compose (incluido en Docker Desktop).

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

Ingresar a la carpeta principal:

```bash
cd ParkControl
```

### 2. Configurar las variables de entorno

Crear el archivo `.env` en la raíz del proyecto, tomando como referencia `.env.example`.

Ejemplo:

```dotenv
APP_NAME=ParkControl
APP_ENV=development

FRONTEND_PORT=4200
BACKEND_PORT=3000

DB_HOST=database
DB_PORT=5432
DB_USER=parkcontrol
DB_PASSWORD=CAMBIAR_PASSWORD
DB_NAME=parkcontrol_db

POSTGRES_VERSION=16
```

**Importante:** No publicar el archivo `.env` en el repositorio. Las credenciales deben mantenerse privadas.

### 3. Iniciar Docker Desktop

Abrir Docker Desktop y esperar a que el motor de Docker esté funcionando.

### 4. Construir e iniciar los contenedores

Desde la carpeta principal del proyecto, ejecutar:

```bash
docker compose up --build -d
```

Este comando construye las imágenes de los servicios e inicia los contenedores definidos en `docker-compose.yml`.

### 5. Verificar los contenedores

```bash
docker compose ps
```

Para consultar los registros:

```bash
docker compose logs
```

Para consultar los registros de un servicio específico:

```bash
docker compose logs backend
```

```bash
docker compose logs frontend
```

```bash
docker compose logs database
```

## 🌐 Acceso a los servicios

Una vez iniciados correctamente los contenedores, los servicios estarán disponibles en las siguientes direcciones:

| Servicio | Dirección |
|---|---|
| Aplicación web | http://localhost:4200 |
| API Backend | http://localhost:3000 |
| PostgreSQL | localhost:5432 |

> Las direcciones corresponden a los puertos configurados en Docker Compose. Si se modifican las asignaciones de puertos, también cambiarán las direcciones de acceso.

## 🐳 Comandos Docker

| Comando | Descripción |
|---|---|
| `docker compose up -d` | Inicia los servicios. |
| `docker compose up --build -d` | Construye e inicia los servicios. |
| `docker compose ps` | Muestra el estado de los contenedores. |
| `docker compose logs` | Muestra los registros de ejecución. |
| `docker compose logs -f` | Sigue los registros en tiempo real. |
| `docker compose restart` | Reinicia los servicios. |
| `docker compose down` | Detiene y elimina los contenedores. |
| `docker compose build` | Reconstruye las imágenes. |

**Nota:** `docker compose down` conserva los datos de PostgreSQL almacenados en el volumen. No utilizar `docker compose down -v` salvo que se desee eliminar también los datos persistentes.

## 🔐 Persistencia de datos

La base de datos PostgreSQL utiliza un volumen Docker para conservar la información aunque los contenedores se detengan o se eliminen.

```yaml
volumes:
  postgres_data:
```

Esto permite mantener los registros del sistema entre diferentes ejecuciones del proyecto.

## 🎯 Objetivo del proyecto

Desarrollar un sistema web que facilite la administración de las operaciones de un parqueadero, integrando tecnologías modernas de desarrollo y herramientas de contenerización para implementar una arquitectura modular, organizada y reproducible.

El proyecto también busca demostrar la construcción, configuración y comunicación entre servicios independientes mediante Docker y Docker Compose.

## 👨‍💻 Autores

Proyecto académico desarrollado como ejercicio práctico de integración de aplicaciones y contenerización con Docker.

Andrea Figueroa
---

**ParkControl – Gestión inteligente de parqueaderos.**