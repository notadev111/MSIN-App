// Rebuild the MVP walkthrough section so screenshots are full-width with
// captions underneath (instead of the cascading two-column layout), and
// embed the new app screenshots (dashboard, simulation, leadership signal,
// profile, messaging). Adds a new "Messaging" step to the walkthrough.
//
// Strategy: replace the two existing walkthrough sections (page 05 + 06 in
// the old layout) with a fresh set of 3 stacked-figure pages. The new
// screenshots are embedded inline; old base64 references are dropped.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const HTML = resolve(__dirname, '..', 'acumen-report.html');
const APP  = resolve(__dirname, '..', 'new app pictures');
const RS   = resolve(__dirname, '..', 'report_screenshots');

function dataUri(path, mime = 'image/png') {
  return `data:${mime};base64,${readFileSync(path).toString('base64')}`;
}

// ── Encode the screenshots ──────────────────────────────────────
const img = {
  onboarding:    dataUri(`${RS}/acumen-02-onboarding.png`),     // existing
  dashboard:     dataUri(`${APP}/Screenshot 2026-05-01 140847.png`), // new
  simulation:    dataUri(`${APP}/Screenshot 2026-05-01 140731.png`), // new
  signal:        dataUri(`${APP}/Screenshot 2026-05-01 140820.png`), // new
  style:         dataUri(`${APP}/Screenshot 2026-05-01 140808.png`), // new
  profile:       dataUri(`${APP}/Screenshot 2026-05-01 140832.png`), // new
  network:       dataUri(`${RS}/acumen-07-network.png`),       // existing
  messaging:     dataUri(`${APP}/Screenshot 2026-05-01 140619.png`), // new
};

// ── 1. Add the .screenshot-fw style if not already present ─────
let src = readFileSync(HTML, 'utf8');

if (!src.includes('.screenshot-fw')) {
  src = src.replace(
    `.screenshot-strip {`,
`.screenshot-fw {
 background: var(--paper);
 border: 1px solid var(--border);
 border-radius: 2mm;
 overflow: hidden;
 box-shadow: 0 2px 0 var(--border);
 margin: 2mm 0 0 0;
 page-break-inside: avoid;
 }
 .screenshot-fw img {
 width: 100%;
 height: auto;
 display: block;
 }

 .screenshot-strip {`
  );
  console.log('  Added .screenshot-fw CSS class.');
}

// ── 2. Build new walkthrough HTML (3 pages instead of 2) ───────

const fig = (n, src, alt, caption) => `
 <figure style="margin-top: 3mm; page-break-inside: avoid;">
 <div class="screenshot-fw">
 <img src="${src}" alt="${alt}">
 </div>
 <figcaption>
 <span class="fig-num">Fig. ${n}</span>
 ${caption}
 </figcaption>
 </figure>`;

