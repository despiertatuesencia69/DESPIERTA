# 🚀 DEPLOY EN RAILWAY - GUÍA PASO A PASO

## ✅ Pre-requisitos Completados
- ✅ Código en GitHub: https://github.com/despiertatuesencia69/DESPIERTA
- ✅ 32 archivos subidos correctamente
- ✅ railway.json configurado
- ✅ Procfile listo
- ✅ Variables de entorno preparadas

---

## 📋 PASO 1: Crear Proyecto en Railway (2 min)

### 1.1 Ir a Railway
Abre en tu navegador: **https://railway.app/new**

### 1.2 Iniciar Sesión
- Si no tienes cuenta: "Login with GitHub"
- Autoriza Railway a acceder a tu GitHub
- Railway te mostrará tus repositorios

### 1.3 Seleccionar Repositorio
1. Click en "Deploy from GitHub repo"
2. Busca: `despiertatuesencia69/DESPIERTA`
3. Click en el repositorio
4. Railway comenzará a analizar el proyecto

### 1.4 Configuración Automática
Railway detectará automáticamente:
- ✅ Node.js project (por package.json)
- ✅ Build command: `npm install`
- ✅ Start command: `npm start` (del Procfile)
- ✅ Puerto: 3000 (de railway.json y .env)

---

## 📋 PASO 2: Configurar Variables de Entorno (3 min)

### 2.1 Abrir Variables
1. En tu proyecto Railway, click en la pestaña **"Variables"**
2. Click en **"+ New Variable"**

### 2.2 Agregar Todas las Variables

Copia y pega estas variables **UNA POR UNA** (reemplaza valores si es necesario):

```env
# Airtable - Obtén estos en https://airtable.com/account
AIRTABLE_KEY=patXXXXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXX

# IA - Ya configurado en tu .env local
CHATLLM_KEY=s2_XXXXXXXXXXXXXXXX

# Facebook - Token de tu página
FB_PAGE_TOKEN=EAATXXXXXXXXXXXXXXXXXXXXXXXX

# Google Calendar
GOOGLE_CALENDAR_ID=tu-email@gmail.com

# Telegram - ID de tu chat
TELEGRAM_CHAT_ID=tu_chat_id

# PayPal
PAYPAL_LINK=https://paypal.me/tu_usuario

# Puerto (Railway lo asigna automáticamente si no lo defines)
PORT=3000

# ========================================
# OBTENER DESPUÉS (ver CHECKLIST_COMPLETO.md)
# ========================================

# Hugging Face (https://huggingface.co/settings/tokens)
HF_TOKEN=hf_XXXXXXXXXXXXXXXX

# Telegram Bot (@BotFather)
TELEGRAM_TOKEN=123456:ABC-DEFXXXXXXXXXXXXXXX

# Evolution API (después de desplegar Evolution)
EVOLUTION_URL=https://evolution-xxx.up.railway.app
EVOLUTION_KEY=tu_api_key
EVOLUTION_INSTANCE=despierta-whatsapp
```

**IMPORTANTE:** 
- ⚠️ NUNCA pegues credenciales reales en documentos públicos
- ✅ Copia tus valores reales de tu archivo `.env` LOCAL
- ✅ Pégalos UNO POR UNO en Railway Variables (están encriptados)
- 🔒 Railway mantiene las variables seguras y no visibles públicamente

### 2.3 Método Rápido (Recomendado)
1. En Railway, click en **"RAW Editor"** (editor de texto)
2. Copia y pega TODO el bloque de arriba
3. Railway las parseará automáticamente
4. Click **"Save"**

---

## 📋 PASO 3: Deploy (1 min)

### 3.1 Iniciar Deploy
1. Railway comenzará el deploy automáticamente
2. Verás logs en tiempo real:
   ```
   Building...
   Installing dependencies...
   npm install
   Starting server...
   npm start
   Server listening on port 3000
   ```

### 3.2 Monitorear Logs
- Si ves: `🚀 Servidor activo en puerto 3000` → ✅ ÉXITO
- Si ves errores → revisa la sección "Troubleshooting" abajo

### 3.3 Obtener URL Pública
1. Railway te asignará una URL automáticamente
2. Formato: `https://tu-proyecto-production-xxxx.up.railway.app`
3. Copia esta URL (la necesitarás para n8n y Evolution)

---

## 📋 PASO 4: Probar el Deployment (1 min)

### 4.1 Health Check
Abre en tu navegador:
```
https://tu-proyecto-production-xxxx.up.railway.app/
```

Deberías ver:
```json
{
  "status": "Despierta IA Espiritual - Activa"
}
```

### 4.2 Probar Webhook (Opcional)
Usa Postman, Insomnia o curl:
```bash
curl -X POST https://tu-proyecto-production-xxxx.up.railway.app/webhook/whatsapp \
  -H "Content-Type: application/json" \
  -d '{"from":"test123","message":{"text":"Hola"}}'
```

Respuesta esperada:
```json
{
  "status": "ok",
  "user": "test123",
  "level": 1
}
```

---

## 📋 PASO 5: Configurar Custom Domain (Opcional)

### 5.1 Agregar Dominio Propio
Si tienes un dominio (ej: api.despiertatuesencia.com):

