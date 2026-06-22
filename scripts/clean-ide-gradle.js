/**
 * Remove Eclipse Buildship metadata that the Java extension creates inside
 * node_modules. Those files pin Gradle 8.9 and trigger false IDE errors when
 * library android/ folders are opened as standalone Gradle roots.
 */
const fs = require('fs');
const path = require('path');

const nodeModules = path.join(__dirname, '..', 'node_modules');

function walk(dir, onFile) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === '.settings') {
        onFile(fullPath);
        continue;
      }
      walk(fullPath, onFile);
    }
  }
}

let removed = 0;

walk(nodeModules, settingsDir => {
  const prefs = path.join(settingsDir, 'org.eclipse.buildship.core.prefs');
  if (!fs.existsSync(prefs)) {
    return;
  }

  fs.rmSync(settingsDir, {recursive: true, force: true});
  removed += 1;
});

if (removed > 0) {
  console.log(`Removed ${removed} IDE Gradle metadata folder(s) from node_modules.`);
}
