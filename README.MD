# 🎓 Employability Engine

An AI-powered platform that helps students discover, explore, and build skills in career domains aligned with their aptitude, personality, and interests — while simultaneously developing AI fluency.

---

## 📌 Overview

**Employability Engine** bridges the gap between a student's potential and their professional future. Using behavioral analysis and domain-specific AI tools, students receive a personalized career direction report and hands-on learning experiences embedded with AI assistants — preparing them for both the domain and the AI-native workplace.

---

## 🏗️ Architecture

```
Student enters the platform
        │
        ▼
Behavioral Analysis Engine
(Aptitude + Personality + Interest Mapping → Career Archetypes Report)
        │
        ▼
Personalized Career Direction Report
(e.g., Costume Designer · Programmer · UX Designer)
        │
        ▼
Domain Tool Selection
┌───────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ Costume Design│ Programming  │ Architecture │  Business    │   + More     │
│ AI Styling    │ AI Code      │ AI Design    │ AI Strategy  │ Expandable   │
│ Agent         │ Tutor        │ Tool         │ Tool         │ Services     │
└───────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
        │
        ▼
Inside each tool — AI embedded throughout
┌─────────────────────────────────────────────────────────────────┐
│            Costume Design Tool (Example Domain)                 │
│  ┌──────────────┐ ┌───────────────┐ ┌─────────────┐ ┌────────┐  │
│  │ AI Mood Board│ │ AI Fabric     │ │ AI Portfolio│ │Industry│  │
│  │ Generate     │ │ Advisor       │ │ Bot         │ │ Mentor │  │
│  │ ideas from   │ │ Suggest       │ │ Critique &  │ │Live AI │  │
│  │ text prompts │ │ materials by  │ │ grade       │ │chat on │  │
│  │              │ │ season/budget │ │ readiness   │ │ roles  │  │
│  └──────────────┘ └───────────────┘ └─────────────┘ └────────┘  │
│  Student learns the domain AND learns to work with AI tools     │
└─────────────────────────────────────────────────────────────────┘
        │
        ├────────────────────────────────────────────────┬
        ▼                                                ▼
  Student Gets                                      College Gets
  AI Exposure                         Employability Data · Placement Tracking
```

---

## 🔑 Key Features

### 1. Behavioral Analysis Engine
- Combines aptitude tests, personality assessments, and interest mapping
- Generates a **Career Archetypes Report** unique to each student
- Maps students to career domains they are most suited for

### 2. Personalized Career Direction Report
- Provides 2–3 tailored career suggestions (e.g., Costume Designer, Programmer, UX Designer)
- Acts as the entry point into the domain-specific learning journey

### 3. Domain-Specific AI Tools
Each career domain has a dedicated AI-powered learning environment:

| Domain | AI Tool | Core Capability |
|---|---|---|
| Costume Design | AI Styling Agent | Mood boards, fabric advice, portfolio review |
| Programming | AI Code Tutor | Code walkthroughs, debugging, project guidance |
| Architecture | AI Design Tool | Design critiques, drafting assistance |
| Business | AI Strategy Tool | Case studies, strategy frameworks |
| + More | Expandable Services | Additional domains added over time |

### 4. AI Embedding Throughout Each Tool
Every domain tool includes:
- **AI Mood Board / Idea Generator** — Generate creative concepts from text prompts
- **AI Domain Advisor** — Context-aware suggestions (e.g., materials by season/budget)
- **AI Portfolio Bot** — Critique student work and assess readiness
- **Industry Mentor** — Live AI chat simulating real-world professional conversations

### 5. Dual-Outcome Learning
> *"Student learns the domain AND learns to work with AI tools — both skills in one session"*

---

## 📦 Outputs

### For Students
- **AI Fluency** — Demonstrated ability to work with AI tools in professional contexts

### For Colleges / Institutions
- **Employability Data** — Aggregated metrics on student readiness
- **Placement Tracking** — Monitor outcomes and career alignment over time

---

## 🧩 System Components

```
/platform
├── /onboarding           # Interest surveys, aptitude tests, personality assessments
├── /analysis-engine      # Behavioral scoring and archetype mapping logic
├── /career-report        # Report generation and career recommendation service
├── /domain-tools
│   ├── /costume-design   # AI Styling Agent, Mood Board, Fabric Advisor, Portfolio Bot
│   ├── /programming      # AI Code Tutor, project tracker
│   ├── /architecture     # AI Design Tool
│   ├── /business         # AI Strategy Tool
│   └── /[expandable]     # Plugin architecture for new domains
├── /ai-mentor            # Shared Industry Mentor AI chat service
├── /portfolio-engine     # Student portfolio builder and grading
├── /certifications       # Milestone tracking and credential issuance
└── /analytics            # College-facing dashboard (employability + placement data)
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18 / Python >= 3.10 React.js
- API access to an LLM provider (e.g., Anthropic Claude, OpenAI)
- Database (PostgreSQL recommended)

### Installation

```bash
git clone https://github.com/your-org/ai-career-compass.git
cd ai-career-compass
npm install        # or pip install -r requirements.txt
cp .env.example .env
# Fill in your API keys and DB credentials in .env
npm run dev
```

### Environment Variables

```env
LLM_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@localhost:5432/career_compass
DOMAIN_TOOLS_ENABLED=costume_design,programming,architecture,business
PORT=3000
```

---

## 🛣️ Roadmap

- [ ] Launch with 4 core domain tools (Costume Design, Programming, Architecture, Business)
- [ ] Build behavioral analysis engine with validated psychometric models
- [ ] Implement AI Portfolio Bot with rubric-based grading
- [ ] College dashboard with real-time placement analytics
- [ ] Expand to 10+ domain tools
- [ ] Mobile app for on-the-go learning sessions
- [ ] Peer collaboration features within domain tools

---

## 👤 Author

Built by team 6
