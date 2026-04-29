// Round 3: cut word count to under 3,000 and fix the three layout overflows
// introduced by round 2 (page 02 +15mm, page 03 +52mm, page 09 +4mm).
//
// Strategy: nothing new gets added. Every change is a tightening cut on
// existing prose, especially on the densest pages (validation 11/12, scope 03)
// and the spots where round-2 additions pushed pages over.

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
  if (count !== expected) {
    throw new Error(`Step ${stepNum} (${label}): expected ${expected} match(es), found ${count}.`);
  }
  src = expected === 1 ? src.replace(oldStr, newStr) : src.split(oldStr).join(newStr);
  console.log(`  ${String(stepNum).padStart(2, '0')}. ${label}`);
}

// ── Page 02 — tighten optional-Qs sentence to fit ──────────────
swap('Page 02: optional-Qs sentence compressed',
` <p style="margin-top: 2.5mm; font-size: 9.5pt; color: var(--body);">
 In addition to the three essential questions, this report addresses
 three of the optional questions in the brief: <strong>who the first
 customers are</strong> (§2, §7), <strong>whether the market is large
 enough to support the business</strong> (§2 sizing), and <strong>the
 underlying technology</strong> (§5).
 </p>`,
` <p style="margin-top: 2mm; font-size: 9pt; color: var(--body);">
 Optional questions addressed (per the brief): <strong>first customers</strong>
 (§2, §7), <strong>market size</strong> (§2), and <strong>underlying
 technology</strong> (§5).
 </p>`);

// ── Page 03 — compact the TAM/SAM box, trim two paragraphs ────
swap('Page 03: drop TAM/SAM intro line + closing commentary',
` <h3 style="margin-top: 5mm;">Market sizing</h3>
 <p style="font-size: 9.5pt;">
 Top-down estimates from publicly available 2024 figures; willingness-to-pay
 remains subject to validation in the cohort pilot.
 </p>
 <table class="compact" style="margin-top: 1mm;">
 <thead>
 <tr><th style="width: 12%;">Layer</th><th style="width: 26%;">Definition</th><th style="width: 22%;">Size</th><th>Source / assumption</th></tr>
 </thead>
 <tbody>
 <tr>
 <td><strong>TAM</strong></td>
 <td>Global early-career professionals and business/management students</td>
 <td>~50&nbsp;m+</td>
 <td>UNESCO tertiary enrolments; OECD labour-force entrants 0–5 years post-graduation.</td>
 </tr>
 <tr>
 <td><strong>SAM</strong></td>
 <td>UK business/management students plus APAC NextGen successor pool</td>
 <td>~250&nbsp;k</td>
 <td>HESA 2023/24: ~140&nbsp;k UG + ~80&nbsp;k PG business students; PwC NextGen cohort scaled from <a href="#bib2">[2]</a>.</td>
 </tr>
 <tr>
 <td><strong>SOM (Y1)</strong></td>
 <td>UCL beachhead via society and course tie-ins</td>
 <td>~5,000</td>
 <td>UCL business and engineering enrolment with active society partnerships; targeting ~200 paid users at £9 plus 6 cohort licences.</td>
 </tr>
 </tbody>
 </table>
 <p style="font-size: 9pt; margin-top: 2mm; color: var(--muted);">
 The SOM is conservatively sized for a single-founder Year-1 plan rather
 than a venture-backed launch. Scaling beyond UCL to other UK universities
 plus one APAC pilot would expand the obtainable pool by an order of
 magnitude without leaving the SAM.
 </p>`,
` <h3 style="margin-top: 4mm;">Market sizing (top-down, 2024 figures)</h3>
 <table class="compact" style="margin-top: 1mm;">
 <thead>
 <tr><th style="width: 11%;">Layer</th><th style="width: 32%;">Definition</th><th style="width: 17%;">Size</th><th>Source / assumption</th></tr>
 </thead>
 <tbody>
 <tr><td><strong>TAM</strong></td><td>Global early-career professionals + business/management students</td><td>~50&nbsp;m+</td><td>UNESCO tertiary enrolments; OECD 0–5 yr graduates.</td></tr>
 <tr><td><strong>SAM</strong></td><td>UK business/management students + APAC NextGen pool</td><td>~250&nbsp;k</td><td>HESA 2023/24 (~220&nbsp;k); PwC NextGen cohort <a href="#bib2">[2]</a>.</td></tr>
 <tr><td><strong>SOM (Y1)</strong></td><td>UCL beachhead via society + course tie-ins</td><td>~5,000</td><td>~200 paid users at £9 plus 6 cohort licences.</td></tr>
 </tbody>
 </table>`);

