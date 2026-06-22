# Build Android from C:\GenesisApp to avoid Windows MAX_PATH failures.

$ErrorActionPreference = "Stop"

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$ShortPath = "C:\GenesisApp"

& (Join-Path $PSScriptRoot "setup-windows.ps1")
if ($LASTEXITCODE -ne 0) {
    exit $LASTEXITCODE
}

# Clean native CMake cache when switching between D:\ and C:\ paths.
$cxxDir = Join-Path $ProjectRoot "android\app\.cxx"
if (Test-Path $cxxDir) {
    Write-Host "Cleaning native build cache (.cxx)..."
    Remove-Item -Recurse -Force $cxxDir
}

Push-Location $ShortPath
try {
    Write-Host "Running react-native run-android from $ShortPath ..."
    & npx react-native run-android
    exit $LASTEXITCODE
} finally {
    Pop-Location
}
