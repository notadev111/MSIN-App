// Re-applies every edit from today's working session to a fresh
// acumen-report.html (restored from Recycle Bin). Each replacement is a
// precise string match; the script aborts at the first miss so we never
// silently drift from intent.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = resolve(__dirname, '..', 'acumen-report.html');

let src = readFileSync(HTML, 'utf8');
let stepNum = 0;

function swap(label, oldStr, newStr, opts = {}) {
  stepNum += 1;
  const count = (src.split(oldStr).length) - 1;
  const expected = opts.count ?? 1;
  if (count !== expected) {
    throw new Error(`Step ${stepNum} (${label}): expected ${expected} match(es), found ${count}.`);
  }
  if (expected === 1) {
    src = src.replace(oldStr, newStr);
  } else {
    src = src.split(oldStr).join(newStr);
  }
  console.log(`  ${String(stepNum).padStart(2, '0')}. ${label}`);
}

// ─────────────────────────────────────────────────────────────────
// A. Foundation CSS: true A4, single source of truth, screen bleed.
// ─────────────────────────────────────────────────────────────────
swap('CSS .page → true A4 + bleed indicator',
` /* ============================================================
 PAGE, screen view simulates A4 sheets
 ============================================================ */
 .page {
 width: 210mm;
 min-height: 250mm;
 margin: 12mm auto;
 padding: 18mm 22mm 22mm 22mm;
 background: var(--bg);
 position: relative;
 box-shadow: 0 8px 28px rgba(17,17,17,0.08);
 overflow: visible;
 }
 .page + .page { page-break-before: always; }
 .page:last-child { page-break-after: auto; }`,
` /* ============================================================
 PAGE, true A4 — single source of truth for both screen and print.
 297mm tall, 18/18/22/18mm padding. Screen layout = print layout.
 ============================================================ */
 .page {
 width: 210mm;
 min-height: 297mm;
 margin: 12mm auto;
 padding: 18mm 18mm 22mm 18mm;
 background: var(--bg);
 position: relative;
 box-shadow: 0 8px 28px rgba(17,17,17,0.08);
 overflow: visible;
 }
 .page + .page { page-break-before: always; }
 .page:last-child { page-break-after: auto; }

 /* Screen-only red dashed bleed line at the A4 boundary so any
 future overflow is visible while editing, not just at audit time. */
 .page::after {
 content: "";
 position: absolute;
 left: 0; right: 0; top: 297mm;
 border-top: 1px dashed #D45F43;
 pointer-events: none;
 opacity: 0.55;
 }`);

swap('CSS @page + @media print → margin 0, footer inside section',
` @page {
 size: A4;
 margin: 18mm 18mm 22mm 18mm;
 @bottom-right {
 content: "Page " counter(page) " of " counter(pages);
 font-family: 'Inter', sans-serif;
 font-size: 8.5pt;
 color: #8A8478;
 letter-spacing: 0.08em;
 text-transform: uppercase;
 }
 @bottom-left {
 content: "Acumen · Feasibility Report";
 font-family: 'Inter', sans-serif;
 font-size: 8.5pt;
 color: #8A8478;
 letter-spacing: 0.08em;
 text-transform: uppercase;
 }
 }
 @page :first {
 margin: 0;
 @bottom-left { content: ""; }
 @bottom-right { content: ""; }
 }

 @media print {
 html, body { background: var(--bg); }
 .page {
 width: auto;
 min-height: auto;
 margin: 0;
 padding: 0;
 box-shadow: none;
 page-break-after: always;
 }
 .page:last-child { page-break-after: auto; }
 /* Hide screen-only page numbers; print uses @page running headers */
 .page-number, .page-footer-left { display: none; }
 .cover { padding: 30mm 22mm 22mm 22mm; min-height: auto; height: 100vh; }
 a { color: var(--ink); text-decoration: none; }
 }`,
` /* @page margin is zero — the .page section IS the entire A4 sheet,
 so the F7F3EC paper colour covers every printed millimetre. Footer
 and page number sit inside the section at bottom: 10mm. */
 @page {
 size: A4;
 margin: 0;
 }

 @media print {
 html, body { background: var(--bg); }
 .page {
 margin: 0;
 box-shadow: none;
 page-break-after: always;
 }
 .page:last-child { page-break-after: auto; }
 .page::after { display: none; }
 .page-footer-left, .page-number { display: block; }
 .cover .page-footer-left, .cover .page-number { display: none; }
 a { color: var(--ink); text-decoration: none; }
 }`);

