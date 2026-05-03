import puppeteer from 'puppeteer';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const browser = await puppeteer.launch({ headless: 'new' });
const p = await browser.newPage();
await p.emulateMediaType('print');
await p.goto(pathToFileURL(resolve('acumen-report.html')).href, { waitUntil: 'networkidle0' });
await p.evaluate(() => document.fonts.ready);
const r = await p.evaluate(() => {
  const sections = Array.from(document.querySelectorAll('section.page'));
  return sections.slice(7, 11).map((sec, i) => {
    const num = sec.querySelector('.page-number')?.textContent;
    const h2 = sec.querySelector('h2')?.textContent;
    const rect = sec.getBoundingClientRect();
    return { idx: i+7, num, h2, h: rect.height, scroll: sec.scrollHeight };
  });
});
console.log(r);
await browser.close();
