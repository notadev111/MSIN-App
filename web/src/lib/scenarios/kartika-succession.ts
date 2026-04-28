import type { ScenarioDefinition } from "@/lib/types";

// -----------------------------------------------------------------------------
// KARTIKA GROUP - THE SUCCESSION CRISIS
// 3-round MVP scenario (Rounds 1, 2, 5 from full scenario)
// Frameworks: Vroom-Yetton, Upper Echelons Theory, OODA Loop,
//             Rest's Ethical Model, Behavioral Economics (biases)
// -----------------------------------------------------------------------------

export const kartikaSucesssion: ScenarioDefinition = {
  id: "kartika-succession",
  title: "The Succession Crisis",
  subtitle: "Family, Power, and the Next Generation",
  duration: "~5 min",
  company: "Kartika Group",
  companyContext:
    "Kartika Group is incorporated in Singapore and listed on the SGX, with primary operations across Indonesia, Malaysia, and the Philippines. Founded in 1967 by Pak Djoko Hartono (73), the group operates across four divisions: Kartika Shipping (marine logistics, 3,200 staff), Kartika Agri (palm oil, 2,400 staff), Kartika Properti (commercial real estate), and Kartika Digital (B2B fintech, est. 2019). Combined revenue: IDR 18.2 trillion. Your role: board advisor and second-generation family member.",
  frameworks: [
    "Vroom-Yetton Decision Model",
    "Upper Echelons Theory (UET)",
    "OODA Loop",
    "Rest's Four-Stage Ethical Model",
    "Behavioral Economics",
  ],
  tags: [
    "strategicJudgment",
    "ethicalReasoning",
    "stakeholderManagement",
    "decisiveness",
    "adaptability",
  ],

  rounds: [
    // -- ROUND 1: THE ANNOUNCEMENT -----------------------------------------
    {
      id: "r1",
      number: 1,
      title: "The Announcement",
      situation:
        "Pak Djoko has called a private family meeting. He wants to name his successor before the next board session. Three candidates are in play. The board, lenders, and press are watching.",
      context:
        "The three candidates:\n\n- Budi Hartono (48, eldest son) - VP of Shipping, charismatic and well-liked by workers, but the division has underperformed for two years. Heavy personal spending is an open secret.\n\n- Elena Hartono (41, daughter) - Harvard MBA, led the launch of Kartika Digital. Analytically sharp, underestimated by older board members.\n\n- Rizal Santoso (54, non-family) - Former McKinsey partner, 20 years as COO at Sinarmas Group. Trusted by institutional investors. Speaks to the regional political establishment with credibility.\n\nThe succession choice will define the group's next decade.",
      question:
        "Pak Djoko asks each family member present to recommend a process for selecting his successor. How do you respond?",

      stakeholderDocs: [
        {
          id: "r1-d1",
          type: "financial",
          title: "Kartika Shipping - Q3 Performance",
          summary: "Shipping division revenue down 18% YoY. Margin compressed.",
          content:
            "Q3 revenue: IDR 1.2 trillion (vs. IDR 1.46T prior year). EBITDA margin: 8.2% (sector avg: 14.1%). Budi Hartono has been VP since 2019. Analysts attribute underperformance to delayed fleet investment and three lost contracts to Chinese operators. No restructuring plan has been presented to the board.",
          relevanceScore: 88,
        },
        {
          id: "r1-d2",
          type: "legal",
          title: "Corporate Charter - Succession Provisions",
          summary: "Charter requires board supermajority for CEO appointment.",
          content:
            "Article 14.3: The appointment of Group CEO requires the affirmative vote of at least 7 of 9 Board of Commissioners members. Founding family shares carry 2x voting weight in succession decisions only. External directors (4 of 9) have increasingly aligned with institutional investor preferences since the 2022 governance overhaul.",
          relevanceScore: 94,
        },
        {
          id: "r1-d3",
          type: "employment",
          title: "Internal Leadership Survey - September 2025",
          summary: "Staff split: Budi leads on personality; Elena on competence.",
          content:
            "1,200 respondents across all divisions. Q: 'Who do you most trust to lead Kartika Group through its next phase?' Elena Hartono: 44%. Rizal Santoso: 31%. Budi Hartono: 17%. Other / No preference: 8%. Note: Kartika Shipping staff skew toward Budi (61%). Kartika Digital staff overwhelmingly prefer Elena (79%).",
          relevanceScore: 72,
        },
        {
          id: "r1-d4",
          type: "press",
          title: "The Edge (Singapore) - 'Next-Gen Conglomerates'",
          summary: "Elena Hartono profiled as a regional digital transformation leader.",
          content:
            "Published last week. Highlights Elena's role building Kartika Digital from zero to IDR 420 billion in fintech transaction volume. Quotes two external investors who describe her as 'exactly what ASEAN family firms need.' The article contrasts this with unnamed peers who 'hand succession to first-born sons without evaluation.' Regional business press has reprinted widely.",
          relevanceScore: 65,
        },
      ],

      options: [
        {
          id: "r1-a",
          title: "Formally nominate Budi as first-born heir",
          description:
            "Invoke family tradition. Argue that leadership continuity and cultural legitimacy matter more than external evaluation processes.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 0,
            stakeholderManagement: 1,
            decisiveness: 4,
            adaptability: 1,
          },
          bias: "nepotism",
          consequence:
            "Budi appears relieved. Elena says nothing. External board members exchange glances. The decision is framed as done before it begins.",
        },
        {
          id: "r1-b",
          title: "Request a structured, board-led evaluation process",
          description:
            "Propose that the board's nomination committee assess all three candidates against defined criteria - strategy, governance track record, and stakeholder trust - before any announcement.",
          vroomStyle: "AII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 3,
            stakeholderManagement: 3,
            decisiveness: 2,
            adaptability: 3,
          },
          consequence:
            "Pak Djoko nods slowly. The external directors visibly relax. Budi looks uncertain. Elena takes notes.",
        },
        {
          id: "r1-c",
          title: "Propose a family council decision with advisors present",
          description:
            "Suggest the family meets with two trusted external advisors to deliberate and reach a consensus that reflects both family values and business reality.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 2,
            stakeholderManagement: 4,
            decisiveness: 1,
            adaptability: 2,
          },
          consequence:
            "The room responds warmly. It feels safe. But the external advisors will take weeks to convene - time the group may not have.",
        },
        {
          id: "r1-d",
          title: "Propose an independent governance committee first",
          description:
            "Before naming a CEO, propose restructuring the board to include two additional independent commissioners. Then begin the succession process with that improved governance in place.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 3,
            decisiveness: 1,
            adaptability: 3,
          },
          consequence:
            "Lenders will approve. Institutional investors signal support. The process gains legitimacy - but the timeline extends by months.",
        },
      ],

      ethicalPrompt: {
        id: "r1-ep",
        question: "Budi's private message",
        context:
          "After the family meeting, Budi finds you alone. He tells you he needs the CEO role urgently - he has significant personal debts that could become public if he doesn't control the group's cash position within six months. He asks you to support his nomination and says nothing more needs to be said.",
        options: [
          {
            id: "r1-ep-a",
            text: "Say nothing. It's a family matter and not your call.",
            score: 0,
            bias: "moral_licensing",
          },
          {
            id: "r1-ep-b",
            text: "Tell Budi you will not support a nomination driven by personal financial need, and disclose what he told you to Pak Djoko.",
            score: 4,
          },
          {
            id: "r1-ep-c",
            text: "Tell Budi you understand the pressure and will support him personally, but you cannot let personal finances influence the succession decision.",
            score: 3,
          },
          {
            id: "r1-ep-d",
            text: "Promise Budi your support for now and reassess once you know more.",
            score: 1,
            bias: "authority_bias",
          },
        ],
      },
    },

    // -- ROUND 2: THE FRAUD ALLEGATION ------------------------------------
    {
      id: "r2",
      number: 2,
      title: "The Fraud Allegation",
      situation:
        "Arif Santoso - Budi's cousin and CFO of Kartika Shipping - has been named in a fraud investigation. The KPK (Corruption Eradication Commission) has opened a preliminary inquiry into contract kickbacks worth IDR 87 billion. Singapore's Fitch has placed the group on ratings watch.",
      context:
        "The alleged scheme: Arif awarded inflated maintenance contracts to a company owned by a former colleague, receiving kickbacks through an offshore account. Three senior staff in the Shipping division have submitted resignation letters. The story is already in the hands of journalists - your PR team believes publication is 24-48 hours away.\n\nThe investigation is preliminary. No charges have been filed. But inaction has its own risks.",
      question:
        "As a board member and family insider, how do you recommend handling the Arif situation?",

      macroSignal: {
        headline: "Fitch places Kartika Group on 'Negative Watch'",
        detail:
          "Singapore-based Fitch Ratings cites 'governance uncertainty and pending regulatory inquiry' as reasons for the negative watch designation. A downgrade would trigger a covenant review on the IDR 4.2 trillion credit facility.",
        type: "risk",
      },

      stakeholderDocs: [
        {
          id: "r2-d1",
          type: "financial",
          title: "Kartika Shipping - Cost Anomaly Report",
          summary: "Maintenance contracts 34% above market rate since 2022.",
          content:
            "Internal audit identified 14 maintenance contracts awarded to PT Karya Mandiri Sejahtera between 2022-2025. Total value: IDR 312 billion. Market benchmark for equivalent services: IDR 233 billion. Difference: IDR 79 billion. Contract documentation is incomplete for 9 of 14 agreements. The audit report has not been shared with the full board.",
          relevanceScore: 96,
        },
        {
          id: "r2-d2",
          type: "legal",
          title: "KPK Preliminary Inquiry Notice",
          summary: "Formal notice received. 30-day response window opened.",
          content:
            "The KPK has opened Case Ref: KPK-2025/SHP-004. The notice names Arif Santoso as person of interest and requests access to Kartika Shipping's financial records for 2021-2025. Kartika Group has 30 days to acknowledge and provide a cooperation statement. Failure to cooperate could result in escalation to a formal investigation with asset-freezing powers.",
          relevanceScore: 99,
        },
        {
          id: "r2-d3",
          type: "employment",
          title: "Senior Staff Resignations - Kartika Shipping",
          summary: "Three VPs have submitted resignations citing 'governance concerns'.",
          content:
            "VP Operations, VP Commercial, and Head of Finance (Shipping) have all submitted resignations in the past 72 hours. Each cited 'irreconcilable differences with current management approach.' Two have indicated willingness to cooperate with external investigators. HR has not yet shared these letters with the full board.",
          relevanceScore: 81,
        },
        {
          id: "r2-d4",
          type: "press",
          title: "Journalist Information Request",
          summary: "Regional press has sent a formal comment request to Kartika PR.",
          content:
            "A journalist has submitted a formal request for comment on 'allegations of financial irregularities in Kartika Shipping's procurement processes.' The request references documents that appear to be copies of internal audit materials - suggesting a leak. Deadline for response: tomorrow, 5pm. No response will be interpreted as confirmation by the publication.",
          relevanceScore: 77,
        },
      ],

      options: [
        {
          id: "r2-a",
          title: "Handle it internally through family channels",
          description:
            "Keep the matter within the family. Arrange for Arif to step back quietly, settle the contracts privately, and manage the press response through relationship channels.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 0,
            stakeholderManagement: 1,
            decisiveness: 2,
            adaptability: 1,
          },
          bias: "groupthink",
          consequence:
            "The journalists publish anyway. The story now includes 'sources say leadership was aware and chose internal management over transparency.' Fitch moves toward a formal downgrade.",
        },
        {
          id: "r2-b",
          title: "Engage external forensic auditors and fully cooperate with KPK",
          description:
            "Immediately appoint a Big Four forensic team. Issue a public statement that Kartika Group is cooperating fully with the KPK inquiry and has initiated an independent internal review.",
          vroomStyle: "AII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 2,
            decisiveness: 4,
            adaptability: 3,
          },
          consequence:
            "Fitch pauses the downgrade. International investors note the transparency positively. The family is uncomfortable, but the board is united.",
        },
        {
          id: "r2-c",
          title: "Form an independent board sub-committee",
          description:
            "Convene a sub-committee of the two most independent board commissioners plus one external legal expert to oversee the response. Keep the family out of the process directly.",
          vroomStyle: "CI",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 3,
            stakeholderManagement: 4,
            decisiveness: 2,
            adaptability: 3,
          },
          consequence:
            "The sub-committee adds legitimacy. It slows the initial response but builds a defensible process. Institutional investors express cautious approval.",
        },
        {
          id: "r2-d",
          title: "Immediately suspend Arif and appoint an acting CFO",
          description:
            "Move decisively. Suspend Arif from all duties pending investigation and appoint the Head of Group Finance as acting CFO of Shipping. Release a statement within 24 hours.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 3,
            stakeholderManagement: 2,
            decisiveness: 4,
            adaptability: 2,
          },
          consequence:
            "The market reacts positively to the speed. Some family members are angry. Arif threatens a counter-claim. But the signal to institutional investors is clear.",
        },
      ],

      ethicalPrompt: {
        id: "r2-ep",
        question: "The legal advisor's suggestion",
        context:
          "Kartika Group's long-standing family lawyer advises you in confidence that pressing the KPK case aggressively could expose other family members to scrutiny for unrelated transactions. He suggests 'managing the timeline' - cooperating superficially while delaying access to key documents until after the succession is resolved.",
        options: [
          {
            id: "r2-ep-a",
            text: "Agree to the delay strategy. The succession is too important to risk now.",
            score: 0,
            bias: "sunk_cost",
          },
          {
            id: "r2-ep-b",
            text: "Decline and insist on full legal compliance with the KPK notice.",
            score: 4,
          },
          {
            id: "r2-ep-c",
            text: "Request a second legal opinion from an external firm before deciding.",
            score: 2,
          },
          {
            id: "r2-ep-d",
            text: "Refer the question directly to the board's audit committee without acting unilaterally.",
            score: 3,
          },
        ],
      },

      twist:
        "The journalist has more than you expected. A second document leak suggests the contract scheme extended to two other suppliers. The story will be larger than anticipated.",
    },

    // -- ROUND 3: THE BOARD DECISION (originally Round 5) ------------------
    {
      id: "r3",
      number: 3,
      title: "The Board Decision",
      situation:
        "The Board meets in 48 hours. After months of investigation, governance reform, and financial pressure - the succession vote is finally happening. Your assessment and recommendation will be decisive.",
      context:
        "Since Round 1:\n\n- The Arif fraud inquiry has been resolved. He resigned and reached a settlement. The group cooperated with KPK.\n- Fitch has reversed the negative watch following governance improvements.\n- The credit facility has been renewed, contingent on board independence commitments.\n- Budi's related-party transactions are under separate board review. He has not withdrawn.\n- Elena has delivered a 90-day plan for each of the group's four divisions.\n- Rizal Santoso has been interviewed by the nomination committee. He is the board's preferred institutional candidate.\n\nTwo sovereign wealth funds have expressed interest in a 12% strategic stake - conditional on governance credibility.",
      question:
        "What is your final recommendation to the Board of Commissioners?",

      macroSignal: {
        headline: "Two SWFs express strategic interest - contingent on governance outcome",
        detail:
          "GIC (Singapore) and Khazanah (Malaysia) have each submitted non-binding expressions of interest for a combined 12% stake in Kartika Group, valuing the business at IDR 28 trillion. Both letters reference 'leadership credibility and governance structure' as conditions for due diligence proceeding.",
        type: "opportunity",
      },

      stakeholderDocs: [
        {
          id: "r3-d1",
          type: "financial",
          title: "5-Year Performance Projections - Candidate Scenarios",
          summary: "Elena: +34% CAGR (digital-led). Rizal: +24% CAGR (stable). Budi: +8% CAGR.",
          content:
            "BCG scenario modelling (commissioned by nomination committee):\n\nElena Hartono (CEO): Revenue CAGR +34%, driven by Kartika Digital scale and Agri repositioning. Risk: execution dependent; Elena has not run a group of this scale.\n\nRizal Santoso (CEO): Revenue CAGR +24%, driven by operational efficiency and institutional partnerships. Risk: cultural integration with family stakeholders.\n\nBudi Hartono (CEO): Revenue CAGR +8%, driven by Shipping stabilisation. Risk: related-party transaction review ongoing; institutional investor confidence low.",
          relevanceScore: 98,
        },
        {
          id: "r3-d2",
          type: "legal",
          title: "Nomination Committee Brief - Fiduciary Duty",
          summary: "Board members owe duty to all shareholders, not only the founding family.",
          content:
            "External legal counsel brief: 'Members of the Board owe a fiduciary duty to all shareholders. In cases where family interests and commercial interests diverge, the board's primary obligation is to the long-term health of the company. Recommending a candidate on the basis of family tradition rather than commercial fitness may expose individual board members to shareholder challenge.'",
          relevanceScore: 93,
        },
        {
          id: "r3-d3",
          type: "employment",
          title: "Leadership Confidence Survey - October 2025",
          summary: "Elena: 76%. Rizal: 71%. Budi: 34%.",
          content:
            "1,400 respondents across all divisions. Elena Hartono: 76% confidence (up from 44% in September - attributed to her 90-day division plan). Rizal Santoso: 71% confidence (up from 31%). Budi Hartono: 34% confidence (down due to related-party transaction news). Leadership team (C-suite): 88% prefer Elena or Rizal.",
          relevanceScore: 86,
        },
        {
          id: "r3-d4",
          type: "press",
          title: "Bloomberg - 'Indonesia's Next Business Leader?'",
          summary: "Bloomberg profiles Elena as the front-runner for Group CEO.",
          content:
            "Published today. Describes Elena's work building Kartika Digital as 'transformational in a sector that resists transformation.' Sources close to GIC say: 'The SWF interest is contingent on Elena Hartono's appointment, or a governance structure she leads. A traditional succession to Budi would likely cause both funds to withdraw.'",
          relevanceScore: 90,
        },
      ],

      options: [
        {
          id: "r3-a",
          title: "Elena Hartono - structured transition with advisory board",
          description:
            "Recommend Elena as Group CEO with a formal 18-month transition program, an external advisory board of three industry veterans, and quarterly performance reviews. Rizal Santoso joins as an independent commissioner.",
          vroomStyle: "CII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 4,
            stakeholderManagement: 4,
            decisiveness: 3,
            adaptability: 4,
          },
          consequence:
            "The SWF expressions of interest convert to due diligence within two weeks. Credit facility renewal confirmed. Staff confidence rises. Pak Djoko is proud, if quietly conflicted.",
        },
        {
          id: "r3-b",
          title: "Budi Hartono - with governance guardrails",
          description:
            "Recommend Budi as a compromise, conditional on a binding governance agreement: independent board chair, no related-party transactions without board approval, and monthly performance reviews.",
          vroomStyle: "AI",
          scores: {
            strategicJudgment: 1,
            ethicalReasoning: 1,
            stakeholderManagement: 2,
            decisiveness: 2,
            adaptability: 1,
          },
          bias: "sunk_cost",
          consequence:
            "Both SWFs withdraw their expressions of interest within 48 hours. Fitch re-issues a negative watch. Three independent commissioners signal they will abstain. The vote fails to reach supermajority.",
        },
        {
          id: "r3-c",
          title: "Rizal Santoso - professional CEO with family advisory committee",
          description:
            "Recommend Rizal as Group CEO, with a formal Family Advisory Committee (Elena chairs, Pak Djoko advises) that meets quarterly to maintain family values without executive interference.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 4,
            ethicalReasoning: 3,
            stakeholderManagement: 4,
            decisiveness: 3,
            adaptability: 3,
          },
          consequence:
            "Institutional investors and both SWFs respond positively. But Elena - who earned this through execution - is visibly disappointed. Retention risk for Kartika Digital materialises within weeks.",
        },
        {
          id: "r3-d",
          title: "Co-leadership: Elena as CEO, Rizal as Executive Chairman",
          description:
            "Propose a co-leadership structure: Elena leads as Group CEO with full executive authority; Rizal takes a non-executive Executive Chairman role providing institutional credibility without diluting Elena's authority.",
          vroomStyle: "GII",
          scores: {
            strategicJudgment: 3,
            ethicalReasoning: 4,
            stakeholderManagement: 3,
            decisiveness: 2,
            adaptability: 4,
          },
          consequence:
            "The board debates for three hours. Both SWFs signal continued interest. The solution is novel for regional conglomerates - the press covers it as a landmark governance moment.",
        },
      ],

      twist:
        "Just before the vote, Pak Djoko asks to address the board personally. He says: 'I did not build this company for my ego. I built it for the next generation. You have the facts. Make the right decision.' He leaves the room. The vote is yours.",
    },
  ],
};
