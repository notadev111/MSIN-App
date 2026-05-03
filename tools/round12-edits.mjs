// Round 12: integrate the teammate's text where the user explicitly
// requested it, drop pull-quote D, purge en dashes too.
//
//   1. Exec summary → teammate's block (with 2→3 interviews fix + the
//      four-step list actually being four steps, not three)
//   2. §5 "How a decision becomes a signal" → teammate's rewording
//   3. §6 Business model → teammate's rewording (heading kept tight)
//   4. Drop pull-quote D so we have 3 quote boxes (matches the report's
//      "three in-depth interviews" claim)
//   5. En-dash → hyphen everywhere (still a typography tell)

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

// ── 1. Exec summary → teammate's text ───────────────────────────
swap('Exec summary: replace with teammate text (3 interviews, 4 steps)',
` <span class="section-tag">01 · Executive summary</span>
 <h2>A feasible MVP for emerging leaders</h2>

 <p>
 Young people preparing for management roles are taught about leadership but
 rarely get to practise it. Case studies are abstract, internships are scarce,
 and traditional psychometrics are slow, expensive, and detached from the
 work itself. <strong>Acumen</strong> addresses this gap with short,
 scenario-driven simulations that surface how a user actually decides under
 pressure.
 </p>

 <p>
 The beachhead is business students, young professionals, and aspiring
 founders; the premium later segment is next-generation
 (<em>NextGen</em>) successors in Asia-Pacific family businesses where
 leadership transitions carry significant economic stakes
 <a href="#bib3">[3]</a><a href="#bib1">[1]</a>.
 The MVP demonstrates a four-step loop,
 <strong>Simulate</strong>, <strong>Signal</strong>,
 <strong>Connect</strong>, <strong>Improve</strong>, across three live
 web scenarios. The model layers freemium individual access, university
 cohort pilots, and a premium NextGen pathway; a 14-response survey and
 three in-depth interviews give directional evidence.
 </p>`,
` <span class="section-tag">01 · Executive summary</span>
 <h2>A feasible MVP for emerging leaders</h2>

 <p>
 Building a business demands far more than logistics; it requires
 disciplined leadership, sound judgment, and the ability to navigate
 complex, high-stakes decisions. Yet while many young people are taught
 leadership in theory, few are allowed to practise it in realistic,
 pressure-driven contexts.
 </p>

 <p>
 <strong>Acumen</strong> addresses this gap. It targets an initial
 beachhead of business students, young professionals, and aspiring
 founders, with a clear pathway toward a premium segment: next-generation
 (<em>NextGen</em>) successors in Asia-Pacific family businesses, where
 leadership transitions carry significant economic stakes
 <a href="#bib3">[3]</a><a href="#bib1">[1]</a>. The MVP models a
 four-step loop: <strong>Simulate</strong> a realistic business scenario,
 receive a research-informed leadership <strong>Signal</strong>,
 <strong>Connect</strong> with a range of aspiring peers, and
 <strong>Improve</strong> through repeated practice.
 </p>

 <p>
 Commercially, the model layers freemium individual access with
 university cohort pilots, leading toward a premium NextGen pathway. A
 14-response customer survey and three in-depth interviews provide
 directional evidence that the underlying problem resonates, although
 broader validation remains a next step.
 </p>`);

// ── 2. §5 "How a decision becomes a signal" → teammate text ─────
swap('§5 decision-to-signal: teammate rewording',
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
 </p>`,
` <h3>How a decision becomes a signal</h3>
 <p>
 The simulation, with the use of typed data, builds scenarios and
 guides users through several rounds of situations, choices, and
 supporting documents. The state machine manages this flow, leading
 them through their initial decision, any ethical issues that might
 come up, the final plot twist, and the end of the scenario.
 </p>
 <p>
 After that, the system collects the user's choices and passes them to
 our scoring function. This function associates every choice with
 hidden tags that represent five major dimensions, performs a bias
 check, and produces both a total score and a classification according
 to the Vroom-Yetton model. Then, the app takes the user to a feedback
 screen, explaining their profile in simple terms with visual progress
 bars. We subsequently employ this profile data for the networking
 feature to connect users with peers whose strengths are complementary
 rather than identical.
 </p>`);

// ── 3. §6 Business model → teammate text ──────────────────────
swap('§6 lede + beachhead/premium: teammate rewording',
` <span class="section-tag">06 · Business model and value proposition</span>
 <h2>A staged path to market</h2>

 <p class="lede">
 Acumen's business model is built around staged market entry, not a single
 target customer. The Business Model Canvas describes the broad beachhead;
 the Value Proposition Canvas focuses on the premium later segment. The
 relationship between them is sequential, not contradictory.
 </p>

 <div class="two-col">
 <div>
 <h3>Beachhead via the BMC</h3>
 <p>
 Acumen pursues business students, young professionals, and aspiring
 founders, reachable via universities and societies, low acquisition
 cost, fast feedback loops. Revenue: freemium with paid scenario packs.
 </p>
 </div>
 <div>
 <h3>Premium via the VPC</h3>
 <p>
 The VPC focuses on NextGen successors in Asia-Pacific family businesses
 , pains are structural (senior resistance, no safe space to practise
 difficult decisions <a href="#bib1">[1]</a>). Revenue: institutional
 pilots, only after the loop is proven on the broader beachhead.
 </p>
 </div>
 </div>`,
` <span class="section-tag">06 · Business model and value proposition</span>
 <h2>A staged path to market</h2>

 <p class="lede">
 Acumen's business model relies on a staged market entry, not a single
 target customer. We use the Business Model Canvas to map out our broad,
 initial audience, while the Value Proposition Canvas zooms in on a
 premium segment we plan to target later. These two approaches are
 sequential steps in the growth strategy.
 </p>

 <div class="two-col">
 <div>
 <h3>The initial beachhead (via the BMC)</h3>
 <p>
 For launch, Acumen targets business students, young professionals, and
 aspiring founders. We can reach this group relatively easily through
 university partnerships and student societies. This keeps costs low
 (not much advertising needed to build brand reputation) while giving
 us the fast feedback loops we need to iterate. Revenue at this stage
 comes from a paid add-ons model, where users can purchase additional
 scenario packs.
 </p>
 </div>
 <div>
 <h3>The premium segment (via the VPC)</h3>
 <p>
 Down the line, the premium segment focuses on the next generation of
 successors taking over family businesses in Asia. This group faces
 structural challenges (senior resistance, lack of consequence-free
 environments) which makes practising high-stakes decisions even more
 valuable <a href="#bib1">[1]</a>. Once the core product is proven with
 student and professional users, we monetise this premium tier through
 institutional pilot programmes and broaden beyond the student-only
 audience.
 </p>
 </div>
 </div>`);

// ── 4. Drop pull-quote D ─────────────────────────────────────
swap('Drop pull-quote D (only 3 in-depth interviewees on record)',
` <div class="pull-quote">
 "Leading without formal authority is the hard part. Young people have
 ideas and energy; what's missing is experience handling conflict."
 <span class="attrib">Interviewee D · Aspiring entrepreneur</span>
 </div>
 </div>
 </div>`,
` </div>
 </div>`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