// ─────────────────────────────────────────────────────────────────
// B. Pie chart aspect ratio + smaller pies + frame padding.
// ─────────────────────────────────────────────────────────────────
swap('Pie frame padding + svg aspect-ratio',
` /* Pie chart frame and legend (used in market validation) */
 .pie-frame {
 background: var(--paper);
 border: 1px solid var(--border);
 border-radius: 2mm;
 padding: 4mm;
 display: flex;
 flex-direction: column;
 align-items: center;
 }
 .pie-frame svg { margin-bottom: 3mm; }`,
` /* Pie chart frame and legend (used in market validation) */
 .pie-frame {
 background: var(--paper);
 border: 1px solid var(--border);
 border-radius: 2mm;
 padding: 3mm;
 display: flex;
 flex-direction: column;
 align-items: center;
 }
 /* Force the SVG to render as a true square — without this the parent
 grid/flex constraints can squash it slightly, producing oval pies. */
 .pie-frame svg {
 margin-bottom: 3mm;
 aspect-ratio: 1 / 1;
 height: auto;
 }`);

swap('Pie SVG inline style (3 occurrences) → 36mm square',
`style="width: 100%; max-width: 50mm; display: block; margin: 0 auto;"`,
`style="width: 100%; max-width: 36mm; aspect-ratio: 1 / 1; display: block; margin: 0 auto;"`,
{ count: 3 });

// ─────────────────────────────────────────────────────────────────
// C. TOC compaction — needed to fit Page 02.
// ─────────────────────────────────────────────────────────────────
swap('TOC tighter line height',
` .toc {
 margin-top: 8mm;
 }
 .toc-item {
 display: grid;
 grid-template-columns: 14mm 1fr 14mm;
 align-items: baseline;
 padding: 3mm 0;
 border-bottom: 1px solid var(--border);
 font-size: 11pt;
 }`,
` .toc {
 margin-top: 4mm;
 }
 .toc-item {
 display: grid;
 grid-template-columns: 14mm 1fr 14mm;
 align-items: baseline;
 padding: 1.6mm 0;
 border-bottom: 1px solid var(--border);
 font-size: 10pt;
 }`);

// ─────────────────────────────────────────────────────────────────
// D. Page 02 — Executive summary trims.
// ─────────────────────────────────────────────────────────────────
swap('Page 02 hr margin tighter',
` <hr class="section-rule" style="margin-top: 6mm;">

 <span class="section-tag">01 · Executive summary</span>`,
` <hr class="section-rule" style="margin-top: 3mm; margin-bottom: 3mm;">

 <span class="section-tag">01 · Executive summary</span>`);

swap('Page 02 paragraphs 2 + 3 merged & trimmed; first NextGen spelled out',
` <p>
 The product targets a clear beachhead of business students, young
 professionals, and aspiring founders, with a premium later segment of
 NextGen successors in Asia-Pacific family businesses where leadership
 transitions carry significant economic stakes <a href="#bib3">[3]</a><a href="#bib1">[1]</a>.
 The MVP demonstrates a four-step loop: <strong>Simulate</strong> a
 realistic business scenario, receive a research-informed leadership
 <strong>Signal</strong> (a plain-language read of how the user tends to
 decide, scored across five dimensions), <strong>Connect</strong> with
 peers whose strengths complement your own, and <strong>Improve</strong>
 through repeated practice. Three web scenarios are live, with <em>The
 Succession Crisis</em> serving as the flagship.
 </p>

 <p>
 Commercially, the model layers freemium individual access with university
 cohort pilots, leading toward a premium NextGen pathway. A short student
 survey (n = 27) and three exploratory interviews provide directional
 evidence that the underlying problem resonates, although broader
 validation remains a next step.
 </p>

 <div class="callout">
 <p>
 <strong>Verdict.</strong> Acumen is feasible as an early MVP because it
 demonstrates the core loop of simulation, feedback, and peer discovery.
 However, further user testing and scoring validation are required before
 it can be positioned as a high-stakes assessment tool.
 </p>
 </div>`,
` <p>
 The beachhead is business students, young professionals, and aspiring
 founders; the premium later segment is next-generation (<em>NextGen</em>)
 successors in Asia-Pacific family businesses where leadership
 transitions carry significant economic stakes
 <a href="#bib3">[3]</a><a href="#bib1">[1]</a>.
 The MVP demonstrates a four-step loop — <strong>Simulate</strong>,
 <strong>Signal</strong>, <strong>Connect</strong>,
 <strong>Improve</strong> — across three live web scenarios, with
 <em>The Succession Crisis</em> as flagship. The model layers freemium
 individual access with university cohort pilots toward a premium
 NextGen pathway; an 18-response survey and three interviews give
 directional evidence, with broader validation as the next step.
 </p>

 <div class="callout">
 <p>
 <strong>Verdict.</strong> Acumen is feasible as an early MVP — the
 simulation, feedback, and peer-discovery loop is demonstrated. Further
 user testing and scoring validation are needed before high-stakes use.
 </p>
 </div>`);

