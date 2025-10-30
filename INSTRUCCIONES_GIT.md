# 🚨 GIT NO INSTALADO - INSTRUCCIONES DE RESPALDO

## Situación Actual
Git no está instalado en tu sistema, por lo que no podemos hacer push automático a GitHub.

## ✅ TODO TU CÓDIGO ESTÁ GUARDADO LOCALMENTE
Todos los archivos están en: `C:\Users\Administrator\Documents\GitHub\DESPIERTA`

## 🔧 Opción 1: Instalar Git y Push Automático (RECOMENDADO)

### Paso 1: Instalar Git
1. Descarga Git para Windows: https://git-scm.com/download/win
2. Ejecuta el instalador
3. Usa las opciones por defecto (solo siguiente, siguiente...)
4. **IMPORTANTE**: Marca "Git from the command line and also from 3rd-party software"
5. Completa la instalación

### Paso 2: Reiniciar VS Code
1. Cierra VS Code completamente
2. Ábrelo de nuevo
3. Abre la terminal integrada (Ctrl + `)

### Paso 3: Ejecutar el Script de Push
```powershell
# Navega a la carpeta del proyecto
cd C:\Users\Administrator\Documents\GitHub\DESPIERTA

# Ejecuta el script automático
.\push-to-github.ps1
```

El script hará automáticamente:
- ✅ Verificar que Git esté instalado
- ✅ Configurar el remote de GitHub
- ✅ Proteger tu .env (no se subirá)
- ✅ Agregar todos los archivos
- ✅ Crear commit
- ✅ Push a GitHub

---

## 🌐 Opción 2: Subir Manualmente via GitHub.com

Si no quieres instalar Git ahora, puedes subir los archivos directamente desde el navegador:

### Paso 1: Ve al Repo
https://github.com/despiertatuesencia69/DESPIERTA

### Paso 2: Subir Archivos
1. Click en "Add file" → "Upload files"
2. Arrastra estos archivos desde tu carpeta local:
   - ✅ `package.json`
   - ✅ `server.js`
   - ✅ `railway.json`
   - ✅ `Procfile`
   - ✅ `README.md`
   - ✅ `CHECKLIST_COMPLETO.md`
   - ✅ `RESUMEN_FINAL.md`
   - ✅ `n8n-workflow-despierta.json`
   - ✅ `.gitignore`
   - ✅ `.env.example`
   - ✅ Carpeta `src/` completa (con subcarpetas)
   - ✅ Carpeta `tests/` completa
   - ✅ `.eslintrc.json`
   - ✅ `.prettierrc`
   - ✅ `jest.config.js`

### Paso 3: NO SUBIR ESTOS ARCHIVOS (tienen credenciales)
- ❌ `.env` (¡NUNCA!)
- ❌ `node_modules/` (se regenera con npm install)
- ❌ `.git/` (carpeta oculta)

### Paso 4: Commit
- Mensaje: `feat: ecosistema completo IA espiritual`
- Click en "Commit changes"

---

## 🔐 Opción 3: Usar GitHub Desktop (Más Fácil)

### Paso 1: Instalar GitHub Desktop
1. Descarga: https://desktop.github.com
2. Instala y abre
3. Inicia sesión con tu cuenta: despiertatuesencia69

### Paso 2: Clonar tu Repo
1. File → Clone Repository
2. URL: https://github.com/despiertatuesencia69/DESPIERTA
3. Local Path: `C:\Users\Administrator\Documents\GitHub\DESPIERTA`
4. (Si pregunta si quieres reemplazar, di "Sí - usar archivos locales")

### Paso 3: Commit y Push
1. Verás todos los archivos en la lista de cambios
2. Revisa que `.env` NO esté en la lista (debe estar ignorado)
3. Escribe mensaje: `feat: ecosistema completo`
4. Click "Commit to main"
5. Click "Push origin"

---

## 📦 Lista de Archivos a Respaldar

### Archivos Críticos (código)
```
✅ server.js                    - Servidor principal
✅ package.json                 - Dependencias
✅ .env.example                 - Template de credenciales
✅ .gitignore                   - Protección
```

### Configuración
```
✅ railway.json                 - Deploy Railway
✅ Procfile                     - Heroku/Railway
✅ .eslintrc.json              - Linter
✅ .prettierrc                 - Formatter
✅ jest.config.js              - Tests
```

### Documentación
```
✅ README.md                    - Docs principal
✅ CHECKLIST_COMPLETO.md       - Guía setup
✅ RESUMEN_FINAL.md            - Estado actual
```

### Integración
```
✅ n8n-workflow-despierta.json - Workflow n8n
```

### Código Modular
```
✅ src/config/env.js           - Variables entorno
✅ src/services/aiService.js   - IA
✅ src/services/airtableService.js - Base datos
✅ src/services/whatsappService.js - WhatsApp
✅ src/services/telegramService.js - Notificaciones
✅ src/utils/wait.js           - Utilidades
```

### Tests
```
✅ tests/server.test.js        - Tests unitarios
```

---

## ⚠️ MUY IMPORTANTE: No Subas Estos Archivos

```
❌ .env                         - TIENE TUS CREDENCIALES REALES
❌ node_modules/                - 200MB+ (se regenera)
❌ .git/                        - Control versiones local
❌ *.log                        - Logs temporales
```

---

## 🎯 Después de Subir a GitHub

### Verificar en GitHub
1. Ve a: https://github.com/despiertatuesencia69/DESPIERTA
2. Deberías ver todos los archivos listados arriba
3. Verifica que `.env` NO esté visible (solo `.env.example`)

### Deploy en Railway
1. Ve a: https://railway.app/new
2. "Deploy from GitHub"
3. Selecciona: `despiertatuesencia69/DESPIERTA`
4. En "Variables", pega el contenido de tu `.env` local
5. Deploy automático

### Compartir con Otros
Ahora cualquiera puede:
```bash
git clone https://github.com/despiertatuesencia69/DESPIERTA.git
cd DESPIERTA
npm install
cp .env.example .env
# (editar .env con sus credenciales)
npm run dev
```

---

## 📞 Ayuda

**Si el push falla con error de autenticación:**
1. Ve a: https://github.com/settings/tokens
2. Generate new token (classic)
3. Permisos: `repo` (todos)
4. Copia el token
5. Usa:
   ```powershell
   git remote set-url origin https://TU_TOKEN@github.com/despiertatuesencia69/DESPIERTA.git
   git push -u origin main
   ```

**Si dice "branch main doesn't exist":**
```powershell
git branch -M main
git push -u origin main
```

---

## ✅ Resumen

**Archivos locales:** Seguros en `C:\Users\Administrator\Documents\GitHub\DESPIERTA`

**Para subirlos a GitHub, elige:**
- 🥇 **Opción 1**: Instalar Git → ejecutar `push-to-github.ps1` (más profesional)
- 🥈 **Opción 2**: GitHub Desktop (más fácil, GUI)
- 🥉 **Opción 3**: Upload manual en github.com (emergencia)

**Después de subir:**
- Deploy en Railway con tus variables de entorno
- Configurar Evolution API y WhatsApp
- ¡A producción! 🚀
