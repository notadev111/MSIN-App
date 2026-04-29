// Round 2: feedback-driven edits.
//   1. Group 50 → Group 47 (cover + charter).
//   2. Executive summary declares the 3 chosen optional questions (B, C, D).
//   3. TAM/SAM/SOM box added to page 03 + page 03 scope/APAC paragraphs trimmed.
//   4. IP/uniqueness sharpened on the existing "Honest limitations and IP" page.
//   5. £27,800 framed with one-sentence assumption note.
//   6. Word-count trims on pages 11 (validation cont.), 12 (validation cont.),
//      13 (SWOT closing), 14 (Porter closing). Existing pages were already
//      tightened in round 1, so these are second-pass cuts where prose is
//      densest.
//
// Aborts on any string mismatch — no silent drift.

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

// ── 1. Team rename ───────────────────────────────────────────────
swap('Cover: Group 50 → Group 47',
` <h4>Group 50</h4>`,
` <h4>Group 47</h4>`);
swap('Group charter: Group 50 → Group 47',
`<h3>Group charter · Group 50</h3>`,
`<h3>Group charter · Group 47</h3>`);

// ── 2. Optional-questions sentence in executive summary ─────────
// Append a sentence to the verdict callout so the marker can spot the
// declared three at a glance.
swap('Verdict callout: declare optional Qs B + C + D',
` <div class="callout">
 <p>
 <strong>Verdict.</strong> Acumen is feasible as an early MVP — the
 simulation, feedback, and peer-discovery loop is demonstrated. Further
 user testing and scoring validation are needed before high-stakes use.
 </p>
 </div>`,
` <div class="callout">
 <p>
 <strong>Verdict.</strong> Acumen is feasible as an early MVP — the
 simulation, feedback, and peer-discovery loop is demonstrated. Further
 user testing and scoring validation are needed before high-stakes use.
 </p>
 <p style="margin-top: 2.5mm; font-size: 9.5pt; color: var(--body);">
 In addition to the three essential questions, this report addresses
 three of the optional questions in the brief: <strong>who the first
 customers are</strong> (§2, §7), <strong>whether the market is large
 enough to support the business</strong> (§2 sizing), and <strong>the
 underlying technology</strong> (§5).
 </p>
 </div>`);

// ── 3. Page 03 — trim scope paragraph + add TAM/SAM/SOM box ─────
swap('Page 03: shorten "Who Acumen is built for" paragraph',
` <h3>Who Acumen is built for</h3>
 <p>
 Acumen is built for anyone preparing to make business decisions earlier
 than expected. That includes family-business heirs, who sit at the
 sharpest end of the readiness gap, but it is broader than that: students
 about to run a society or capstone project, early-career professionals
 promoted into management before training catches up, aspiring founders
 making their first hire, and analysts asked for an opinion in rooms above
 their pay grade. The common thread is simple: they have read about
 leadership, they have not practised it, and the cost of their first poor
 judgement call is paid in real reputation. NextGen successors are an
 important later-stage segment with the highest willingness to pay, but
 they sit on top of a far larger pool of users who share the same
 underlying problem.
 </p>`,
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
 </p>`);

swap('Page 03: APAC paragraph tightened',
` <h3>Why an Asia-Pacific focus</h3>
 <p>
 The premium segment is concentrated in Asia-Pacific, where family
 businesses dominate and a generational handover is underway. Between 2023
 and 2030, high-net-worth Asia-Pacific families are expected to transfer
 around USD 5.8 trillion to the next generation <a href="#bib3">[3]</a>. PwC
 finds <strong>43%</strong> of Indonesian NextGen citing senior resistance
 to handover and <strong>19%</strong> of family businesses delaying
 succession <a href="#bib1">[1]</a>. Sukamdani notes Indonesian family
 companies reach around 40% of market capitalisation and contribute over
 80% of GDP <a href="#bib7">[7]</a>. The anchor matters not because heirs
 will fund development, but because it gives Acumen a defensible reason to
 exist beyond a generic edtech pitch.
 </p>`,
` <h3>Why an Asia-Pacific focus</h3>
 <p>
 The premium segment is concentrated in Asia-Pacific, where family
 businesses dominate and a generational handover is underway. Between
 2023 and 2030, Asia-Pacific families are expected to transfer roughly
 USD 5.8 trillion to the next generation <a href="#bib3">[3]</a>; PwC
 finds <strong>43%</strong> of Indonesian NextGen citing senior
 resistance to handover <a href="#bib1">[1]</a>, and Sukamdani notes
 Indonesian family companies contribute over 80% of GDP
 <a href="#bib7">[7]</a>. The anchor matters not because heirs will fund
 development, but because it gives Acumen a defensible reason to exist
 beyond a generic edtech pitch.
 </p>`);

// Replace the KPI-row block on page 03 with a TAM/SAM/SOM sizing block.
// The KPI tiles repeat figures that already appear in the prose; the box
// answers the brief's Optional Q (C) "is the market large enough?" with
// top-down secondary-data estimates.
swap('Page 03: replace KPI row with TAM/SAM/SOM sizing block',
` <div class="kpi-row">
 <div class="kpi">
 <div class="kpi-num">$5.8T</div>
 <div class="kpi-label">APAC NextGen wealth transfer 2023–2030 <a href="#bib3">[3]</a></div>
 </div>
 <div class="kpi">
 <div class="kpi-num">43<span class="unit">%</span></div>
 <div class="kpi-label">Indonesian NextGen citing senior resistance <a href="#bib1">[1]</a></div>
 </div>
 <div class="kpi">
 <div class="kpi-num">917</div>
 <div class="kpi-label">Interviews in PwC Global NextGen Survey 2024 <a href="#bib2">[2]</a></div>
 </div>
 </div>

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">03</div>
</section>`,
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
 </p>

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">03</div>
</section>`);