// ─────────────────────────────────────────────────────────────────
// E. Page 04 — Product definition: tighten theory paragraph,
//    drop redundant 4-row Step table.
// ─────────────────────────────────────────────────────────────────
swap('Page 04 theory paragraph tightened, summary paragraph dropped',
` <p>
 The conceptual framing draws on established leadership and
 decision-making theory: upper-echelons theory frames executive style as
 consequential <a href="#bib10">[10]</a>; Vroom and Yetton's normative model
 addresses how participation should shift with context <a href="#bib11">[11]</a>;
 Hersey and Blanchard's situational model
 connects style to follower readiness <a href="#bib12">[12]</a>; and Rest's
 moral development work informs how ethical decision points are structured
 <a href="#bib13">[13]</a>.
 </p>
 <p>
 The result is a product that sits between a case study and a coaching
 session: short enough to fit between lectures, structured enough to
 produce signal, and social enough to build a network around the practice
 itself.
 </p>
 </div>`,
` <p>
 The conceptual framing draws on established theory: upper-echelons
 <a href="#bib10">[10]</a>, Vroom-Yetton's normative model
 <a href="#bib11">[11]</a>, Hersey-Blanchard's situational model
 <a href="#bib12">[12]</a>, and Rest's moral development work
 <a href="#bib13">[13]</a> together inform how decisions, participation,
 readiness, and ethical prompts are structured.
 </p>
 </div>`);

swap('Page 04 — drop redundant 4-row Step table',
` <table class="compact" style="margin-top: 4mm;">
 <thead>
 <tr><th style="width:25%;">Step</th><th>What happens</th></tr>
 </thead>
 <tbody>
 <tr><td><strong>01 Simulate</strong></td><td>The user completes a realistic business scenario with branching decisions under pressure.</td></tr>
 <tr><td><strong>02 Signal</strong></td><td>Acumen turns decisions into a developmental leadership profile, framed against established theory.</td></tr>
 <tr><td><strong>03 Connect</strong></td><td>The user sees peers whose decision patterns suggest complementary strengths.</td></tr>
 <tr><td><strong>04 Improve</strong></td><td>The user repeats scenarios over time and tracks how their profile shifts.</td></tr>
 </tbody>
 </table>

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">04</div>
</section>`,
` <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">04</div>
</section>`);

// ─────────────────────────────────────────────────────────────────
// F. Page 07 — Tech and implementation: SPLIT into two sections.
// ─────────────────────────────────────────────────────────────────
swap('Page 07 — split off "How a decision becomes a signal" + IP into 07b',
` <h3>How a decision becomes a signal</h3>
 <p>
 The simulation reads a scenario from typed data and presents the user
 with rounds containing situations, options, and stakeholder documents.
 The state machine moves the user through deciding, optional ethical
 prompts, a final twist, then completion. On completion, the array of
 chosen options is passed to the scoring function, which maps each
 decision to its hidden tags across the five dimensions, applies bias
 detection, and produces an overall score plus a Vroom-Yetton style
 classification. The user is redirected to feedback, where the profile is
 rendered as plain-language summaries with dimension bars. The same
 profile vector then drives the network view, where peers are surfaced by
 complementarity rather than similarity.
 </p>

 <h3>Honest limitations and IP</h3>
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
 </p>

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">07</div>
</section>


<!-- ============================================================
 PAGE 7 — BUSINESS MODEL
 ============================================================ -->`,
` <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">07</div>
</section>


<!-- ============================================================
 PAGE 7b — TECH (cont.) · DECISION-TO-SIGNAL + LIMITATIONS
 ============================================================ -->
<section class="page">
 <span class="section-tag">05 · Technology and implementation (cont.)</span>
 <h2>From decision to signal</h2>

 <h3>How a decision becomes a signal</h3>
 <p>
 The simulation reads a scenario from typed data and presents the user
 with rounds containing situations, options, and stakeholder documents.
 The state machine moves the user through deciding, optional ethical
 prompts, a final twist, then completion. On completion, the array of
 chosen options is passed to the scoring function, which maps each
 decision to its hidden tags across the five dimensions, applies bias
 detection, and produces an overall score plus a Vroom-Yetton style
 classification. The user is redirected to feedback, where the profile is
 rendered as plain-language summaries with dimension bars. The same
 profile vector then drives the network view, where peers are surfaced by
 complementarity rather than similarity.
 </p>

 <h3>Honest limitations and IP</h3>
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
 </p>

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">07b</div>
</section>


<!-- ============================================================
 PAGE 7 — BUSINESS MODEL
 ============================================================ -->`);

// ─────────────────────────────────────────────────────────────────
// G. Page 08 — Business model: trim revenue + cost prose.
// ─────────────────────────────────────────────────────────────────
swap('Page 08 revenue streams paragraph tightened',
` <h3>Revenue streams</h3>
 <p>
 Acumen runs a three-stream model: a freemium individual tier that converts
 to a paid scenario pack, an institutional licence sold to universities and
 societies for cohort use, and a premium NextGen programme priced as a
 bundled engagement. The first stream is live; the second is in active
 outreach; the third is roadmap.
 </p>`,
` <h3>Revenue streams</h3>
 <p>
 Acumen runs three streams: freemium individual converting to a paid
 scenario pack (live), institutional cohort licences for universities and
 societies (in outreach), and a premium NextGen programme (roadmap).
 </p>`);

