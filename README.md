# DESPIERTA TU ESENCIA - WhatsApp IA Espiritual 🌟

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/despierta-whatsapp)

Asistente espiritual inteligente para WhatsApp con IA, análisis emocional y monetización ética.

## ✨ Características

- 🤖 **IA Dual**: Hugging Face (Mistral-7B) + ChatLLM (Abacus.AI) fallback
- 💙 **Loops Emocionales**: Sistema de 3 pasos (escucha → valida → orienta)
- 📊 **Niveles de Chat**: Básico (1), Emocional (2), Donación (3)
- 💾 **Persistencia**: Airtable para conversaciones, donaciones y aprendizaje
- 📢 **Alertas**: Notificaciones Telegram para sentimientos negativos
- 🔗 **Integración**: Activepieces Cloud, Evolution API, Railway
- 💰 **Monetización**: PayPal con sugerencia suave

## 🚀 Quickstart (5 minutos)

### 1. Instalación Local
```powershell
git clone https://github.com/despiertatuesencia69/DESPIERTA.git
cd DESPIERTA
npm install
```

### 2. Configurar Credenciales
```powershell
# Copia el ejemplo y edita con tus credenciales
cp .env.example .env
# Edita .env con tus tokens
```

**Credenciales mínimas necesarias:**
- `AIRTABLE_KEY` y `AIRTABLE_BASE_ID` → https://airtable.com/account
- `CHATLLM_KEY` → https://abacus.ai (ya incluida)
- `HF_TOKEN` → https://huggingface.co/settings/tokens
- `TELEGRAM_TOKEN` → @BotFather en Telegram

### 3. Arrancar Servidor
```powershell
npm run dev
```

Verás:
```
🚀 Servidor activo en puerto 3000
💡 Health check: http://localhost:3000/
📥 Webhook: POST http://localhost:3000/webhook/whatsapp
```

### 4. Probar Localmente
```powershell
# Health check
Invoke-RestMethod http://localhost:3000/

# Enviar mensaje de prueba
Invoke-RestMethod -Method Post -Uri http://localhost:3000/test/message `
  -ContentType application/json `
  -Body '{"user":"test","message":"Hola, me siento triste"}'
```

## 📋 Setup Completo

Ver archivo **[CHECKLIST_COMPLETO.md](CHECKLIST_COMPLETO.md)** para:
- ✅ Crear tablas en Airtable
- ✅ Configurar Telegram Bot
- ✅ Conectar WhatsApp via Evolution API
- ✅ Deploy en Railway
- ✅ Integrar con Activepieces Cloud

## 🔗 Orquestación con Activepieces Cloud

Ahora puedes usar [Activepieces Cloud](https://cloud.activepieces.com/) para automatizar y orquestar tu flujo de WhatsApp, IA y alertas sin costo.

**Pasos básicos:**
1. Crea cuenta en https://cloud.activepieces.com/
2. Crea un nuevo flujo (flow) y selecciona el trigger "Webhook".
3. Copia la URL del webhook generado y configúralo en Evolution API como destino para mensajes entrantes.
4. Añade pasos (pieces) para:
   - Llamar a tu backend (`POST /webhook/whatsapp`)
   - Procesar respuestas, guardar en Airtable, enviar alertas a Telegram, etc.
5. Puedes usar HTTP, Airtable, Telegram y otros connectors nativos de Activepieces.
6. Activa el flujo y prueba enviando mensajes desde WhatsApp.

**Ejemplo de flujo:**
```
WhatsApp → Evolution API → Webhook (Activepieces) → Backend Express
    ↓
Procesamiento IA, guardado en Airtable, alertas Telegram
    ↓
Respuesta → Evolution API → WhatsApp
```

Consulta la guía `GUIA_PASO_A_PASO.md` para detalles y ejemplos de payloads.

## 🛠️ Comandos Disponibles

```powershell
npm start          # Producción
npm run dev        # Desarrollo con nodemon
npm test           # Tests con Jest
npm run lint       # ESLint
npm run format     # Prettier
```

## 📁 Estructura del Proyecto

```
DESPIERTA/
├── src/
|   ├── services/      # IA, Airtable, WhatsApp, Telegram
|   ├── config/        # Variables de entorno
|   └── utils/         # Helpers
├── tests/             # Tests unitarios
├── server.js          # Servidor Express principal
├── .env               # Credenciales (NO SUBIR)
├── railway.json       # Config Railway
├── Procfile           # Heroku/Railway
└── (opcional) workflows Activepieces (JSON)
```

## 🌐 Deploy en Railway

1. **Push a GitHub:**
```powershell
git add .
git commit -m "feat: ecosistema completo"
git push origin main
```

2. **Railway:**
- Ve a https://railway.app/new
- Deploy from GitHub → `despiertatuesencia69/DESPIERTA`
- Variables → Pega todo tu `.env`
- Deploy automático ✅

3. **Configurar Evolution:**
- Crea instancia en Evolution API
- Escanea QR de WhatsApp
- Webhook: `https://tu-app.up.railway.app/webhook/whatsapp`

## 🔐 Seguridad

- ✅ `.env` está en `.gitignore` (no se sube)
- ✅ Usa variables de entorno en Railway
- ✅ Tokens nunca en código fuente
- ✅ HTTPS obligatorio en producción

## 📊 Endpoints API

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Health check |
| POST | `/webhook/whatsapp` | Webhook principal (Evolution/n8n) |
| POST | `/test/message` | Test local sin WhatsApp |

## 🐛 Troubleshooting

**Problema:** "Cannot find module"
```powershell
npm install
```

**Problema:** "Airtable save failed"
- Verifica que las tablas "Conversaciones" y "Donaciones" existan
- Revisa que los nombres de campos coincidan exactamente

**Problema:** No llegan mensajes de WhatsApp
- Verifica webhook en Evolution API
- Revisa logs: `railway logs` o consola local


## 📝 Variables de Entorno

Ver [`.env.example`](.env.example) para lista completa.

**Obligatorias:**
- AIRTABLE_KEY, AIRTABLE_BASE_ID
- CHATLLM_KEY (ya incluida)

**Opcionales pero recomendadas:**
- HF_TOKEN (IA principal)
- TELEGRAM_TOKEN, TELEGRAM_CHAT_ID
- EVOLUTION_URL, EVOLUTION_KEY, EVOLUTION_INSTANCE
- FB_PAGE_TOKEN, GOOGLE_CALENDAR_ID, PAYPAL_LINK

## 🤝 Contribuir

1. Fork el repo
2. Crea branch: `git checkout -b feature/nueva-feature`
3. Commit: `git commit -m 'feat: nueva feature'`
4. Push: `git push origin feature/nueva-feature`
5. Abre Pull Request

## 📄 Licencia

MIT License - siente libre de usar para tu proyecto.

## 💬 Soporte

- 📧 Email: despiertatuesencia69@gmail.com
- 🐛 Issues: https://github.com/despiertatuesencia69/DESPIERTA/issues
- 📱 Telegram: @despiertaalertasbot

---

Hecho con 💜 por Despierta Tu Esencia