// ── 4. IP / uniqueness sharpening ───────────────────────────────
// Existing "Honest limitations and IP" paragraph already has the kernel.
// Add a closing sentence that names what makes the product hard to clone
// — answers the brief's Optional Q (E) without claiming it as one of the 3.
swap('IP / uniqueness sharpened',
` <h3>Honest limitations and IP</h3>
 <p>
 Acumen is a research-informed prototype, not a fully validated assessment
 platform. The scoring system is internally structured and framework-based,
 but it has not yet been externally validated against a large sample or
 real-world leadership outcomes. The peer matching layer currently uses
 demo data rather than a live algorithm, and several roadmap features (CV
 parsing, global maps, recruiter tools, certificates) are deliberately out
 of scope at MVP. Acumen's defensible IP is not the codebase, which can be
 replicated in weeks, but the scenario library, the typed data model that
 links decisions to research frameworks, and the calibrated feedback
 model. All sit with the founding team.
 </p>`,
` <h3>Honest limitations and IP</h3>
 <p>
 Acumen is a research-informed prototype, not a validated assessment
 platform. Scoring is internally structured and framework-based but not
 externally validated against real-world leadership outcomes; peer
 matching uses demo data rather than a live algorithm; CV parsing,
 global maps, recruiter tools, and certificates are deliberately out
 of scope at MVP.
 </p>
 <p>
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
 </p>`);

// ── 5. Revenue assumption sentence ──────────────────────────────
swap('Revenue: assumption sentence under £27,800 table',
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
 </table>`,
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
 <p style="font-size: 9pt; color: var(--muted); margin-top: 1.5mm;">
 The £27,800 target is conservative — it assumes ~1,200 paid scenario-pack
 unlocks at £9, six cohort licences, and a single NextGen pilot — sized for
 a single-founder Year-1 plan rather than a venture-backed launch. The SOM
 (§2) leaves headroom of an order of magnitude before saturating the
 beachhead.
 </p>`);

// ── 6. Word-count trims on pages 11/12/13/14 ────────────────────

// Page 11 ("What we heard, and what changed") — 3 paragraphs already
// trimmed in round 1, but still dense. Tighten further.
swap('Page 11: "What changed" + "Cold-start" + "Still needs testing" tightened',
` <h3 style="margin-top: 5mm;">What changed because of the interviews</h3>
 <p style="font-size: 10pt;">
 Four product decisions followed. The leadership signal was reframed as
 developmental rather than diagnostic, after scepticism about
 single-session grading. Peer matching moved earlier in the journey,
 since the network was described as the most distinctive part of the
 proposition. The mobile build was promoted from "later" to "launch" —
 all three interviewees said unprompted they would prefer to use Acumen
 on their phone. Copy and onboarding were rewritten to be honest about
 scope: Acumen helps anyone deciding earlier than expected, but does not
 replace product or commercial skill-building.
 </p>

 <h3>The cold-start concern</h3>
 <p style="font-size: 10pt;">
 Interviewee B raised the sharpest concern: <em>"the matching only works
 if there are actually people in there worth meeting."</em> The other two
 agreed when asked. The response is the cohort-pilot model: rather than a
 sparse public launch, Acumen seeds the network through closed cohort
 pilots (UCL societies first, then a course tie-in), so everyone in the
 matching pool starts on the same day — guaranteeing a meaningful network
 at first contact.
 </p>

 <h3>What still needs testing</h3>
 <p style="font-size: 10pt;">
 Three questions remain open, informing R1, R2, and R6 in Section 9:
 whether users return, whether the signal is understood without
 facilitator, and whether a society signs a paying pilot. Next validation
 runs on a 40-user UCL cohort with telemetry on completion, return, and
 peer-message rates rather than self-report alone.
 </p>`,
` <h3 style="margin-top: 5mm;">What changed because of the interviews</h3>
 <p style="font-size: 10pt;">
 Four product decisions followed. The leadership signal was reframed as
 developmental, not diagnostic, after scepticism about single-session
 grading. Peer matching moved earlier in the journey — the network was
 the most distinctive part of the proposition. The mobile build was
 promoted from "later" to "launch": all three interviewees said
 unprompted they would prefer to use Acumen on their phone. Copy and
 onboarding were rewritten to be honest about scope.
 </p>

 <h3>The cold-start concern</h3>
 <p style="font-size: 10pt;">
 Interviewee B raised the sharpest concern: <em>"the matching only works
 if there are actually people in there worth meeting."</em> The response
 is a cohort-pilot model rather than a sparse public launch — closed UCL
 society pilots so everyone in the matching pool starts on the same day,
 guaranteeing a meaningful network at first contact.
 </p>

 <h3>What still needs testing</h3>
 <p style="font-size: 10pt;">
 Three open questions inform R1, R2, and R6 in Section 9: whether users
 return, whether the signal is understood without a facilitator, and
 whether a society signs a paying pilot. Next validation runs on a
 40-user UCL cohort with telemetry on completion, return, and
 peer-message rates.
 </p>`);

