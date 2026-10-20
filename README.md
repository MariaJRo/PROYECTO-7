# Travel Destinations API

## Descripción

Este proyecto consiste en una API REST creada con Node.js, Express y MongoDB mediante Mongoose.

La API permite gestionar tres colecciones:

- **Users:** contiene información de los usuarios y sus roles.
- **Destinations:** contiene información sobre diferentes destinos turísticos.
- **Trips:** contiene información sobre viajes y las relaciones con los usuarios y destinos.

Los viajes están relacionados con un usuario mediante su ID y pueden tener varios destinos relacionados mediante un array de IDs. La API permite consultar los viajes junto con la información completa de sus destinos mediante `populate()`.

La API incluye autenticación mediante JWT y dos roles de usuario: `user` y `admin`.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- Bcrypt
- Insomnia
- dotenv

## Instalación

Para instalar las dependencias del proyecto:

```bash
npm install
```

Para iniciar el servidor:

```bash
npm start
```

El servidor se inicia en:

http://localhost:3000

Para iniciar el proyecto en modo desarrollo con Nodemon:

```bash
npm run dev
```

## Variables de entorno

El proyecto utiliza un archivo `.env` para configurar la conexión con MongoDB y la clave secreta de JWT.

## Endpoints

### Users

| Método | Endpoint               | Descripción                   |
| ------ | ---------------------- | ----------------------------- |
| POST   | /api/v1/users/register | Registra un nuevo usuario     |
| POST   | /api/v1/users/login    | Inicia sesión                 |
| GET    | /api/v1/users          | Obtiene todos los usuarios    |
| PUT    | /api/v1/users/:id      | Modifica el rol de un usuario |
| DELETE | /api/v1/users/:id      | Elimina un usuario            |

### Registrar un usuario

POST /api/v1/users/register

Registra un nuevo usuario.

Los usuarios se registran con el rol `user`.

Antes de registrar el usuario, se comprueba que el nombre de usuario no esté ya registrado. La contraseña se guarda cifrada mediante Bcrypt.

### Iniciar sesión

POST /api/v1/users/login

Comprueba las credenciales del usuario y devuelve un token JWT para acceder a las rutas protegidas.

### Obtener todos los usuarios

GET /api/v1/users

Obtiene todos los usuarios registrados en la base de datos.

### Modificar el rol de un usuario

PUT /api/v1/users/:id

Permite a un administrador modificar el rol de un usuario mediante su ID.

Los roles disponibles son `user` y `admin`.

### Eliminar un usuario

DELETE /api/v1/users/:id

Elimina un usuario mediante su ID.

Los administradores pueden eliminar cualquier usuario y los usuarios normales solo pueden eliminar su propia cuenta.

## Destinations

| Método | Endpoint                                | Descripción                                     |
| ------ | --------------------------------------- | ----------------------------------------------- |
| GET    | /api/v1/destinations                    | Obtiene los destinos verificados                |
| GET    | /api/v1/destinations/not-verified       | Obtiene los destinos pendientes de verificación |
| GET    | /api/v1/destinations/:id                | Obtiene un destino mediante su ID               |
| GET    | /api/v1/destinations/category/:category | Obtiene los destinos por categoría              |
| POST   | /api/v1/destinations                    | Crea un destino                                 |
| PUT    | /api/v1/destinations/:id                | Modifica un destino                             |
| DELETE | /api/v1/destinations/:id                | Elimina un destino                              |

### Obtener los destinos

GET /api/v1/destinations

Obtiene los destinos que están verificados en la base de datos.

### Obtener los destinos pendientes de verificación

GET /api/v1/destinations/not-verified

Obtiene los destinos que todavía no han sido verificados.

Esta ruta solo está disponible para los administradores.

### Obtener un destino

GET /api/v1/destinations/:id

Obtiene un destino concreto mediante su ID.

### Obtener destinos por categoría

GET /api/v1/destinations/category/:category

Obtiene los destinos que pertenecen a una categoría determinada.

Las categorías disponibles son:

- `urban`
- `coastal and island`
- `country side and rural areas`
- `resort towns`

### Crear un destino

POST /api/v1/destinations

Crea un nuevo destino. Es necesario estar autenticado.

