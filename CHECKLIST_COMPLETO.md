# ✅ CHECKLIST COMPLETO - DESPIERTA TU ESENCIA

## 🟢 YA COMPLETADO
- [x] Backend Express funcionando (server.js)
- [x] Estructura modular (src/services, src/config, src/utils)
- [x] Integración con Airtable (credenciales configuradas)
- [x] Fallback de IA (ChatLLM configurado)
- [x] Loops emocionales (nivel 1/2/3)
- [x] Variables de entorno (.env creado)
- [x] Deploy config (railway.json, Procfile)
- [x] Documentación (README.md)

## 🟡 PENDIENTE - CRÍTICO (necesario para funcionar)

### 1. Crear tablas en Airtable
**Acción requerida:** Ve a https://airtable.com/appelvXvY8ZB7hn3s
Crea estas 2 tablas exactamente así:

**Tabla: Conversaciones**
- user_id (Single line text)
- mensaje (Long text)
- respuesta (Long text)
- timestamp (Date)
- contexto_score (Number)

**Tabla: Donaciones**
- user_id (Single line text)
- fecha (Date)

### 2. Obtener Token de Telegram Bot
**Acción requerida:**
1. Abre Telegram y busca @BotFather
2. Envía: `/newbot`
3. Nombre: Despierta Alertas Bot
4. Username: @despiertaalertasbot (si está tomado, usa otro)
5. Copia el token que te da (formato: `123456:ABC-DEF1234ghIkl...`)
6. Añádelo a .env como: `TELEGRAM_TOKEN=tu_token_aquí`

### 3. Configurar Evolution API (WhatsApp)
**Opción A - Evolution API Cloud:**
1. Ve a https://evolution-api.com o despliega en Railway
2. Crea instancia: `despierta-whatsapp`
3. Obtén API Key y URL
4. Actualiza .env:
   - EVOLUTION_URL=https://tu-instancia.up.railway.app
   - EVOLUTION_KEY=tu_api_key
5. Escanea QR para conectar WhatsApp

**Opción B - Usar n8n con WhatsApp Cloud API:**
(instrucciones en archivo n8n-workflow-despierta.json)

### 4. Token Hugging Face (IA principal)
**Acción requerida:**
1. Ve a https://huggingface.co/settings/tokens
2. Crea token (tipo: Read)
3. Añade a .env: `HF_TOKEN=hf_...`

## 🟠 PENDIENTE - OPCIONAL (mejoras)

### 5. Google Sheets para publicaciones
1. Ve a https://console.cloud.google.com/apis/credentials
2. Crea credenciales OAuth2 o Service Account
3. Obtén GOOGLE_SHEET_ID de la URL de tu Sheet
4. Añade permisos de edición al email del service account

### 6. Perspective API (moderación)
1. Ve a https://console.cloud.google.com/apis/library/commentanalyzer.googleapis.com
2. Activa la API
3. Crea API Key
4. Añade a .env: `PERSPECTIVE_KEY=tu_key`

### 7. Deploy en Railway
**Pasos:**
1. Ve a https://railway.app
2. New Project → Deploy from GitHub repo
3. Selecciona: despiertatuesencia69/DESPIERTA
4. En Variables, pega todo tu .env
5. Deploy automático

### 8. Configurar n8n workflow
1. Importa el archivo `n8n-workflow-despierta.json` en n8n
2. Configura credenciales en cada nodo
3. Activa el workflow
4. Copia la URL del webhook

## 📋 ORDEN RECOMENDADO DE EJECUCIÓN

**PASO 1 - AHORA MISMO (5 min):**
- [ ] Crear tablas en Airtable (punto 1)
- [ ] Obtener token Telegram (punto 2)
- [ ] Obtener token HF (punto 4)
- [ ] Actualizar .env con los 3 tokens

**PASO 2 - PROBAR LOCAL (2 min):**
```powershell
npm run dev
# En otra terminal:
Invoke-RestMethod -Method Post -Uri http://localhost:3000/test/message `
  -ContentType application/json `
  -Body '{"user":"test123","message":"Hola, me siento triste"}'
```

**PASO 3 - EVOLUTION/WHATSAPP (10 min):**
- [ ] Configurar Evolution API (punto 3)
- [ ] Conectar WhatsApp escaneando QR
- [ ] Probar mensaje real desde tu celular

**PASO 4 - DEPLOY RAILWAY (5 min):**
- [ ] Push a GitHub: `git push origin main`
- [ ] Deploy en Railway (punto 7)
- [ ] Configurar variables de entorno en Railway
- [ ] Verificar logs

**PASO 5 - INTEGRACIÓN n8n (10 min):**
- [ ] Importar workflow n8n (punto 8)
- [ ] Conectar webhook de Evolution → n8n → tu backend
- [ ] Probar flujo completo

## 🚨 PROBLEMAS COMUNES

**Error: "Cannot find module"**
→ Ejecuta: `npm install`

**Error: "Airtable save failed"**
→ Verifica que las tablas y campos existan exactamente como se indica

**No llegan mensajes de WhatsApp**
→ Verifica que el webhook esté configurado en Evolution API

**IA responde "fallback"**
→ Falta HF_TOKEN o ChatLLM_KEY

## 📞 SOPORTE
Si algo no funciona, revisa los logs:
```powershell
# Local
npm run dev

# Railway
railway logs
```

## ✨ CUANDO TODO ESTÉ LISTO
Verás esto en consola:
```
🚀 Servidor activo en puerto 3000
✅ Airtable conectado
✅ IA Hugging Face activa
✅ Telegram configurado
✅ Evolution API lista
```

Y podrás:
- Enviar mensaje a WhatsApp → recibir respuesta de IA
- Ver conversación guardada en Airtable
- Recibir alertas en Telegram si hay sentimiento negativo
- Donaciones trackadas automáticamente