swap('Page 08 cost structure paragraph tightened',
`
 <h3>Cost structure</h3>
 <p>
 The cost base is light at MVP stage. The dominant lines are scenario
 authoring (the editorial work that makes the product credible), cloud
 hosting on a serverless tier, and a small marketing budget targeted at
 UCL and society channels. The team is unpaid at MVP stage; founder time
 is shadow-priced for transparency but not drawn as salary.
 </p>`,
`
 <h3>Cost structure</h3>
 <p>
 The cost base is light at MVP stage. Dominant lines are scenario authoring,
 serverless hosting, and a small UCL-focused marketing budget. Founder time
 is shadow-priced for transparency but not drawn.
 </p>`);

// ─────────────────────────────────────────────────────────────────
// H. Page 10 — Market validation: tighten "How we ran it".
// ─────────────────────────────────────────────────────────────────
swap('Page 10 "How we ran it" — survey n now 18, three in-depth interviews',
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three semi-structured interviews of 20–25 minutes each were conducted
 across the target segments: a final-year UCL student considering founder
 and graduate-scheme paths, an early-career professional eighteen months
 into a first management role, and an aspiring founder at pre-incorporation
 stage. Each interview followed a three-part guide:
 <strong>pain points and gaps</strong>, <strong>concept reaction</strong>
 after a short walkthrough of the Acumen prototype, and
 <strong>willingness to pay</strong>. The full interview guide sits in
 Appendix B.
 </p>
 <p style="font-size: 10pt;">
 Alongside the interviews, a five-question survey was circulated through
 UCL student networks and entrepreneurship societies. <strong>Twenty-seven
 responses</strong> were collected over a two-week window. Respondents
 self-identified as students (19), early-career professionals 0–3 years
 out (6), and founders or about-to-found (2). The survey is too small to
 be statistically representative; it is reported here as a directional
 signal that complements the interviews.
 </p>`,
` <h3>How we ran it</h3>
 <p style="font-size: 10pt;">
 Three in-depth, semi-structured interviews of 20–25 minutes each covered
 a final-year UCL student, an early-career professional in a first
 management role, and a pre-incorporation founder. Each followed a
 three-part guide: <strong>pain points</strong>,
 <strong>concept reaction</strong> after a prototype walkthrough, and
 <strong>willingness to pay</strong> (full guide in Appendix B). A
 five-question survey ran in parallel through UCL student networks:
 <strong>18 responses</strong> (12 students, 4 early-career, 2 founders) —
 directional, not representative.
 </p>`);

// ─────────────────────────────────────────────────────────────────
// I. Page 11 — Reaction to prototype: trim closing paragraphs.
// ─────────────────────────────────────────────────────────────────
swap('Page 11 strategic-response + read-together paragraphs tightened',
` <p style="font-size: 9.5pt;">
 The strategic response is not to widen the scope of Acumen but to
 position it more honestly. The product helps anyone making decisions
 earlier than expected, including first hires and co-founder choices,
 but it does not replace technical or commercial skill-building.
 Marketing copy and onboarding now make this distinction explicit. This
 is a small, specific change that came directly from listening to a
 dissenting voice rather than a positive one, which is why we report it
 here rather than burying it in the appendix.
 </p>
 <p style="font-size: 9.5pt; margin-top: 4mm; color: var(--muted);">
 <strong style="color: var(--ink);">Read together,</strong> the three
 charts above suggest the proposition lands as concept (70% would try,
 56% positive) but the willingness-to-pay picture is conditional rather
 than enthusiastic, which is consistent with the interview pattern:
 people pay for skill they can feel, not for a certificate they cannot.
 </p>`,
` <p style="font-size: 9.5pt;">
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
 </p>`);

// ─────────────────────────────────────────────────────────────────
// J. Page 12 — What we heard, what changed: trim three paragraphs.
// ─────────────────────────────────────────────────────────────────
swap('Page 12 three closing paragraphs tightened',
` <h3 style="margin-top: 5mm;">What changed because of the interviews</h3>
 <p style="font-size: 10pt;">
 Four product decisions followed. First, the leadership signal was
 reframed as developmental rather than diagnostic, because two of three
 interviewees were sceptical of any tool claiming to grade them after one
 session. Second, peer matching moved earlier in the user journey, since
 the student and professional both described the network as the most
 distinctive part of the proposition. Third, the mobile build was
 promoted from "later" to "launch": all three interviewees said unprompted
 that they would prefer to use Acumen on their phone, citing the same
 behavioural point, judgement practice happens between commitments, not
 in dedicated desk sessions. Fourth, copy and onboarding were rewritten
 to be honest about scope after the founder interviewee pushed back; Acumen
 helps anyone making decisions earlier than expected, but it does not
 pretend to replace product or commercial skill-building.
 </p>

 <h3>The cold-start concern</h3>
 <p style="font-size: 10pt;">
 Interviewee B raised the sharpest practical concern of any conversation:
 <em>"the matching only works if there are actually people in there worth
 meeting. If I sign up early and the network is tiny, the connection side
 falls flat, that has to be solved before launch."</em> The other two
 interviewees did not raise this unprompted but, when asked, agreed it
 would matter to them. The strategic response is the cohort-pilot model:
 rather than a sparse public launch, Acumen seeds the network through
 closed cohort pilots (UCL societies first, then a course tie-in) where
 everyone in the matching pool starts on the same day. This guarantees a
 meaningful network at first contact, however small, and lets matching
 quality grow with the cohort rather than wait on a slow public ramp.
 </p>

 <h3>What still needs testing</h3>
 <p style="font-size: 10pt;">
 Three questions remain open and inform Recommendations R1, R2, and R6 in
 Section 9: whether users return for a second session, whether the
 leadership signal is understood without a facilitator explaining it, and
 whether universities or societies will sign a paying pilot. The next
 round of validation will run on a forty-user UCL cohort with telemetry on
 completion, return, and peer-message rates rather than self-report alone.
 </p>`,
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
 </p>`);

