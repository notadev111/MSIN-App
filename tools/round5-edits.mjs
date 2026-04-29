// Round 5: final cuts to close out word count and the page-02 overflow.

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

// ── Page 02: tighten optional-Q sentence to free 4mm ──
swap('Page 02: optional-Qs sentence one-line',
` <p style="margin-top: 2mm; font-size: 9pt; color: var(--body);">
 Optional questions addressed (per the brief): <strong>first customers</strong>
 (§2, §7), <strong>market size</strong> (§2), and <strong>underlying
 technology</strong> (§5).
 </p>`,
` <p style="margin-top: 2mm; font-size: 9pt; color: var(--body);">
 Optional questions addressed: <strong>first customers</strong> (§2, §7),
 <strong>market size</strong> (§2), <strong>underlying technology</strong>
 (§5).
 </p>`);

// ── Page 04 — second-pass tighten of remaining "What Acumen is" prose ──
swap('Page 04: theory paragraph trimmed (round 5)',
` <p>
 The conceptual framing draws on established theory: upper-echelons
 <a href="#bib10">[10]</a>, Vroom-Yetton's normative model
 <a href="#bib11">[11]</a>, Hersey-Blanchard's situational model
 <a href="#bib12">[12]</a>, and Rest's moral development work
 <a href="#bib13">[13]</a> together inform how decisions, participation,
 readiness, and ethical prompts are structured.
 </p>`,
` <p>
 The framing draws on established theory: upper-echelons
 <a href="#bib10">[10]</a>, Vroom-Yetton <a href="#bib11">[11]</a>,
 Hersey-Blanchard <a href="#bib12">[12]</a>, and Rest
 <a href="#bib13">[13]</a> — informing how decisions, participation,
 readiness, and ethical prompts are structured.
 </p>`);

// ── Page 05 (MVP intro): trim ledes ──
swap('Page 05: MVP walkthrough lede trimmed',
` <p class="lede">
 The MVP walkthrough shows Acumen's core loop: a user enters through a
 simple value proposition, completes a business simulation, receives a
 leadership signal, and is guided toward peers with complementary
 strengths.
 </p>`,
` <p class="lede">
 The walkthrough shows Acumen's core loop: a user enters via a simple
 value proposition, completes a simulation, receives a leadership
 signal, and is guided toward complementary peers.
 </p>`);

// ── Page 07 Tech intro lede ──
swap('Page 07: Tech intro lede trimmed',
` <p class="lede">
 Acumen sits in an unusual technical position. The interface is simple, but
 the components behind it are not. Three carry most of the product risk:
 the simulation engine, the scoring system, and the peer matching layer.
 Everything else is conventional web engineering.
 </p>`,
` <p class="lede">
 The interface is simple; the components behind it are not. Three carry
 most of the product risk — simulation engine, scoring system, peer
 matching layer. Everything else is conventional web engineering.
 </p>`);

// ── Page 08 (tech-cont): "Honest limitations" further compressed ──
swap('Page 08: limitations paragraph tighter',
` <p>
 Acumen is a research-informed prototype, not a validated assessment
 platform. Scoring is internally structured and framework-based but not
 externally validated against real-world leadership outcomes; peer
 matching uses demo data rather than a live algorithm; CV parsing,
 global maps, recruiter tools, and certificates are deliberately out
 of scope at MVP.
 </p>`,
` <p>
 Acumen is a research-informed prototype, not a validated assessment
 platform. Scoring is framework-based but not externally validated
 against real-world outcomes; matching uses demo data; CV parsing,
 global maps, recruiter tools, and certificates are out of scope at MVP.
 </p>`);

// ── Page 10: trim "How we ran it" further ──
swap('Page 10: "How we ran it" tighter',
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
 early-career, 2 founders) — directional, not representative.
 </p>`);

// ── Page 14 Porter table cell prose tighter (cells already excluded
// from word count, but bracketing prose around forces is in count) ──
// no change — already very tight.

// ── Page 06 (MVP feedback) lede tighter ──
swap('Page 06: MVP feedback intro tighter',
` <h3>Step 4 &middot; Peer matching as social learning</h3>
 <p style="font-size: 9.5pt;">
 The leadership signal then suggests peers with complementary strengths,
 on the principle that the same simulated experience produces a common
 vocabulary for collaboration. Matching at MVP stage uses
 profile-vector similarity over decision tendencies; deeper matching
 logic, CV parsing, and a global map view are roadmap features.
 </p>`,
` <h3>Step 4 &middot; Peer matching as social learning</h3>
 <p style="font-size: 9.5pt;">
 The signal then suggests peers with complementary strengths — the same
 simulated experience produces a common vocabulary for collaboration.
 MVP matching uses profile-vector similarity over decision tendencies;
 deeper logic, CV parsing, and a global map view are roadmap.
 </p>`);

// ── Page 06 step 5 tighter ──
swap('Page 06: step 5 trimmed',
` <h3 style="margin-top: 3mm;">Step 5 &middot; Repeat and track</h3>
 <p style="font-size: 9.5pt;">
 Repetition is what turns the loop into learning. The profile view
 records how a user&#39;s signal shifts over time. Two further scenarios,
 <em>The Fading Division</em> and <em>The Authority Bypass</em>, broaden
 the practice surface beyond succession. The MVP demonstrates the core
 simulation, feedback, and peer loop. CV parsing, global maps, recruiter
 tools, certificates, and deeper matching are roadmap features, not
 current MVP features.
 </p>`,
` <h3 style="margin-top: 3mm;">Step 5 &middot; Repeat and track</h3>
 <p style="font-size: 9.5pt;">
 Repetition turns the loop into learning. The profile view records how
 a user's signal shifts over time. <em>The Fading Division</em> and
 <em>The Authority Bypass</em> broaden practice beyond succession. The
 MVP demonstrates the core simulation–feedback–peer loop; CV parsing,
 maps, recruiter tools, and certificates are roadmap, not MVP.
 </p>`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
