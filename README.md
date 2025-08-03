# README del fullstack

## Backend
El directorio backendRedcomex tiene todos los archivos/packetes fuentes de JAVA para abrirlos desde intellij. Allí también está el 'Dockerfile.backend' para generar el contenedor del backend que toma el src, resources y lib para generar el FAT JAR que creará la imagen del contenedor.

## Frontend
El directorio frontendRedcomex contiene todos los archivos fuentes de react+vite+nginx y sus dependencias en el package.json, listos para generar la imagen del Frontend usando el 'Dockerfile.frontend' el cual usará 2 stages, 1 para generar el compilado con 'npm run build' y otro para generar la imagen que correrá el nginx con las fuentes creadas a partir del primer stage.

## Database
El directorio Database contiene el SQL que usará el contenedor de MYSQL para generar toda la base de datos necesaria para el aplicativo el cual se cargará desde el docker-compose.

Requerimientos de configuración:

1. Para que el contenedor de mysql corra correctamente, se debe crear un archivo '.env' en el mismo nivel del docker-compose.yml con los datos:

MYSQL_ROOT_PASSWORD=<acá su password root>
MYSQL_USER=<usuario de lectura>
MYSQL_PASSWORD=<password usuario lectura>

2. Para que el backend en Java pueda conectarse correctamente con la base de datos mysql, es necesario ingresar el password root que se puso en el .env creado, ingresarlo en este archivo /proyectofinal-fullstack/backendRedcomex/RedComex/resources/db.properties en el campo 'db.password='

3. Se debe modificar la variable de entorno /frontendRedcomex/.env.production con la url en la que se públique el alpicativo, ejemplo si es un localhost de prueba:

VITE_API_BASE_URL=https://localhost/api

ejemlpo si fuese un nombre de dominio de aws:

VITE_API_BASE_URL=https://ec2-54-210-54-104.compute-1.amazonaws.com/api

4. En el directorio Database hay 2 archivos sql:
    redcomex.sql: carga la estructura completa de la base de datos solo con el usuario administrador, paises completos en la tabla paises, los 4 productos en la tabla productos y algunos aranceles en la tabla aranceles.
    redcomexmodi-PreCargaPruebas.sql: Pre-Carga datos en todas las tablas con las cualaes se puede mirar un ejemplo completo de reportes tanto en las cuentas de Administrador como en las de usuarios. Los passwords de usuarios precargados están compuestos por el NombreEnMinuscula+123.
    Los datos del usuario administrador principal son:  
        correo: administrador@gmail.com  
        password: password123  