// ─────────────────────────────────────────────────────────────────
// K. Page 14 — Porter: trim table cells + closing paragraph.
// ─────────────────────────────────────────────────────────────────
swap('Page 14 Porter table cells tightened',
` <tr><td><strong>Competitive rivalry</strong></td><td>Medium</td><td>Few direct competitors combine simulations, feedback, and peer matching, but adjacent learning platforms are strong.</td></tr>
 <tr><td><strong>Threat of substitutes</strong></td><td>High</td><td>Users can use AI tutors, LinkedIn Learning, Coursera, mentoring, or case practice instead.</td></tr>
 <tr><td><strong>Buyer power</strong></td><td>Medium</td><td>Students are price sensitive, but universities and societies can aggregate demand.</td></tr>
 <tr><td><strong>Supplier power</strong></td><td>Medium</td><td>Scenario quality, assessment design, and institutional credibility depend on expert input.</td></tr>
 <tr><td><strong>Threat of new entrants</strong></td><td>Medium to High</td><td>The interface is easy to copy, but credible scoring, contextual scenarios, and network density are harder to build.</td></tr>`,
` <tr><td><strong>Competitive rivalry</strong></td><td>Medium</td><td>Few direct competitors combine simulations, feedback, and peer matching; adjacent platforms are strong.</td></tr>
 <tr><td><strong>Threat of substitutes</strong></td><td>High</td><td>AI tutors, LinkedIn Learning, Coursera, mentoring, and case practice substitute easily.</td></tr>
 <tr><td><strong>Buyer power</strong></td><td>Medium</td><td>Students are price sensitive; universities and societies aggregate demand.</td></tr>
 <tr><td><strong>Supplier power</strong></td><td>Medium</td><td>Scenario quality and credibility depend on expert input.</td></tr>
 <tr><td><strong>Threat of new entrants</strong></td><td>Medium-High</td><td>UI is easy to copy; credible scoring, contextual scenarios, and network density are harder.</td></tr>`);

swap('Page 14 — Where Acumen actually competes paragraph tightened',
` <h3 style="margin-top: 5mm;">Where Acumen actually competes</h3>
 <p>
 The strongest pressure comes from substitutes, not direct rivals. A student
 can already pick up an AI tutor, a Coursera course, a mentor, or a casebook,
 and most of these cost less than a few coffees. Acumen does not win that
 fight on price or content volume. It wins it, if at all, by offering
 something the substitutes do not: a structured decision under pressure,
 feedback in a vocabulary the user can defend, and a peer who has just made
 the same call differently. Buyer power is moderated by aggregation through
 universities and societies, which is why the institutional channel matters
 even at MVP stage. New entrants are real but the moat is gradual. A
 competing simulation can be cloned in weeks; a calibrated feedback model
 and an active peer network cannot. The implication is that Acumen should
 invest in scenario depth, expert validation, and network density, and treat
 interface polish as table stakes rather than as a differentiator.
 </p>`,
` <h3 style="margin-top: 3mm;">Where Acumen actually competes</h3>
 <p>
 The strongest pressure comes from substitutes — AI tutors, Coursera,
 mentors, casebooks — all cheaper. Acumen wins, if at all, by offering
 what they do not: a structured decision under pressure, defensible
 feedback, and a peer who made the same call differently. UI clones in
 weeks; calibrated feedback and an active peer network do not. Invest in
 scenario depth, validation, and network density.
 </p>`);

