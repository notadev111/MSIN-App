// tools/audit.mjs
// Loads acumen-report.html in headless Chromium with print emulation, then
// measures each <section class="page"> against the printable A4 area
// (210mm x 297mm at 96dpi -> 794 x 1123 CSS px). Reports any overflow.
//
// Usage:  node tools/audit.mjs
// Exit code: 0 if all pages fit, 1 if any overflow (used by build script).

import puppeteer from 'puppeteer';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = resolve(__dirname, '..', 'acumen-report.html');

// 1mm at 96dpi = 96/25.4 px. A4 = 210x297mm.
const MM = 96 / 25.4;
const A4_H_MM = 297;
const A4_H_PX = A4_H_MM * MM;       // ~1122.52
const TOLERANCE_PX = 1;             // sub-pixel rounding

export async function audit({ quiet = false } = {}) {
  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    await page.emulateMediaType('print');
    await page.goto(pathToFileURL(HTML).href, { waitUntil: 'networkidle0' });
    // Wait for web fonts so measurements reflect printed layout.
    await page.evaluate(() => document.fonts.ready);

    const report = await page.evaluate((A4_H_PX, MM, TOL) => {
      const sections = Array.from(document.querySelectorAll('section.page'));
      return sections.map((sec, i) => {
        const rect = sec.getBoundingClientRect();
        // Use the larger of bounding-box height and scrollHeight so we catch
        // overflow whether it expands the box or only spills inside it.
        const heightPx = Math.max(rect.height, sec.scrollHeight);
        const heightMm = heightPx / MM;
        const overflowPx = heightPx - A4_H_PX;
        const overflowMm = overflowPx / MM;
        const numEl = sec.querySelector('.page-number');
        const label = numEl ? numEl.textContent.trim() : String(i + 1).padStart(2, '0');
        return {
          index: i,
          label,
          heightMm: +heightMm.toFixed(1),
          overflowMm: +overflowMm.toFixed(1),
          overflows: overflowPx > TOL,
          isCover: sec.classList.contains('cover'),
        };
      });
    }, A4_H_PX, MM, TOLERANCE_PX);

    if (!quiet) {
      console.log('');
      console.log('  Acumen report — page overflow audit');
      console.log('  A4 page height: 297mm. Each section must fit within this.');
      console.log('  ─────────────────────────────────────────────────────────');
      for (const r of report) {
        const tag = r.overflows ? '✗' : '✓';
        const tail = r.overflows
          ? `  overflows by ${r.overflowMm}mm  →  spills to extra sheet`
          : '';
        const name = r.isCover ? `${r.label} (cover)` : r.label;
        console.log(`  PAGE ${name.padEnd(12)} ${tag}  ${r.heightMm}mm / 297mm${tail}`);
      }
      const bad = report.filter(r => r.overflows);
      console.log('  ─────────────────────────────────────────────────────────');
      if (bad.length === 0) {
        console.log(`  All ${report.length} pages fit within A4. ✓`);
      } else {
        console.log(`  ${bad.length} of ${report.length} pages overflow:`);
        for (const r of bad) {
          console.log(`    - PAGE ${r.label}: ${r.heightMm}mm (+${r.overflowMm}mm)`);
        }
      }
      console.log('');
    }

    return report;
  } finally {
    await browser.close();
  }
}

const isMain = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const report = await audit();
  process.exit(report.some(r => r.overflows) ? 1 : 0);
}
