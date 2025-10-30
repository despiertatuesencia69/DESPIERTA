# 📊 IMPORTAR TABLAS A AIRTABLE - GUÍA RÁPIDA

## 🎯 Archivos Creados

He creado 2 archivos CSV listos para importar:

1. **`Conversaciones.csv`** - Tabla principal de conversaciones
2. **`Donaciones.csv`** - Tabla de donaciones

---

## 📋 MÉTODO 1: Importación Rápida (RECOMENDADO - 2 min)

### Paso 1: Abrir tu Base
1. Ve a: https://airtable.com/appelvXvY8ZB7hn3s
2. O abre Airtable → "despierta" base

### Paso 2: Importar Tabla "Conversaciones"
1. En Airtable, click en **"+ Add or Import"** (botón verde arriba a la izquierda)
2. Selecciona **"CSV file"**
3. Click **"Choose file"**
4. Navega a: `C:\Users\Administrator\Documents\GitHub\DESPIERTA\airtable-import\`
5. Selecciona: **`Conversaciones.csv`**
6. Click **"Open"**
7. Airtable mostrará preview:
   - ✅ user_id (Single line text)
   - ✅ mensaje (Long text)
   - ✅ respuesta (Long text)
   - ✅ timestamp (Date)
   - ✅ contexto_score (Number)
8. Click **"Import"**
9. Renombra la tabla a: **"Conversaciones"** (si no lo está ya)

### Paso 3: Importar Tabla "Donaciones"
1. Repite el proceso anterior
2. Selecciona: **`Donaciones.csv`**
3. Preview:
   - ✅ user_id (Single line text)
   - ✅ fecha (Date)
4. Click **"Import"**
5. Renombra a: **"Donaciones"**

### Paso 4: Eliminar Filas de Ejemplo (Opcional)
Las filas que empiezan con "ejemplo_user_" son solo ejemplos.
- Puedes eliminarlas después de importar
- O déjalas para testing

---

## 📋 MÉTODO 2: Creación Manual (Si CSV falla - 5 min)

Si la importación CSV no funciona, crea las tablas manualmente:

### Tabla 1: Conversaciones

1. Airtable → Click **"+ Add"** → **"Table"**
2. Nombre: **"Conversaciones"**
3. Agrega estos campos (click **"+"** para cada uno):

| Campo | Tipo | Configuración |
|-------|------|---------------|
| `user_id` | Single line text | - |
| `mensaje` | Long text | Enable rich text: OFF |
| `respuesta` | Long text | Enable rich text: OFF |
| `timestamp` | Date | Include time: YES, Format: ISO |
| `contexto_score` | Number | Format: Decimal, Precision: 0.1 |

### Tabla 2: Donaciones

1. Click **"+ Add"** → **"Table"**
2. Nombre: **"Donaciones"**
3. Agrega campos:

| Campo | Tipo | Configuración |
|-------|------|---------------|
| `user_id` | Single line text | - |
| `fecha` | Date | Include time: YES, Format: ISO |

---

## 📋 MÉTODO 3: API (Automático - Avanzado)

Si quieres crear las tablas via API (requiere conocimientos técnicos):

**Nota:** Airtable API no permite crear tablas/campos automáticamente.
Solo puedes crearlas manualmente en UI y luego usar API para agregar registros.

---

## ✅ Verificación Post-Importación

Después de importar, verifica:

### En tabla "Conversaciones":
- [ ] 5 columnas visibles: user_id, mensaje, respuesta, timestamp, contexto_score
- [ ] 3 filas de ejemplo (opcional, puedes borrarlas)
- [ ] Campo `timestamp` muestra fecha Y hora
- [ ] Campo `contexto_score` acepta decimales (ej: 0.8, 0.3)

### En tabla "Donaciones":
- [ ] 2 columnas visibles: user_id, fecha
- [ ] 2 filas de ejemplo (opcional)
- [ ] Campo `fecha` muestra fecha Y hora

---

## 🔧 Solución de Problemas

### "Cannot import CSV"
**Solución:**
1. Verifica que los archivos estén en: `airtable-import/`
2. Ábrelos en Excel/Notepad para verificar formato
3. Si persiste, usa Método 2 (manual)

### "Date format not recognized"
**Solución:**
- Airtable acepta ISO 8601: `2025-10-30T00:00:00.000Z`
- Si falla, importa como texto y cambia tipo después

### "Field type mismatch"
**Solución:**
Durante la importación, Airtable te deja elegir el tipo de campo.
Asegúrate de seleccionar:
- `user_id` → Single line text
- `mensaje`, `respuesta` → Long text
- `timestamp`, `fecha` → Date (con hora)
- `contexto_score` → Number

### "Cannot find import option"
**Solución:**
1. Asegúrate de estar en tu base (appelvXvY8ZB7hn3s)
2. El botón puede decir "Add table", "Import table", o tener un ícono "+"
3. Si no aparece, click derecho en la lista de tablas → "Import"

---

## 🎨 Configuración Opcional (Mejorar visualización)

### Para tabla "Conversaciones":

**Vista recomendada:**
1. Click en "Grid view" → "Customize fields"
2. Ajusta anchos:
   - `user_id`: 150px
   - `mensaje`: 300px
   - `respuesta`: 300px
   - `timestamp`: 180px
   - `contexto_score`: 120px

**Filtros útiles:**
- Sentimiento negativo: `contexto_score` < 0.4
- Últimos 7 días: `timestamp` is within "the past week"
- Usuario específico: `user_id` contains "..."

**Ordenamiento:**
- Ordenar por `timestamp` descendente (más recientes primero)

### Para tabla "Donaciones":

**Vista recomendada:**
1. Ordenar por `fecha` descendente
2. Agrupar por mes (opcional): `fecha` → "Group by Month"

**Fórmulas útiles (nuevo campo):**
- Crear campo `Monto` (Number) - para trackear montos manualmente
- Crear campo `Estado` (Single select) - Pendiente/Completado/Cancelado

---

## 🔗 Integración con el Backend

Una vez importadas las tablas, tu backend (`server.js`) automáticamente:

✅ **Guardará** cada conversación en "Conversaciones"
✅ **Guardará** cada intento de donación en "Donaciones"
✅ **Leerá** contexto histórico de conversaciones
✅ **Calculará** score emocional y lo guardará

**No necesitas hacer nada más** - el código ya está listo.

---

## 📊 Campos Explicados

### Tabla: Conversaciones

| Campo | Qué Guarda | Ejemplo |
|-------|------------|---------|
| `user_id` | ID único del usuario (número de WhatsApp) | `5491112345678` |
| `mensaje` | Mensaje que envió el usuario | `"Hola, me siento triste"` |
| `respuesta` | Respuesta generada por la IA | `"💙 Escucha: Te escucho..."` |
| `timestamp` | Fecha y hora del mensaje | `2025-10-30T15:30:00.000Z` |
| `contexto_score` | Score de sentimiento (0-1) | `0.3` (negativo) o `0.8` (positivo) |

### Tabla: Donaciones

| Campo | Qué Guarda | Ejemplo |
|-------|------------|---------|
| `user_id` | ID del usuario que mencionó "donar" | `5491112345678` |
| `fecha` | Cuándo mencionó donar | `2025-10-30T16:00:00.000Z` |

---

## 🚀 Próximos Pasos Después de Importar

1. ✅ Verifica que ambas tablas existan en tu base
2. ✅ Comprueba que los campos tengan los tipos correctos
3. ✅ Borra las filas de ejemplo si quieres empezar limpio
4. ✅ Continúa con el deploy en Railway (si no lo hiciste)
5. ✅ Configura Telegram Bot token
6. ✅ Despliega Evolution API + WhatsApp

---

## 📞 Ayuda

**Airtable Support:** https://support.airtable.com
**CSV no importa:** Usa Método 2 (manual - 5 min)
**Necesitas ayuda:** Comparte screenshot del error

---

## ✨ ¡Listo!

Una vez importadas las tablas:
- Tu backend guardará automáticamente cada conversación
- Podrás ver estadísticas, filtrar por sentimiento, buscar usuarios
- Todo el historial quedará registrado para aprendizaje continuo

**Tiempo estimado:** 2-5 minutos dependiendo del método elegido.
