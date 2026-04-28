import type { ScenarioDefinition } from "@/lib/types";

// --- Scenario: Declining Product Line ----------------------------------------
// Framework mapping:
//   SJT (Situational Judgment Test) -> decisiveness + strategicJudgment
//   OODA Loop -> adaptability (observe signals, orient, decide, act)
//   Vroom-Yetton -> vroomStyle per option
//   Behavioral Economics biases -> sunk_cost, loss_aversion, status_quo, overconfidence

export const decliningProduct: ScenarioDefinition = {
  id: "declining-product",
  title: "The Fading Division",
  subtitle: "When heritage becomes a liability",
  duration: "20 min",
  company: "Sunridge Industrial Group",
  companyContext:
    "Sunridge Industrial Group is a Singapore-listed family conglomerate with operations across manufacturing, property, and logistics. The third-generation CEO has recently consolidated control. The group's precision-parts manufacturing division - founded by the patriarch - has been in structural decline for five years.",
  frameworks: [
    "Situational Judgment Test",
    "OODA Loop",
    "Behavioral Economics",
    "Hersey-Blanchard",
  ],
  tags: ["strategicJudgment", "decisiveness", "adaptability"],
  rounds: [
    // --- Round 1: The data lands ----------------------------------------------
    {
      id: "dp-r1",
      number: 1,
      title: "Round 1 - The Numbers Don't Lie",
      situation:
        "Your CFO presents the division's five-year performance review. Revenue has declined 22% in real terms. EBITDA margin has compressed from 14% to 6%. The division employs 340 people, several of whom are long-tenured staff personally hired by your grandfather.",
      context:
        "The precision-parts manufacturing division was the original business that built Sunridge. Your grandfather started it in 1971. Your father expanded it. It now competes directly with Malaysian and Vietnamese manufacturers on cost - a position it cannot win.\n\nThe board is aware of the decline but has deferred action for three years. Analysts have begun flagging the division as a drag on group ROE.",
      question:
        "How do you respond to the five-year performance data?",
      macroSignal: {
        headline: "Malaysian precision parts exports up 41% in 18 months",
        detail:
          "Malaysian manufacturers have closed the quality gap while maintaining a 28% cost advantage over Singapore-based peers. Industry analysts consider cost-based competition from Singapore unsustainable beyond 2027.",
        type: "risk",
      },
      stakeholderDocs: [
        {
          id: "dp-r1-d1",
          type: "financial",
          title: "Division P&L - 5-Year Summary",
          summary: "Revenue -22% real; EBITDA 6% (was 14%); cash-generative but barely",
          content:
            "Revenue: SGD 88m (2024) vs SGD 113m (2019, real terms). EBITDA: SGD 5.3m (2024) vs SGD 15.8m (2019). Net cash generated: SGD 2.1m. Book value of division assets: SGD 61m. Estimated liquidation value: SGD 34-42m. Group total EBITDA: SGD 210m. Division contribution: 2.5%.",
          relevanceScore: 97,
        },
        {
          id: "dp-r1-d2",
          type: "employment",
          title: "Workforce Profile - Precision Parts Division",
          summary: "340 staff; avg tenure 14 years; 12 employees hired directly by founder",
          content:
            "Headcount: 340 (280 production, 60 management/admin). Average tenure: 14.2 years. 12 employees personally recruited by the late founder - all currently aged 55-68. Union membership: 62%. Severance liability (full redundancy): est. SGD 18-24m. Retraining cost estimate: SGD 3-6m.",
          relevanceScore: 83,
        },
        {
          id: "dp-r1-d3",
          type: "legal",
          title: "SGX Announcement Requirements - Material Asset Review",
          summary: "Material restructuring must be disclosed; SGD 61m asset qualifies",
          content:
            "SGX Mainboard Rule 1014: Any restructuring or disposal of assets exceeding 20% of NTA requires immediate announcement and, in some cases, shareholder approval. The precision parts division (book value SGD 61m) constitutes approximately 17% of group NTA - approaching the threshold. Pre-announcement planning must comply with Rule 1204 on material non-public information.",
          relevanceScore: 79,
        },
        {
          id: "dp-r1-d4",
          type: "press",
          title: "BCG: Conglomerate Value Trap - Asian Family Firms",
          summary: "Legacy business retention reduces group valuation by 1.2-1.8xEBITDA",
          content:
            "BCG's 2023 study of 88 ASEAN conglomerates found that family firms retaining chronically underperforming legacy divisions trade at a 1.2-1.8xEBITDA discount to peers that actively manage their portfolio. The discount is attributed to capital allocation inefficiency and the perception of emotional rather than rational governance.",
          relevanceScore: 86,
        },
      ],
      options: [
        {
          id: "dp-r1-a",
          title: "Commission a full strategic review with divestiture on the table",
          description:
            "Instruct the CFO and an external advisor to model three paths: full divestiture, partial sale, and restructured retention. Present findings to the board in 60 days.",
          vroomStyle: "AII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 3,
            decisiveness: 4,
            adaptability: 4,
          },
          consequence:
            "The board responds positively. Analysts note increased governance discipline in the next earnings call. The review proceeds with full management engagement.",
        },
        {
          id: "dp-r1-b",
          title: "Invest in automation - compete on quality not cost",
          description:
            "Approve a SGD 15m capex programme to automate the production floor and reposition toward high-tolerance aerospace parts.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 2,
            ethicalReasoning: 3,
            stakeholderManagement: 2,
            decisiveness: 3,
            adaptability: 2,
          },
          bias: "sunk_cost",
          consequence:
            "Automation reduces headcount by 40. Quality improves, but the aerospace pivot takes 3 years - during which losses continue. The board begins asking harder questions.",
        },
        {
          id: "dp-r1-c",
          title: "Maintain current trajectory - monitor quarterly",
          description:
            "No structural decision yet. Implement cost controls and monitor performance over the next two quarters.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 2,
            stakeholderManagement: 2,
            decisiveness: 1,
            adaptability: 1,
          },
          bias: "status_quo",
          consequence:
            "A credit rating agency downgrades the group's outlook from Stable to Negative, citing 'persistent underperformance in the legacy division and management's apparent reluctance to restructure.'",
        },
        {
          id: "dp-r1-d",
          title: "Explore a management buyout by the division leadership",
          description:
            "Invite the division's General Manager and CFO to explore a MBO structure - allowing Sunridge to exit while preserving employment and the brand.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 4,
            stakeholderManagement: 4,
            decisiveness: 3,
            adaptability: 3,
          },
          consequence:
            "The division GM is interested. Valuation negotiation begins. The process is slower than a trade sale but avoids public market disclosure in early stages.",
        },
      ],
      ethicalPrompt: {
        id: "dp-r1-ep",
        question:
          "Your mother - a non-executive director - privately asks you to protect the 12 employees personally hired by your grandfather. 'They were loyal to your grandfather. We owe them something.' How do you handle this?",
        context:
          "These 12 employees have seniority, and legally are entitled to standard redundancy. But your mother is raising a familial obligation that goes beyond legal minimums.",
        options: [
          {
            id: "dp-r1-ep-a",
            text: "Commit to enhanced severance and retraining support for all long-tenured staff - formalise it in the restructuring plan",
            score: 4,
          },
          {
            id: "dp-r1-ep-b",
            text: "Acknowledge the commitment and explore ring-fencing these roles within another division",
            score: 3,
          },
          {
            id: "dp-r1-ep-c",
            text: "Make an informal personal commitment - keep it out of the official plan",
            score: 2,
          },
          {
            id: "dp-r1-ep-d",
            text: "Decline - all restructuring decisions must be made on consistent business criteria",
            score: 1,
            bias: "overconfidence",
          },
        ],
      },
    },

    // --- Round 2: The restructuring options surface ---------------------------
    {
      id: "dp-r2",
      number: 2,
      title: "Round 2 - Three Paths",
      situation:
        "The strategic review returns three options: full trade sale (SGD 38-45m), partial sale to a strategic partner (retain 30%), or internal restructure targeting aerospace and medical device niches. The board is divided.",
      context:
        "The trade sale would return capital immediately and remove the drag on group ROE. The strategic partner option preserves some employment and brand continuity. The internal restructure is high-risk and takes 4 years to validate.\n\nA potential trade buyer - a Malaysian competitor - has tabled a preliminary indicative at SGD 41m. Your family trusts (which own 58% of Sunridge) hold the division as a heritage asset.",
      question:
        "Which restructuring path do you recommend to the board?",
      macroSignal: {
        headline: "SGX actively encouraging conglomerate simplification",
        detail:
          "The SGX CEO has publicly cited 'conglomerate discount' as a priority policy area. Investors are rewarding focused business models with re-rating premiums in the 15-22% range.",
        type: "opportunity",
      },
      stakeholderDocs: [
        {
          id: "dp-r2-d1",
          type: "financial",
          title: "Trade Sale Valuation - Malaysian Buyer LOI",
          summary: "SGD 41m indicative; 45-day exclusivity requested; no employment guarantees",
          content:
            "Buyer: Precision Manufacturing Berhad (PMB), Malaysia. Indicative: SGD 41m (6.5xEBITDA). Structure: 100% cash. Employment: no guarantees beyond statutory minimum. Timeline: 45-day exclusivity, 90-day close. Condition: clean audit for last 3 years. Sunridge book value: SGD 61m - sale would crystallise a SGD 20m book loss.",
          relevanceScore: 94,
        },
        {
          id: "dp-r2-d2",
          type: "financial",
          title: "Strategic Partnership Term Sheet - Yokohama Precision",
          summary: "Japanese partner proposes 70/30 JV; retains brand; commits to 5-year employment",
          content:
            "Yokohama Precision Industries proposes a joint venture: Sunridge retains 30%, Yokohama acquires 70% for SGD 29m. Five-year employment commitment for all staff. Yokohama brings aerospace quality certifications (AS9100) enabling the niche pivot. Capital return to Sunridge: SGD 29m upfront + JV dividends.",
          relevanceScore: 88,
        },
        {
          id: "dp-r2-d3",
          type: "legal",
          title: "Family Trust Instrument - Heritage Asset Clause",
          summary: "Precision parts division is designated a Heritage Asset under the trust",
          content:
            "The Sunridge Family Trust (1994) designates the precision-parts manufacturing business as a 'heritage asset' subject to trustee consent for any disposal of >50% ownership. Trustees: the CEO, the non-executive director (mother), and an independent trustee. Two trustee votes required for any qualifying disposal.",
          relevanceScore: 91,
        },
        {
          id: "dp-r2-d4",
          type: "press",
          title: "FT: Japanese Precision Manufacturers Expand ASEAN Footprint",
          summary: "Yokohama and three peers actively acquiring Singapore manufacturing capacity",
          content:
            "The Financial Times reports accelerating M&A activity by Japanese precision manufacturers seeking Singapore-based platforms for ASEAN export. Quality reputation, regulatory access, and proximity to aerospace OEM supply chains cited. Yokohama is specifically named as targeting three Singapore acquisitions.",
          relevanceScore: 77,
        },
      ],
      options: [
        {
          id: "dp-r2-a",
          title: "Recommend the Yokohama JV",
          description:
            "Present the 70/30 JV as the optimal path: capital return, employment commitment, and a credible niche pivot.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 4,
            decisiveness: 4,
            adaptability: 4,
          },
          consequence:
            "The board approves. Trust consent is obtained with your mother's support. Yokohama begins integration planning. Staff are retained.",
        },
        {
          id: "dp-r2-b",
          title: "Recommend the trade sale to PMB",
          description:
            "Prioritise maximum capital return. Use proceeds to fund higher-ROE opportunities in the group.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 2,
            stakeholderManagement: 2,
            decisiveness: 4,
            adaptability: 3,
          },
          consequence:
            "The book loss triggers a negative press cycle. The union launches a public campaign. Three board members abstain on the vote - the resolution passes narrowly.",
        },
        {
          id: "dp-r2-c",
          title: "Recommend the internal restructure",
          description:
            "Retain full ownership. Invest SGD 20m in aerospace and medical device pivots. Build toward profitability over 4 years.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 3,
            stakeholderManagement: 3,
            decisiveness: 2,
            adaptability: 2,
          },
          bias: "loss_aversion",
          consequence:
            "The board is split. One analyst downgrades Sunridge stock 8% on the announcement. The restructure begins, but capital is constrained.",
        },
        {
          id: "dp-r2-d",
          title: "Request a further 90-day study before deciding",
          description:
            "The three options need further refinement. Delay the board decision.",
          vroomStyle: "AII",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 2,
            stakeholderManagement: 2,
            decisiveness: 1,
            adaptability: 1,
          },
          bias: "status_quo",
          consequence:
            "The Malaysian buyer withdraws their indicative. The credit downgrade worsens. The board loses confidence in your decisiveness.",
        },
      ],
      ethicalPrompt: {
        id: "dp-r2-ep",
        question:
          "The division's General Manager, Tan Ah Kow - 22 years of service - tells you the workforce is frightened. He asks you to publicly commit to no compulsory redundancies before any decision is made. Do you do it?",
        context:
          "A public commitment would calm the workforce and maintain productivity during the review. But it may constrain the trade sale option - and could be seen as misleading the market if a redundancy-triggering deal proceeds.",
        options: [
          {
            id: "dp-r2-ep-a",
            text: "Decline a public commitment - but increase internal communication and transparency about the process",
            score: 4,
          },
          {
            id: "dp-r2-ep-b",
            text: "Make a conditional commitment - 'our preferred outcome is retention' - with clear qualifications",
            score: 3,
          },
          {
            id: "dp-r2-ep-c",
            text: "Make the commitment - workforce stability is critical during review",
            score: 1,
            bias: "overconfidence",
          },
          {
            id: "dp-r2-ep-d",
            text: "Refer him to HR - workforce communication is not the CEO's direct responsibility",
            score: 0,
          },
        ],
      },
    },

    // --- Round 3: The family pushes back -------------------------------------
    {
      id: "dp-r3",
      number: 3,
      title: "Round 3 - The Patriarch's Shadow",
      situation:
        "Whichever path was chosen, your uncle - the former group COO and a significant minority shareholder - has called an emergency meeting. He is opposed to any change to the division's ownership structure. 'Our father built this. You cannot sell what he created.'",
      context:
        "Your uncle owns 14% of Sunridge directly and controls another 8% through a family entity. He has called on the board to pause any restructuring and has briefed two financial journalists. The story is running tonight.\n\nThe board meeting is tomorrow. You must decide how to handle this before then.",
      question:
        "How do you manage your uncle's opposition before tomorrow's board meeting?",
      stakeholderDocs: [
        {
          id: "dp-r3-d1",
          type: "press",
          title: "Bloomberg: Sunridge Family Rift Delays Strategic Review",
          summary: "Article quotes unnamed 'senior family member' opposing restructuring",
          content:
            "Bloomberg, 18:42 today: 'Sunridge Industrial Group's strategic review of its heritage precision-parts division has reportedly stalled amid internal family disagreement, according to a person with knowledge of the matter. The third-generation CEO faces pushback from a senior family shareholder opposed to any ownership change.' The article does not name sources. Analyst reactions are mixed - two have flagged governance risk.",
          relevanceScore: 93,
        },
        {
          id: "dp-r3-d2",
          type: "legal",
          title: "Shareholders' Agreement - Minority Protection Clauses",
          summary: "Uncle's 22% combined stake gives drag-along but not veto on restructuring",
          content:
            "The Sunridge Shareholders' Agreement grants minority shareholders (>15% combined) the right to call for an independent fairness opinion on any transaction >SGD 30m. Your uncle's combined 22% qualifies. He does not have veto rights - but he can demand a fairness opinion and a 45-day delay. A two-thirds board vote can override the delay request.",
          relevanceScore: 88,
        },
        {
          id: "dp-r3-d3",
          type: "employment",
          title: "Family Governance Charter - Dispute Resolution",
          summary: "Family Council mediation required before escalation to board",
          content:
            "The Sunridge Family Governance Charter (2018) stipulates that disputes between family shareholders must be referred to the Family Council before formal escalation to the Board of Directors. The Family Council consists of all adult family shareholders. A mediation convener may be appointed.",
          relevanceScore: 82,
        },
        {
          id: "dp-r3-d4",
          type: "financial",
          title: "Analyst Note - Governance Premium at Risk",
          summary: "Two analysts flag governance uncertainty; one downgrades to Hold",
          content:
            "Morgan Stanley downgrade note: 'The emergence of public family disagreement at Sunridge introduces governance uncertainty inconsistent with our prior Overweight thesis. We move to Hold pending clarity on succession stability and strategic direction.' UBS maintains Buy but flags 'execution risk premium.' Share price down 6.3% in after-hours trading.",
          relevanceScore: 95,
        },
      ],
      options: [
        {
          id: "dp-r3-a",
          title: "Call a Family Council session tonight - mediate before the board meets",
          description:
            "Invoke the Family Governance Charter. Convene family members tonight to resolve the dispute through the proper channel before it becomes a formal board crisis.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 4,
            decisiveness: 4,
            adaptability: 4,
          },
          consequence:
            "The Family Council session is tense but productive. Your uncle does not reverse his opposition, but he agrees to hold a joint statement and allow the board vote to proceed. The analyst downgrade stabilises.",
        },
        {
          id: "dp-r3-b",
          title: "Call your uncle directly - appeal to his business judgment",
          description:
            "Speak with him one-to-one tonight. Acknowledge his grief about the heritage. Present the financial data and ask him to consider the firm's future rather than its past.",
          vroomStyle: "CI",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 3,
            stakeholderManagement: 4,
            decisiveness: 3,
            adaptability: 3,
          },
          consequence:
            "Your uncle is moved by the conversation but not convinced. He agrees not to speak to press again. The board vote proceeds under uncertainty.",
        },
        {
          id: "dp-r3-c",
          title: "Issue a board statement tonight reaffirming the review process",
          description:
            "Respond to the press with a clear statement: the review is ongoing, the process is sound, and a decision will be made at tomorrow's board meeting.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 2,
            ethicalReasoning: 3,
            stakeholderManagement: 2,
            decisiveness: 3,
            adaptability: 2,
          },
          consequence:
            "The statement stabilises sentiment temporarily. But the uncle issue is unresolved. He votes against the resolution. It still passes - but the family rift becomes public.",
        },
        {
          id: "dp-r3-d",
          title: "Postpone the board decision by two weeks - allow family mediation",
          description:
            "Delay the board vote. Appoint an independent mediator under the Family Governance Charter to work with your uncle over the next two weeks.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 2,
            stakeholderManagement: 2,
            decisiveness: 1,
            adaptability: 2,
          },
          bias: "loss_aversion",
          consequence:
            "A second analyst downgrade follows the delay. The Yokohama term sheet expires. The Malaysian buyer re-tables at SGD 36m - SGD 5m lower.",
        },
      ],
      twist:
        "Your uncle privately reveals to you after the board meeting that he only went public because he felt excluded from the process. He says: 'You never asked me what I thought. I would have supported Yokohama.' The governance failure was not in the decision - it was in the stakeholder process that preceded it.",
    },
  ],
};
