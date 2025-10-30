# 🔗 ENLACES E IMPORTACIÓN AIRTABLE

## 📥 OPCIÓN 1: Enlaces Directos de GitHub (MÁS RÁPIDO)

### Tabla: Conversaciones
**Enlace directo al archivo CSV:**
```
https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Conversaciones.csv
```

**Cómo usar:**
1. Ve a Airtable → tu base (appelvXvY8ZB7hn3s)
2. Click **"+ Add or Import"** → **"CSV file"**
3. En vez de subir archivo, pega el enlace de arriba cuando te pida URL
4. O haz click derecho en el enlace → "Save link as" → guarda el archivo
5. Luego súbelo a Airtable

---

### Tabla: Donaciones
**Enlace directo al archivo CSV:**
```
https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Donaciones.csv
```

**Cómo usar:**
1. Mismo proceso que arriba
2. Pega este enlace o descarga el archivo
3. Importa a Airtable

---

## 📁 OPCIÓN 2: Descargar Archivos de tu PC

Los archivos CSV están en:
```
C:\Users\Administrator\Documents\GitHub\DESPIERTA\airtable-import\
```

### Archivos disponibles:
1. **Conversaciones.csv** (5 columnas)
2. **Donaciones.csv** (2 columnas)
3. **airtable-tablas.zip** (ambos archivos comprimidos)

---

## 📦 OPCIÓN 3: Archivo ZIP (Descarga ambos a la vez)

He creado un archivo ZIP que contiene ambos CSVs:

**Ubicación en tu PC:**
```
C:\Users\Administrator\Documents\GitHub\DESPIERTA\airtable-tablas.zip
```

**Cómo usar:**
1. Extrae el ZIP (click derecho → Extract All)
2. Tendrás los 2 archivos CSV
3. Impórtalos uno por uno en Airtable

---

## 🚀 PASOS EXACTOS PARA IMPORTAR

### Método A: Desde URL (GitHub Raw)

1. **Abrir Airtable:**
   - https://airtable.com/appelvXvY8ZB7hn3s

2. **Importar Conversaciones:**
   - Click **"+ Add or Import"**
   - **"Import from URL"** o **"CSV file"**
   - Si pide URL, pega:
     ```
     https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Conversaciones.csv
     ```
   - Si pide archivo, descarga primero (click derecho → Save as) y súbelo

3. **Importar Donaciones:**
   - Repite el proceso
   - URL:
     ```
     https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Donaciones.csv
     ```

---

### Método B: Desde Archivo Local

1. **Abrir carpeta:**
   - Windows Explorer → navega a:
     ```
     C:\Users\Administrator\Documents\GitHub\DESPIERTA\airtable-import\
     ```

2. **Ver archivos:**
   - Verás: `Conversaciones.csv` y `Donaciones.csv`

3. **Importar en Airtable:**
   - Arrastra el archivo directamente a Airtable
   - O usa **"Choose file"** y selecciónalo

---

## 📋 Contenido de los Archivos

### Conversaciones.csv (Vista previa)
```csv
user_id,mensaje,respuesta,timestamp,contexto_score
ejemplo_user_001,Hola,¡Hola! Bienvenido...,2025-10-30T00:00:00.000Z,0.8
ejemplo_user_002,Me siento triste,💙 Escucha: Te escucho...,2025-10-30T01:00:00.000Z,0.3
ejemplo_user_003,Quiero donar,¡Gracias por tu apoyo!...,2025-10-30T02:00:00.000Z,0.9
```

### Donaciones.csv (Vista previa)
```csv
user_id,fecha
ejemplo_user_003,2025-10-30T02:00:00.000Z
ejemplo_user_005,2025-10-30T03:30:00.000Z
```

---

## 🔧 Si Airtable No Acepta URL

Algunos navegadores o configuraciones de Airtable pueden no aceptar URLs directamente.

**Solución rápida:**

### Descargar Manualmente:

1. **Conversaciones.csv:**
   - Abre en navegador: https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Conversaciones.csv
   - `Ctrl+S` → Guardar como `Conversaciones.csv`

2. **Donaciones.csv:**
   - Abre: https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Donaciones.csv
   - `Ctrl+S` → Guardar como `Donaciones.csv`

3. **Importar archivos guardados** en Airtable

---

## 📊 Verificar Importación Exitosa

Después de importar, deberías ver:

### ✅ Tabla "Conversaciones"
- 5 columnas: user_id, mensaje, respuesta, timestamp, contexto_score
- 3 filas de ejemplo
- Tipos correctos (texto, texto largo, fecha con hora, número decimal)

### ✅ Tabla "Donaciones"
- 2 columnas: user_id, fecha
- 2 filas de ejemplo
- Tipos correctos (texto, fecha con hora)

---

## 🎯 Enlaces Resumidos

| Archivo | Enlace GitHub (Raw) |
|---------|---------------------|
| Conversaciones.csv | https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Conversaciones.csv |
| Donaciones.csv | https://raw.githubusercontent.com/despiertatuesencia69/DESPIERTA/main/airtable-import/Donaciones.csv |

**O busca en GitHub:**
- Repo: https://github.com/despiertatuesencia69/DESPIERTA
- Carpeta: `/airtable-import/`
- Click en cada CSV → botón **"Raw"** → copia la URL

---

## 💡 Tips

**Si Airtable pide formato específico:**
- Los archivos están en UTF-8
- Separador: coma (`,`)
- Formato de fecha: ISO 8601 (`2025-10-30T00:00:00.000Z`)

**Si quieres editar antes de importar:**
- Abre los CSV con Excel
- Modifica ejemplos
- Guarda como CSV (mantén formato)
- Importa el archivo editado

---

## ✅ Próximo Paso

Una vez importadas las tablas:
1. ✅ Verifica que aparezcan en Airtable
2. ✅ Borra filas de ejemplo si quieres (opcional)
3. ✅ Continúa con deploy en Railway
4. ✅ El backend ya está listo para guardar datos reales

---

## 📞 Ayuda Rápida

**¿No aparece opción de importar?**
- Asegúrate de estar en tu base (no en workspace principal)
- Busca botón verde **"+ Add"** o **"Add table"**

**¿CSV no se reconoce?**
- Verifica extensión: `.csv` (no `.txt`)
- Abre con Notepad para ver formato
- Debe tener comas separando valores

**¿Formato de fecha incorrecto?**
- Airtable acepta: `2025-10-30T00:00:00.000Z`
- Si falla, importa como texto y cambia tipo después

---

¡Usa el método que te sea más cómodo! Todos los archivos tienen el mismo contenido y funcionarán perfectamente. 🎉
