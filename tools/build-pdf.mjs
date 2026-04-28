// tools/build-pdf.mjs
// Renders acumen-report.html to acumen-report.pdf via headless Chromium.
// Output is a real text PDF (selectable, vector SVG, working internal links).
//
// Usage:  node tools/build-pdf.mjs
//
// Runs the audit first as a non-blocking warning. Per the project policy,
// spill is allowed (each <section class="page"> always starts on a fresh
// physical sheet via page-break-before/after); audit is informational only.

import puppeteer from 'puppeteer';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { audit } from './audit.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = resolve(__dirname, '..', 'acumen-report.html');
const OUT  = resolve(__dirname, '..', 'acumen-report.pdf');

// Run audit (prints the table); we don't block on overflow.
const report = await audit();
const overflowing = report.filter(r => r.overflows);

console.log(`  Building PDF → ${OUT}`);

const browser = await puppeteer.launch({ headless: 'new' });
try {
  const page = await browser.newPage();
  await page.emulateMediaType('print');
  await page.goto(pathToFileURL(HTML).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  await page.pdf({
    path: OUT,
    // preferCSSPageSize honours the @page { size: A4 } declared in the HTML,
    // so dimensions and margins come from the stylesheet (single source of
    // truth). printBackground keeps the F7F3EC paper colour and tints.
    preferCSSPageSize: true,
    printBackground: true,
    // Disable Chromium's default header/footer; the report draws its own.
    displayHeaderFooter: false,
    // Vector everything. tagged: true emits a tagged PDF for accessibility
    // and preserves text-extraction quality.
    tagged: true,
    timeout: 120_000,
  });

  console.log(`  Wrote PDF.`);
  if (overflowing.length > 0) {
    console.log('');
    console.log(`  ⚠  ${overflowing.length} page(s) overflowed and printed across`);
    console.log(`     two physical sheets each. Each authored section still`);
    console.log(`     starts on its own fresh page. Pages that spilled:`);
    for (const r of overflowing) {
      console.log(`       PAGE ${r.label}  +${r.overflowMm}mm`);
    }
    console.log('');
  }
} finally {
  await browser.close();
}
