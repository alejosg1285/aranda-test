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