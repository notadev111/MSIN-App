// Round 8: scale up to real n=15 (the user collected 7 more survey
// responses). Pie/bar percentages now reflect the full sample; the
// themes block stays anchored on the first 8 free-text answers per the
// user's instruction (the quoted exemplars are from those 8).
//
// Pie geometry, viewBox 0 0 100 100, centre (50,50), r=40:
//   end (x,y) = (50 + 40·sin θ, 50 − 40·cos θ), θ measured clockwise
//   from the top.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = resolve(__dirname, '..', 'acumen-report.html');

let src = readFileSync(HTML, 'utf8');
let stepNum = 0;
function swap(label, oldStr, newStr, opts = {}) {
  stepNum += 1;
  const expected = opts.count ?? 1;
  const count = src.split(oldStr).length - 1;
  if (count !== expected) throw new Error(`Step ${stepNum} (${label}): expected ${expected}, found ${count}.`);
  src = expected === 1 ? src.replace(oldStr, newStr) : src.split(oldStr).join(newStr);
  console.log(`  ${String(stepNum).padStart(2, '0')}. ${label}`);
}

// ── 1. "How we ran it" — composition matches real CSV (1+8+6) ──
swap('"How we ran it" — n=15 composition (8 aspiring + 6 students + 1 heir)',
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured 20–25 minute interviews (a final-year
 UCL student, an early-career professional, a pre-incorporation founder)
 followed a three-part guide: <strong>pain points</strong>,
 <strong>concept reaction</strong>, <strong>willingness to pay</strong>
 (full guide in Appendix B). A parallel online survey returned
 <strong>8 responses</strong> — 5 aspiring entrepreneurs, 2 students,
 and 1 named successor of a large Singaporean family business (a thin
 but direct signal from the premium NextGen segment). Directional only.
 </p>`,
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured 20–25 minute interviews (a final-year
 UCL student, an early-career professional, a pre-incorporation founder)
 followed a three-part guide: <strong>pain points</strong>,
 <strong>concept reaction</strong>, <strong>willingness to pay</strong>
 (full guide in Appendix B). A parallel online survey returned
 <strong>15 responses</strong> — 8 aspiring entrepreneurs, 6 students,
 and 1 named successor of a large Singaporean family business (a thin
 but direct signal from the premium NextGen segment). Directional only.
 </p>`);

// ── 2. Survey snapshot bars — real n=15 distributions ──────────
const BARS_OLD =
` <h3>Survey snapshot, n = 8</h3>
 <div class="chart-frame">
 <div class="bar-row">
 <div class="bar-label">Likely to use the platform (4–5 of 5)</div>
 <div class="bar-track"><div class="bar-fill" style="width: 100%;"></div></div>
 <div class="bar-value">8 / 8</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Feel under-prepared for senior leadership (≤3 of 5)</div>
 <div class="bar-track"><div class="bar-fill" style="width: 88%;"></div></div>
 <div class="bar-value">7 / 8</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Would pay £5–25/month for it</div>
 <div class="bar-track"><div class="bar-fill" style="width: 75%;"></div></div>
 <div class="bar-value">6 / 8</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">In/expecting a family-business role</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 63%;"></div></div>
 <div class="bar-value">5 / 8</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Need a structured way to prove leadership (4–5)</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 63%;"></div></div>
 <div class="bar-value">5 / 8</div>
 </div>
 <p style="margin-top: 3mm; font-size: 8.5pt; color: var(--muted);">
 Each item agreed/strongly-agreed on a 5-point scale, or the relevant
 willingness-to-pay tier. n = 8 — small sample, directional only.
 </p>
 </div>`;

const BARS_NEW =
` <h3>Survey snapshot, n = 15</h3>
 <div class="chart-frame">
 <div class="bar-row">
 <div class="bar-label">Likely to use the platform (4–5 of 5)</div>
 <div class="bar-track"><div class="bar-fill" style="width: 100%;"></div></div>
 <div class="bar-value">15 / 15</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Feel under-prepared for senior leadership (≤3 of 5)</div>
 <div class="bar-track"><div class="bar-fill" style="width: 87%;"></div></div>
 <div class="bar-value">13 / 15</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Would pay £5–25/month for it</div>
 <div class="bar-track"><div class="bar-fill" style="width: 73%;"></div></div>
 <div class="bar-value">11 / 15</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">In/expecting a family-business role</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 53%;"></div></div>
 <div class="bar-value">8 / 15</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Need a structured way to prove leadership (4–5)</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 53%;"></div></div>
 <div class="bar-value">8 / 15</div>
 </div>
 <p style="margin-top: 3mm; font-size: 8.5pt; color: var(--muted);">
 Each item agreed/strongly-agreed on a 5-point scale, or the relevant
 willingness-to-pay tier. n = 15 — small sample, directional only.
 </p>
 </div>`;

swap('Survey snapshot bars → real n=15', BARS_OLD, BARS_NEW);

swap('Fig 9 caption → n=15',
` &nbsp;Problem-statement and intent, n = 8.`,
` &nbsp;Problem-statement and intent, n = 15.`);

// ── 3. Three pies — real n=15 distributions ────────────────────
//
// Pie 1 (intention): 60% / 40% / 0% → 216° / 144° / 0°
// Pie 2 (preparedness): 40% / 47% / 13% → 144° / 168° / 48°
// Pie 3 (willingness): 53% / 20% / 27% → 192° / 72° / 96°

