# Script para subir todo el proyecto a GitHub
# Ejecuta este script después de instalar Git

Write-Host "🚀 DESPIERTA TU ESENCIA - Push a GitHub" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Git está instalado
try {
    $gitVersion = git --version
    Write-Host "✅ Git detectado: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git NO está instalado" -ForegroundColor Red
    Write-Host ""
    Write-Host "Instala Git desde: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Después de instalarlo, reinicia VS Code y ejecuta este script de nuevo." -ForegroundColor Yellow
    Write-Host ""
    pause
    exit 1
}

Write-Host ""
Write-Host "📂 Verificando repositorio remoto..." -ForegroundColor Yellow

# Verificar si ya hay un remote configurado
$remotes = git remote -v 2>$null
if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($remotes)) {
    Write-Host "⚙️ Configurando remote de GitHub..." -ForegroundColor Yellow
    git remote add origin https://github.com/despiertatuesencia69/DESPIERTA.git
    Write-Host "✅ Remote configurado" -ForegroundColor Green
} else {
    Write-Host "✅ Remote ya configurado:" -ForegroundColor Green
    Write-Host $remotes
}

Write-Host ""
Write-Host "📦 Preparando archivos para commit..." -ForegroundColor Yellow

# Verificar qué archivos hay
$status = git status --short
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "✅ No hay cambios pendientes - todo está sincronizado" -ForegroundColor Green
    pause
    exit 0
}

Write-Host "📝 Archivos a subir:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "⚠️ IMPORTANTE: Verificando que .env NO se suba (tiene tus credenciales)" -ForegroundColor Yellow

# Verificar que .env esté en .gitignore
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -match "\.env") {
        Write-Host "✅ .env está protegido en .gitignore" -ForegroundColor Green
    } else {
        Write-Host "❌ ALERTA: .env NO está en .gitignore" -ForegroundColor Red
        Write-Host "Agregando .env a .gitignore..." -ForegroundColor Yellow
        Add-Content ".gitignore" "`n.env"
        Write-Host "✅ .env agregado a .gitignore" -ForegroundColor Green
    }
} else {
    Write-Host "❌ .gitignore no existe - creándolo..." -ForegroundColor Yellow
    @"
node_modules/
.env
/.env.*
npm-debug.log
yarn-error.log
dist/
coverage/
"@ | Out-File -FilePath ".gitignore" -Encoding utf8
    Write-Host "✅ .gitignore creado" -ForegroundColor Green
}

Write-Host ""
Write-Host "¿Deseas continuar con el push a GitHub? (S/N)" -ForegroundColor Yellow
$confirm = Read-Host

if ($confirm -ne "S" -and $confirm -ne "s") {
    Write-Host "❌ Cancelado por el usuario" -ForegroundColor Red
    pause
    exit 0
}

Write-Host ""
Write-Host "📦 Agregando todos los archivos..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Creando commit..." -ForegroundColor Yellow
git commit -m "feat: ecosistema completo IA espiritual WhatsApp + loops + niveles + donaciones + aprendizaje + n8n workflow"

Write-Host ""
Write-Host "🌍 Subiendo a GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ ¡TODO SUBIDO EXITOSAMENTE A GITHUB!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Ver en: https://github.com/despiertatuesencia69/DESPIERTA" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. Ve a Railway: https://railway.app/new" -ForegroundColor White
    Write-Host "2. Deploy from GitHub → despiertatuesencia69/DESPIERTA" -ForegroundColor White
    Write-Host "3. Configura variables de entorno (copia todo de .env)" -ForegroundColor White
    Write-Host "4. Deploy automático ✅" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ ERROR al hacer push" -ForegroundColor Red
    Write-Host ""
    Write-Host "Posibles causas:" -ForegroundColor Yellow
    Write-Host "1. No tienes permisos en el repo" -ForegroundColor White
    Write-Host "2. Necesitas autenticación (Personal Access Token)" -ForegroundColor White
    Write-Host "3. La rama 'main' no existe (prueba con 'master')" -ForegroundColor White
    Write-Host ""
    Write-Host "Soluciones:" -ForegroundColor Yellow
    Write-Host "• Configura tu token: git remote set-url origin https://TOKEN@github.com/despiertatuesencia69/DESPIERTA.git" -ForegroundColor White
    Write-Host "• O usa SSH: git remote set-url origin git@github.com:despiertatuesencia69/DESPIERTA.git" -ForegroundColor White
    Write-Host ""
}

pause