swap('Page 03: trim "Who Acumen is built for" paragraph further',
` <h3>Who Acumen is built for</h3>
 <p>
 Acumen is built for anyone making business decisions earlier than
 expected: students running a society or capstone, early-career
 professionals promoted before training catches up, aspiring founders
 making a first hire, and analysts asked for an opinion above their pay
 grade. The common thread is that they have read about leadership but
 not practised it, and the cost of a first poor call is paid in
 reputation. NextGen successors are the highest-willingness-to-pay later
 segment, sitting on top of a much larger pool with the same problem.
 </p>`,
` <h3>Who Acumen is built for</h3>
 <p>
 Acumen is built for anyone deciding earlier than expected — students
 running a society or capstone, early-career professionals promoted
 before training catches up, aspiring founders making a first hire. The
 common thread: they have read about leadership but not practised it,
 and the first poor call is paid in reputation. NextGen successors are
 the highest-willingness-to-pay later segment, on top of a much larger
 pool with the same problem.
 </p>`);

swap('Page 03: trim leadership-readiness gap paragraph',
` <h3>The "leadership-readiness" gap</h3>
 <p>
 Business education is rich in frameworks but poor in practice. Internships
 compress months of work into weeks of memo writing, and graduate schemes
 defer real decision authority to year two or three. Serious games are
 increasingly used to assess and develop soft skills including problem
 solving, decision-making, and communication <a href="#bib14">[14]</a>.
 McKinsey's Game-Based Innovation Lab shows that simulation-based
 assessment now sits inside serious professional contexts, not entertainment
 <a href="#bib4">[4]</a>.
 </p>`,
` <h3>The "leadership-readiness" gap</h3>
 <p>
 Business education is rich in frameworks but poor in practice;
 internships compress months into weeks of memos, and graduate schemes
 defer decision authority to year two or three. Serious games
 increasingly assess soft skills <a href="#bib14">[14]</a>, and
 McKinsey's Game-Based Innovation Lab shows simulation-based assessment
 now sits inside serious professional contexts <a href="#bib4">[4]</a>.
 </p>`);

// ── Page 04 — trim "What Acumen is" lede + body ───────────────
swap('Page 04: lede + first paragraph tightened',
` <p class="lede">
 Acumen helps emerging business leaders practise realistic decisions,
 understand their leadership tendencies, and connect with peers whose
 strengths complement their own.
 </p>

 <div class="two-col">
 <div>
 <p>
 The product is built around a single repeatable loop. Each session begins
 with a realistic business scenario, presents the user with branching
 decisions under time and information constraints, then converts those
 choices into a research-informed leadership signal. The signal is
 developmental, not diagnostic. It points the user toward what to practise
 next, and toward peers whose strengths complement their own.
 </p>`,
` <p class="lede">
 Acumen helps emerging business leaders practise realistic decisions,
 understand their leadership tendencies, and connect with peers whose
 strengths complement their own.
 </p>

 <div class="two-col">
 <div>
 <p>
 The product is one repeatable loop. Each session begins with a
 realistic scenario under time and information constraints, then
 converts the user's choices into a research-informed leadership signal.
 The signal is developmental, not diagnostic — it points toward what to
 practise next and toward peers whose strengths complement their own.
 </p>`);

// ── Page 08 (tech-cont split) — compress IP paragraph ────────
swap('Page 08: IP paragraph compressed',
` <p>
 What is hard to clone is not the codebase — that can be replicated in
 weeks — but three things that compound over time: the
 <strong>scenario library</strong> (typed data linking decisions to
 hidden tags, with expert review on each release), the
 <strong>calibrated feedback rubric</strong> (anchored in upper-echelons,
 Vroom-Yetton, Hersey-Blanchard, and Rest, with expert raters scheduled
 for R5), and <strong>cohort-pilot network density</strong> (matching
 quality grows with usage, so a thin late entrant cannot match the
 product on day one). All three sit with the founding team, with
 trade-mark filing budgeted under Year-1 legal costs.
 </p>`,
` <p>
 What is hard to clone is not the codebase but three things that
 compound: the <strong>scenario library</strong> (typed data with expert
 review per release), the <strong>calibrated feedback rubric</strong>
 (anchored in upper-echelons, Vroom-Yetton, Hersey-Blanchard, and Rest;
 expert-rater calibration is R5), and <strong>cohort-pilot network
 density</strong> (matching quality grows with usage, so a late entrant
 cannot match day one). All sit with the founding team; trade-mark
 filing is budgeted in Year-1 legal costs.
 </p>`);

// ── Page 09 — compress revenue assumption sentence ────────────
swap('Page 09: revenue assumption sentence tightened',
` <p style="font-size: 9pt; color: var(--muted); margin-top: 1.5mm;">
 The £27,800 target is conservative — it assumes ~1,200 paid scenario-pack
 unlocks at £9, six cohort licences, and a single NextGen pilot — sized for
 a single-founder Year-1 plan rather than a venture-backed launch. The SOM
 (§2) leaves headroom of an order of magnitude before saturating the
 beachhead.
 </p>`,
` <p style="font-size: 9pt; color: var(--muted); margin-top: 1mm;">
 Conservative target: ~1,200 scenario-pack unlocks at £9, six cohort
 licences, and one NextGen pilot. The SOM (§2) leaves an order-of-magnitude
 headroom before saturating the beachhead.
 </p>`);

