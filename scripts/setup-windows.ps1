# One-time Windows setup for Genesis App Android builds.
# Creates C:\GenesisApp junction (short path) to avoid MAX_PATH errors with New Architecture.

$ErrorActionPreference = "Stop"

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$ShortPath = "C:\GenesisApp"

Write-Host "Genesis App — Windows Android setup"
Write-Host "Project: $ProjectRoot"
Write-Host ""

# Remove stale subst drive from earlier attempts (subst breaks codegen paths).
$substOutput = cmd /c subst 2>&1 | Out-String
if ($substOutput -match "G:\\") {
    Write-Host "Removing stale G: subst mapping..."
    cmd /c subst G: /d | Out-Null
}

if (Test-Path $ShortPath) {
    $item = Get-Item $ShortPath -Force
    $target = $item.Target
    if ($target -is [System.Array]) {
        $target = $target[0]
    }
    $resolvedTarget = (Resolve-Path $target).Path
    if ($resolvedTarget -eq $ProjectRoot) {
        Write-Host "OK: $ShortPath already points to this project."
        exit 0
    }
    Write-Host ""
    Write-Host "ERROR: $ShortPath exists but points to:"
    Write-Host "  $resolvedTarget"
    Write-Host ""
    Write-Host "Remove it manually, then re-run this script:"
    Write-Host "  cmd /c rmdir $ShortPath"
    exit 1
}

Write-Host "Creating junction:"
Write-Host "  $ShortPath -> $ProjectRoot"
cmd /c mklink /J "$ShortPath" "$ProjectRoot" | Out-Null

if (-not (Test-Path $ShortPath)) {
    Write-Error "Failed to create junction. Run PowerShell as Administrator if mklink was denied."
}

Write-Host ""
Write-Host "Setup complete. Build with:"
Write-Host "  npm run android:win"
Write-Host ""
Write-Host "Optional (recommended): enable Windows long paths (Admin PowerShell):"
Write-Host "  New-ItemProperty -Path 'HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem' -Name LongPathsEnabled -Value 1 -PropertyType DWORD -Force"