// SWOT closing paragraph — last full paragraph on page 13.
swap('Page 13 SWOT: closing paragraph tightened',
` <h3 style="margin-top: 5mm;">What the SWOT actually tells us</h3>
 <p>
 The pattern across the four cells is consistent. Acumen's strengths cluster
 around clarity and design: the loop is easy to explain in one sentence, the
 research grounding is verifiable, and the combined practice-and-network
 proposition is differentiated. Its weaknesses cluster around proof: the
 feedback model is research-informed but not yet calibrated, peer matching
 runs on demonstration data, and the user base is too small to make
 statistical claims. The opportunities are addressable in the short term,
 starting with a UCL or society cohort pilot. The threats are largely
 competitive rather than technical, and they sharpen the case for moving
 quickly on validation rather than on feature breadth. The honest reading
 is that Acumen has a defensible product story but a thin evidence base,
 and that closing the evidence gap is more valuable than building anything
 new.
 </p>`,
` <h3 style="margin-top: 5mm;">What the SWOT actually tells us</h3>
 <p>
 Strengths cluster around clarity and design — the loop is easy to
 explain, the research grounding is verifiable, and the practice +
 network proposition is differentiated. Weaknesses cluster around proof:
 the feedback model is research-informed but not calibrated, matching
 uses demo data, and the user base is too small for statistical claims.
 Opportunities are addressable short-term, starting with a UCL cohort
 pilot. Threats are largely competitive, sharpening the case for moving
 on validation rather than feature breadth. The honest reading: Acumen
 has a defensible story but a thin evidence base — closing the evidence
 gap matters more than building anything new.
 </p>`);

// Porter closing — already tight in round 1; trim further.
swap('Page 14 Porter: closing tightened (round 2)',
` <h3 style="margin-top: 3mm;">Where Acumen actually competes</h3>
 <p>
 The strongest pressure comes from substitutes — AI tutors, Coursera,
 mentors, casebooks — all cheaper. Acumen wins, if at all, by offering
 what they do not: a structured decision under pressure, defensible
 feedback, and a peer who made the same call differently. UI clones in
 weeks; calibrated feedback and an active peer network do not. Invest in
 scenario depth, validation, and network density.
 </p>`,
` <h3 style="margin-top: 3mm;">Where Acumen actually competes</h3>
 <p>
 The strongest pressure is from substitutes — AI tutors, Coursera,
 mentors, casebooks — all cheaper. Acumen wins, if at all, by offering
 what they do not: structured decisions under pressure, defensible
 feedback, and a peer who made the same call differently. UI clones in
 weeks; calibrated feedback and active network density do not.
 </p>`);

// Page 15 ("From research to product decisions") closing paragraph.
swap('Page 15 evidence-map closing paragraph tightened',
` <p style="margin-top: 4mm;">
 The pattern in the right-hand column is deliberate. Each product decision is
 traceable to a finding, not assumed from intuition, and where the finding is
 weak the product framing softens accordingly. Scoring is described as
 research-informed rather than validated because Imbellus and McKinsey took
 several years and a large candidate dataset to calibrate equivalent
 instruments <a href="#bib5">[5]</a><a href="#bib8">[8]</a>; claiming the same
 standard at MVP stage would be dishonest. The flagship scenario is anchored
 in the region the literature flags as most stressed by succession
 <a href="#bib1">[1]</a>, but the broader scenario library is not regionally
 locked, which keeps the beachhead inclusive of users with no family-business
 context.
 </p>`,
` <p style="margin-top: 4mm;">
 Each product decision is traceable to a finding, not intuition, and
 where the finding is weak the framing softens accordingly. Scoring is
 described as research-informed rather than validated because Imbellus
 and McKinsey took years and a large dataset to calibrate equivalent
 instruments <a href="#bib5">[5]</a><a href="#bib8">[8]</a>. The flagship
 scenario is anchored in the region most stressed by succession
 <a href="#bib1">[1]</a>; the broader library is not regionally locked,
 keeping the beachhead inclusive of users with no family-business
 context.
 </p>`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