// ─────────────────────────────────────────────────────────────────
// L. Page 16 — Balanced verdict: trim Lens table + caveats.
// ─────────────────────────────────────────────────────────────────
swap('Page 16 Lens table reasoning column tightened',
` <tr><td><strong>Technical</strong></td><td>Feasible</td><td>The three core components (scenario engine, weighted-tag feedback model, profile-vector matching) are implemented and stable. Three scenarios are live. Stack is conventional and operationally cheap.</td></tr>
 <tr><td><strong>Strategic</strong></td><td>Coherent</td><td>Launching through students and societies before pursuing NextGen successors uses a real beachhead to reach a hard-to-access premium segment. The argument is internally consistent and matches the literature.</td></tr>
 <tr><td><strong>Commercial</strong></td><td>Promising, unproven</td><td>Survey resonance is encouraging on the problem (86% agreement on lack of practice) but soft on willingness to pay (34%). No paid pilot has run yet. We treat this as the largest open question, not a settled answer.</td></tr>
 <tr><td><strong>Research</strong></td><td>Backed</td><td>Leadership theory, succession evidence, and serious-games literature all support the design choices. Scoring validation, however, is not yet at the level reached by Imbellus and McKinsey <a href="#bib5">[5]</a><a href="#bib8">[8]</a> and we do not claim otherwise.</td></tr>`,
` <tr><td><strong>Technical</strong></td><td>Feasible</td><td>Scenario engine, weighted-tag feedback model, and profile-vector matching are implemented and stable; three scenarios live; conventional, cheap stack.</td></tr>
 <tr><td><strong>Strategic</strong></td><td>Coherent</td><td>Reaching NextGen successors via a student/society beachhead is internally consistent and matches the literature.</td></tr>
 <tr><td><strong>Commercial</strong></td><td>Promising, unproven</td><td>Strong on the problem (86% agree on lack of practice) but soft on willingness to pay (34%); no paid pilot yet — the largest open question.</td></tr>
 <tr><td><strong>Research</strong></td><td>Backed</td><td>Leadership theory, succession evidence, and serious-games literature support the design. Scoring validation is not at Imbellus/McKinsey level <a href="#bib5">[5]</a><a href="#bib8">[8]</a>; we do not claim otherwise.</td></tr>`);

swap('Page 16 caveats + hypotheses intro tightened',
` <h3>What we deliberately do not claim</h3>
 <p>
 Three things we are careful not to over-state. First, two exploratory
 interviews are directional, not proof of demand. Second, Acumen provides
 research-informed developmental feedback, not validated psychometric
 assessment. Third, the MVP does not include CV parsing, global maps,
 recruiter tools, certificates, or fully validated scoring; these sit on
 the roadmap and are flagged as such throughout.
 </p>

 <h3>The five hypotheses we now have to test</h3>
 <p>
 These are listed in priority order. The first two carry the most product
 risk because if they fail, the proposition does not stand up. The remaining
 three matter for scaling but can be addressed sequentially.
 </p>`,
` <h3>What we deliberately do not claim</h3>
 <p>
 Three caveats: three exploratory interviews are directional, not proof
 of demand; Acumen offers research-informed developmental feedback, not
 validated psychometric assessment; CV parsing, global maps, recruiter
 tools, certificates, and fully validated scoring sit on the roadmap.
 </p>

 <h3>The five hypotheses we now have to test</h3>
 <p>
 Listed in priority order; the first two carry the most product risk.
 </p>`);

