// Round 10: drop the joke response (R2 = "NextGen heir"). Real n=14.
// Replace the heir pull-quote with Option A (R4, "decisions that disappoint")
// labelled as Interviewee C. Add Option C (R12, "lead without formal
// authority") as Interviewee D. Shorten Interviewee B's quote so the
// 4-quote column fits on the page. Recompute all bar/pie distributions
// for n=14. Strip every "Singaporean family business" / NextGen-heir
// reference from prose.

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

// ── 1. "How we ran it" — n=14, no heir mention ─────────────────
swap('"How we ran it" — n=14, drop heir line',
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured 20–25 minute interviews (a final-year
 UCL student, an early-career professional, a pre-incorporation founder)
 followed a three-part guide: <strong>pain points</strong>,
 <strong>concept reaction</strong>, <strong>willingness to pay</strong>
 (full guide in Appendix B). A parallel online survey returned
 <strong>15 responses</strong>, 8 aspiring entrepreneurs, 6 students,
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
 <strong>14 responses</strong> from UCL networks (8 aspiring
 entrepreneurs, 6 students), with several respondents indicating
 family-business backgrounds. Directional only.
 </p>`);

// ── 2. Bars rebuilt at n=14 ──────────────────────────────────
const BARS_OLD =
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
 willingness-to-pay tier. n = 15, small sample, directional only.
 </p>
 </div>`;

const BARS_NEW =
` <h3>Survey snapshot, n = 14</h3>
 <div class="chart-frame">
 <div class="bar-row">
 <div class="bar-label">Likely to use the platform (4–5 of 5)</div>
 <div class="bar-track"><div class="bar-fill" style="width: 100%;"></div></div>
 <div class="bar-value">14 / 14</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Feel under-prepared for senior leadership (≤3 of 5)</div>
 <div class="bar-track"><div class="bar-fill" style="width: 86%;"></div></div>
 <div class="bar-value">12 / 14</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Would pay £5–25/month for it</div>
 <div class="bar-track"><div class="bar-fill" style="width: 71%;"></div></div>
 <div class="bar-value">10 / 14</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">In/expecting a family-business role</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 50%;"></div></div>
 <div class="bar-value">7 / 14</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Need a structured way to prove leadership (4–5)</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 50%;"></div></div>
 <div class="bar-value">7 / 14</div>
 </div>
 <p style="margin-top: 3mm; font-size: 8.5pt; color: var(--muted);">
 Each item agreed/strongly-agreed on a 5-point scale, or the relevant
 willingness-to-pay tier. n = 14, small sample, directional only.
 </p>
 </div>`;

swap('Survey snapshot bars → n=14', BARS_OLD, BARS_NEW);

swap('Fig 9 caption → n=14',
` &nbsp;Problem-statement and intent, n = 15.`,
` &nbsp;Problem-statement and intent, n = 14.`);

// ── 3. Voices: replace heir with Option A; shorten B; add Option C as D ──
//
// Layout the three quote boxes so all four fit. Strategy: make B
// noticeably shorter (cut its longest middle clause), keep A as is, swap
// heir for Option A under "Interviewee C", add Option C as "Interviewee D".

const VOICES_OLD =
` <h3>Voices from interviews</h3>
 <div class="pull-quote">
 "The hardest part is not knowing if a decision was actually a good
 one. You make the call, things happen, and you never really get told
 why it worked or did not."
 <span class="attrib">Interviewee A · Final-year student</span>
 </div>
 <div class="pull-quote">
 "LinkedIn is fine for the photo of you at a conference. It is not
 where you find the person you would actually phone before a hard
 meeting. I would pay if a tool genuinely got me better at deciding
 under pressure, and met me two or three people through it I wanted
 to know."
 <span class="attrib">Interviewee B · Early-career professional</span>
 </div>
 <div class="pull-quote">
 "One of the more irksome burdens of leadership, I find, is the tedious
 necessity of securing buy-in. The actual business of implementing
 change has become increasingly laborious, not least due to the
 mounting scepticism of the broader public."
 <span class="attrib">Interviewee C · NextGen successor, Asia-Pacific family business</span>
 </div>`;

const VOICES_NEW =
` <h3>Voices from interviews</h3>
 <div class="pull-quote">
 "The hardest part is not knowing if a decision was actually a good
 one. You make the call, things happen, and you never really get told
 why it worked or did not."
 <span class="attrib">Interviewee A · Final-year student</span>
 </div>
 <div class="pull-quote">
 "LinkedIn is fine for the photo of you at a conference. It is not
 where you find the person you'd actually phone before a hard meeting.
 I'd pay if a tool got me better at deciding under pressure."
 <span class="attrib">Interviewee B · Early-career professional</span>
 </div>
 <div class="pull-quote">
 "Making decisions that disappoint people and still standing by them.
 It's easy to lead when everyone agrees but much harder when you have
 incomplete information, conflicting interests, and real consequences."
 <span class="attrib">Interviewee C · Aspiring entrepreneur, family-business background</span>
 </div>
 <div class="pull-quote">
 "Knowing how to lead without having formal authority is difficult.
 Many young people have ideas and energy, but less experience handling
 conflict or accountability."
 <span class="attrib">Interviewee D · Aspiring entrepreneur</span>
 </div>`;

swap('Voices block: drop heir, add Option A (C) and Option C (D); shorten B', VOICES_OLD, VOICES_NEW);

// ── 4. Three pies rebuilt at n=14 ───────────────────────────
//
// Pie 1 (intention): 57% (5) / 43% (4) / 0%
//   ang1 = 205.7° → end (32.6, 86.0); large_arc = 1
// Pie 2 (preparedness): 43% (1-2) / 43% (3) / 14% (4-5)
//   slice 1 → 154.3° → end (67.4, 86.0); large_arc = 0
//   slice 2 → 308.6° → end (18.7, 25.1); large_arc = 0
// Pie 3 (willingness): 50% (£10-25) / 21% (£5-10) / 29% (free/cond)
//   slice 1 → 180° → end (50, 90); large_arc = 0
//   slice 2 → 257.1° → end (11.0, 58.9); large_arc = 0

const PIES_OLD_BASE = ` <div class="three-col" style="gap: 5mm; margin-top: 4mm;">
 <div>
 <h4 style="text-align: center;">Intention to try</h4>`;

// I'll hand-construct the precise old/new for the 3-pies block.

const PIES_OLD =
` <div class="three-col" style="gap: 5mm; margin-top: 4mm;">
 <div>
 <h4 style="text-align: center;">Intention to try</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
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
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
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
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
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

const SVG_STYLE = `style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;"`;
const PIES_NEW =
` <div class="three-col" style="gap: 5mm; margin-top: 4mm;">
 <div>
 <h4 style="text-align: center;">Intention to try</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 1 1 32.6 86.0 Z" fill="#0F3D34" />
 <path d="M 50 50 L 32.6 86.0 A 40 40 0 0 1 50 10 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> Strongly likely (5), 57%</div>
 <div><span class="dot" style="background: #D45F43;"></span> Likely (4), 43%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Less likely (≤3), 0%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 14 survey, Q7 (1–5)</p>
 </div>
 <div>
 <h4 style="text-align: center;">Self-rated preparedness</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 0 1 67.4 86.0 Z" fill="#D45F43" />
 <path d="M 50 50 L 67.4 86.0 A 40 40 0 0 1 18.7 25.1 Z" fill="#0F3D34" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #D45F43;"></span> Not prepared (1–2), 43%</div>
 <div><span class="dot" style="background: #0F3D34;"></span> Lukewarm (3), 43%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Prepared (4–5), 14%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 14 survey, Q4 (1–5)</p>
 </div>
 <div>
 <h4 style="text-align: center;">Willingness to pay</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 0 1 50 90 Z" fill="#0F3D34" />
 <path d="M 50 50 L 50 90 A 40 40 0 0 1 11.0 58.9 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> £10–25/mo, 50%</div>
 <div><span class="dot" style="background: #D45F43;"></span> £5–10/mo, 21%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Free only / conditional, 29%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 14 survey, Q9</p>
 </div>
 </div>`;

swap('3 pies → real n=14 distributions', PIES_OLD, PIES_NEW);

swap('Fig 10 caption → n=14',
` &nbsp;Distribution of survey responses on intention to try the platform,
 self-rated leadership preparedness, and willingness to pay (n = 15).`,
` &nbsp;Distribution of survey responses on intention to try the platform,
 self-rated leadership preparedness, and willingness to pay (n = 14).`);

// ── 5. Themes block: drop the NextGen-inheritor name-out ────
swap('Themes: drop NextGen-inheritor bullet (joke removed)',
` <li><strong>Buy-in and stakeholder management.</strong> The NextGen
 inheritor flagged buy-in as the dominant burden in a market that is
 simultaneously sceptical and over-promised by AI hype.</li>`,
` <li><strong>Buy-in and stakeholder management.</strong> Several
 respondents pointed at the difficulty of leading without formal
 authority, of getting buy-in from older or more senior stakeholders.</li>`);

// Themes intro reframe
swap('Themes intro — drop "first round of eight responses"',
` <h3>Themes from free-text answers</h3>
 <p style="font-size: 9.5pt;">
 Across the free-text answers to "what is the hardest part of becoming
 an effective leader?", four themes recurred (illustrative quotes drawn
 from the first round of eight responses):
 </p>`,
` <h3>Themes from free-text answers</h3>
 <p style="font-size: 9.5pt;">
 Across the free-text answers to "what is the hardest part of becoming
 an effective leader?", four themes recurred:
 </p>`);

// Themes footnote
swap('Themes footnote — n=14',
` <p style="font-size: 8.5pt; color: var(--muted); margin-top: 1.5mm;">
 Free-text Q5 across n = 15; coded by the team.
 </p>`,
` <p style="font-size: 8.5pt; color: var(--muted); margin-top: 1.5mm;">
 Free-text Q5 across n = 14; coded by the team.
 </p>`);

// Reaction page lede
swap('Reaction lede → n=14',
` <p style="font-size: 10pt;">
 Each interviewee was walked through the Acumen prototype after the
 pain-point discussion. Survey respondents (n = 15) answered the same
 closing prompts as a 5-point scale plus one free-text item. Three
 signals to surface: intention to try, self-rated preparedness, and
 willingness to pay.
 </p>`,
` <p style="font-size: 10pt;">
 Each interviewee was walked through the Acumen prototype after the
 pain-point discussion. Survey respondents (n = 14) answered the same
 closing prompts as a 5-point scale plus one free-text item. Three
 signals to surface: intention to try, self-rated preparedness, and
 willingness to pay.
 </p>`);

// Limitations
swap('Limitations — n=14',
`The primary research is small (15 survey
 responses, three in-depth interviews), figures in Section 7 are
 directional, not representative.`,
`The primary research is small (14 survey
 responses, three in-depth interviews), figures in Section 7 are
 directional, not representative.`);

// Executive summary
swap('Executive summary — n=14',
`a 15-response survey and three in-depth interviews give directional
 evidence.`,
`a 14-response survey and three in-depth interviews give directional
 evidence.`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
