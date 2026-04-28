import type { Peer, RoleId, SkillId } from "@/lib/types";

export const focusSkills: { id: SkillId; label: string }[] = [
  { id: "strategicJudgment", label: "Strategic Judgment" },
  { id: "ethicalReasoning", label: "Ethical Reasoning" },
  { id: "stakeholderManagement", label: "Stakeholder Management" },
  { id: "decisiveness", label: "Decisiveness" },
  { id: "adaptability", label: "Adaptability" },
  { id: "negotiation", label: "Negotiation" },
  { id: "finance", label: "Financial Literacy" },
];

export const roles: { id: RoleId; label: string }[] = [
  { id: "founder", label: "Founder / NextGen heir" },
  { id: "pm", label: "Product Manager" },
  { id: "consultant", label: "Consultant" },
  { id: "finance", label: "Finance" },
  { id: "other", label: "Other" },
];

// ─── Singapore-adjacent peer profiles ────────────────────────────────────────

export const peers: Peer[] = [
  {
    id: "peer-1",
    name: "Wei Ling Tan",
    role: "Strategy Associate",
    university: "NUS Business School",
    bio: "Third-generation heir to a Singapore logistics group. Focused on governance modernisation and cross-border M&A in Southeast Asia.",
    skills: ["strategicJudgment", "stakeholderManagement", "ethicalReasoning"],
    compatibility: 94,
  },
  {
    id: "peer-2",
    name: "Arjun Mehta",
    role: "Venture Analyst",
    university: "INSEAD Asia",
    bio: "Family office background across India and Singapore. Deep interest in next-gen leadership frameworks and institutional governance.",
    skills: ["adaptability", "strategicJudgment", "decisiveness"],
    compatibility: 90,
  },
  {
    id: "peer-3",
    name: "Clarissa Lim",
    role: "Corporate Development",
    university: "SMU School of Business",
    bio: "Works on strategic partnerships for a Singapore-listed conglomerate. Experienced in stakeholder alignment across family and institutional shareholders.",
    skills: ["stakeholderManagement", "ethicalReasoning", "adaptability"],
    compatibility: 86,
  },
  {
    id: "peer-4",
    name: "Marcus Ong",
    role: "Investment Analyst",
    university: "NTU Nanyang Business School",
    bio: "Covers ASEAN family conglomerates for a regional private equity firm. Research focus on succession risk and governance premium.",
    skills: ["finance" as SkillId, "strategicJudgment", "decisiveness"],
    compatibility: 82,
  },
];

// ─── Demo user ────────────────────────────────────────────────────────────────

export const demoUser = {
  name: "Daniel",
  university: "UCL",
  role: "founder" as const,
  focusSkills: [
    "strategicJudgment",
    "ethicalReasoning",
    "adaptability",
  ] as SkillId[],
};
