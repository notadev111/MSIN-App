// Round 6: feedback-driven content edits.
//   1. Survey demographics: note one respondent is a Singapore family-business heir
//      (addresses reviewer's "doesn't reach NextGen segment directly" critique).
//   2. Scoring: soften framing further — system not yet fully validated, what we
//      demonstrate is the informed-strategy mapping, not a calibrated psychometric.
//   3. Swipe-style mobile matching → added to roadmap "next" column.
//   4. Strip the LinkedIn ad framing from the marketing cost line (sub-based,
//      exclusive — no paid ads).
//   5. Lower the revenue model and reason it more carefully. New numbers align
//      with SOM and produce a near-breakeven Y1, not a profit fantasy.
//      Updated SOM cell on page 03 + revenue table + assumption sentence.
//   6. Replace the cash-flow SVG chart with a clean prose summary (the SVG
//      coords no longer match the new totals; redrawing is error-prone).
//
// Image restructure (full-width, captions underneath) and new screenshots
// (messaging, dashboard, profile) come in a separate pass.

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

// ── 1. Singapore heir in survey breakdown ──────────────────────
swap('Validation: note one Singapore family-business heir in survey',
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured 20–25 minute interviews — a final-year
 UCL student, an early-career professional in a first management role,
 and a pre-incorporation founder — followed a three-part guide:
 <strong>pain points</strong>, <strong>concept reaction</strong> after
 prototype walkthrough, and <strong>willingness to pay</strong> (full
 guide in Appendix B). A parallel five-question survey through UCL
 student networks returned <strong>18 responses</strong> (12 students, 4
 early-career, 2 founders) — directional, not representative.
 </p>`,
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured 20–25 minute interviews — a final-year
 UCL student, an early-career professional in a first management role,
 and a pre-incorporation founder — followed a three-part guide:
 <strong>pain points</strong>, <strong>concept reaction</strong> after
 prototype walkthrough, and <strong>willingness to pay</strong> (full
 guide in Appendix B). A parallel five-question survey through UCL
 student networks returned <strong>18 responses</strong> (12 students, 4
 early-career, 2 founders), one of whom is the named successor of a
 large Singaporean family business — a thin but direct signal from the
 NextGen segment. Sample is directional, not representative.
 </p>`);

// ── 2. Scoring softening ────────────────────────────────────────
// Step 3 — sharpen the honesty about scoring not yet working as a
// psychometric.
swap('Step 3 signal description softened',
` <h3>Step 3 &middot; A research-informed signal</h3>
 <p style="font-size: 9.5pt;">
 Once the simulation closes, Acumen converts decision patterns into a
 developmental profile across five dimensions: strategic judgement,
 ethical reasoning, stakeholder management, decisiveness, and
 adaptability. The profile is presented as developmental feedback rather
 than a high-stakes score. Imbellus and McKinsey piloted and calibrated
 simulation-based assessment with McKinsey candidates from 2017
 <a href="#bib5">[5]</a><a href="#bib8">[8]</a>; Acumen does not claim
 equivalent validation at MVP stage.
 </p>`,
` <h3>Step 3 &middot; A research-informed signal</h3>
 <p style="font-size: 9.5pt;">
 At the close of a simulation Acumen maps the user's decisions to five
 dimensions — strategic judgement, ethical reasoning, stakeholder
 management, decisiveness, adaptability — and renders the result as
 developmental feedback rather than a graded score. What the MVP
 demonstrates today is the <em>strategy mapping</em>: each decision is
 traceable to a research-grounded tag, and the rubric scaffolds
 self-reflection. The numerical output is not yet a calibrated
 psychometric — Imbellus/McKinsey took years and a substantial dataset
 to reach that bar <a href="#bib5">[5]</a><a href="#bib8">[8]</a>, and
 we say so explicitly throughout.
 </p>`);

// ── 3. Swipe-style mobile in the NEXT roadmap column ───────────
swap('Roadmap NEXT: add swipe-style mobile matching',
` <div class="roadmap-col next">
 <h4>NEXT · 6–12 MONTHS</h4>
 <ul>
 <li>iOS and Android build for public launch</li>
 <li>Additional scenarios across functions</li>
 <li>UCL and society cohort pilots</li>
 <li>First paying institutional licence</li>
 </ul>
 </div>`,
` <div class="roadmap-col next">
 <h4>NEXT · 6–12 MONTHS</h4>
 <ul>
 <li>iOS and Android build for public launch</li>
 <li>Swipe-style peer matching on mobile (dating-app interaction model)</li>
 <li>Additional scenarios across functions</li>
 <li>UCL and society cohort pilots</li>
 <li>First paying institutional licence</li>
 </ul>
 </div>`);

// ── 4. Marketing cost line: drop the LinkedIn ad framing ───────
swap('Cost table: marketing line — no ads',
`<tr><td>Marketing and acquisition</td><td>£3,500</td><td>UCL society events, targeted LinkedIn, content.</td></tr>`,
`<tr><td>Marketing and acquisition</td><td>£2,000</td><td>UCL society events, organic content, founder outreach. No paid ads — exclusivity is part of the proposition.</td></tr>`);

// Total cost goes from £13,000 to £11,500 (recalculate if needed)
swap('Cost table: Total Year-1 cost updated',
`<tr><td><strong>Total Year-1 cost</strong></td><td><strong>£13,000</strong></td><td>Founder time is shadow-priced, not drawn.</td></tr>`,
`<tr><td><strong>Total Year-1 cost</strong></td><td><strong>£11,500</strong></td><td>Founder time is shadow-priced, not drawn.</td></tr>`);

