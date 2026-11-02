## Hábitos de Seguridad

* **Variables de entorno requeridas:** `PORT` (puerto del servidor) y `FRONTEND_ORIGIN` (URL permitida para peticiones cruzadas).
* **Archivos excluidos del control de versiones:** `.env` no se sube al repositorio para proteger credenciales y configuraciones locales.
* **CORS vs Autenticación:** CORS (Cross-Origin Resource Sharing) solo instruye al navegador sobre qué orígenes web están autorizados para leer la respuesta de la API. No autentica usuarios ni bloquea clientes HTTP directos como Postman o cURL.
* **Medidas pendientes para producción:** 
  - Implementación de HTTPS para cifrar el tráfico.
  - Rate limiting para prevenir ataques de denegación de servicio (DDoS) o fuerza bruta.
  - Password hashing para proteger credenciales en la base de datos.