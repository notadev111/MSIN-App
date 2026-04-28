// One-shot script:
//   1. Renumbers every <div class="page-number">XX</div> to be sequential
//      (eliminating 07b / 21b labels per the user's request).
//   2. Rewrites the Contents page to point at the new physical pages.
//   3. Replaces the embedded BMC image with the new bmc-v2 JPEG.
//
// Idempotent for the BMC swap (replaces only the first <figure class="canvas-embed">
// occurrence, which is the BMC; the second is the Value Proposition Canvas).

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = resolve(__dirname, '..', 'acumen-report.html');
const BMC  = resolve(__dirname, 'bmc-v2-1.jpg');

let src = readFileSync(HTML, 'utf8');

// 1. Renumber page-number divs.
let counter = 1; // cover is <section class="page cover"> and is NOT renumbered.
src = src.replace(/<div class="page-number">[^<]+<\/div>/g, () => {
  counter += 1;
  const label = String(counter).padStart(2, '0');
  return `<div class="page-number">${label}</div>`;
});
const totalPages = counter;
console.log(`Renumbered ${totalPages - 1} content pages (cover is page 01).`);

// 2. Rewrite the TOC entries based on the report's known section order.
// Each tuple is [section title substring, new page label].
const tocPages = {
  'Executive summary':                    '02',
  'Scope and opportunity':                '03',
  'Product definition':                   '04',
  'MVP walkthrough':                      '05',
  'Technology and implementation':        '07',
  'Business model, revenue and cost':     '09',
  'Market validation':                    '11',
  'Market attractiveness':                '14',
  'Feasibility and next steps':           '17',
  'Appendix · Business Model Canvas':     '19',
  'Appendix · Value Proposition Canvas':  '20',
  'Appendix · Research instruments':      '21',
  'Appendix · Group charter and meetings':'22',
  'Bibliography':                         '24',
};
for (const [title, page] of Object.entries(tocPages)) {
  // toc-item line: <span class="toc-title">TITLE</span><span class="toc-page">PAGE</span>
  const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `(<span class="toc-title">${escapedTitle}</span><span class="toc-page">)\\d+(</span>)`
  );
  if (!re.test(src)) {
    console.warn(`  TOC entry not found: ${title}`);
    continue;
  }
  src = src.replace(re, `$1${page}$2`);
}
console.log(`Rewrote ${Object.keys(tocPages).length} TOC entries.`);

// 3. Swap the BMC image. The HTML has two <figure class="canvas-embed"> blocks
// (BMC then VPC). We only touch the first one.
const bmcBytes  = readFileSync(BMC);
const bmcBase64 = bmcBytes.toString('base64');
const bmcDataUri = `data:image/jpeg;base64,${bmcBase64}`;

// Find the first <figure class="canvas-embed"> ... </figure> and replace its <img src="data:...">.
const figRe = /(<figure class="canvas-embed">[\s\S]*?<img\s+src=")data:image\/[^"]+(")/;
const m = src.match(figRe);
if (!m) {
  throw new Error('Could not locate first canvas-embed <img src="data:..."> in HTML.');
}
src = src.replace(figRe, `$1${bmcDataUri}$2`);
console.log(`Replaced BMC image (${(bmcBytes.length / 1024).toFixed(0)} KB → base64 in HTML).`);

writeFileSync(HTML, src, 'utf8');
console.log('Wrote acumen-report.html.');