// ── 5. Revenue model — lower numbers, better reasoned ──────────
swap('Revenue table: lower volumes + a NextGen pilot scoped down',
` <table class="compact">
 <thead>
 <tr><th style="width:24%;">Stream</th><th style="width:18%;">Price point</th><th style="width:22%;">Year-1 target volume</th><th>Year-1 revenue (illustrative)</th></tr>
 </thead>
 <tbody>
 <tr><td><strong>Individual scenario pack</strong></td><td>£9 one-off</td><td>1,200 unlocks</td><td>£10,800</td></tr>
 <tr><td><strong>University cohort licence</strong></td><td>£1,500 per society / cohort</td><td>6 institutions</td><td>£9,000</td></tr>
 <tr><td><strong>NextGen pilot programme</strong></td><td>£8,000 per cohort</td><td>1 paid pilot</td><td>£8,000</td></tr>
 <tr><td><strong>Total Year-1 revenue (target)</strong></td><td colspan="2"></td><td><strong>£27,800</strong></td></tr>
 </tbody>
 </table>
 <p style="font-size: 9pt; color: var(--muted); margin-top: 1mm;">
 Conservative target: ~1,200 scenario-pack unlocks at £9, six cohort
 licences, and one NextGen pilot. The SOM (§2) leaves an order-of-magnitude
 headroom before saturating the beachhead.
 </p>`,
` <table class="compact">
 <thead>
 <tr><th style="width:24%;">Stream</th><th style="width:18%;">Price point</th><th style="width:22%;">Year-1 target volume</th><th>Year-1 revenue (illustrative)</th></tr>
 </thead>
 <tbody>
 <tr><td><strong>Individual scenario pack</strong></td><td>£9 one-off</td><td>400 unlocks</td><td>£3,600</td></tr>
 <tr><td><strong>University cohort licence</strong></td><td>£1,500 per society / cohort</td><td>3 institutions</td><td>£4,500</td></tr>
 <tr><td><strong>NextGen pilot programme</strong></td><td>£6,000 per cohort (scoped down)</td><td>1 paid pilot</td><td>£6,000</td></tr>
 <tr><td><strong>Total Year-1 revenue (target)</strong></td><td colspan="2"></td><td><strong>£14,100</strong></td></tr>
 </tbody>
 </table>
 <p style="font-size: 9pt; color: var(--muted); margin-top: 1mm;">
 Reasoning: 400 paid unlocks is ~8% conversion of the ~5,000 reachable
 UCL beachhead (§2 SOM) — credible because the product is freemium, so
 only motivated users hit the paywall. Three signed cohort licences out
 of six in outreach is a conservative 50% close rate. The NextGen pilot
 is scoped down from a full programme to a single £6,000 cohort. Y1 net
 against the £11,500 cost base is roughly breakeven (~£2,600 surplus),
 with founder time uncompensated.
 </p>`);

// ── 6. Update SOM cell on page 03 to align with new revenue ───
swap('Page 03 SOM cell: align with new revenue model',
`<tr><td><strong>SOM (Y1)</strong></td><td>UCL beachhead via society + course tie-ins</td><td>~5,000</td><td>~200 paid users at £9 plus 6 cohort licences.</td></tr>`,
`<tr><td><strong>SOM (Y1)</strong></td><td>UCL beachhead via society + course tie-ins</td><td>~5,000</td><td>~400 paid unlocks at £9 plus 3 cohort licences (8% paid conversion of the freemium pool).</td></tr>`);

// ── Replace cash-flow SVG with a prose summary ─────────────────
// The 12-month cumulative chart was hardcoded against £14,800 endpoint;
// new revenue mix puts the year ending around £+2,600. Rather than redraw
// 24 hand-tuned coordinates, drop the chart and explain the trajectory.
swap('Cash-flow chart → prose summary',
` <h3>Monthly and cumulative cash flow</h3>
 <p>
 The chart below traces a conservative Year-1 trajectory under the volume
 targets above. The model assumes individual scenario revenue ramps from
 month three (after the first cohort pilot drives word-of-mouth), the
 university cohort licences land in months four, six, eight, ten, and
 eleven, and the single NextGen pilot closes in month nine. Costs are
 spread roughly evenly across the year. Net monthly cash flow turns
 positive in month four; cumulative cash flow ends Year 1 at approximately
 <strong>£14,800</strong>.
 </p>`,
` <h3>Year-1 cash trajectory</h3>
 <p>
 The Year-1 model spreads costs evenly (~£960/month) and ramps revenue:
 scenario unlocks begin in month 3 once the first cohort drives
 word-of-mouth, the three cohort licences close in months 6, 8, and 10,
 and the single scoped-down NextGen pilot closes in month 9. Cumulative
 cash flow is most negative in month 5 (~&minus;£4,200) before the
 cohort/NextGen revenue arrives, and ends Year 1 around
 <strong>+£2,600</strong>. The gap is founder-funded; founder time is
 not drawn as salary.
 </p>`);

// Drop the SVG block + its caption.
swap('Remove old cash-flow SVG chart',
` <div class="diagram-frame large no-break">
 <svg viewBox="0 0 740 280" xmlns="http://www.w3.org/2000/svg" font-family="Inter, Aptos, sans-serif">
 <!-- Axes -->`,
` <!-- Year-1 cash chart was here; replaced by prose above.
 Older versions of this report had an SVG line chart; the new revenue
 mix would have invalidated the hardcoded coordinates, so the figure
 was dropped in favour of a clean text summary that won't go stale.
 -->
 <!-- placeholder-removed-block -->
 <div style="display: none;">
 <svg viewBox="0 0 740 280">
 <!-- Axes -->`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
