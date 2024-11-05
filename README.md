# NotiUNACH

**NotiUNACH** es una plataforma diseñada para que los estudiantes de la UNACH puedan compartir y acceder a noticias, publicaciones y eventos relevantes. El objetivo principal de la plataforma es fomentar la comunicación y colaboración dentro de la comunidad estudiantil, facilitando la difusión de información importante en la universidad.

## Características

- **Publicaciones de Noticias:** Los estudiantes pueden compartir noticias relacionadas con la universidad, actividades académicas y extracurriculares.
- **Sección de Comentarios:** Cada publicación permite que los usuarios comenten y debatan sobre los temas.
- **Categorías:** Las noticias están organizadas por categorías como Académicas, Eventos, Sociales, etc.
- **Sistema de Votación:** Los usuarios pueden votar por las publicaciones para destacar las más populares o relevantes.
- **Perfil de Usuario:** Los estudiantes pueden personalizar su perfil y seguir a otros usuarios para recibir notificaciones de sus publicaciones.

## Requisitos

- **Lenguaje de programación:** JavaScript
- **Framework de backend:** Django / Flask
- **Base de datos:** PostgreSQL / MySQL / SQLite
- **Frontend:** React.js / Vite.js
- **Dependencias adicionales:** 
  - Axios (para llamadas a la API en el frontend)
  - Bootstrap / TailwindCSS (para estilos)

## Instalación

Sigue estos pasos para instalar **NotiUNACH** en tu entorno local:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/NotiUNACH.git
2. Realiza la instalación de las dependencias en la carpeta raíz 
   ```bash
   npm install
3. Ingresa a la carpeta llamada "Backend" y has lo mismo
   ```bash
   npm install
4. Estando dentro de la carpeta backend deberás crear un archivo .env que contenga lo siguiente (esto nos servirá para la conexión a la base de datos)
   - DB_HOST
   - DB_USER
   - DB_PASSWORD
   - DB_NAME
   - DB_PORT
   - ACCESS_TOKEN_SECRET (debe generarse antes de agregarlo)
   - REFRESH_TOKEN_SECRET (debe generarse antes de agregarlo)
5. Teniendo ya listo esa parte, deberemos asegurarnos de que las rutas de almacenamiento estén creadas, para ello haremos lo siguiente
   - Dirigirnos a la carpeta backend
   - Dirigirnos a la carpeta "localstorage"
   - Dentro de esta carpeta deben existir dos carpetas más de nombres: "images" y "profilePictures", si no existen, favor de crearlas
6. Otro archivo que se deberá modificar será el archivo que contiene la ruta de la API a la que nos conectaremos, para ello deberemos modificar dos cosas
   - Archivo llamado "constants.jsx" lo único que modificaremos en esta parte será la dirección ip en la que se estará ejecutando el servidor, en caso de ejecutarse en localhost, se deberá especificar en este archivo la dirección "http://localhost:5000/api". Sin embargo, no recomiendo usar localhost ya que los dispositivos que quieran conectarse al servidor no podrán acceder a la dirección de la API
   - Ahora, deberemos corregir la ruta en la que se publican las imágenes de nuestro editor de texto. Para ello nos dirigiremos al archivo llamado "addImages.js", donde deberemos de corregir la dirección ip que nos retorna como url, esto porque si no corregimos esta parte, las imágenes se almacenarán pero no las encontrará nuestro servidor
7. Habiendo corregido todas estas partes ya solo queda crear la base de datos asociada a este proyecto, hacer la conexión y ejecutar el servidor
8. Para ejecutar el servicio de node utilice el siguiente comando (estando ubicado en la carpeta backend)
     ```bash
     npm start
9. Para ejecutar el servidor de react utilice el siguiente comando (estando ubicado en la carpeta raíz)
    ```bash
    npm run dev -- --host "dirección ip"
10. Todo está listo para utilizarse
