import { Peer, User } from '../types';

// Mock peer profiles for the networking screen
export const MOCK_PEERS: Peer[] = [
  {
    id: 'peer_001',
    name: 'Aisha Okonkwo',
    role: 'Product Strategy',
    university: 'LSE',
    bio: 'Passionate about scaling B2B products in emerging markets. Previously interned at McKinsey.',
    interests: ['SaaS', 'Emerging Markets', 'Product-Led Growth'],
    skills: {
      strategy: 82,
      leadership: 74,
      communication: 88,
      criticalThinking: 79,
    },
    connected: false,
  },
  {
    id: 'peer_002',
    name: 'Marcus Chen',
    role: 'Technical Founder',
    university: 'Imperial College',
    bio: 'Building at the intersection of AI and enterprise software. YC W24 alumni.',
    interests: ['AI/ML', 'Enterprise Software', 'Fundraising'],
    skills: {
      strategy: 76,
      leadership: 68,
      communication: 71,
      criticalThinking: 90,
    },
    connected: false,
  },
  {
    id: 'peer_003',
    name: 'Priya Sharma',
    role: 'Operations & Growth',
    university: 'Oxford',
    bio: 'Systems thinker focused on operational excellence. Former consultant, now building.',
    interests: ['Operations', 'Growth Hacking', 'Climate Tech'],
    skills: {
      strategy: 85,
      leadership: 80,
      communication: 76,
      criticalThinking: 83,
    },
    connected: true,
  },
  {
    id: 'peer_004',
    name: 'Tom Elliot',
    role: 'Commercial Lead',
    university: 'UCL',
    bio: 'Sales-native founder. Closed £2M ARR before 25. Obsessed with go-to-market strategy.',
    interests: ['GTM Strategy', 'B2B Sales', 'FinTech'],
    skills: {
      strategy: 70,
      leadership: 77,
      communication: 92,
      criticalThinking: 68,
    },
    connected: false,
  },
  {
    id: 'peer_005',
    name: 'Sofia Larsen',
    role: 'Design & UX',
    university: 'RCA',
    bio: 'Design founder exploring how craft and systems thinking drive business outcomes.',
    interests: ['Design Systems', 'HealthTech', 'User Research'],
    skills: {
      strategy: 72,
      leadership: 65,
      communication: 85,
      criticalThinking: 77,
    },
    connected: false,
  },
];

// Default user state before onboarding
export const DEFAULT_USER: User = {
  name: '',
  role: 'Aspiring Founder',
  university: '',
  interests: [],
  goals: [],
  selectedSkills: [],
  skills: {
    strategy: 0,
    leadership: 0,
    communication: 0,
    criticalThinking: 0,
  },
  completedSimulations: [],
  isOnboarded: false,
};

// Selectable interests for onboarding
export const INTEREST_OPTIONS = [
  'Startups & Venture',
  'Product Strategy',
  'Operations',
  'Marketing & Growth',
  'Finance & Investing',
  'Technology & AI',
  'Sustainability',
  'Social Impact',
  'Consulting',
  'Healthcare',
];

// Selectable goals for onboarding
export const GOAL_OPTIONS = [
  'Start my own company',
  'Join an early-stage startup',
  'Develop leadership skills',
  'Build a strong professional network',
  'Transition into a new industry',
  'Sharpen strategic thinking',
];

// Skills users can select to focus on
export const SKILL_OPTIONS = [
  { key: 'strategy', label: 'Strategic Thinking', description: 'Seeing the bigger picture and long-term trade-offs' },
  { key: 'leadership', label: 'Leadership', description: 'Inspiring teams and making decisions under pressure' },
  { key: 'communication', label: 'Communication', description: 'Influencing stakeholders and articulating ideas clearly' },
  { key: 'criticalThinking', label: 'Critical Thinking', description: 'Analysing problems with rigour and intellectual honesty' },
];
