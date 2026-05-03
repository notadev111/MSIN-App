// Round 7: rebuild validation section with real survey data (n = 8).
//
// Replaces:
//   - "Survey snapshot, n=18" bars → 5 bars from real responses
//   - 3 pie charts on Reaction page → 3 pies from real distributions
//   - "What people most want from the loop" 6-bar chart → dropped
//     (the free-text feature-mention data was synthetic and n=8 is too
//     small to break out feature mentions; replaced with a brief themes
//     paragraph from real free-text answers)
//   - All n=18 / n=12 / 18+3 references → corrected to n=8
//   - "How we ran it" prose now reflects the actual sample composition
//
// Pie SVG geometry: viewBox 0 0 100 100, centre (50,50), r=40.
// Slices computed from real percentages, large-arc flag set per slice
// width.

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

// ── 1. "How we ran it" — real n=8, real role split, family-biz note ──
const HOW_WE_RAN_OLD =
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured 20–25 minute interviews — a final-year
 UCL student, an early-career professional in a first management role,
 and a pre-incorporation founder — followed a three-part guide:
 <strong>pain points</strong>, <strong>concept reaction</strong> after
 prototype walkthrough, and <strong>willingness to pay</strong> (full
 guide in Appendix B). A parallel five-question survey through UCL
 student networks returned <strong>18 responses</strong> (12 students, 4
 early-career, 2 founders), including the named successor of a large
 Singaporean family business — a thin but direct signal from the NextGen
 segment. Directional, not representative.
 </p>`;

const HOW_WE_RAN_NEW =
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured 20–25 minute interviews — a final-year
 UCL student, an early-career professional in a first management role,
 and a pre-incorporation founder — followed a three-part guide:
 <strong>pain points</strong>, <strong>concept reaction</strong> after
 prototype walkthrough, and <strong>willingness to pay</strong> (full
 guide in Appendix B). A parallel online survey through UCL networks
 returned <strong>8 responses</strong> (5 aspiring entrepreneurs, 2
 students, 1 NextGen family-business inheritor — the named successor of
 a large Singaporean family business, a thin but direct signal from the
 premium segment). Sample is small; treated as directional throughout.
 </p>`;

swap('"How we ran it" — real n=8', HOW_WE_RAN_OLD, HOW_WE_RAN_NEW);

// ── 2. Survey snapshot bars (n=8) ───────────────────────────────
const BARS_OLD =
` <h3>Survey snapshot, n = 18</h3>
 <div class="chart-frame">
 <div class="bar-row">
 <div class="bar-label">Few chances to practise judgement</div>
 <div class="bar-track"><div class="bar-fill" style="width: 83%;"></div></div>
 <div class="bar-value">15 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Want feedback on how I decide</div>
 <div class="bar-track"><div class="bar-fill" style="width: 72%;"></div></div>
 <div class="bar-value">13 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Networking events feel transactional</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 61%;"></div></div>
 <div class="bar-value">11 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Would try a 15-minute simulation</div>
 <div class="bar-track"><div class="bar-fill" style="width: 67%;"></div></div>
 <div class="bar-value">12 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Would pay for advanced scenarios</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 28%;"></div></div>
 <div class="bar-value">5 / 18</div>
 </div>
 <p style="margin-top: 3mm; font-size: 8.5pt; color: var(--muted);">
 Respondents agreeing or strongly agreeing on a 5-point scale. Small
 sample; treat as directional only.
 </p>
 </div>`;

const BARS_NEW =
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

swap('Survey snapshot bars → real n=8 data', BARS_OLD, BARS_NEW);

// Fig 9 caption
swap('Fig 9 caption → n=8',
` &nbsp;Problem-statement agreement, n = 18.`,
` &nbsp;Problem-statement and intent, n = 8.`);

