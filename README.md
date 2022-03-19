# Web Page-MyShelf

Department: Engineering
Stage: In Progress
Starting Date: March 10, 2022

## Descripción

Pagina web para organizar mis libros y sus autores, construida con MongoDB, Express, EJS y Node.JS; usando el diseño de modelo-vista-controlador y desplegado con Heroku.

## Vistas - Paginas

- Recientes
- Libros
- Agregar libro
- Autores
- Agregar Autores

## Funcionalidad - Modelos

- **Autor**
    - Agregar
    - Editar datos
    - Buscar
    - Eliminar
    - Ver Autores
    - Datos: Nombre
- **Libro**
    - Agregar
    - Editar datos
    - Buscar
    - Filtrar
    - Eliminar
    - Ver Autor
    - Ver Libros
    - **Datos:** Titulo - Autor - Fecha de publicación - Cantidad de Páginas - Caratula - Descripción

## Herramientas

- **MongoDB**: Sistema de base de datos NoSQL mediante JSON
- **Express**: Paquete de Node.js para manejar la lógica del lado del servidor
- **Ejs:** Preprocesador/Lenguaje de plantillas para generar HTML con JS
- **Node.js:** El entorno de ejecución en JS del servidor
- **Heroku:** Herramienta da publicación gratuita de paginas web.

## Patrón de Diseño

- **MVN Framework**
    - **Model**: Incluye todos los datos y la lógica relacionada para acceder a la misma
    - **View**: Presenta los datos al usuario e interactúa con el mismo.
    - **Controller**: Interfaz intermediaria para manejar la peticiones del usuario

## Springs

Ciclos iterativos del proyecto, duración de una 2 día.

### Sping 1 ✅

1. Configuración del entorno
2. Configuración del servidor
3. Controlador de rutas de Autor (Index/Create/New)

### Spring 2 ✅

1. Controlador de rutas de Libros (Index/Create/New)
2. Configuración de subida de archivos a DB en vez del servidor
3. Controladores restantes rutas del Autor (Show/Edit/Update/Deletes)
4. Controladores restantes rutas del Libros (Show/Edit/Update/Deletes)

### Spring 3 ✅

1. Estilos de Fondo, Encabezados, botones y formularios
2. Subir y configurar el heroku

## Deployment

[Github](https://github.com/labrdev/myshelf-web) / [Heroku](https://myshelf-br.herokuapp.com/books/623668e10057122844516c0e)
