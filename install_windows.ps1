# Script de Instalação Automática - Frota 2.0
# Execute este script como Administrador

Write-Host "Iniciando instalação do sistema Frota 2.0..." -ForegroundColor Cyan

# 1. Verificar Privilégios de Administrador
$currentPrincipal = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
if (-not $currentPrincipal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Error "Por favor, execute este PowerShell como ADMINISTRADOR."
    exit
}

# 2. Instalar Node.js via Winget
Write-Host "Instalando Node.js (LTS)..." -ForegroundColor Yellow
winget install -e --id OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements

# 3. Instalar MongoDB via Winget
Write-Host "Instalando MongoDB Community Server..." -ForegroundColor Yellow
winget install -e --id MongoDB.Server --accept-package-agreements --accept-source-agreements

# 4. Instalar dependências do sistema
Write-Host "Instalando dependências do projeto..." -ForegroundColor Yellow
$projectPath = Get-Location
npm install

# 5. Criar arquivo de inicialização automática
Write-Host "Configurando inicialização automática..." -ForegroundColor Yellow
$startupFolder = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup"
$batPath = Join-Path $projectPath "start_app.bat"
$shortcutPath = Join-Path $startupFolder "FrotaSync.lnk"

# Criar o arquivo .bat se não existir
$batContent = @"
@echo off
cd /d "$projectPath"
echo Iniciando Sistema Frota 2.0...
npm start
"@ 
$batContent | Out-File -FilePath $batPath -Encoding ascii

# Criar atalho na pasta de Inicialização
$WshShell = New-Object -ComObject WScript.Shell
$Shortcut = $WshShell.CreateShortcut($shortcutPath)
$Shortcut.TargetPath = "cmd.exe"
$Shortcut.Arguments = "/c `"$batPath`""
$Shortcut.WorkingDirectory = $projectPath
$Shortcut.WindowStyle = 7 # Minimized
$Shortcut.Save()

Write-Host "TUDO PRONTO!" -ForegroundColor Green
Write-Host "O sistema agora iniciará automaticamente sempre que você ligar o computador." -ForegroundColor Cyan
Write-Host "Você pode iniciar agora rodando: npm start" -ForegroundColor DarkCyan
pause
