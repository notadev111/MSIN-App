// Round 4: get under 3,000 words and fix remaining 9mm overflow on page 02.

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

// ── Page 02: shorten para 2 to fit ──────────────────────────
swap('Page 02 paragraph 2 tightened',
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
 </p>`,
` <p>
 The beachhead is business students, young professionals, and aspiring
 founders; the premium later segment is next-generation
 (<em>NextGen</em>) successors in Asia-Pacific family businesses where
 leadership transitions carry significant economic stakes
 <a href="#bib3">[3]</a><a href="#bib1">[1]</a>.
 The MVP demonstrates a four-step loop —
 <strong>Simulate</strong>, <strong>Signal</strong>,
 <strong>Connect</strong>, <strong>Improve</strong> — across three live
 web scenarios. The model layers freemium individual access, university
 cohort pilots, and a premium NextGen pathway; an 18-response survey
 and three interviews give directional evidence.
 </p>`);

// ── Page 11: drop "What people most want from the loop" right-side
// commentary (the founder-concern block) is already short; instead trim
// the lede further AND cut "Read together" entirely. The conclusions
// (70/56% would try, conditional pay) are visible on the pies anyway.
swap('Page 11: drop "Read together" interpretive paragraph',
` <p style="font-size: 9.5pt; margin-top: 3mm; color: var(--muted);">
 <strong style="color: var(--ink);">Read together:</strong> the
 proposition lands as concept (70% would try, 56% positive) but
 willingness-to-pay is conditional — people pay for skill they can feel,
 not for a certificate they cannot.
 </p>`,
``);

swap('Page 11: founder-concern paragraph compressed',
` <h3>Why the founder concern matters</h3>
 <p style="font-size: 9.5pt;">
 Interviewee C — the founder — is the most strategically useful voice
 of the three. The point is <strong>scope</strong>: at very early
 founder stage, decision practice can feel less urgent than product or
 fundraising. The same concern surfaced in three founder free-text
 responses. The response is not to widen Acumen's scope but to position
 it honestly: it helps anyone deciding earlier than expected, but does
 not replace technical or commercial skill-building.
 </p>`,
` <h3>Why the founder concern matters</h3>
 <p style="font-size: 9.5pt;">
 Interviewee C — the founder — is the most strategically useful voice
 of the three. At very early founder stage, decision practice feels
 less urgent than product or fundraising; the same concern appeared in
 three founder free-text responses. The response is not to widen
 Acumen's scope but to position it honestly — it helps anyone deciding
 earlier than expected, not as a replacement for product or commercial
 skill-building.
 </p>`);

// ── Page 12: trim "What changed" and "Still needs testing" again ──
swap('Page 12: "What changed" + "Still needs testing" further compressed',
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
 </p>`,
` <h3 style="margin-top: 5mm;">What changed because of the interviews</h3>
 <p style="font-size: 10pt;">
 Four product decisions followed: the leadership signal was reframed
 as developmental, not diagnostic; peer matching moved earlier in the
 journey; the mobile build was promoted from "later" to "launch" (all
 three interviewees preferred phone use); copy and onboarding were
 rewritten to be honest about scope.
 </p>

 <h3>The cold-start concern</h3>
 <p style="font-size: 10pt;">
 Interviewee B raised the sharpest concern: <em>"the matching only works
 if there are actually people in there worth meeting."</em> Response: a
 cohort-pilot model — closed UCL society pilots so everyone starts on
 the same day, guaranteeing a meaningful network at first contact.
 </p>

 <h3>What still needs testing</h3>
 <p style="font-size: 10pt;">
 Three open questions inform R1, R2, R6: whether users return, whether
 the signal is understood without a facilitator, and whether a society
 signs a paying pilot. Next validation: a 40-user UCL cohort with
 telemetry on completion, return, and peer-message rates.
 </p>`);

// ── Page 13 SWOT closing further compressed ────────────────
swap('Page 13: SWOT closing trimmed (round 4)',
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
 </p>`,
` <h3 style="margin-top: 4mm;">What the SWOT actually tells us</h3>
 <p>
 Strengths cluster around clarity and design — the loop is easy to
 explain, research grounding is verifiable, and the practice + network
 proposition is differentiated. Weaknesses cluster around proof: the
 feedback model is research-informed but not calibrated, matching uses
 demo data. Opportunities are addressable short-term via cohort pilots;
 threats are competitive, sharpening the case for validation over feature
 breadth. Closing the evidence gap matters more than building anything
 new.
 </p>`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