1. En Railway → Settings → Domains
2. Click "Add Domain"
3. Ingresa tu dominio
4. Configura DNS en tu proveedor:
   - Tipo: CNAME
   - Nombre: api (o @)
   - Valor: [el que Railway te dé]

### 5.2 SSL Automático
Railway configurará SSL/HTTPS automáticamente (gratis).

---

## 🔧 Troubleshooting

### Error: "Module not found"
**Causa:** Dependencias no instaladas
**Solución:**
1. Verifica que `package.json` esté en el repo
2. Railway → Settings → Restart Deployment

### Error: "Port 3000 is already in use"
**Causa:** Variable PORT mal configurada
**Solución:**
1. Railway → Variables
2. Verifica: `PORT=3000`
3. O elimina la variable (Railway asignará automáticamente)

### Error: "Cannot connect to Airtable"
**Causa:** Credenciales incorrectas o tablas no existen
**Solución:**
1. Verifica AIRTABLE_KEY y AIRTABLE_BASE_ID
2. Crea las tablas en Airtable (ver CHECKLIST_COMPLETO.md)
3. El servidor seguirá funcionando sin Airtable (modo mock)

### Error: "Deployment failed"
**Causa:** Error en código o configuración
**Solución:**
1. Railway → Logs (revisa el error específico)
2. Verifica que `railway.json` y `Procfile` estén en el repo
3. GitHub → compara con tu código local

### El servidor arranca pero no responde
**Causa:** Firewall o configuración de red
**Solución:**
1. Verifica que `server.js` use: `process.env.PORT || 3000`
2. Railway → Settings → Public Networking (debe estar ON)

---

## 📊 Monitoreo en Railway

### Ver Logs en Tiempo Real
1. Railway → tu proyecto
2. Pestaña **"Deployments"**
3. Click en el deployment activo
4. Verás logs scrolleando automáticamente

### Métricas
Railway muestra:
- ✅ CPU usage
- ✅ Memory usage
- ✅ Network (requests/sec)
- ✅ Deployment status

### Configurar Alertas
1. Railway → Settings → Notifications
2. Conecta email o Slack
3. Recibirás alertas si el servidor cae

---

## 🔄 Actualizaciones Automáticas

### GitHub → Railway (CI/CD)
Railway está conectado a tu repo. Cada push a `main` desplegará automáticamente:

```bash
# En tu PC local
git add .
git commit -m "fix: mejora en el loop emocional"
git push origin main

# Railway detecta el push y redespliega automáticamente
```

### Desactivar Auto-Deploy (Opcional)
1. Railway → Settings → Deployments
2. Toggle "Auto Deploy" → OFF
3. Ahora debes hacer deploy manual

---

## 💰 Costos y Límites (Tier Gratuito)

Railway Free Plan:
- ✅ $5 USD de crédito mensual (suficiente para desarrollo)
- ✅ Deploy ilimitados
- ✅ Variables de entorno ilimitadas
- ✅ SSL gratis
- ⚠️ ~21 horas de uptime por día con plan gratuito
- 💡 Upgrade a $5/mes para 24/7 uptime

**Estimación de uso:**
- Backend simple: ~$3-5/mes
- Con tráfico moderado: ~$8-12/mes

---

## 🎯 Próximos Pasos Después del Deploy

### 1. Guardar URL del Backend
Tu URL de Railway será algo como:
```
https://despierta-production-xxxx.up.railway.app
```

Guárdala para:
- ✅ Configurar webhook en Evolution API
- ✅ Configurar n8n workflow
- ✅ Probar integraciones

### 2. Configurar Evolution API
1. Deploy Evolution en otro proyecto Railway
2. URL de Evolution: `https://evolution-xxxx.up.railway.app`
3. En tu backend Railway, agrega variable:
   ```
   EVOLUTION_URL=https://evolution-xxxx.up.railway.app
   ```

### 3. Conectar n8n
1. Importa `n8n-workflow-despierta.json`
2. En el nodo HTTP Request, usa tu URL Railway
3. Activa el workflow

### 4. Crear Tablas en Airtable
Ver `CHECKLIST_COMPLETO.md` para detalles.

---

## ✅ Checklist Final

Antes de considerar el deploy completo:

- [ ] Servidor responde en `/` (health check)
- [ ] Variables de entorno configuradas en Railway
- [ ] URL pública funciona desde navegador
- [ ] Logs no muestran errores críticos
- [ ] Webhook `/webhook/whatsapp` responde correctamente
- [ ] GitHub push → auto-deploy funciona
- [ ] Dominio custom configurado (opcional)

---

## 📞 Soporte

**Railway Docs:** https://docs.railway.app
**Railway Discord:** https://discord.gg/railway
**Railway Status:** https://status.railway.app

**Tu Proyecto:**
- GitHub: https://github.com/despiertatuesencia69/DESPIERTA
- Railway: (obtendrás la URL después de crear el proyecto)

---

## 🎉 ¡Felicitaciones!

Tu backend está desplegado y funcionando 24/7 en Railway. Ahora puedes:
- ✅ Recibir webhooks de WhatsApp vía Evolution API
- ✅ Procesar mensajes con IA
- ✅ Guardar conversaciones en Airtable
- ✅ Enviar alertas a Telegram
- ✅ Escalar según necesidad

**Próximo paso:** Configura Evolution API y conecta WhatsApp (ver `CHECKLIST_COMPLETO.md` paso 4)
