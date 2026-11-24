import fs from 'fs';
import path from 'path';

const publicFiles = new Set();
function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) walkDir(full);
    else publicFiles.add('/' + path.relative('public', full).replace(/\\/g, '/'));
  }
}
walkDir('public');
console.log('--- ALL PUBLIC FILES ON DISK ---');
console.log(Array.from(publicFiles).sort());

const imageRefs = new Map();
function searchIn(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name !== 'node_modules' && f.name !== '.next' && f.name !== '.git') {
        searchIn(full);
      }
    } else if (f.name.endsWith('.tsx') || f.name.endsWith('.ts') || f.name.endsWith('.css') || f.name.endsWith('.mjs')) {
      const content = fs.readFileSync(full, 'utf8');
      const regex = /["'`](\/(?:brand|images|static)[^"'`\s]+)["'`]/g;
      let match;
      while ((match = regex.exec(content)) !== null) {
        const ref = match[1];
        if (ref.includes('${')) continue;
        if (!imageRefs.has(ref)) {
          imageRefs.set(ref, []);
        }
        imageRefs.get(ref).push(full);
      }
    }
  }
}
searchIn('src');
searchIn('scripts');

console.log('\n--- IMAGE REFERENCES AUDIT ---');
let missingCount = 0;
for (const [ref, files] of imageRefs.entries()) {
  const exists = publicFiles.has(ref);
  const status = exists ? 'OK' : 'MISSING';
  if (!exists) missingCount++;
  console.log(`[${status.padEnd(7)}] ${ref} (in ${files.length} file(s))`);
  if (!exists) {
    files.forEach(file => console.log(`          Referenced in: ${file}`));
  }
}

console.log(`\nAudit complete: ${imageRefs.size} total references, ${missingCount} missing.`);
