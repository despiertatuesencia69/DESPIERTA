# Guía paso a paso (ES) – Despierta Tu Esencia

Esta guía te lleva, paso a paso y en español, para dejar todo funcionando: Airtable, Telegram, IA (Hugging Face), WhatsApp (Evolution API), Activepieces Cloud y deploy en Railway. Incluye enlaces oficiales, variables de entorno y pruebas con endpoints en español.

---

## 1) Requisitos previos

- Cuenta en GitHub (para el repo) – https://github.com/
- Node.js 18+ instalado
- Cuenta en Airtable – https://airtable.com/
- Cuenta en Telegram (y app móvil) – https://telegram.org/
- Cuenta en Hugging Face – https://huggingface.co/
- Cuenta en Railway (deploy) – https://railway.app/
- Activepieces Cloud – https://cloud.activepieces.com/ (docs: https://docs.activepieces.com/)
- Evolution API (WhatsApp) – SaaS: https://evolution-api.com/ o self-host (repo: https://github.com/EvolutionAPI/evolution-api)

Sugerido: abrir este repo en VS Code y crear un archivo `.env` (ya está gitignored) copiando `.env.example` y completando valores a medida que avances.

---

## 2) Airtable – Tablas en español

Tablas ya previstas (en español):
- "Conversaciones" y "Donaciones" (CSV listos en `airtable-import/`).

Pasos:
1. Crea una Base en Airtable (por ejemplo: "Despierta Tu Esencia").
2. Crea un Token (PAT): https://airtable.com/create/tokens (o desde tu cuenta: https://airtable.com/account)
3. Obtén el "Base ID": abre tu base y entra a la documentación de la API de esa base (Developers / API) o usa la URL del API. Guía: https://airtable.com/developers/web/api/introduction
4. Importa los CSV desde la carpeta `airtable-import/` para crear las tablas "Conversaciones" y "Donaciones" con sus campos.

Variables de entorno:
- AIRTABLE_KEY="pat_xxx"
- AIRTABLE_BASE_ID="appXXXXXXXXXXXXXX"

Prueba rápida (modo mock si faltan credenciales):
- Endpoint: POST http://localhost:3000/prueba/mensaje
- Body JSON:
  {
    "usuario": "prueba1",
    "mensaje": "hola, cómo estás?"
  }

---

## 3) Telegram – Alertas (sentimiento negativo)

