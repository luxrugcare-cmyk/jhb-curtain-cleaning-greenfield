param(
  [string]$CredentialsDir = 'C:\dev\credentials',
  [string]$ReportDir = 'C:\dev\reports',
  [string]$CdpBase = 'http://127.0.0.1:9222'
)

$ErrorActionPreference = 'Stop'

Write-Host 'JHB Curtain Cleaning - Google verification runner'
Write-Host 'This performs read-only GSC checks and GA4 browser network verification.'
Write-Host 'It does not submit lead forms or modify Search Console.'

$repoRoot = Split-Path -Parent $PSScriptRoot
$gscScript = Join-Path $PSScriptRoot 'gsc-readonly-audit.py'
$ga4Script = Join-Path $PSScriptRoot 'ga4-cdp-audit.mjs'

if (-not (Test-Path $gscScript)) { throw "Missing $gscScript" }
if (-not (Test-Path $ga4Script)) { throw "Missing $ga4Script" }

New-Item -ItemType Directory -Path $ReportDir -Force | Out-Null
$stamp = Get-Date -Format 'yyyy-MM-dd-HHmmss'
$gscReport = Join-Path $ReportDir "gsc-audit-$stamp.json"
$summaryReport = Join-Path $ReportDir "google-verification-$stamp.txt"

$lines = New-Object System.Collections.Generic.List[string]
function Add-Line([string]$Text) {
  Write-Host $Text
  $lines.Add($Text)
}

Add-Line "Started: $(Get-Date -Format o)"
Add-Line "Repo: $repoRoot"

# Preflight: Python
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) { throw 'Python is not available on PATH.' }
Add-Line "PASS Python available: $($python.Source)"

# Preflight: Node
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) { throw 'Node is not available on PATH.' }
$nodeMajor = [int]((& node --version).TrimStart('v').Split('.')[0])
if ($nodeMajor -lt 22) { throw "Node 22+ is required for the GA4 CDP audit. Current major: $nodeMajor" }
Add-Line "PASS Node available: $(& node --version)"

# Preflight: local credential files. Do not print contents.
$clientFile = Join-Path $CredentialsDir 'gsc-oauth-client.json'
$refreshFile = Join-Path $CredentialsDir 'gsc-refresh-token.txt'
if (-not (Test-Path $clientFile)) { throw "Missing GSC OAuth client file: $clientFile" }
if (-not (Test-Path $refreshFile)) { throw "Missing GSC refresh token file: $refreshFile" }
Add-Line 'PASS GSC credential files are present (contents not displayed)'

# GSC read-only audit.
Add-Line 'RUN Search Console read-only audit'
$gscOutput = & python $gscScript --credentials-dir $CredentialsDir --output $gscReport 2>&1
$gscExit = $LASTEXITCODE
$gscOutput | ForEach-Object { Add-Line "GSC $_" }
if ($gscExit -ne 0) { throw "GSC audit failed with exit code $gscExit" }
Add-Line "PASS GSC audit report written: $gscReport"

function Get-ChromePath {
  $candidates = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
  ) | Where-Object { $_ -and (Test-Path $_) }
  return $candidates | Select-Object -First 1
}

function Test-Cdp {
  try {
    return Invoke-RestMethod -Uri "$CdpBase/json/version" -TimeoutSec 3
  } catch {
    return $null
  }
}

# Chrome CDP preflight. If unavailable, launch a separate temporary headless
# Chrome profile. Modern Chrome requires a non-default user-data-dir for
# remote-debugging switches to take effect.
$version = Test-Cdp
$chromeProcess = $null
$tempProfile = $null
if (-not $version) {
  $chrome = Get-ChromePath
  if (-not $chrome) {
    throw "Chrome CDP is not reachable at $CdpBase and Chrome was not found in standard install locations."
  }

  $tempProfile = Join-Path $env:TEMP "jhb-ga4-cdp-$stamp"
  New-Item -ItemType Directory -Path $tempProfile -Force | Out-Null
  Add-Line "INFO Chrome CDP not running; launching isolated headless Chrome profile"
  $chromeArgs = @(
    '--headless=new',
    '--remote-debugging-port=9222',
    "--user-data-dir=$tempProfile",
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  )
  $chromeProcess = Start-Process -FilePath $chrome -ArgumentList $chromeArgs -PassThru -WindowStyle Hidden

  for ($i = 0; $i -lt 20 -and -not $version; $i++) {
    Start-Sleep -Milliseconds 500
    $version = Test-Cdp
  }
  if (-not $version) {
    try { if ($chromeProcess -and -not $chromeProcess.HasExited) { Stop-Process -Id $chromeProcess.Id -Force } } catch {}
    throw "Could not start isolated Chrome CDP at $CdpBase."
  }
}
Add-Line "PASS Chrome CDP reachable: $($version.Browser)"

# GA4 network-dispatch audit.
Add-Line 'RUN GA4 browser network-dispatch audit'
$oldCdp = $env:CDP_BASE
try {
  $env:CDP_BASE = $CdpBase
  $ga4Output = & node $ga4Script 2>&1
  $ga4Exit = $LASTEXITCODE
} finally {
  $env:CDP_BASE = $oldCdp
  if ($chromeProcess) {
    try { if (-not $chromeProcess.HasExited) { Stop-Process -Id $chromeProcess.Id -Force } } catch {}
  }
  if ($tempProfile -and (Test-Path $tempProfile)) {
    try { Remove-Item -Path $tempProfile -Recurse -Force -ErrorAction SilentlyContinue } catch {}
  }
}
$ga4Output | ForEach-Object { Add-Line "GA4 $_" }
if ($ga4Exit -ne 0) { throw "GA4 audit failed with exit code $ga4Exit" }

Add-Line 'PASS Google verification runner completed'
Add-Line "Completed: $(Get-Date -Format o)"
$lines | Set-Content -Path $summaryReport -Encoding UTF8
Write-Host "Summary report: $summaryReport"
