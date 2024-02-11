# aranda-test

## Backend

DotNet version: 7.0405

### Configuración inicial

Actualizar la cadena de conexión a la base de datos en el archivo *appsettings.Development.json* ubicado en la ruta `backend\Api`

```
"ConnectionStrings": {
    "ConnectionDb": "Nueva_Cadena_Conexion"
  }
```

### Ejecutar migraciones
En la consola de comandos ubicarse a nivel de la carpeta `backend` del proyecto y ejecutar el siguiente comando:
```
backend>dotnet ef database update -s Api -p Persistence
```
Si la conexión a la base de datos es satisfactoria deben verse creadas las tablas definidas por las migraciones.

### Ejecutar aplicación
En la consola de comandos ubicarse a nivel de la carpeta `backend\Api` del proyecto y ejecutar el siguiente comando:
```
backend>dotnet run
```
La aplicación se ejecutará por defecto en el puerto `5117`

## Frontend

### Instalar dependencias
En la consola de comandos ubicarse a nivel de la carpeta `frontend` del proyecto y ejecutar uno de los siguientes comandos:
```
frontend>npm install
```
o
```
frontend>yarn
```

### Actualizar url endpoints
Si la aplicación `backend` está corriendo en un puerto diferente al `5117` se debe actualizar la url base en el archivo `.env` ubicado en la carpeta `frontend`
```
REACT_APP_BASE_URL=http://localhost:5117/
```