Pasos:
1. Crea tu bot con @BotFather (https://t.me/BotFather) → /newbot y sigue instrucciones. Copia el token.
2. Obtén tu Chat ID:
   - Escribe a tu bot un "hola".
   - Luego abre: https://api.telegram.org/bot<TELEGRAM_TOKEN>/getUpdates y busca tu chat.id.
   - Alternativas: @userinfobot o @getidsbot en Telegram.

Variables de entorno:
- TELEGRAM_TOKEN="123456:ABC..."
- TELEGRAM_CHAT_ID="123456789"

Prueba:
- Endpoint: POST http://localhost:3000/prueba/telegram
- Body JSON:
  { "texto": "Prueba de alerta desde Despierta" }

Si no hay credenciales, se verá en logs como "[Telegram Mock]" sin enviar nada.

---

## 4) Hugging Face – IA principal

Pasos:
1. Crea tu token: https://huggingface.co/settings/tokens
2. Modelo por defecto (ya configurado):
   - `HF_MODEL_URL` por defecto apunta a Mistral-7B Instruct v0.1
   - Puedes actualizar a v0.3: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.3 (usa su Inference API URL)

Variables de entorno:
- HF_TOKEN="hf_xxx"
- (Opcional) HF_MODEL_URL="https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3"

Prueba:
- Endpoint: POST http://localhost:3000/prueba/ia
- Body JSON:
  {
    "prompt": "Escribe una afirmación espiritual corta y amorosa.",
    "nivel": 1
  }

Sin token, responderá en modo mock (mensajes de ejemplo) para que todo funcione.

---

## 5) WhatsApp (Evolution API)

Opciones:
- SaaS: https://evolution-api.com/ (crea cuenta, API Key y URL base)
- Self-host: https://github.com/EvolutionAPI/evolution-api (necesitarás deploy propio)

Pasos generales (SaaS típico):
1. Crea una "instancia" (ej. `despierta-whatsapp`).
2. Obtén tu `EVOLUTION_KEY` y `EVOLUTION_URL`.
3. Abre sesión de WhatsApp y escanea el QR en el panel de Evolution para vincular el número.
4. Configura el webhook en Evolution apuntando a tu backend: `POST https://<tu-dominio-o-railway>/webhook/whatsapp`

Variables de entorno:
- EVOLUTION_URL="https://api.tu-proveedor-evolution.com"
- EVOLUTION_KEY="apikey_xxx"
- EVOLUTION_INSTANCE="despierta-whatsapp"

Prueba envío:
- Endpoint: POST http://localhost:3000/prueba/whatsapp
- Body JSON:
  {
    "usuario": "+521234567890",
    "texto": "Hola 🙏 Prueba Despierta"
  }

Sin credenciales, verás logs "[WhatsApp Mock]". Con credenciales, enviará el mensaje real.

---


## 6) Orquestación con Activepieces Cloud (GRATIS)

Activepieces Cloud te permite automatizar y conectar WhatsApp, IA, Airtable y Telegram sin costo.

Pasos:
1. Crea cuenta: https://cloud.activepieces.com/
2. Crea un nuevo flujo (flow) y elige el trigger "Webhook".
3. Copia la URL del webhook generado y configúralo en Evolution API como destino para mensajes entrantes.
4. Añade pasos (pieces) para:
   - Llamar a tu backend (`POST /webhook/whatsapp`)
   - Guardar en Airtable, enviar alertas a Telegram, etc.
5. Usa los conectores HTTP, Airtable, Telegram y más según tu necesidad.
6. Activa el flujo y prueba enviando mensajes desde WhatsApp.

Ejemplo de flujo:
```
WhatsApp → Evolution API → Webhook (Activepieces) → Backend Express
  ↓
Procesamiento IA, guardado en Airtable, alertas Telegram
  ↓
Respuesta → Evolution API → WhatsApp
```

---

## 7) Railway – Deploy

Pasos:
1. Crea cuenta: https://railway.app/
2. Conecta tu repo GitHub a Railway.
3. Variables de entorno en Railway (mismas que tu .env local):
   - PORT (opcional; si no, usa el que asigna Railway y respétalo)
   - HF_TOKEN, HF_MODEL_URL (si aplica)
   - AIRTABLE_KEY, AIRTABLE_BASE_ID
   - TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
   - EVOLUTION_URL, EVOLUTION_KEY, EVOLUTION_INSTANCE
   - PAYPAL_LINK
4. Despliega. Comprueba Health: `GET /` y `GET /salud`.

El repo incluye `railway.json` y `Procfile` para facilitar despliegue.

---

## 8) Endpoints (ES e inglés)

Salud:
- GET /salud (ES)
- GET / (EN)

Simular webhook WhatsApp:
- POST /prueba/mensaje (ES) – Body: { "usuario", "mensaje" }
- POST /test/message (EN) – Body: { "user", "message" }

IA directa:
- POST /prueba/ia (ES) – Body: { "prompt", "nivel" }
- POST /test/ai (EN) – Body: { "prompt", "level" }

Telegram:
- POST /prueba/telegram (ES) – Body: { "texto" }
- POST /test/telegram (EN) – Body: { "text" }

WhatsApp (enviar):
- POST /prueba/whatsapp (ES) – Body: { "usuario", "texto" }
- POST /test/whatsapp (EN) – Body: { "user", "text" }

Webhook de producción para Evolution:
- POST /webhook/whatsapp (backend recibe los mensajes entrantes)

---

## 9) Variables de entorno (resumen)

- PORT: puerto del servidor (por defecto 3000)
- HF_TOKEN, HF_MODEL_URL: IA principal (Hugging Face)
- CHATLLM_KEY: IA de respaldo (opcional)
- AIRTABLE_KEY, AIRTABLE_BASE_ID: base y token de Airtable
- EVOLUTION_URL, EVOLUTION_KEY, EVOLUTION_INSTANCE: WhatsApp (Evolution)
- TELEGRAM_TOKEN, TELEGRAM_CHAT_ID: alertas de Telegram
- PAYPAL_LINK: link a donaciones

Flags automáticos (no config necesarias):
- USE_MOCK_AI: activo si no hay HF_TOKEN ni CHATLLM_KEY
- USE_MOCK_AIRTABLE: activo si falta AIRTABLE_KEY o AIRTABLE_BASE_ID

---

## 10) Solución de problemas

- El servidor no arranca o se cierra (Exit code 1):
  - Instala dependencias: `npm install`
  - Revisa Node.js >= 18
  - Comprueba que el puerto 3000 no esté ocupado
  - Revisa logs en la terminal (errores de sintaxis, permisos, etc.)

- La IA responde "mock":
  - Falta HF_TOKEN o el servicio tuvo un fallo; revisa `HF_TOKEN` y `HF_MODEL_URL`.

- No se guardan datos en Airtable:
  - Verifica AIRTABLE_KEY y AIRTABLE_BASE_ID. Asegúrate de que las tablas se llamen "Conversaciones" y "Donaciones".

- Telegram no envía:
  - Verifica que escribiste al bot antes de usar `getUpdates` y que `TELEGRAM_CHAT_ID` sea correcto.

- WhatsApp no envía:
  - Revisa que la instancia esté "conectada" (QR escaneado) y que EVOLUTION_URL/KEY/INSTANCE sean correctos.

---

¿Listo para empezar? Avanza en orden: Airtable → Telegram → Hugging Face → Evolution → Activepieces → Railway. Si necesitas, podemos ejecutar cada prueba juntos y ajustar lo necesario.
