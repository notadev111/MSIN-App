# Claude prompt for building the Acumen report

Copy this whole prompt into Claude when you are ready to generate the report draft or a polished report structure.

## Prompt

You are helping write and design a high-scoring university group coursework report for an MVP called **Acumen**.

Acumen is a feasibility prototype for emerging business leaders. It helps users practise realistic business decisions, receive a research-informed leadership signal, and connect with peers whose strengths complement their own.

The report must be cohesive, visually clean, concise, and evidence-led. It should follow the structure and visual discipline of a strong exemplar report: clear product identity, short sections, diagrams, screenshots, compact analysis, and source-backed claims.

Do not use em dashes. Write in a human academic/business style, not robotic or over-marketed. Do not overclaim what the MVP does.

## Core positioning

Use this as the central product definition:

**Acumen helps emerging business leaders practise realistic decisions, understand their leadership tendencies, and connect with peers whose strengths complement their own.**

The strategic logic is:

- **Beachhead:** business students, young professionals, and aspiring founders.
- **Premium later segment:** NextGen family-business successors.
- **Research anchor:** APAC family-business succession, governance, and leadership readiness.
- **MVP proof:** simulation, feedback, profile, and peer matching.
- **Limitation:** scoring is research-informed, not yet externally validated.

The report should make this feel like one coherent argument:

**Research shows a leadership-readiness gap. Acumen tests whether short simulations can help emerging leaders practise judgement, receive useful feedback, and form more valuable peer connections.**

## Design direction

Design the report to visually match the Acumen app.

### Colour palette

Use a restrained, editorial business palette:

- Warm off-white background: `#F7F3EC` or similar
- Ink black for headings: `#111111`
- Soft charcoal body text: `#4A4640`
- Deep green accent: `#123F36` or `#0F3D34`
- Terracotta action accent: `#D45F43`
- Pale sage highlight: `#DCE9E4`
- Fine borders: `#E3DCD1`

Avoid bright gradients, purple tech colours, dark-blue corporate templates, or generic startup neon design.

### Typography

Use a clean modern sans serif:

- Preferred: **Inter**
- Alternative: **Aptos**, **Helvetica Neue**, or **Arial**

Suggested hierarchy:

- Cover title: 40 to 52 pt, bold
- Section headings: 22 to 28 pt, bold
- Subheadings: 14 to 16 pt, semibold
- Body text: 10.5 to 11.5 pt
- Captions: 8.5 to 9.5 pt
- Diagram labels: 9 to 11 pt

Keep headings intentional and short. Do not fill pages with dense paragraphs.

### Layout style

Use:

- Wide margins
- Strong whitespace
- Two-column layouts where useful
- Compact tables
- Pull quotes from interviews
- Numbered figure captions
- Screenshot strips for the MVP walkthrough
- Clean diagrams with simple arrows and boxes

Avoid:

- Giant blocks of text
- Decorative clipart
- Low-resolution collages
- Long SWOT or Porter paragraphs
- Overly crowded canvases
- Repeating the same claim in multiple sections

## Report structure

Target a report around 3,000 words unless the coursework brief says otherwise.

Use this structure:

### Cover page

Include:

- Product name: **Acumen**
- Tagline: **Practise judgement before it counts**
- Group details
- Course/module details
- Date

Visual style:

Use a large product name, one-line definition, and a small screenshot or product loop graphic.

### 1. Executive summary

Target: 250 to 300 words.

Include:

- The problem
- The target users
- The solution
- The MVP
- The business model direction
- The feasibility verdict

Must include this idea:

Acumen is feasible as an early MVP because it demonstrates the core loop of simulation, feedback, and peer discovery. However, further user testing and scoring validation are required before it can be positioned as a high-stakes assessment tool.

### 2. Scope and opportunity

Target: 250 to 350 words.

Explain the opportunity:

- Young people need more practical ways to build business judgement.
- APAC family-business succession creates a high-value leadership-readiness context.
- The initial beachhead is broader than family-business successors because students and young professionals are easier to reach, test with, and convert into early users.

Use source-backed claims from the source audit.

### 3. Product definition

Target: 300 to 400 words.

Define Acumen clearly.

Include the product loop:

**Simulate -> Signal -> Connect -> Improve**

Explain each step:

1. Simulate: user completes a realistic business scenario.
2. Signal: Acumen turns decisions into a leadership profile.
3. Connect: users see peers with complementary skills.
4. Improve: users repeat scenarios and track progress.

