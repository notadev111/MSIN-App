// Round 11: integrate teammate's strongest contributions, fix page-13
// overflow, add two new citations.
//
// Editorial picks:
//   IN  — new family-business statistics on §2 (13% succession success,
//          ~85% APAC family ownership, ~$2T from top 750), with new
//          citations [15] Economic Times/EY and [16] NUS CGS Success &
//          Succession 2013.
//   IN  — IP / limitations rewritten using teammate's structure (3 bullets
//          for IP items), with the "(time, finances, etc.)" parenthetical
//          stripped per user instruction.
//   OUT — exec-summary replacement (current is sharper than teammate's
//          version; teammate also drops the in-depth interview count
//          from 3 to 2, which is wrong).
//   OUT — §5 "How a decision becomes a signal" rewording (we already
//          reworded this in round 9 to be more conversational; teammate's
//          version reverts to passive voice — net loss).
//   OUT — §6 wholesale replacement (current is cleaner; teammate's adds
//          length without new substance).
//
// Plus: fix page 13 4-quote column overflow by shortening quote A.

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

// ── 1. Page 13 quote shortening so 4 quotes fit ───────────────
swap('Quote A: tighten by one line',
` <div class="pull-quote">
 "The hardest part is not knowing if a decision was actually a good
 one. You make the call, things happen, and you never really get told
 why it worked or did not."
 <span class="attrib">Interviewee A · Final-year student</span>
 </div>`,
` <div class="pull-quote">
 "The hardest part is not knowing if a decision was actually a good
 one. You make the call, things happen, and you never get told why."
 <span class="attrib">Interviewee A · Final-year student</span>
 </div>`);

swap('Quote B: tighten further',
` <div class="pull-quote">
 "LinkedIn is fine for the photo of you at a conference. It is not
 where you find the person you'd actually phone before a hard meeting.
 I'd pay if a tool got me better at deciding under pressure."
 <span class="attrib">Interviewee B · Early-career professional</span>
 </div>`,
` <div class="pull-quote">
 "LinkedIn is fine for the photo at a conference. It's not where you
 find the person you'd phone before a hard meeting."
 <span class="attrib">Interviewee B · Early-career professional</span>
 </div>`);

swap('Quote C: tighten',
` <div class="pull-quote">
 "Making decisions that disappoint people and still standing by them.
 It's easy to lead when everyone agrees but much harder when you have
 incomplete information, conflicting interests, and real consequences."
 <span class="attrib">Interviewee C · Aspiring entrepreneur, family-business background</span>
 </div>`,
` <div class="pull-quote">
 "Making decisions that disappoint people and still standing by them.
 Easy when everyone agrees, much harder with incomplete information,
 conflicting interests, and real consequences."
 <span class="attrib">Interviewee C · Aspiring entrepreneur, family-business background</span>
 </div>`);

swap('Quote D: tighten',
` <div class="pull-quote">
 "Knowing how to lead without having formal authority is difficult.
 Many young people have ideas and energy, but less experience handling
 conflict or accountability."
 <span class="attrib">Interviewee D · Aspiring entrepreneur</span>
 </div>`,
` <div class="pull-quote">
 "Leading without formal authority is the hard part. Young people have
 ideas and energy; what's missing is experience handling conflict."
 <span class="attrib">Interviewee D · Aspiring entrepreneur</span>
 </div>`);

