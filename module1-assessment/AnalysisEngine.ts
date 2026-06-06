export interface AssessmentAnswers {
  interests: number[];
  skills: number[];
  workStyle: string;
}

export interface ArchetypeDetails {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  strengths: string[];
  growthRoadmap: string[];
  careers: { title: string; salary: string; outlook: string }[];
}

export interface DomainMatch {
  name: string;
  score: number;
  description: string;
}

export interface AnalysisResult {
  archetype: ArchetypeDetails;
  domainMatches: DomainMatch[];
  skillsBreakdown: { name: string; value: number }[];
}

const ARCHETYPES: Record<string, ArchetypeDetails> = {
  logic_craftsman: {
    title: "The Logic Craftsman",
    subtitle: "AI Developer & Software Architect",
    tagline: "Building digital realities from lines of logical instruction.",
    description: "You excel at solving highly complex puzzles, debugging structures, and creating modular systems. You possess a strong mental model for syntax, algorithm flow, and system state transitions.",
    strengths: ["Algorithmic Thinking", "System Modularity", "Root-Cause Debugging", "Technical Scalability"],
    growthRoadmap: [
      "Master Core JavaScript/TypeScript & Data Structures",
      "Participate in Collaborative Open Source & Version Control Workflows",
      "Deploy Automated Testing & Continuous Integration pipelines",
      "Design & Scale Cloud-Native Distributed Microservices"
    ],
    careers: [
      { title: "AI Integration Engineer", salary: "$124,000", outlook: "Very Strong (+28%)" },
      { title: "Full-Stack Web Developer", salary: "$110,000", outlook: "Strong (+21%)" },
      { title: "Systems Debugger", salary: "$118,000", outlook: "Stable (+12%)" }
    ]
  },
  visual_harmonizer: {
    title: "The Visual Harmonizer",
    subtitle: "Architect & Spatial Designer",
    tagline: "Bridging the gap between physics, aesthetics, and user experience.",
    description: "You have an innate understanding of space, geometry, structural stability, and visual balance. You like designing systems that are not only highly functional but also visually stunning.",
    strengths: ["Geometric Intuition", "Aesthetic Cohesion", "Materials & Constraints Mapping", "Human-Centric Planning"],
    growthRoadmap: [
      "Learn Architectural Drafting & Spatial Composition principles",
      "Explore 3D Modeling tools and Material Load-Bearing properties",
      "Study Sustainable and Responsive Design standards",
      "Create high-fidelity portfolios showcasing spatial and digital blueprints"
    ],
    careers: [
      { title: "Architectural Designer", salary: "$88,000", outlook: "Stable (+9%)" },
      { title: "UI/UX Product Architect", salary: "$115,000", outlook: "Strong (+18%)" },
      { title: "Environmental Planner", salary: "$94,000", outlook: "Strong (+14%)" }
    ]
  },
  strategic_executor: {
    title: "The Strategic Executor",
    subtitle: "Business Strategist & Product Entrepreneur",
    tagline: "Translating human needs and numbers into viable market products.",
    description: "You think in terms of resources, marketing fit, financial modeling, and growth hacking. You see opportunities, orchestrate teams, and optimize processes to bring solutions to the market.",
    strengths: ["Resource Allocation", "Market-Fit Diagnostics", "Risk Mitigation", "Persuasive Presentation"],
    growthRoadmap: [
      "Develop Unit Economic projections & Cash Flow spreadsheets",
      "Study Customer Acquisition Funnels & Value Propositions",
      "Conduct simulated Market stress testing & Product pricing iterations",
      "Pitch structural business proposals to simulated Venture Capital boards"
    ],
    careers: [
      { title: "Product Strategy Manager", salary: "$128,000", outlook: "Strong (+20%)" },
      { title: "Operations Consultant", salary: "$98,000", outlook: "Stable (+11%)" },
      { title: "Venture Builder", salary: "$105,000 + Equity", outlook: "Exponential" }
    ]
  }
};

export function runAnalysisEngine(answers: AssessmentAnswers): AnalysisResult {
  const logicScore = (answers.interests[0] * 0.4) + (answers.skills[4] * 0.3) + (answers.interests[4] * 0.3);
  const visualScore = (answers.interests[1] * 0.5) + (answers.skills[1] * 0.3) + (answers.skills[0] * 0.2);
  const businessScore = (answers.interests[3] * 0.4) + (answers.skills[2] * 0.4) + (answers.interests[2] * 0.2);

  let chosenArchetypeKey = "logic_craftsman";
  if (visualScore > logicScore && visualScore > businessScore) {
    chosenArchetypeKey = "visual_harmonizer";
  } else if (businessScore > logicScore && businessScore > visualScore) {
    chosenArchetypeKey = "strategic_executor";
  }

  const archetype = ARCHETYPES[chosenArchetypeKey];

  const domainMatches: DomainMatch[] = [
    {
      name: "Software Engineering & Code Evaluation",
      score: Math.min(100, Math.round(logicScore * 10)),
      description: "Writing scripts, building user interfaces, compiling projects, and receiving automated reviews from AI compilers."
    },
    {
      name: "Aesthetic Design & Architecture",
      score: Math.min(100, Math.round(visualScore * 10)),
      description: "Blueprinting, spatial composition, geometric layouts, and testing load structural properties."
    },
    {
      name: "Venture Strategy & Finance",
      score: Math.min(100, Math.round(businessScore * 10)),
      description: "Managing budgets, pricing simulations, product-market validation, and pitches."
    }
  ];

  domainMatches.sort((a, b) => b.score - a.score);

  const skillsBreakdown = [
    { name: "Logic & Math", value: Math.round(((answers.skills[0] + answers.interests[4]) / 2) * 10) },
    { name: "Creative Artistry", value: Math.round(((answers.skills[1] + answers.interests[1]) / 2) * 10) },
    { name: "Business Literacy", value: Math.round(((answers.skills[2] + answers.interests[3]) / 2) * 10) },
    { name: "Syntax Mastery", value: Math.round(((answers.skills[4] + answers.interests[0]) / 2) * 10) }
  ];

  return {
    archetype,
    domainMatches,
    skillsBreakdown
  };
}