Insert the product loop diagram from `REPORT_DIAGRAMS_DRAFT.md`.

### 4. MVP walkthrough

Target: 350 to 450 words plus screenshots.

Use a scenario walkthrough, not a collage.

Screenshot placement:

| Screenshot | Placement | Caption |
| --- | --- | --- |
| `report_screenshots/acumen-01-home.png` | Product definition | Acumen introduces a simple promise: practise business judgement before it counts. |
| `report_screenshots/acumen-02-onboarding.png` | MVP walkthrough | Onboarding frames the experience around goals and skill development. |
| `report_screenshots/acumen-04-simulation.png` | MVP walkthrough | The simulation places users in realistic trade-off decisions. |
| `report_screenshots/acumen-05-feedback.png` | MVP walkthrough | Feedback converts choices into a research-informed leadership signal. |
| `report_screenshots/acumen-07-network.png` | Product loop or value section | Peer matching turns individual feedback into social learning. |
| `report_screenshots/acumen-06-profile.png` | Appendix or MVP evidence | The profile shows repeat use and progress tracking. |
| `report_screenshots/acumen-03-dashboard.png` | Appendix | The dashboard supports navigation but is not essential to the main story. |

The main walkthrough should focus on:

1. User lands on Acumen.
2. User onboards around goals and skills.
3. User enters **The Succession Crisis** scenario.
4. User makes decisions under pressure.
5. User receives a leadership signal.
6. User sees peer matches.
7. User can repeat the loop.

### 5. Business model and value proposition

Target: 350 to 450 words.

Use the BMC and Value Proposition Canvas, but explain their relationship clearly:

- The BMC describes the broad beachhead: business students, young professionals, and aspiring founders.
- The VPC is more focused on the premium later segment: NextGen family-business successors.
- This is a strength if framed as a staged market entry strategy.

Do not make the product sound like it already has CV parsing, global map matching, paid certifications, or recruiter dashboards. These are roadmap features.

Include a simple Now / Next / Later table:

| Now | Next | Later |
| --- | --- | --- |
| Simulations | More scenarios | Institutional pilots |
| Feedback profile | Better matching logic | Certificates |
| Peer discovery | University cohort testing | NextGen succession pathway |
| Progress profile | Survey and interview validation | B2B advisory/recruiter tools |

### 6. Market validation

Target: 400 to 500 words.

Use survey findings and two exploratory interviews.

Phrase carefully:

**Two exploratory interviews were used to test early assumptions about the problem and value proposition. These findings are directional rather than conclusive, so the report combines them with survey responses, secondary research, and prototype feedback. Broader validation remains a next step.**

Include:

- A compact survey chart or table
- 2 to 4 short anonymised interview quotes
- What changed because of validation
- What still needs to be tested

Do not pretend two interviews prove demand.

### 7. Market attractiveness

Target: 450 to 600 words.

Use concise SWOT and Porter diagrams or tables.

Do not write long SWOT paragraphs. Put the analysis in compact tables and add one interpretation sentence under each.

Use the SWOT and Porter material from `REPORT_DIAGRAMS_DRAFT.md`.

Main SWOT interpretation:

**The SWOT shows that Acumen's near-term advantage is clarity and usability, while its main risk is credibility. The report should therefore present validation honestly and frame institutional use as a later-stage opportunity.**

Main Porter interpretation:

**Porter's analysis suggests that Acumen should compete through credible scenario design and user trust rather than claiming a technology moat too early.**

### 8. Feasibility and next steps

Target: 300 to 450 words.

Give a balanced verdict:

- Technically feasible as an MVP.
- Strategically coherent if launched through students and societies first.
- Commercially promising but not yet proven.
- Research-backed, but scoring validation remains a key limitation.

Next steps:

1. Run more user testing.
2. Refine the scoring explanation.
3. Add more scenarios.
4. Test cohort use through a university or entrepreneurship society.
5. Develop better peer-matching logic.
6. Later, test the NextGen family-business pathway.

### Appendix

Include:

- Full BMC
- Full Value Proposition Canvas
- Extra screenshots
- Survey questions and results
- Interview guide
- Interview notes
- Source audit summary
- Technical architecture if available

### Bibliography

Use Harvard style.

Use the source audit file to avoid weak claims.

## Source-safe wording

Use these exact forms unless improving clarity:

**Sukamdani's (2023) review of Southeast Asian family-business literature states that Indonesian family companies reach around 40% of market capitalisation and contribute more than 80% of GDP.**