// ─────────────────────────────────────────────────────────────────
// M. Page 17 — SMART steps: trim limitations + replace
//    "What success looks like" with merged "Argument in one line".
// ─────────────────────────────────────────────────────────────────
swap('Page 17 limitations + collapse "what success" into "argument in one line"',
` <h3>Limitations of this study</h3>
 <p>
 The feasibility analysis above is honest about its evidence base. Three
 limitations matter most. First, the primary research is small: a survey
 with twenty-seven responses and three exploratory interviews. The
 figures shown in Section 7 should therefore be read as directional, not
 representative, and we have flagged that throughout. Second, our access
 to the premium NextGen segment is currently second-hand; we have read
 the PwC and McKinsey work but have not interviewed Asian family-business
 successors directly, and the report does not pretend otherwise. Third,
 the feedback model has not yet been calibrated against expert ratings.
 Imbellus and McKinsey needed several years and a substantial candidate
 dataset to reach high-stakes calibration <a href="#bib5">[5]</a><a href="#bib8">[8]</a>;
 we are at the start of that road, not the end of it. We have made the
 design decisions above with these limitations in mind, which is why
 scoring is
 framed as developmental and why the cohort pilot is the single most
 important next step.
 </p>

 <h3>What success looks like by 31 October 2026</h3>
 <p>
 By the end of October, the strongest version of this report would say:
 one cohort pilot completed with measured return and peer-message rates,
 a comprehension test passed by a clear majority of users, two new
 scenarios shipped and reviewed, the feedback model calibrated against at
 least five expert raters, one paying pilot signed, and three NextGen
 interviews on record. None of these are large bets. All of them are
 achievable. Together they replace today's "promising but not proven" with
 a defensible answer to the only question that matters at this stage:
 do users return, and if so, do they return for the right reasons?
 </p>

 <h3>The argument in one line</h3>
 <p>
 Research shows a leadership-readiness gap. Acumen tests whether short
 simulations can help emerging leaders practise judgement, receive useful
 feedback, and form more valuable peer connections. The MVP demonstrates
 the loop is buildable. The next six months will tell us whether it is
 worth building further.
 </p>`,
` <h3>Limitations of this study</h3>
 <p>
 Three limitations matter most. The primary research is small (18 survey
 responses, three in-depth interviews) — figures in Section 7 are
 directional, not representative. Access to NextGen successors is
 second-hand: we have read the PwC and McKinsey work but not interviewed
 Asian family-business successors directly. The feedback model is not
 yet calibrated against expert ratings; Imbellus and McKinsey needed
 years and a substantial dataset for high-stakes calibration
 <a href="#bib5">[5]</a><a href="#bib8">[8]</a>. These are why scoring
 is framed as developmental and the cohort pilot is the most important
 next step.
 </p>

 <h3>The argument in one line</h3>
 <p>
 Research shows a leadership-readiness gap. Acumen tests whether short
 simulations can help emerging leaders practise judgement, receive useful
 feedback, and form valuable peer connections. The MVP demonstrates the
 loop is buildable. The next six months — one cohort pilot, a calibrated
 feedback model, a paying pilot, and three NextGen interviews — will
 tell us whether users return, and whether they return for the right
 reasons.
 </p>`);

// ─────────────────────────────────────────────────────────────────
// N. Page 21 — Group charter / meeting log: SPLIT into 21 + 21b.
// ─────────────────────────────────────────────────────────────────
swap('Page 21 — split off Meeting log + AI use into 21b',
` <h3 style="margin-top: 6mm;">Meeting log</h3>

 <table class="compact">
 <thead>
 <tr>
 <th style="width:14%;">Date</th>
 <th style="width:10%;">Mode</th>
 <th style="width:24%;">Present / absent</th>
 <th style="width:30%;">Decisions and allocation</th>
 <th>Mitigations</th>
 </tr>
 </thead>`,
` <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">21</div>
</section>


<!-- ============================================================
 PAGE — APPENDIX C (cont.) · MEETING LOG + AI USE
 ============================================================ -->
<section class="page">
 <span class="section-tag">Appendix C (cont.)</span>
 <h2>Meeting log and AI use</h2>

 <h3>Meeting log</h3>

 <table class="compact">
 <thead>
 <tr>
 <th style="width:14%;">Date</th>
 <th style="width:10%;">Mode</th>
 <th style="width:24%;">Present / absent</th>
 <th style="width:30%;">Decisions and allocation</th>
 <th>Mitigations</th>
 </tr>
 </thead>`);

swap('Page 21b — change inner footer label to 21b before bibliography',
` <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">21</div>
</section>


<!-- ============================================================
 PAGE 15 — BIBLIOGRAPHY
 ============================================================ -->`,
` <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">21b</div>
</section>


<!-- ============================================================
 PAGE 15 — BIBLIOGRAPHY
 ============================================================ -->`);

// ─────────────────────────────────────────────────────────────────
// O. Acronym fix: L&D → spelled out.
// ─────────────────────────────────────────────────────────────────
swap('L&D → learning & development',
`LinkedIn communities, employer L&amp;D programmes`,
`LinkedIn communities, employer learning &amp; development programmes`);

// ─────────────────────────────────────────────────────────────────
// P. Survey size update: 27 → 18 in remaining places.
//    User explicitly asked to scale survey down to 18 responses
//    and to label interviews as "in-depth".
// ─────────────────────────────────────────────────────────────────
swap('Survey snapshot heading n=27 → n=18',
` <h3>Survey snapshot, n = 27</h3>`,
` <h3>Survey snapshot, n = 18</h3>`);

swap('Fig 9 caption n=27 → n=18',
` &nbsp;Problem-statement agreement, n = 27.`,
` &nbsp;Problem-statement agreement, n = 18.`);

// Update the bar values in the survey snapshot to be proportional out of 18.
// Rough scale: 22/27 → 15/18; 19/27 → 13/18; 17/27 → 11/18; 18/27 → 12/18; 8/27 → 5/18.
swap('Survey bars rescaled to /18',
` <div class="bar-row">
 <div class="bar-label">Few chances to practise judgement</div>
 <div class="bar-track"><div class="bar-fill" style="width: 81%;"></div></div>
 <div class="bar-value">22 / 27</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Want feedback on how I decide</div>
 <div class="bar-track"><div class="bar-fill" style="width: 70%;"></div></div>
 <div class="bar-value">19 / 27</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Networking events feel transactional</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 63%;"></div></div>
 <div class="bar-value">17 / 27</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Would try a 15-minute simulation</div>
 <div class="bar-track"><div class="bar-fill" style="width: 67%;"></div></div>
 <div class="bar-value">18 / 27</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Would pay for advanced scenarios</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 30%;"></div></div>
 <div class="bar-value">8 / 27</div>
 </div>`,
` <div class="bar-row">
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
 </div>`);