Los destinos creados por usuarios normales quedan pendientes de verificación. Los creados por administradores se marcan como verificados.

### Modificar un destino

PUT /api/v1/destinations/:id

Modifica un destino mediante su ID.

Esta ruta solo está disponible para los administradores.

### Eliminar un destino

DELETE /api/v1/destinations/:id

Elimina un destino mediante su ID.

Esta ruta solo está disponible para los administradores.

## Trips

| Método | Endpoint                   | Descripción                                   |
| ------ | -------------------------- | --------------------------------------------- |
| GET    | /api/v1/trips              | Obtiene los viajes verificados                |
| GET    | /api/v1/trips/not-verified | Obtiene los viajes pendientes de verificación |
| GET    | /api/v1/trips/:id          | Obtiene un viaje mediante su ID               |
| POST   | /api/v1/trips              | Crea un viaje                                 |
| PUT    | /api/v1/trips/:id          | Modifica un viaje                             |
| DELETE | /api/v1/trips/:id          | Elimina un viaje                              |

### Obtener los viajes

GET /api/v1/trips

Obtiene los viajes que están verificados en la base de datos junto con la información completa de sus destinos mediante `populate()`.

### Obtener los viajes pendientes de verificación

GET /api/v1/trips/not-verified

Obtiene los viajes que todavía no han sido verificados.

Esta ruta solo está disponible para los administradores.

### Obtener un viaje

GET /api/v1/trips/:id

Obtiene un viaje concreto mediante su ID junto con la información de los destinos relacionados.

### Crear un viaje

POST /api/v1/trips

Crea un nuevo viaje relacionado con un usuario y uno o varios destinos. Es necesario estar autenticado.

Los viajes creados por usuarios normales quedan pendientes de verificación. Los creados por administradores se marcan como verificados.

### Modificar un viaje

PUT /api/v1/trips/:id

Modifica un viaje mediante su ID.

Esta ruta solo está disponible para los administradores.

Los destinos nuevos que se envíen se añaden a los que ya estaban relacionados con el viaje.

### Eliminar un viaje

DELETE /api/v1/trips/:id

Elimina un viaje mediante su ID.

Esta ruta solo está disponible para los administradores.

## Seed

El proyecto incluye una seed para introducir destinos turísticos iniciales en la base de datos.

Los datos se encuentran en:

`src/data/destinations.js`

La seed se encuentra en:

`src/utils/seeds/destinations.js`

Para ejecutar la seed:

```bash
npm run destinationsSeed
```

La seed conecta con MongoDB, elimina los destinos existentes y añade los destinos incluidos en el archivo de datos.

Además, la conexión con MongoDB se cierra al finalizar la ejecución, tanto si la seed termina correctamente como si se produce un error.

**Importante:** la seed elimina los destinos existentes antes de insertar los nuevos.

## Relación entre colecciones

El proyecto contiene dos relaciones entre colecciones:

- **Trips → Users:** cada viaje está relacionado con un usuario mediante su ID.
- **Trips → Destinations:** cada viaje puede tener varios destinos relacionados mediante un array de IDs.

Las relaciones se realizan mediante referencias de Mongoose y se utiliza `populate()` para obtener la información completa de los destinos relacionados.

```text
Trip
├── user
└── destinations
```

## Autenticación y roles

La API utiliza JWT para autenticar a los usuarios mediante un middleware.

Existen dos roles:

- **user:** puede registrarse, iniciar sesión y crear destinos y viajes.
- **admin:** puede consultar los elementos pendientes de verificación, modificar y eliminar destinos y viajes, consultar usuarios, modificar sus roles y eliminar usuarios.

Los usuarios se registran siempre con el rol `user`.

## Gestión de errores

La API devuelve mensajes específicos para diferentes situaciones.

También se controlan los errores producidos durante las operaciones de creación, actualización, consulta y eliminación.

## Scripts disponibles

| Comando                    | Descripción                    |
| -------------------------- | ------------------------------ |
| `npm start`                | Inicia el servidor             |
| `npm run dev`              | Inicia el servidor con Nodemon |
| `npm run destinationsSeed` | Ejecuta la seed de destinos    |

## Autor

**María José Rodríguez Mendoza**

Proyecto realizado como práctica de Backend.
