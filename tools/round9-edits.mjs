// Round 9: voice from the heir, new screenshots, em-dash purge,
// §5 reword, caveats text per user copy.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = resolve(__dirname, '..', 'acumen-report.html');
const SHOTDIR = resolve(__dirname, '..');

function dataUri(path, mime = 'image/png') {
  return `data:${mime};base64,${readFileSync(path).toString('base64')}`;
}

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

// ── 1. Add NextGen heir as 4th pull-quote (calling it Interviewee D) ──
swap('Add Interviewee D pull-quote (NextGen heir, Asia-Pacific)',
` <div class="pull-quote">
 "I am not sure why I need to practise leadership when I am trying to
 start my own business but I will not be employing anyone any time
 soon, there are more important skills to be working on."
 <span class="attrib">Interviewee C · Aspiring founder, pre-incorporation</span>
 </div>
 </div>
 </div>`,
` <div class="pull-quote">
 "I am not sure why I need to practise leadership when I am trying to
 start my own business but I will not be employing anyone any time
 soon, there are more important skills to be working on."
 <span class="attrib">Interviewee C · Aspiring founder, pre-incorporation</span>
 </div>
 <div class="pull-quote">
 "One of the more irksome burdens of leadership, I find, is the tedious
 necessity of securing buy-in. The actual business of implementing
 change has become increasingly laborious, not least due to the mounting
 scepticism of the broader public."
 <span class="attrib">Interviewee D · NextGen successor, Asia-Pacific family business</span>
 </div>
 </div>
 </div>`);

// ── 2. Caveats paragraph per user copy ────────────────────────
swap('"What we deliberately do not claim" → user-supplied copy',
` <h3>What we deliberately do not claim</h3>
 <p>
 Three caveats: three exploratory interviews are directional, not proof
 of demand; Acumen offers research-informed developmental feedback, not
 validated psychometric assessment; CV parsing, global maps, recruiter
 tools, certificates, and fully validated scoring sit on the roadmap.
 </p>`,
` <h3>What we deliberately do not claim</h3>
 <p>
 The three interviews are directional and don't validate demand. Acumen
 offers research-backed developmental feedback, not validated
 psychometric assessment. CV parsing, recruiter tools, certification
 and fully validated scoring are all items on the roadmap after MVP.
 </p>`);

// ── 3. §5 Technology and implementation reword (more human) ────
swap('§5 lede + 3 components reworded',
` <p class="lede">
 The interface is simple; the components behind it are not. Three carry
 most of the product risk — simulation engine, scoring system, peer
 matching layer. Everything else is conventional web engineering.
 </p>

 <h3>The three components that matter</h3>

 <div class="three-col">
 <div class="swot-cell" style="border-top-color: var(--terracotta);">
 <h4>Simulation engine</h4>
 <p style="font-size: 9.5pt; color: var(--body); margin-top: 2mm;">
 A small state machine with four phases (deciding, ethical, twist,
 complete) drives users through scenario rounds, stakeholder document
 review, ethical prompts, and decision selection. Scenarios are stored
 as typed data, not hardcoded UI, so new ones can be added without
 rewriting the engine.
 </p>
 </div>
 <div class="swot-cell" style="border-top-color: var(--green-deep);">
 <h4>Scoring system</h4>
 <p style="font-size: 9.5pt; color: var(--body); margin-top: 2mm;">
 Every choice is tagged behind the scenes. Those tags roll up into
 five scores describing how the user tends to decide: strategic
 judgement, ethical reasoning, stakeholder management, decisiveness,
 and adaptability. Each is anchored in established theory (Upper
 Echelons, Rest, Vroom-Yetton, Hersey-Blanchard, OODA). Validation
 against expert ratings is on the roadmap.
 </p>
 </div>
 <div class="swot-cell" style="border-top-color: var(--green-deep);">
 <h4>Peer matching</h4>
 <p style="font-size: 9.5pt; color: var(--body); margin-top: 2mm;">
 Matching surfaces peers with complementary rather than identical
 profile vectors. At MVP scale it runs against a seeded set of demo
 profiles; real matching becomes testable at roughly fifty active
 users.
 </p>
 </div>
 </div>`,
` <p class="lede">
 On the surface Acumen is a simple web app. Underneath, three pieces
 actually carry the product risk: the simulation engine, the scoring
 system, and peer matching. Everything else is the kind of plumbing
 every web product needs.
 </p>

 <h3>The three components that matter</h3>

 <div class="three-col">
 <div class="swot-cell" style="border-top-color: var(--terracotta);">
 <h4>Simulation engine</h4>
 <p style="font-size: 9.5pt; color: var(--body); margin-top: 2mm;">
 A small state machine takes the user through four phases: deciding,
 ethical, twist, and complete. Each scenario is just typed data
 (situation, options, stakeholder documents, hidden tags), so we
 can write new ones without touching the engine.
 </p>
 </div>
 <div class="swot-cell" style="border-top-color: var(--green-deep);">
 <h4>Scoring system</h4>
 <p style="font-size: 9.5pt; color: var(--body); margin-top: 2mm;">
 Every choice the user makes carries a hidden tag. We roll those up
 into five scores: strategic judgement, ethical reasoning, stakeholder
 management, decisiveness, and adaptability. Each one ties back to
 established leadership theory (Upper Echelons, Vroom-Yetton,
 Hersey-Blanchard, Rest, OODA). The expert-rater calibration is on
 the roadmap.
 </p>
 </div>
 <div class="swot-cell" style="border-top-color: var(--green-deep);">
 <h4>Peer matching</h4>
 <p style="font-size: 9.5pt; color: var(--body); margin-top: 2mm;">
 We match peers by complement, not similarity. At MVP scale it runs
 against demo profiles; real matching only starts to mean something
 around fifty active users, which is why the cohort pilot matters.
 </p>
 </div>
 </div>`);

