/**
 * Windows: builds via C:\GenesisApp junction to avoid MAX_PATH failures
 * with New Architecture native modules (Gesture Handler, Reanimated, etc.).
 */
const {execSync, spawnSync} = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const shortPath = 'C:\\GenesisApp';

function run(command) {
  return execSync(command, {encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe']});
}

function removeSubstDrive() {
  if (process.platform !== 'win32') {
    return;
  }
  try {
    const subst = run('subst');
    if (subst.includes('G:\\')) {
      console.log('Removing stale G: subst mapping...');
      run('subst G: /d');
    }
  } catch {
    // ignore
  }
}

function normalizePath(value) {
  const stripped = value.replace(/^\\\\\?\\/, '');
  return path.resolve(stripped).toLowerCase();
}

function ensureWindowsJunction() {
  const expected = normalizePath(projectRoot);

  if (fs.existsSync(shortPath)) {
    let target;
    try {
      target = fs.readlinkSync(shortPath);
    } catch {
      console.error(
        `ERROR: ${shortPath} exists but is not a junction. Remove it and retry:`,
      );
      console.error(`  cmd /c rmdir ${shortPath}`);
      process.exit(1);
    }

    if (normalizePath(target) !== expected) {
      console.error(`ERROR: ${shortPath} points to the wrong folder:`);
      console.error(`  ${target}`);
      console.error(`Expected:`);
      console.error(`  ${projectRoot}`);
      console.error(`Remove it with: cmd /c rmdir ${shortPath}`);
      process.exit(1);
    }

    return shortPath;
  }

  console.log(`Creating junction:\n  ${shortPath} -> ${projectRoot}`);
  try {
    execSync(`cmd /c mklink /J "${shortPath}" "${projectRoot}"`, {
      stdio: 'inherit',
    });
  } catch {
    console.error(
      'Failed to create junction. Run PowerShell as Administrator and retry.',
    );
    process.exit(1);
  }

  return shortPath;
}

function cleanNativeCache(root) {
  const cxxDir = path.join(root, 'android', 'app', '.cxx');
  if (fs.existsSync(cxxDir)) {
    console.log('Cleaning native build cache (.cxx)...');
    fs.rmSync(cxxDir, {recursive: true, force: true});
  }
}

function main() {
  let cwd = projectRoot;

  if (process.platform === 'win32') {
    removeSubstDrive();
    cwd = ensureWindowsJunction();
    cleanNativeCache(projectRoot);
    console.log(`Building from ${cwd}`);
  }

  const args = process.argv.slice(2).join(' ');
  const command = `npx react-native run-android${args ? ` ${args}` : ''}`;
  const result = spawnSync(command, {
    cwd,
    stdio: 'inherit',
    shell: true,
  });

  process.exit(result.status ?? 1);
}

main();
