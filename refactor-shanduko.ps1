$ErrorActionPreference = "Stop"

$root = "C:\Users\nooklyweb\Desktop\Shanduko-web"

if (-not (Test-Path $root)) {
  throw "Project not found: $root"
}

Set-Location $root

Write-Host "== Shanduko full UI refactor ==" -ForegroundColor Cyan

$backup = Join-Path $root ("backup-" + (Get-Date -Format "yyyyMMdd-HHmmss"))
New-Item -ItemType Directory -Force -Path $backup | Out-Null

Copy-Item "src\main.js" "$backup\main.js" -ErrorAction SilentlyContinue
Copy-Item "src\style.css" "$backup\style.css" -ErrorAction SilentlyContinue
Copy-Item "src\index.css" "$backup\index.css" -ErrorAction SilentlyContinue
Copy-Item "src\App.tsx" "$backup\App.tsx" -ErrorAction SilentlyContinue
Copy-Item "src\App.css" "$backup\App.css" -ErrorAction SilentlyContinue
Copy-Item "src\main.tsx" "$backup\main.tsx" -ErrorAction SilentlyContinue

Write-Host "[OK] Backup created: $backup" -ForegroundColor Green
Write-Host "[OK] Replace the src folder with the refactored src folder from the supplied package." -ForegroundColor Yellow
Write-Host ""
Write-Host "Then run:" -ForegroundColor Cyan
Write-Host "  npm install"
Write-Host "  npm run build"
Write-Host "  npm run dev"