// ── 3. Three pie charts → real distributions ───────────────────
//
// Pie 1 — Intention to try (Q7 use-likelihood, 1–5):
//   Strongly likely (5): 6/8 = 75%
//   Likely (4): 2/8 = 25%
//   Less likely (≤3): 0/8 = 0%
//
// Pie 2 — Self-rated preparedness (Q4, 1–5):
//   Not prepared (1–2): 2/8 = 25%
//   Lukewarm (3): 5/8 = 62.5%
//   Prepared (4–5): 1/8 = 12.5%
//
// Pie 3 — Willingness to pay (Q9):
//   £10–25/month: 5/8 = 62.5%
//   £5–10/month: 1/8 = 12.5%
//   Free only / conditional: 2/8 = 25%

const PIES_OLD =
` <div class="three-col" style="gap: 5mm; margin-top: 4mm;">
 <div>
 <h4 style="text-align: center;">Intention to try</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 1 1 19.7 71.4 Z" fill="#0F3D34" />
 <path d="M 50 50 L 19.7 71.4 A 40 40 0 0 1 23.0 25.5 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> Would try, 70%</div>
 <div><span class="dot" style="background: #D45F43;"></span> Maybe, 22%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> No, 8%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 18 survey + 3 interviews</p>
 </div>
 <div>
 <h4 style="text-align: center;">Reaction sentiment</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 0 1 87.0 64.7 Z" fill="#0F3D34" />
 <path d="M 50 50 L 87.0 64.7 A 40 40 0 0 1 63.0 88.5 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> Positive, 56%</div>
 <div><span class="dot" style="background: #D45F43;"></span> Constructive concern, 30%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> Sceptical, 14%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 18 + 3, free-text coded</p>
 </div>
 <div>
 <h4 style="text-align: center;">Willingness to pay</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;">
 <circle cx="50" cy="50" r="40" fill="#DCE9E4" />
 <path d="M 50 50 L 50 10 A 40 40 0 0 1 76.6 21.5 Z" fill="#0F3D34" />
 <path d="M 50 50 L 76.6 21.5 A 40 40 0 0 1 28.6 80.0 Z" fill="#D45F43" />
 </svg>
 <div class="pie-legend">
 <div><span class="dot" style="background: #0F3D34;"></span> For skill, 26%</div>
 <div><span class="dot" style="background: #D45F43;"></span> Conditional, 56%</div>
 <div><span class="dot" style="background: #DCE9E4;"></span> No, 18%</div>
 </div>
 </div>
 <p style="font-size: 8pt; color: var(--muted); text-align: center; margin-top: 2mm;">n = 18 + 3, free-text coded</p>
 </div>
 </div>`;

// New pie SVGs. SVG path uses r=40 around (50,50). End coords at angle θ
// from top: (50 + 40·sin θ, 50 − 40·cos θ).
//
// Pie 1: 75% / 25% / 0%. Slice 1 spans 270° → end (10, 50), large-arc=1.
//                        Slice 2 spans 90°  → end (50, 10), large-arc=0.
// Pie 2: 25% / 62.5% / 12.5%. Slice 1 90° → (90,50), L=0.
//                              Slice 2 225° → (21.7,21.7), L=1.
//                              Slice 3 45° → (50,10), L=0.
// Pie 3: 62.5% / 12.5% / 25%.  Slice 1 225° → (21.7,78.3), L=1.
//                              Slice 2 45° → (10,50), L=0.
//                              Slice 3 90° → (50,10), L=0.