const newWalkthrough = `<!-- ============================================================
 PAGE 5 — MVP WALKTHROUGH (intro + onboarding + dashboard)
 ============================================================ -->
<section class="page">
 <span class="section-tag">04 · MVP walkthrough</span>
 <h2>How a user actually uses Acumen</h2>

 <p class="lede">
 The walkthrough shows Acumen's core loop: a user enters via a simple
 value proposition, completes a simulation, receives a leadership
 signal, and is guided toward complementary peers — and now,
 conversations with them.
 </p>

 <div class="diagram-frame large no-break" style="padding: 5mm 4mm; margin-top: 2mm;">
 <svg viewBox="0 0 740 110" xmlns="http://www.w3.org/2000/svg">
 <defs>
 <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
 <path d="M0,0 L10,5 L0,10 Z" fill="#8A8478"/>
 </marker>
 </defs>
 <g font-family="Inter, Aptos, sans-serif">
 <g font-size="11" fill="#111111" text-anchor="middle" font-weight="600">
 <circle cx="55" cy="50" r="22" fill="#F0EBE0" stroke="#D45F43" stroke-width="2"/>
 <text x="55" y="55">01</text>
 <text x="55" y="92" font-size="8.5" fill="#4A4640" letter-spacing="1.5" font-weight="600">LANDING</text>
 <circle cx="170" cy="50" r="22" fill="#F0EBE0" stroke="#0F3D34" stroke-width="1.5"/>
 <text x="170" y="55">02</text>
 <text x="170" y="92" font-size="8.5" fill="#4A4640" letter-spacing="1.5" font-weight="600">DASHBOARD</text>
 <circle cx="285" cy="50" r="22" fill="#F0EBE0" stroke="#0F3D34" stroke-width="1.5"/>
 <text x="285" y="55">03</text>
 <text x="285" y="92" font-size="8.5" fill="#4A4640" letter-spacing="1.5" font-weight="600">SIMULATION</text>
 <circle cx="400" cy="50" r="22" fill="#DCE9E4" stroke="#0F3D34" stroke-width="2"/>
 <text x="400" y="55">04</text>
 <text x="400" y="92" font-size="8.5" fill="#4A4640" letter-spacing="1.5" font-weight="600">SIGNAL</text>
 <circle cx="515" cy="50" r="22" fill="#F0EBE0" stroke="#0F3D34" stroke-width="1.5"/>
 <text x="515" y="55">05</text>
 <text x="515" y="92" font-size="8.5" fill="#4A4640" letter-spacing="1.5" font-weight="600">NETWORK</text>
 <circle cx="630" cy="50" r="22" fill="#F0EBE0" stroke="#0F3D34" stroke-width="1.5"/>
 <text x="630" y="55">06</text>
 <text x="630" y="92" font-size="8.5" fill="#4A4640" letter-spacing="1.5" font-weight="600">MESSAGE</text>
 </g>
 <g stroke="#8A8478" stroke-width="1.2" fill="none">
 <line x1="82" y1="50" x2="143" y2="50" marker-end="url(#arrow2)"/>
 <line x1="197" y1="50" x2="258" y2="50" marker-end="url(#arrow2)"/>
 <line x1="312" y1="50" x2="373" y2="50" marker-end="url(#arrow2)"/>
 <line x1="427" y1="50" x2="488" y2="50" marker-end="url(#arrow2)"/>
 <line x1="542" y1="50" x2="603" y2="50" marker-end="url(#arrow2)"/>
 </g>
 </g>
 </svg>
 </div>
 <p style="font-size: 8.5pt; color: var(--body); margin-top: 0.5mm; margin-bottom: 3mm;">
 <span style="color: var(--terracotta); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; font-size: 8pt;">Fig. 3</span>
 &nbsp;Updated six-step user journey, including peer messaging.
 </p>

 <h3 style="margin-top: 3mm;">Step 1 &middot; Onboarding</h3>
 <p style="font-size: 9.5pt;">
 A first-time user lands on a single-promise home screen and is taken
 into a short onboarding flow. Acumen asks what the user wants to
 develop — decision-making under pressure, ethical judgement, conflict
 navigation, or strategic communication — and these selections shape
 scenario order and feedback framing.
 </p>
${fig(4, img.onboarding, 'Acumen onboarding screen', 'Onboarding frames the experience around goals and skill development.')}

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">05</div>
</section>


<!-- ============================================================
 PAGE 6 — MVP WALKTHROUGH (dashboard + simulation)
 ============================================================ -->
<section class="page">
 <span class="section-tag">04 · MVP walkthrough (cont.)</span>
 <h2>Dashboard and simulation</h2>

 <h3>Step 2 &middot; Dashboard</h3>
 <p style="font-size: 9.5pt;">
 After onboarding the user lands on a personal dashboard with three
 live scenarios — <em>The Succession Crisis</em>, <em>The Authority
 Bypass</em>, and <em>The Fading Division</em> — alongside a top-line
 cognitive profile and a "next focus" prompt that points to the
 dimension worth strengthening on the next run.
 </p>
${fig(5, img.dashboard, 'Acumen dashboard with three scenarios', 'The dashboard surfaces three live scenarios, the user\\u2019s top dimensions, and a next-focus prompt.')}

 <h3 style="margin-top: 4mm;">Step 3 &middot; Simulation</h3>
 <p style="font-size: 9.5pt;">
 Each scenario presents sequenced decisions under time and information
 constraints. The user reviews stakeholder documents, sees situational
 prompts, and selects an option — with optional ethical follow-ups and
 a final twist. Below: a live round of <em>The Authority Bypass</em>
 inside the Meridian Capital scenario.
 </p>
${fig(6, img.simulation, 'Acumen simulation in progress', 'A simulation round in <em>The Authority Bypass</em>, with stakeholder context, decision options, and macro-flag warnings.')}

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">06</div>
</section>


<!-- ============================================================
 PAGE 7 — MVP WALKTHROUGH (signal + profile)
 ============================================================ -->
<section class="page">
 <span class="section-tag">04 · MVP walkthrough (cont.)</span>
 <h2>From signal to profile</h2>

 <h3>Step 4 &middot; A research-informed signal</h3>
 <p style="font-size: 9.5pt;">
 At the close of a simulation Acumen maps the user's decisions to five
 dimensions — strategic judgement, ethical reasoning, stakeholder
 management, decisiveness, adaptability — and renders the result as
 developmental feedback rather than a graded score. The numerical
 output is not yet a calibrated psychometric — Imbellus/McKinsey took
 years to reach that bar <a href="#bib5">[5]</a><a href="#bib8">[8]</a>
 — but the strategy mapping (each decision traceable to a research-
 grounded tag) is what the MVP demonstrates today.
 </p>
${fig(7, img.signal, 'Acumen feedback screen showing simulation result', 'Per-run feedback: overall score, strongest dimension, the dimension to develop next, and a five-dimension breakdown.')}

 <h3 style="margin-top: 4mm;">Step 5 &middot; Profile and progress</h3>
 <p style="font-size: 9.5pt;">
 The same profile vector aggregates across runs into a current-profile
 view with five dimension bars and a session history. Repetition is
 what turns the loop into learning — the profile records how a user's
 signal shifts over time as <em>The Fading Division</em> and other
 scenarios broaden practice beyond succession.
 </p>
${fig(8, img.profile, 'Acumen profile page with skill bars', 'The profile aggregates results across runs into five-dimension bars and a session history.')}

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">07</div>
</section>


<!-- ============================================================
 PAGE 8 — MVP WALKTHROUGH (network + messaging)
 ============================================================ -->
<section class="page">
 <span class="section-tag">04 · MVP walkthrough (cont.)</span>
 <h2>Network and conversation</h2>

 <h3>Step 6 &middot; Peer matching</h3>
 <p style="font-size: 9.5pt;">
 The signal then suggests peers with complementary strengths — the
 same simulated experience produces a common vocabulary for
 collaboration. MVP matching uses profile-vector similarity over
 decision tendencies; a swipe-style mobile interaction is on the
 6–12-month roadmap.
 </p>
${fig(9, img.network, 'Acumen network screen showing peer matches', 'Peer matching surfaces complementary strengths rather than identical profiles.')}

 <h3 style="margin-top: 4mm;">Step 7 &middot; Direct messaging</h3>
 <p style="font-size: 9.5pt;">
 Once two users connect, the messaging surface opens with a scenario-
 specific prompt — for example, <em>"compare your scenario paths"</em>
 — so the conversation starts on shared substance rather than a cold
 introduction. This was the highest-leverage change after Round 2
 interviews flagged that LinkedIn-style networks felt shallow.
 </p>
${fig(10, img.messaging, 'Acumen messaging screen with scenario-specific prompt', 'Messaging opens on a scenario-specific prompt so connections start on shared substance, not introductions.')}

 <div class="page-footer-left">Acumen · Feasibility Report</div>
 <div class="page-number">08</div>
</section>`;

// ── 3. Replace the old two walkthrough sections in one swipe ───
// Find from "PAGE 5 — MVP WALKTHROUGH" comment up to and including the
// closing </section> of the second walkthrough page.
const startMarker = '<!-- ============================================================\n PAGE 5 — MVP WALKTHROUGH (intro + first screens)\n ============================================================ -->';
const endMarker   = ' <div class="page-number">06</div>\n</section>';

const startIdx = src.indexOf(startMarker);
if (startIdx < 0) throw new Error('Start marker not found.');
const endIdx = src.indexOf(endMarker, startIdx);
if (endIdx < 0) throw new Error('End marker not found.');
const finalEnd = endIdx + endMarker.length;

src = src.slice(0, startIdx) + newWalkthrough + src.slice(finalEnd);
console.log('  Replaced 2-page walkthrough → 4 stacked, full-width pages.');

writeFileSync(HTML, src, 'utf8');
console.log(`Done. New file size: ${src.length} chars.`);
