# 🎬 API de Catálogo de Películas

Este proyecto es una API RESTful construida con **Node.js, Express y TypeScript**, utilizando **PostgreSQL con Sequelize** como base de datos. Incluye autenticación con **JWT**, documentación con **Swagger** y soporte para **Docker**.

## 📌 Tecnologías Usadas

- **Node.js** + **TypeScript**
- **Express.js** (Framework para manejar rutas y peticiones)
- **Sequelize** (ORM para manejar PostgreSQL)
- **JWT (JSON Web Tokens)** (Para autenticación)
- **Joi** (Validación de datos)
- **Swagger** (Documentación interactiva)
- **Docker** (Contenedores para base de datos)
- **Nodemon** (Recarga automática en desarrollo)

---

## 📌 Instalación

### 🔹 **1. Clonar el Repositorio**

```bash
git clone https://github.com/tu-usuario/backend-movies.git
cd backend-movies
```

### 🔹 **2. Instalar Dependencias**

```bash
npm install
```

### 🔹 **3. Configurar Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto y copia el siguiente contenido:

```env
PORT=5000
DB_NAME=movies_db
DB_USER=postgres
DB_PASS=admin
DB_HOST=localhost
JWT_SECRET=secreto_super_seguro
```

## 📌 Uso con Docker (Opcional)

### 🔹 **1. Levantar PostgreSQL con Docker**

Si no tienes PostgreSQL instalado, usa Docker:

```bash
docker run --name postgres-movies -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=movies_db -p 5432:5432 -d postgres
```

Esto iniciará un contenedor PostgreSQL en el puerto 5432.

## 📌 Base de Datos con Sequelize

### 🔹 **1. Configurar Sequelize**

```bash
npx sequelize-cli init
```

Esto generará las carpetas:

```
📂 config
📂 migraciones
📂 modelos
📂 seeders
```

### 🔹 **2. Crear Migraciones**

```bash
npx sequelize-cli modelo:generate --name Usuario --attributes email:string,contraseña:string
npx sequelize-cli modelo:generate --name Categoría --attributes nombre:string
npx sequelize-cli modelo:generate --name Movie --attributes título:string,descripción:texto,categoryId:integer
```

### 🔹 **3. Ejecutar Migraciones**

```bash
npx sequelize-cli db:migrate
```

Si necesitas deshacer una migración:

```bash
npx sequelize-cli db:migrate:undo
```

Para deshacer todas las migraciones:

```bash
npx sequelize-cli db:migrate:undo:all
```

## 📌 Insertar Datos con Seeders

### 🔹 **1. Crear los Seeders**

```bash
npx sequelize-cli seed:generate --name demo-users
npx sequelize-cli seed:generate --name demo-categories
npx sequelize-cli seed:generate --name demo-movies
```

### 🔹 **2. Ejecutar los Seeders**

```bash
npx sequelize-cli db:seed:all
```

Para deshacer un seeder:

```bash
npx sequelize-cli db:seed:undo
```

Para deshacer todos los seeders:

```bash
npx sequelize-cli db:seed:undo:all
```

## 📌 Ejecutar el Servidor

### 🔹 **1. En Desarrollo**

```bash
npx nodemon
```

Esto iniciará el servidor en http://localhost:5000.

### 🔹 **2. En Producción**

```bash
npx tsc
node dist/index.js
```

## 📌 Documentación con Swagger

### 🔹 **1.Instalación**

```bash
npm install swagger-ui-express swagger-jsdoc
```

### 🔹 **2. Acceder a Swagger**

Levanta el servidor y abre:

```
http://localhost:5000/api-docs
```

Desde ahí puedes probar los endpoints interactivos sin necesidad de Postman.

## 📌 Endpoints Principales

### 🔹 **Autenticación**

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| POST | /api/auth/register | Registrar usuario |
| POST | /api/auth/login | Iniciar sesión y obtener token |

### 🔹 **Usuarios**

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| GET | /api/users | Obtener todos los usuarios (Requiere JWT) |
| GET | /api/users/:id | Obtener usuario por ID (Requiere JWT) |
| PUT | /api/users/:id | Actualizar usuario (Requiere JWT) |
| DELETE | /api/users/:id | Eliminar usuario (Requiere JWT) |

### 🔹 **Películas**

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| POST | /api/movies | Crear película (Requiere JWT) |
| GET | /api/movies | Obtener todas las películas |
| GET | /api/movies/:id | Obtener película por ID |
| PUT | /api/movies/:id | Actualizar película (Requiere JWT) |
| DELETE | /api/movies/:id | Eliminar película (Requiere JWT) |

### 🔹 **Categorías**

| Método | Endpoint | Descripción |
| ------ | -------- | ----------- |
| POST | /api/categories | Crear categoría (Requiere JWT) |
| GET | /api/categories | Obtener todas las categorías |
| GET | /api/categories/:id | Obtener categoría por ID |
| PUT | /api/categories/:id | Actualizar categoría (Requiere JWT) |
| DELETE | /api/categories/:id | Eliminar categoría (Requiere JWT) |

## 📌 Desplegar con Docker (Opcional)

Si quieres levantar la API en un contenedor, crea un Dockerfile:

### 📌 Archivo Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD ["npx", "nodemon"]
EXPOSE 5000
```

### 🔹 **1. Construir la imagen Docker**

```bash
docker build -t backend-movies .
```

### 🔹 **2. Correr el Contenedor**

```bash
docker run -p 5000:5000 backend-movies
```

## 📌 Contribuciones

Si quieres contribuir, haz un fork y un pull request. Para reportar errores, abre un problema en el repositorio.

## 📌 Licencia

Proyecto bajo la MIT License.