// ── 2. New family-business statistics on §2 with new citations ──
swap('§2 APAC paragraph: stronger statistics + new citations',
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
 </p>`,
` <h3>Why an Asia-Pacific focus</h3>
 <p>
 The premium segment is concentrated in Asia-Pacific, where family firms
 dominate (~85% of regional businesses) and a generational handover is
 underway. <strong>USD 5.8 trillion</strong> is expected to transfer
 between 2023 and 2030 <a href="#bib3">[3]</a>, and 20% of the world's
 top 750 family businesses are Asia-based, generating roughly USD 2
 trillion in collective revenue <a href="#bib15">[15]</a>. The
 succession picture is less rosy: only around <strong>13%</strong> of
 large Southeast Asian family firms successfully transition leadership
 across generations <a href="#bib16">[16]</a>, and PwC finds 43% of
 Indonesian NextGen citing senior resistance to handover
 <a href="#bib1">[1]</a>. Succession is a transfer not just of wealth
 but of responsibility, decision-making pressure, and long-term vision,
 which is the gap Acumen exists to address.
 </p>`);

// ── 3. Add new bibliography entries [15] and [16] ──────────────
swap('Bibliography: add entries [15] and [16]',
` <li id="bib14">JMIR Serious Games (2023) 'Gamification and Soft Skills Assessment in the Development of a Serious Game: Design and Feasibility Pilot Study'.</li>`,
` <li id="bib14">JMIR Serious Games (2023) 'Gamification and Soft Skills Assessment in the Development of a Serious Game: Design and Feasibility Pilot Study'.</li>
 <li id="bib15">Economic Times (2021) 'More family businesses in Asia now paying attention to leadership succession', citing the EY Family Business Survey. Available at: economictimes.indiatimes.com (accessed 2 May 2026).</li>
 <li id="bib16">NUS Business School Centre for Governance and Sustainability (2013) <em>Success and Succession: An Asian Family Business Report</em>. National University of Singapore.</li>`);

// Source-audit table on page 20 – add new sources for the new stats.
swap('Source audit: add row for the new family-business statistics',
`<tr><td>USD 5.8 trillion APAC NextGen wealth transfer</td><td><a href="#bib3">[3]</a></td></tr>`,
`<tr><td>USD 5.8 trillion APAC NextGen wealth transfer</td><td><a href="#bib3">[3]</a></td></tr>
 <tr><td>~85% of APAC firms family-owned; top 750 globally include 20% Asia-based ($2T revenue)</td><td><a href="#bib15">[15]</a></td></tr>
 <tr><td>~13% leadership-transition success rate, large Southeast Asian family firms</td><td><a href="#bib16">[16]</a></td></tr>`);

// ── 4. IP / limitations rewritten with teammate's structure ────
swap('§5 IP / limitations rewritten with bullets (no time/finances aside)',
` <h3>Honest limitations and IP</h3>
 <p>
 Acumen is a research-informed prototype, not a validated assessment
 platform. Scoring is framework-based but not externally validated
 against real-world outcomes; matching uses demo data; CV parsing,
 global maps, recruiter tools, and certificates are out of scope at MVP.
 </p>
 <p>
 What is hard to clone is not the codebase but three things that
 compound: the <strong>scenario library</strong> (typed data with expert
 review per release), the <strong>calibrated feedback rubric</strong>
 (anchored in upper-echelons, Vroom-Yetton, Hersey-Blanchard, and Rest;
 expert-rater calibration is R5), and <strong>cohort-pilot network
 density</strong> (matching quality grows with usage, so a late entrant
 cannot match day one). All sit with the founding team; trade-mark
 filing is budgeted in Year-1 legal costs.
 </p>`,
` <h3>Honest limitations and IP</h3>
 <p>
 Right now Acumen is a research-backed prototype, not a fully validated
 psychometric tool, which would require further psychological studies.
 Our scoring relies on established frameworks but has not yet been
 validated against real-world performance outcomes; peer matching runs
 on demo data; and CV parsing, interactive maps, recruiter dashboards,
 and formal certificates are not part of the MVP.
 </p>
 <p>
 Our defensible IP is not the codebase, which can be cloned in weeks,
 but three things that compound:
 </p>
 <ul style="font-size: 9.5pt; margin: 2mm 0 3mm 5mm; padding-left: 4mm;">
 <li><strong>The scenario library.</strong> Built on typed structured
 data, expert-reviewed before every release.</li>
 <li><strong>The calibrated feedback rubric.</strong> Grounded in Upper
 Echelons, Vroom-Yetton, Hersey-Blanchard, and Rest, with expert-rater
 calibration scheduled as R5.</li>
 <li><strong>Cohort-pilot network density.</strong> Match quality grows
 with usage; closed cohort pilots give us a head start a thin late
 entrant cannot match on day one.</li>
 </ul>
 <p style="font-size: 9.5pt;">
 All three sit with the founding team; trade-mark filing is budgeted in
 Year-1 legal costs.
 </p>`);

writeFileSync(HTML, src, 'utf8');
console.log(`\nDone: ${stepNum} edits applied.`);