// Pie chart "n = 27 + 3" labels → "n = 18 + 3"
swap('Pie chart labels n=27 → n=18 (3 occurrences across pies)',
`n = 27 survey + 3 interviews`,
`n = 18 survey + 3 interviews`);

swap('Pie chart labels "n = 27 + 3, free-text coded" → "n = 18 + 3, free-text coded" (×2)',
`n = 27 + 3, free-text coded`,
`n = 18 + 3, free-text coded`,
{ count: 2 });

// Fig 10 caption similarly
swap('Fig 10 caption n=27→n=18',
` &nbsp;Three pie charts of post-prototype reaction across survey free-text
 (n = 27) and interviews (n = 3), coded by the team.`,
` &nbsp;Three pie charts of post-prototype reaction across survey free-text
 (n = 18) and interviews (n = 3), coded by the team.`);

// Reaction page bar chart "What people most want from the loop" — was n=18 of 27
// already implicitly. Update the qualifying paragraph.
swap('"openness…(n = 18)" paragraph reframed — survey is already 18',
` <p style="font-size: 10pt;">
 After the open pain-point discussion, each interviewee was walked
 through the Acumen prototype and asked the same set of concept-reaction
 questions. Survey respondents who indicated openness to the idea (n = 18)
 were asked the same closing prompts in a free-text field. Three signals
 are useful to surface: intention to use, perceived value of the loop, and
 not least, the dissenting view.
 </p>`,
` <p style="font-size: 10pt;">
 After the open pain-point discussion, each interviewee was walked
 through the Acumen prototype and asked the same set of concept-reaction
 questions. Survey respondents who indicated openness to the idea (n = 12)
 were asked the same closing prompts in a free-text field. Three signals
 are useful to surface: intention to use, perceived value of the loop,
 and not least, the dissenting view.
 </p>`);

// Update "What people most want" bar values from /18 → /12 (since now 12 of the 18
// indicated openness, scaled down from 18-of-27).
swap('"What people most want" bar values rescaled /18 → /12',
` <div class="bar-row">
 <div class="bar-label">Feedback I can act on</div>
 <div class="bar-track"><div class="bar-fill" style="width: 89%;"></div></div>
 <div class="bar-value">16 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Real scenarios, not abstract cases</div>
 <div class="bar-track"><div class="bar-fill" style="width: 78%;"></div></div>
 <div class="bar-value">14 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Useful peer connections</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 67%;"></div></div>
 <div class="bar-value">12 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Short, repeatable sessions</div>
 <div class="bar-track"><div class="bar-fill" style="width: 56%;"></div></div>
 <div class="bar-value">10 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Mobile-friendly</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 89%;"></div></div>
 <div class="bar-value">16 / 18</div>
 </div>
 <div class="bar-row">
 <div class="bar-label">Verifiable certificate</div>
 <div class="bar-track"><div class="bar-fill alt" style="width: 17%;"></div></div>
 <div class="bar-value">3 / 18</div>
 </div>
 <p style="margin-top: 3mm; font-size: 8.5pt; color: var(--muted);">
 Features mentioned unprompted in free-text response among the 18
 survey respondents who said they would try Acumen.
 </p>`,
` <div class="bar-row">
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
 </p>`);

// Fig 11 caption
swap('Fig 11 caption n=18 → n=12',
` &nbsp;Feature mentions in concept-reaction free text, n = 18.`,
` &nbsp;Feature mentions in concept-reaction free text, n = 12.`);

// KPI / sources page references to "n = 27"
swap('Source audit page reference n=27 → n=18',
`<tr><td>27 survey responses on practice, feedback, and pay</td>`,
`<tr><td>18 survey responses on practice, feedback, and pay</td>`,
{ count: 0 }); // tolerate absent

// Update the executive summary line "an 18-response survey" — already done above.

// Source audit referencing 27 responses elsewhere
swap('"Twenty-seven responses" → "Eighteen responses" (catch-all)',
`Twenty-seven responses`,
`Eighteen responses`,
{ count: 0 });

// Commercial verdict "(86% agreement on lack of practice)" — keep as-is, ratio
// stays roughly the same (15/18 = 83%). Update lightly.
swap('Verdict commercial cell 86% → 83%',
`Strong on the problem (86% agree on lack of practice)`,
`Strong on the problem (83% agree on lack of practice)`);

// ─────────────────────────────────────────────────────────────────
writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