**McKinsey's Game-Based Innovation Lab shows that simulation-based assessment and learning are used in serious professional contexts, not only entertainment.**

**Imbellus and McKinsey piloted and calibrated simulation-based assessment with McKinsey candidates from 2017, but Acumen does not claim equivalent validation at MVP stage.**

Do not write:

**Imbellus scores were validated on McKinsey employees from 2017 onwards.**

Do not write:

**Acumen provides validated psychometric assessment.**

Instead write:

**Acumen provides research-informed developmental feedback, with validation required before high-stakes use.**

## Core sources to cite

Use these as the core bibliography:

1. PwC (2025) *How Indonesian family businesses are preparing their legacy, and how agile they are amidst uncertainty*.
2. PwC (2024) *Global NextGen Survey 2024: Asia Pacific highlights*.
3. McKinsey & Company (2024) *Asia-Pacific's family office boom: Opportunity knocks*.
4. McKinsey & Company (2025) *From apprenticeship in space to selecting microbes: Meet McKinsey's game-based innovation lab*.
5. McKinsey & Company (2020) *Innovating recruiting through online gaming*.
6. Sukamdani, N.B. (2023) *Family Business Dynamics in Southeast Asia: A Comparative Study of Indonesia, Malaysia, Singapore, and Thailand*. Journal of ASEAN Studies, 11(1), pp. 197-218.
7. Kantar, R. et al. (2018) *Constructing Cognitive Profiles for Simulation-Based Hiring Assessments*. Educational Data Mining.
8. Fisman, R. (2001) *Estimating the Value of Political Connections*. American Economic Review, 91(4), pp. 1095-1102.
9. Hambrick, D.C. and Mason, P.A. (1984) *Upper Echelons: The Organization as a Reflection of Its Top Managers*. Academy of Management Review.
10. Vroom, V.H. and Yetton, P.W. (1973) *Leadership and Decision-Making*.
11. Rest, J.R. (1986) *Moral Development: Advances in Research and Theory*.
12. JMIR Serious Games (2023) *Gamification and Soft Skills Assessment in the Development of a Serious Game: Design and Feasibility Pilot Study*.

## Diagrams to include

Include these diagrams:

1. Product loop: **Simulate -> Signal -> Connect -> Improve**
2. MVP walkthrough: user -> onboarding -> simulation -> feedback -> network -> repeat
3. SWOT 2x2 table
4. Porter's Five Forces compact table or wheel
5. Optional Now / Next / Later roadmap
6. Optional evidence map: research finding -> product decision

Do not include every possible diagram. Prioritise clarity.

## Writing tone

Write like this:

Clear, practical, confident, and honest.

Example:

**The MVP does not attempt to solve succession directly. Instead, it tests a smaller and more achievable product idea: whether short business simulations can help emerging leaders practise judgement, understand their decision tendencies, and form more useful peer connections.**

Avoid hype:

**Acumen will revolutionise succession using AI-powered validated behavioural intelligence.**

Avoid vague filler:

**The app is innovative and disruptive in the market.**

## Marking strategy

The report should score well if it shows:

- Clear product-market logic
- Strong link between research and MVP
- Honest feasibility analysis
- Visual evidence of the prototype
- Source-backed market claims
- Thoughtful business model
- Clear limitations and next steps
- Coherent design language

The biggest risk is overclaiming validation. Avoid that.

The strongest message is:

**Acumen is a feasible early-stage MVP with a coherent beachhead, a research-backed premium pathway, and a clear product loop. Its next challenge is not building more features, but validating whether users trust and return to the simulation-feedback-peer loop.**

## Files to use

Use these files as source material:

- `REPORT_ASSEMBLY_GUIDE.md`
- `COHESIVE_REPORT_PACK.md`
- `SOURCE_AUDIT_AND_REPORT_LAYOUT.md`
- `PRODUCT_LOOP_AND_MVP_WALKTHROUGH.md`
- `REPORT_DIAGRAMS_DRAFT.md`
- `report_screenshots/acumen-01-home.png`
- `report_screenshots/acumen-02-onboarding.png`
- `report_screenshots/acumen-03-dashboard.png`
- `report_screenshots/acumen-04-simulation.png`
- `report_screenshots/acumen-05-feedback.png`
- `report_screenshots/acumen-06-profile.png`
- `report_screenshots/acumen-07-network.png`

Do not paste raw research dumps into the main report. Use them only to support claims.

