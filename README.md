# IncubadoraFrontend

Nuestro proyecto tiene como funcionalidad poder brindar acceso a usuarios a una plataforma online de cursos,la fundacion permitiria la capacitacion de personas para su insercion en el mundo IT 

## Instrucciones

* **Instalar la base de datos usando la nueva estructura**

* *Agregar en la raiz de la carpeta del backend agregado un archivo .env con la siguiente  configuracion  agregada(configuracion servidor ,el nombre de la base de datos puede ser otro consideren la situacion(borrar - o crear a la par):*

```Markdown

DB_HOST=localhost
DB_USER=
DB_PASS=
DB_NAME=NOC
DB_PORT=
```
 * *para autenticacion con github:   https://github.com/settings/developers  , Crear una nueva OAuth App y obtener estos datos*

```Markdown

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CALLBACK_URL=http://localhost:3000/github/callback

```
###   Correr el proyecto con estos comandos:
    1.       clonar el repositorio correspondiente al backend en sus carpetas locales     
    2.       desde consola o sus Ide de preferencia  estando  en la carpeta del proyecto 
    
    3.                       npm run db:reset
    
    4.                       npm run start 

### Tegnologias
* **MYSQL**
* **SEQUELIZE**
* **NODEJS**
* **ANGULAR**







![Inicio](Img/inicio.png)


![Acceso](/Img/acceso.png)


![Inicio](Img/cursos.png)