const SVG_STYLE = `style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;"`;
const PIES_NEW =
` <div class="three-col" style="gap: 5mm; margin-top: 4mm;">
 <div>
 <h4 style="text-align: center;">Intention to try</h4>
 <div class="pie-frame">
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
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
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
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
 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" ${SVG_STYLE}>
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

swap('3 pie charts rebuilt with real n=8 distributions', PIES_OLD, PIES_NEW);

// Fig 10 caption
swap('Fig 10 caption → real n=8',
` &nbsp;Three pie charts of post-prototype reaction across survey free-text
 (n = 18) and interviews (n = 3), coded by the team.`,
` &nbsp;Distribution of survey responses on intention to try the platform,
 self-rated leadership preparedness, and willingness to pay (n = 8).`);

// ── 4. "What people most want from the loop" — replace with theme prose ──
const WANT_OLD =
` <div class="two-col" style="gap: 6mm; margin-top: 4mm;">
 <div>
 <h3>What people most want from the loop</h3>
 <div class="chart-frame">
 <div class="bar-row">
 <div class="bar-label">Feedback I can act on</div>
 <div class="bar-track"><div class="bar-fill" style="width: 92%;"></div></div>
 <div class="bar-value">11 / 12</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Real scenarios, not abstract cases</div>
 <div class="bar-track"><div class="bar-fill" style="width: 75%;"></div></div>
 <div class="bar-value">9 / 12</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Useful peer connections</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 67%;"></div></div>
 <div class="bar-value">8 / 12</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Short, repeatable sessions</div>
 <div class="bar-track"><div class="bar-fill" style="width: 58%;"></div></div>
 <div class="bar-value">7 / 12</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Mobile-friendly</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 92%;"></div></div>
 <div class="bar-value">11 / 12</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Verifiable certificate</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 17%;"></div></div>
 <div class="bar-value">2 / 12</div>
 </div>
 <p style="margin-top: 3mm; font-size: 8.5pt; color: var(--muted);">
 Features mentioned unprompted in free-text by the 12 survey respondents
 who said they would try Acumen.
 </p>
 </div>
 <p style="font-size: 9pt; margin-top: 2mm;">
 <span style="color: var(--terracotta); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; font-size: 8.5pt;">Fig. 11</span>
 &nbsp;Feature mentions in concept-reaction free text, n = 12.
 </p>
 </div>
 <div>`;

const WANT_NEW =
` <div class="two-col" style="gap: 6mm; margin-top: 4mm;">
 <div>
 <h3>Themes from free-text answers</h3>
 <p style="font-size: 9.5pt;">
 Across the eight responses to "what is the hardest part of becoming an
 effective leader?", four themes recurred:
 </p>
 <ul style="font-size: 9.5pt; padding-left: 4mm; line-height: 1.5;">
 <li><strong>Credibility and respect.</strong> Three respondents named
 being taken seriously by an older or more experienced group as the
 hardest part — particularly relevant when leading peers in the same
 age band.</li>
 <li><strong>Decision-making with stakes.</strong> One respondent put
 it precisely: <em>"making decisions that disappoint people and still
 standing by them."</em></li>
 <li><strong>Buy-in and stakeholder management.</strong> The NextGen
 inheritor flagged buy-in as the dominant burden in a market that is
 simultaneously sceptical and over-promised by AI hype.</li>
 <li><strong>Experience and network gap.</strong> Two respondents
 framed the gap as not lack of ability but lack of exposure to real
 stakes; this is the gap Acumen targets directly.</li>
 </ul>
 <p style="font-size: 8.5pt; color: var(--muted); margin-top: 1.5mm;">
 Free-text Q5 across n = 8; coded by the team.
 </p>
 </div>
 <div>`;

swap('"What people most want" bar chart → free-text themes', WANT_OLD, WANT_NEW);

// ── 5. Page 11 (reaction page) — lede paragraph fixed ─────────
swap('Reaction page lede → real n=8',
` <p style="font-size: 10pt;">
 Each interviewee was walked through the Acumen prototype after the
 pain-point discussion. The 12 survey respondents who indicated openness
 answered the same closing prompts in free text. Three signals to
 surface: intention to use, perceived value, and the dissenting view.
 </p>`,
` <p style="font-size: 10pt;">
 Each interviewee was walked through the Acumen prototype after the
 pain-point discussion. Survey respondents (n = 8) answered the same
 closing prompts as a 5-point scale plus one free-text item. Three
 signals to surface: intention to try, self-rated preparedness, and
 willingness to pay.
 </p>`);

// ── 6. Limitations section — match the new sample size ─────────
swap('Limitations section — n=8 + 3 in-depth',
`The primary research is small (18 survey
 responses, three in-depth interviews) — figures in Section 7 are
 directional, not representative.`,
`The primary research is small (8 survey
 responses, three in-depth interviews) — figures in Section 7 are
 directional, not representative.`);

// Executive summary already updated separately (the earlier text in this
// run no longer matched the current HTML).

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