// ── Page 11 (Reaction) — bigger cut on the right column prose ─
swap('Page 11: founder-concern + response + read-together compressed',
` <h3>Why the founder concern matters</h3>
 <p style="font-size: 9.5pt;">
 The sceptical voice on page 10, Interviewee C, is the most strategically
 useful response of the three. It points at <strong>scope</strong>: at a
 very early founder stage, decision practice can feel less urgent than
 product work, fundraising, or a first hire. The same concern surfaced
 in three of the survey free-text responses from self-identified founders.
 </p>
 <p style="font-size: 9.5pt;">
 The response is not to widen Acumen's scope but to position it more
 honestly: it helps anyone deciding earlier than expected, but does not
 replace technical or commercial skill-building. Copy and onboarding now
 make the distinction explicit.
 </p>
 <p style="font-size: 9.5pt; margin-top: 3mm; color: var(--muted);">
 <strong style="color: var(--ink);">Read together,</strong> the three
 charts suggest the proposition lands as concept (70% would try, 56%
 positive) but willingness-to-pay is conditional: people pay for skill
 they can feel, not for a certificate they cannot.
 </p>`,
` <h3>Why the founder concern matters</h3>
 <p style="font-size: 9.5pt;">
 Interviewee C — the founder — is the most strategically useful voice
 of the three. The point is <strong>scope</strong>: at very early
 founder stage, decision practice can feel less urgent than product or
 fundraising. The same concern surfaced in three founder free-text
 responses. The response is not to widen Acumen's scope but to position
 it honestly: it helps anyone deciding earlier than expected, but does
 not replace technical or commercial skill-building.
 </p>
 <p style="font-size: 9.5pt; margin-top: 3mm; color: var(--muted);">
 <strong style="color: var(--ink);">Read together:</strong> the
 proposition lands as concept (70% would try, 56% positive) but
 willingness-to-pay is conditional — people pay for skill they can feel,
 not for a certificate they cannot.
 </p>`);

// Trim the lede paragraph on page 11 too
swap('Page 11: lede tightened',
` <p style="font-size: 10pt;">
 After the open pain-point discussion, each interviewee was walked
 through the Acumen prototype and asked the same set of concept-reaction
 questions. Survey respondents who indicated openness to the idea (n = 12)
 were asked the same closing prompts in a free-text field. Three signals
 are useful to surface: intention to use, perceived value of the loop,
 and not least, the dissenting view.
 </p>`,
` <p style="font-size: 10pt;">
 Each interviewee was walked through the Acumen prototype after the
 pain-point discussion. The 12 survey respondents who indicated openness
 answered the same closing prompts in free text. Three signals to
 surface: intention to use, perceived value, and the dissenting view.
 </p>`);

// ── Page 12 (What changed) — bigger cut, since it's still 323 ─
swap('Page 12: "Patterns across" intro tightened',
` <h3>Patterns across the three interviews</h3>
 <p style="font-size: 10pt;">
 With only three conversations, we report what was said rather than how
 many "agreed". The matrix below summarises whether each interviewee
 raised the topic without prompting, raised it after prompting, or did not
 raise it at all. It is offered as a record of the interviews, not as a
 quantitative finding.
 </p>`,
` <h3>Patterns across the three interviews</h3>
 <p style="font-size: 10pt;">
 With only three conversations, we report what was said rather than how
 many agreed. The matrix below records, per interviewee, whether each
 topic was raised unprompted, raised after prompting, or not raised —
 a record, not a quantitative finding.
 </p>`);

// ── Page 13 SWOT — already trimmed in round 2; trim further ─
swap('Page 13: lede + closing trimmed further',
` <p class="lede">
 Two short analyses are used: a SWOT to frame Acumen's internal position,
 and Porter's Five Forces to frame the external structure of the market.
 </p>`,
` <p class="lede">
 Two short analyses: SWOT for internal position, Porter for external
 market structure.
 </p>`);

// ── Page 14 (Porter) — kept tight already; trim front matter ─
// (no further changes; round 2 already cut the closing.)

// ── Page 15 — second-pass tightening ────────────────────────
swap('Page 15 lede tightened',
` <p class="lede">
 The evidence map below shows how each major research finding translated
 into a concrete product decision. It is the simplest way to demonstrate that
 Acumen is not a generic edtech idea, but a product designed against a
 specific body of research.
 </p>`,
` <p class="lede">
 The evidence map shows how each research finding translated into a
 product decision — Acumen is designed against a specific body of
 research, not a generic edtech idea.
 </p>`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
