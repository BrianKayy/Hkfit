/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS Node maintenance script. */
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const sharp = require('sharp');
const inventory = require('../data/product-images.json');
const base = 'https://pwipbjkeudawdteblpbt.supabase.co/storage/v1/object/public/store%20images';
const root = path.join(__dirname, '..');

async function main() {
  await fs.mkdir(path.join(root, 'public/images/catalog'), { recursive: true });
  const manifest = {};
  const jobs = Object.entries(inventory).flatMap(([folder, files]) => files.map(file => ({folder, file})));
  let originalBytes = 0, optimizedBytes = 0, completed = 0;
  async function worker() {
    while (jobs.length) {
      const {folder, file} = jobs.shift();
      const url = `${base}/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
      const id = createHash('sha256').update(url).digest('hex').slice(0, 20);
      const local = `/images/catalog/${id}.webp`;
      const target = path.join(root, 'public', local);
      try {
        const existing = await fs.stat(target);
        optimizedBytes += existing.size;
      } catch {
        let input;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const response = await fetch(url, {signal: AbortSignal.timeout(120000)});
            if (!response.ok) {
              const reason = await response.text();
              if (response.status === 404 || reason.includes('NoSuchKey')) {
                console.log(`Missing upload: ${folder}/${file}`);
                manifest[url] = null;
                break;
              }
              throw new Error(`HTTP ${response.status}: ${folder}/${file}`);
            }
            input = Buffer.from(await response.arrayBuffer());
            break;
          } catch (error) { if (attempt === 2) throw error; }
        }
        if (!input) continue;
        originalBytes += input.length;
        const output = await sharp(input).rotate().resize({width: 1600, height: 2000, fit: 'inside', withoutEnlargement: true}).webp({quality: 80, effort: 4}).toBuffer();
        await fs.writeFile(target, output);
        optimizedBytes += output.length;
      }
      manifest[url] = local;
      completed++;
      if (completed % 10 === 0) console.log(`Optimized ${completed} images`);
    }
  }
  await Promise.all([worker(), worker(), worker()]);
  await fs.writeFile(path.join(root, 'data/optimized-images.json'), JSON.stringify(manifest, Object.keys(manifest).sort(), 2) + '\n');
  console.log(JSON.stringify({images:completed, downloadedBytes:originalBytes, optimizedBytes}));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
