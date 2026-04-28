import type { ScenarioDefinition } from "@/lib/types";

// --- Scenario: Team Authority Bypass -----------------------------------------
// Framework mapping:
//   SJT (Situational Judgment Test) -> decisiveness + stakeholderManagement scores
//   OODA Loop -> adaptability + strategicJudgment
//   Vroom-Yetton -> vroomStyle per option
//   Behavioral Economics biases -> sunk_cost, status_quo, authority_bias, groupthink

export const teamAuthority: ScenarioDefinition = {
  id: "team-authority",
  title: "The Authority Bypass",
  subtitle: "When loyalty and chain of command collide",
  duration: "20 min",
  company: "Meridian Capital Partners",
  companyContext:
    "Meridian Capital Partners is a Singapore-headquartered family office managing SGD 2.8bn across private equity, real estate, and venture. The second-generation principal recently assumed operational control from his father, who remains active as Board Chairman.",
  frameworks: [
    "Situational Judgment Test",
    "Vroom-Yetton Model",
    "OODA Loop",
    "Behavioral Economics",
  ],
  tags: ["decisiveness", "stakeholderManagement", "ethicalReasoning"],
  rounds: [
    // --- Round 1: The bypass is discovered -----------------------------------
    {
      id: "ta-r1",
      number: 1,
      title: "Round 1 - The End-Run",
      situation:
        "Your most senior analyst, Raymond Chua, has gone directly to your father - the Board Chairman - to pitch a SGD 40m venture allocation without your knowledge. Your father has responded positively and shared the deck with two board members.",
      context:
        "Raymond is highly capable, has been with the firm for 11 years (pre-dating your tenure), and is widely respected by the senior team. He is also your father's personal recommendation. The venture deal itself may have merit - your initial read is mixed. You learned of this through a board member who assumed you were already involved.\n\nThis is the first time a direct report has bypassed the chain of command since your appointment.",
      question:
        "How do you respond to Raymond's authority bypass?",
      macroSignal: {
        headline: "ASEAN VC funding down 34% YoY",
        detail:
          "Bain & Co reports venture funding across Southeast Asia has declined sharply. Selective deployment is increasingly favoured over broad allocation.",
        type: "risk",
      },
      stakeholderDocs: [
        {
          id: "ta-r1-d1",
          type: "financial",
          title: "Raymond's Venture Memo",
          summary: "SGD 40m allocation into Series B SaaS - 3.1xprojected IRR",
          content:
            "Series B SaaS, fintech adjacency, Singapore-domiciled. Raymond projects 3.1xIRR on a 5-year hold. Comp set analysis is thin - three comparables, all from US market. Southeast Asia comparable data missing entirely. Revenue growth: 180% YoY (unaudited). Due diligence checklist: 40% complete.",
          relevanceScore: 92,
        },
        {
          id: "ta-r1-d2",
          type: "employment",
          title: "Raymond's Personnel File Note",
          summary: "High performer, flagged twice for process non-compliance",
          content:
            "Raymond Chua - 11 years service. Performance: Exceptional (4 consecutive years). Process compliance: Two formal notes - once for client-direct communication without approval (2019), once for submitting a deal to external co-investor without sign-off (2021). Both resolved informally. No disciplinary action taken.",
          relevanceScore: 78,
        },
        {
          id: "ta-r1-d3",
          type: "legal",
          title: "Investment Committee Charter",
          summary: "All allocations >SGD 10m require Principal sign-off before board exposure",
          content:
            "Section 4.2: All proposed allocations exceeding SGD 10,000,000 require written approval from the Managing Principal before any communication to the Board or external parties. Section 4.4: Breach of Section 4.2 constitutes a material process violation and may trigger disciplinary review.",
          relevanceScore: 88,
        },
        {
          id: "ta-r1-d4",
          type: "press",
          title: "Family Office Governance Report - KPMG 2024",
          summary: "Governance lapses most common in succession transitions",
          content:
            "KPMG's 2024 Asia Family Office Survey identifies 'authority ambiguity' as the leading governance failure during first-to-second generation transitions. Recommendations include written mandate clarification, documented escalation protocols, and structured 1:1s between successors and long-tenured staff.",
          relevanceScore: 71,
        },
      ],
      options: [
        {
          id: "ta-r1-a",
          title: "Address Raymond directly and privately",
          description:
            "Meet with Raymond 1:1, acknowledge the deal's potential, but clearly state the process breach. Set expectations without escalating to your father.",
          vroomStyle: "CI",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 4,
            decisiveness: 3,
            adaptability: 3,
          },
          consequence:
            "Raymond is receptive. He acknowledges the process breach. The deal advances through proper channels - you are now engaged.",
        },
        {
          id: "ta-r1-b",
          title: "Initiate a mentorship conversation",
          description:
            "Frame the meeting as a development discussion - explore Raymond's motivations, make clear your interest in the deal, and use it as an opportunity to reinforce process.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 3,
            stakeholderManagement: 4,
            decisiveness: 2,
            adaptability: 4,
          },
          consequence:
            "Raymond feels heard. Process expectations are set, but some ambiguity remains about authority boundaries going forward.",
        },
        {
          id: "ta-r1-c",
          title: "Escalate to your father immediately",
          description:
            "Contact your father to flag the process breach and request that the board discussion be paused pending your review.",
          vroomStyle: "AII",
          scores: {
            strategicJudgment: 2,
            ethicalReasoning: 2,
            stakeholderManagement: 2,
            decisiveness: 3,
            adaptability: 2,
          },
          bias: "authority_bias",
          consequence:
            "Your father is surprised. He hadn't realised you weren't involved. The conversation creates tension between the three of you.",
        },
        {
          id: "ta-r1-d",
          title: "Let it proceed - review the deal on its merits",
          description:
            "Set aside the process issue for now. Engage with the board as if you were always part of the process.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 1,
            stakeholderManagement: 2,
            decisiveness: 1,
            adaptability: 2,
          },
          bias: "status_quo",
          consequence:
            "The process breach is normalised. Raymond and other team members take note: bypassing you has no consequence.",
        },
      ],
      ethicalPrompt: {
        id: "ta-r1-ep",
        question: "Your father calls to discuss Raymond's pitch. Do you tell him about the process breach?",
        context:
          "Your father is enthusiastic about the deal. He may not be aware the bypass was improper under the Investment Committee Charter. Staying silent protects team harmony but may entrench a governance gap.",
        options: [
          {
            id: "ta-r1-ep-a",
            text: "Yes - explain the process clearly without making it personal",
            score: 4,
          },
          {
            id: "ta-r1-ep-b",
            text: "Partially - flag that you are now reviewing it together",
            score: 3,
          },
          {
            id: "ta-r1-ep-c",
            text: "No - handle it internally with Raymond",
            score: 2,
          },
          {
            id: "ta-r1-ep-d",
            text: "No - it would damage Raymond's standing unnecessarily",
            score: 1,
            bias: "groupthink",
          },
        ],
      },
    },

    // --- Round 2: The deal is under scrutiny ---------------------------------
    {
      id: "ta-r2",
      number: 2,
      title: "Round 2 - The Due Diligence Gap",
      situation:
        "You commission a proper due diligence review. The findings are sobering: revenue growth is real but concentrated in a single client (67% of ARR). The founding team has one key departure and the CFO role is vacant.",
      context:
        "Raymond has invested significant personal time in this deal over four months. He believes in it strongly and has built a relationship with the founders. The board members who saw his presentation are expecting an update. Your father has not reversed his enthusiasm.\n\nThe deal can still work - but only with renegotiated terms and a more cautious entry structure.",
      question:
        "How do you handle the due diligence findings?",
      macroSignal: {
        headline: "Single-client concentration: top VC red flag",
        detail:
          "A recent Sequoia SEA portfolio review cited customer concentration above 50% as the leading predictor of Series B down-rounds in the 2023-24 cohort.",
        type: "risk",
      },
      stakeholderDocs: [
        {
          id: "ta-r2-d1",
          type: "financial",
          title: "Due Diligence Report - Meridian Internal",
          summary: "67% ARR from one client; CFO vacant; two model scenarios diverge sharply",
          content:
            "Base case: 1.8xIRR if client retained. Bear case: 0.4xIRR if client churns within 18 months. CFO vacancy creates financial reporting risk. Raymond's 3.1xprojection assumes continued blended growth - incompatible with current concentration profile.",
          relevanceScore: 96,
        },
        {
          id: "ta-r2-d2",
          type: "legal",
          title: "Term Sheet - Current Version",
          summary: "Standard Series B terms; no concentration protection clause",
          content:
            "Current term sheet: SGD 40m for 18% equity. No information rights beyond standard quarterly reporting. No customer concentration ratchet. No CFO milestone clause. Exit: preferred liquidation preference 1x, non-participating.",
          relevanceScore: 84,
        },
        {
          id: "ta-r2-d3",
          type: "employment",
          title: "Raymond's Internal Memo - Deal Defence",
          summary: "Raymond disputes concentration risk; advocates proceeding at current terms",
          content:
            "Raymond argues the anchor client is a Temasek-linked entity unlikely to churn. He believes the CFO vacancy will be filled within 60 days. He recommends proceeding at current terms, with post-close monitoring. He requests a board presentation opportunity.",
          relevanceScore: 77,
        },
        {
          id: "ta-r2-d4",
          type: "press",
          title: "SGX Listing Rules - Interested Party Transaction Guidance",
          summary: "Investments brought by connected persons require independent committee review",
          content:
            "SGX Mainboard Rule 905: Transactions proposed by connected parties (defined as individuals with personal relationships to key management) above certain thresholds may require independent board committee sign-off. Applicable thresholds include NTA impact >5%.",
          relevanceScore: 68,
        },
      ],
      options: [
        {
          id: "ta-r2-a",
          title: "Renegotiate terms - proceed with better structure",
          description:
            "Present the DD findings to Raymond and the board transparently. Propose revised terms: lower entry price, concentration ratchet, CFO milestone clause.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 3,
            decisiveness: 4,
            adaptability: 4,
          },
          consequence:
            "The founders accept revised terms after negotiation. Raymond is disappointed but respects the rigour. The board approves the restructured deal.",
        },
        {
          id: "ta-r2-b",
          title: "Pause the deal - gather more information first",
          description:
            "Delay any board decision pending further diligence on the anchor client relationship and CFO search status.",
          vroomStyle: "AII",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 3,
            stakeholderManagement: 2,
            decisiveness: 2,
            adaptability: 3,
          },
          consequence:
            "The pause creates friction with founders. One competing investor uses the window to strengthen their position.",
        },
        {
          id: "ta-r2-c",
          title: "Proceed at current terms - Raymond knows the founders",
          description:
            "Trust Raymond's relationship intelligence. The Temasek anchor is credible. Move forward at current terms.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 2,
            stakeholderManagement: 3,
            decisiveness: 3,
            adaptability: 1,
          },
          bias: "sunk_cost",
          consequence:
            "The deal closes. Six months later, the anchor client gives 90-day notice to exit their contract.",
        },
        {
          id: "ta-r2-d",
          title: "Kill the deal - the risk profile is unacceptable",
          description:
            "Present findings to the board and recommend passing. Offer Raymond the opportunity to monitor the company for a future round.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 2,
            ethicalReasoning: 3,
            stakeholderManagement: 1,
            decisiveness: 4,
            adaptability: 2,
          },
          consequence:
            "The board accepts your recommendation. Raymond is visibly frustrated. Your father privately expresses concern about your risk appetite.",
        },
      ],
      ethicalPrompt: {
        id: "ta-r2-ep",
        question:
          "Raymond asks you not to disclose the concentration risk to the full board - he believes it will kill the deal unfairly. How do you respond?",
        context:
          "Raymond has invested months of relationship capital. His request is understandable. But the board has a fiduciary duty to make informed decisions.",
        options: [
          {
            id: "ta-r2-ep-a",
            text: "Decline - the board needs full transparency to decide",
            score: 4,
          },
          {
            id: "ta-r2-ep-b",
            text: "Agree to frame it carefully - present risks with mitigants",
            score: 3,
          },
          {
            id: "ta-r2-ep-c",
            text: "Omit concentration data from the main deck - provide in appendix",
            score: 1,
            bias: "authority_bias",
          },
          {
            id: "ta-r2-ep-d",
            text: "Agree not to raise it - trust Raymond's read on the anchor",
            score: 0,
            bias: "groupthink",
          },
        ],
      },
    },

    // --- Round 3: The pattern repeats ----------------------------------------
    {
      id: "ta-r3",
      number: 3,
      title: "Round 3 - The Second Bypass",
      situation:
        "Three months later, a different team member - Priya Nair, your Head of Research - bypasses you to send a strategic memo directly to the board on ASEAN macro positioning. She copied your father. The memo is well-reasoned.",
      context:
        "Priya is newer (3 years) but highly regarded. She believes her memo was time-sensitive ahead of a board meeting. She says she assumed it was acceptable given what Raymond did.\n\nYou now face a systemic governance question. Two incidents suggest the team does not take the chain of command seriously - whether because of ambiguity, precedent from the first incident, or your own perceived softness.",
      question:
        "How do you respond to the pattern emerging in your team?",
      stakeholderDocs: [
        {
          id: "ta-r3-d1",
          type: "employment",
          title: "Priya's Memo - ASEAN Macro Positioning",
          summary: "Well-argued 8-page note on portfolio rebalancing toward defensive assets",
          content:
            "Priya's analysis is of high quality. The core thesis - reduce exposure to rate-sensitive ASEAN real estate while maintaining VC and PE positions - is consistent with current consensus. The timing ahead of board meeting is clearly intentional. She sent it directly to all board members.",
          relevanceScore: 74,
        },
        {
          id: "ta-r3-d2",
          type: "legal",
          title: "Employment Policy - Communication Protocols",
          summary: "Direct board communication requires managing principal approval",
          content:
            "Meridian Capital Employee Handbook, Section 7.3: All communications to Board members from staff below Partner level must be approved by the Managing Principal or their designate prior to distribution. Breach constitutes a Category 2 disciplinary matter.",
          relevanceScore: 85,
        },
        {
          id: "ta-r3-d3",
          type: "financial",
          title: "Meridian Portfolio Review - Q3",
          summary: "Real estate exposure at 38% of AUM - above strategic target of 30%",
          content:
            "Current allocation: Real Estate 38% (target: 30%), Private Equity 32% (target: 35%), Venture 18% (target: 20%), Liquid 12% (target: 15%). Priya's rebalancing recommendation is directionally consistent with strategic targets. The substance is sound.",
          relevanceScore: 81,
        },
        {
          id: "ta-r3-d4",
          type: "press",
          title: "Asia Family Office Governance - Deloitte 2024",
          summary: "Governance clarity directly correlated with talent retention in transition periods",
          content:
            "Deloitte's 2024 study of 140 Asian family offices found that successor-led firms with clearly communicated authority structures retained high-performing staff at 2.3xthe rate of those without. Ambiguity in authority is cited as the primary reason high-performers leave during succession transitions.",
          relevanceScore: 89,
        },
      ],
      options: [
        {
          id: "ta-r3-a",
          title: "Issue a clear team-wide governance protocol",
          description:
            "Hold a full team meeting. Acknowledge the quality of both pieces of work. Set explicit, written protocols for board communication going forward. Apply them consistently.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 4,
            decisiveness: 4,
            adaptability: 4,
          },
          consequence:
            "The team responds positively to the clarity. Raymond and Priya both express support. Your father acknowledges the initiative in the next board meeting.",
        },
        {
          id: "ta-r3-b",
          title: "Address Priya privately - treat incidents individually",
          description:
            "Meet with Priya as you did with Raymond. Handle each case on its own terms to avoid creating a culture of fear.",
          vroomStyle: "CI",
          scores: {
            strategicJudgment: 2,
            ethicalReasoning: 3,
            stakeholderManagement: 3,
            decisiveness: 2,
            adaptability: 2,
          },
          bias: "status_quo",
          consequence:
            "The issue is handled but not resolved systemically. A third incident occurs within six months.",
        },
        {
          id: "ta-r3-c",
          title: "Escalate both cases to the board for a governance review",
          description:
            "Formally request a board governance discussion to address authority structures across the firm.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 3,
            stakeholderManagement: 2,
            decisiveness: 3,
            adaptability: 3,
          },
          consequence:
            "The board engages constructively. The process takes longer than expected. Team uncertainty increases in the interim.",
        },
        {
          id: "ta-r3-d",
          title: "Accept it as the new normal - talent needs autonomy",
          description:
            "Reframe the bypasses as signs of an engaged, proactive team. Adopt a more open-door communication model.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 1,
            stakeholderManagement: 2,
            decisiveness: 1,
            adaptability: 2,
          },
          bias: "sunk_cost",
          consequence:
            "The pattern accelerates. Within a year, the Managing Principal role is perceived as ceremonial by the team.",
        },
      ],
      twist:
        "Your father tells you privately that he finds Priya's macro memo impressive. He suggests considering her for a promotion - specifically, a new 'Senior Advisor to the Board' title. He frames it as a retention play. This would functionally cement the bypass as a career-enhancing move.",
    },
  ],
};