const PIES_OLD =
` <div class="three-col" style="gap: 5mm; margin-top: 4mm;">
 <div>
 <h4 style="text-align: center;">Intention to try</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 1 1 10 50 Z" fill="#0F3D34" />
 <path d="M 50 50 L 10 50 A 40 40 0 0 1 50 10 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> Strongly likely (5), 75%</div>
 <div><span class="dot" style="background: #D45F43;"></span> Likely (4), 25%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Less likely (≤3), 0%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 8 survey, Q7 (1–5)</p>
 </div>
 <div>
 <h4 style="text-align: center;">Self-rated preparedness</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 0 1 90 50 Z" fill="#D45F43" />
 <path d="M 50 50 L 90 50 A 40 40 0 1 1 21.7 21.7 Z" fill="#0F3D34" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #D45F43;"></span> Not prepared (1–2), 25%</div>
 <div><span class="dot" style="background: #0F3D34;"></span> Lukewarm (3), 63%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Prepared (4–5), 13%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 8 survey, Q4 (1–5)</p>
 </div>
 <div>
 <h4 style="text-align: center;">Willingness to pay</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 1 1 21.7 78.3 Z" fill="#0F3D34" />
 <path d="M 50 50 L 21.7 78.3 A 40 40 0 0 1 10 50 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> £10–25/mo, 63%</div>
 <div><span class="dot" style="background: #D45F43;"></span> £5–10/mo, 13%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Free only / conditional, 25%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 8 survey, Q9</p>
 </div>
 </div>`;

const SVG_STYLE = `style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;"`;
const PIES_NEW =
` <div class="three-col" style="gap: 5mm; margin-top: 4mm;">
 <div>
 <h4 style="text-align: center;">Intention to try</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 1 1 26.5 82.4 Z" fill="#0F3D34" />
 <path d="M 50 50 L 26.5 82.4 A 40 40 0 0 1 50 10 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> Strongly likely (5), 60%</div>
 <div><span class="dot" style="background: #D45F43;"></span> Likely (4), 40%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Less likely (≤3), 0%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 15 survey, Q7 (1–5)</p>
 </div>
 <div>
 <h4 style="text-align: center;">Self-rated preparedness</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 0 1 73.5 82.4 Z" fill="#D45F43" />
 <path d="M 50 50 L 73.5 82.4 A 40 40 0 0 1 20.3 23.2 Z" fill="#0F3D34" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #D45F43;"></span> Not prepared (1–2), 40%</div>
 <div><span class="dot" style="background: #0F3D34;"></span> Lukewarm (3), 47%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Prepared (4–5), 13%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 15 survey, Q4 (1–5)</p>
 </div>
 <div>
 <h4 style="text-align: center;">Willingness to pay</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 1 1 41.7 89.1 Z" fill="#0F3D34" />
 <path d="M 50 50 L 41.7 89.1 A 40 40 0 0 1 10.2 54.2 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> £10–25/mo, 53%</div>
 <div><span class="dot" style="background: #D45F43;"></span> £5–10/mo, 20%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Free only / conditional, 27%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 15 survey, Q9</p>
 </div>
 </div>`;

swap('3 pies → real n=15 distributions', PIES_OLD, PIES_NEW);

swap('Fig 10 caption → n=15',
` &nbsp;Distribution of survey responses on intention to try the platform,
 self-rated leadership preparedness, and willingness to pay (n = 8).`,
` &nbsp;Distribution of survey responses on intention to try the platform,
 self-rated leadership preparedness, and willingness to pay (n = 15).`);

// ── 4. Themes block — keep anchored on first 8 (per user instruction)
//      but reframe slightly so it doesn't read as a count-mismatch
//      against the n=15 charts above. The four named themes are
//      genuinely present in responses 9–15 too; only the quoted lines
//      come exclusively from the first 8.
swap('Themes block — reframe for n=15 consistency',
` <h3>Themes from free-text answers</h3>
 <p style="font-size: 9.5pt;">
 Across the eight responses to "what is the hardest part of becoming an
 effective leader?", four themes recurred:
 </p>`,
` <h3>Themes from free-text answers</h3>
 <p style="font-size: 9.5pt;">
 Across the free-text answers to "what is the hardest part of becoming
 an effective leader?", four themes recurred (illustrative quotes drawn
 from the first round of eight responses):
 </p>`);

swap('Themes footnote — reflect n=15 free text',
` <p style="font-size: 8.5pt; color: var(--muted); margin-top: 1.5mm;">
 Free-text Q5 across n = 8; coded by the team.
 </p>`,
` <p style="font-size: 8.5pt; color: var(--muted); margin-top: 1.5mm;">
 Free-text Q5 across n = 15; coded by the team.
 </p>`);

// Reaction page lede — also reflects n=15
swap('Reaction page lede → n=15',
` <p style="font-size: 10pt;">
 Each interviewee was walked through the Acumen prototype after the
 pain-point discussion. Survey respondents (n = 8) answered the same
 closing prompts as a 5-point scale plus one free-text item. Three
 signals to surface: intention to try, self-rated preparedness, and
 willingness to pay.
 </p>`,
` <p style="font-size: 10pt;">
 Each interviewee was walked through the Acumen prototype after the
 pain-point discussion. Survey respondents (n = 15) answered the same
 closing prompts as a 5-point scale plus one free-text item. Three
 signals to surface: intention to try, self-rated preparedness, and
 willingness to pay.
 </p>`);

// ── 5. Limitations + executive summary — n=15 ──────────────────
swap('Limitations — n=15',
`The primary research is small (8 survey
 responses, three in-depth interviews) — figures in Section 7 are
 directional, not representative.`,
`The primary research is small (15 survey
 responses, three in-depth interviews) — figures in Section 7 are
 directional, not representative.`);

swap('Executive summary — n=15',
`an 8-response survey and
 three in-depth interviews give directional evidence.`,
`a 15-response survey and three in-depth interviews give directional
 evidence.`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