// §5 cont. — "How a decision becomes a signal"
swap('§5 cont. decision-to-signal reworded',
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
 </p>`,
` <h3>How a decision becomes a signal</h3>
 <p>
 When a user starts a scenario the engine reads the typed data and shows
 them the situation, the options on the table, and any stakeholder
 documents. They make a call, sometimes get an ethical follow-up, often
 a final twist, and then they're done. The full sequence of choices
 goes through the scoring function, which looks up the hidden tags,
 applies basic bias detection, and produces an overall score, a
 five-dimension breakdown, and a Vroom-Yetton-style label. The
 feedback page renders all of that as plain-language summaries with
 dimension bars. That same profile vector is also what powers matching
 on the network page.
 </p>`);

// ── 4. Replace network screenshot with the new full-bleed version ──
// The new 223732 is the proper full-aspect network screen.
const newNetworkURI = dataUri(`${SHOTDIR}/Screenshot 2026-05-02 223732.png`);

// Find the existing network <img> using its caption as anchor.
const networkOldStart = src.indexOf('alt="Acumen network screen showing peer matches"');
if (networkOldStart < 0) throw new Error('Could not find network image alt text.');
// Walk back to find the preceding "src=\"data:" boundary
const dataBegin = src.lastIndexOf('src="', networkOldStart);
const dataEnd = src.indexOf('"', dataBegin + 5);
if (dataBegin < 0 || dataEnd < 0) throw new Error('Could not bound network data URI.');
src = src.slice(0, dataBegin + 5) + newNetworkURI + src.slice(dataEnd);
stepNum += 1;
console.log(`  ${String(stepNum).padStart(2, '0')}. Network screenshot replaced (full-bleed Find someone relevant fast)`);

// ── 5. Replace onboarding screenshot with new 221746 ─────────
const newOnbURI = dataUri(`${SHOTDIR}/Screenshot 2026-05-02 221746.png`);
const onbOldStart = src.indexOf('alt="Acumen onboarding screen"');
if (onbOldStart < 0) throw new Error('Could not find onboarding image alt text.');
const obDataBegin = src.lastIndexOf('src="', onbOldStart);
const obDataEnd = src.indexOf('"', obDataBegin + 5);
src = src.slice(0, obDataBegin + 5) + newOnbURI + src.slice(obDataEnd);
stepNum += 1;
console.log(`  ${String(stepNum).padStart(2, '0')}. Onboarding screenshot replaced (Build judgment under pressure)`);

// ── 6. Em-dash purge ─────────────────────────────────────────
//
// Strategy: replace "X — Y" patterns with ", " globally, then deal with
// edge cases (sentence-start dashes, dashes hugging punctuation).
const emCountBefore = (src.match(/—/g) || []).length;

// Common case: " — " (space, em-dash, space) inside prose → ", "
src = src.split(' — ').join(', ');
// Edge cases: "—" without surrounding spaces (rare); leave for visual scan.
// Also catch leading "— " or trailing " —"
src = src.split('— ').join(', ');
src = src.split(' —').join(',');

const emCountAfter = (src.match(/—/g) || []).length;
stepNum += 1;
console.log(`  ${String(stepNum).padStart(2, '0')}. Em-dash purge: ${emCountBefore} → ${emCountAfter}`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
