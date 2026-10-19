# Verificacion del proyecto

Validacion realizada el 19 de octubre de 2026 en Docker Desktop, con contenedores Linux.

- Construccion de las cuatro imagenes: correcta.
- Ocho contenedores principales: saludables (Gateway, empleados, nomina, reclutamiento, dos PostgreSQL, MongoDB y Redis).
- Tres pruebas automatizadas del calculo de nomina: aprobadas.
- Prueba de integracion: aprobada. Login, rechazo sin token, credenciales incorrectas, datos faltantes, CRUD de empleados y baja logica, filtro por departamento, duplicados, calculo e historial de nomina, vacantes, candidatos y cambio de estado.
- Ejemplo monetario: extras 46.88 y neto 1579.38.
- Endpoint Prometheus `/metrics`: responde correctamente.
- Redis: eventos publicados por empleados y reclutamiento recibidos por nomina y Gateway, comprobados en logs.
- Datos de prueba: se conservaron un empleado desactivado, su rol de pago, una vacante y un candidato en entrevista.

Para repetir los flujos: `npm run test:integration`. Esta prueba crea registros nuevos. Para la verificacion de calculos sin Docker: `npm test`.

No se ha generado el informe academico PDF ni capturas de pantalla. La auditoria de dependencias conserva los cinco avisos indirectos documentados en el README.

Comprobaciones finales: token invalido rechazado con 401; Prometheus activo en el puerto 9090 y sus cuatro destinos de metricas en estado up, sin errores de recoleccion.

