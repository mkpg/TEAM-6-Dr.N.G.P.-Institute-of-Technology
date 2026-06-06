# Campus Employability Diagnostic Portal 🚀

Welcome to the **Campus Employability Diagnostic Portal**, an interactive, AI-powered platform designed to assess student aptitude, map them to specialized career archetypes and provide domain-specific sandbox environments for hands-on learning and AI mentorship.

Built exclusively for the **Dr. N.G.P. Institute of Technology**.

---

## 🌟 Key Features

### 1. Employability Diagnostic Assessment (Module 1)
A comprehensive 50-question diagnostic test evaluating skills across various domains:
- UI/UX Design
- Web Development
- AI & Machine Learning
- Data Analytics
- Cyber Security

Based on the results, students are mapped to one of five specialized **Career Archetypes** (e.g., The UI/UX Architect, The Full-Stack Developer, etc.) and provided with a tailored growth roadmap.

### 2. Domain-Specific Sandboxes (Modules 2 - 4)
Interactive playgrounds tailored to the student's mapped archetype:
- **Tech Sandbox:** A coding environment with live HTML/CSS/JS preview, automated code evaluation, and algorithmic quizzes.
- **Architecture Sandbox:** An interactive blueprint canvas for structural layout planning and load-bearing visualization.
- **Business Sandbox:** A dynamic finance simulator to model pricing elasticity, CAC/LTV margins, and startup unit economics.

### 3. Context-Aware AI Mentorship
Integrated with the **Google Gemini API**, the platform features specialized AI personas (e.g., Sarah Connor for Tech, David Wright for Architecture, Elena Vance for Business).
- **Prompt Engineering Focus:** The AI agents are instructed to teach students how to effectively use AI within their specific domain, providing hands-on advice on prompt structuring and AI implementation.
- **Live/Mock Toggle:** Supports both live Gemini API responses and a local mock fallback mode for offline/rate-limited scenarios.

### 4. Certifications & Analytics Hub (Module 5)
- **Student Dashboard:** View skill breakdowns, review assessment answers, and generate downloadable/printable certificates of completion with embedded SVG QR codes.
- **Admin Gateway:** A centralized view for instructors to monitor student progress and platform metrics.

---

## 🛠️ Technology Stack

- **Frontend Framework:** HTML, CSS, JS
- **Build Tool:** Vite
- **Styling:** Custom CSS with a bright, modern "Glassmorphism" UI and responsive design
- **AI Integration:** Google Gemini API (via `@google/generative-ai` or REST endpoints)

---

## 🚀 Getting Started

### Installation

1. **Clone the repository (or navigate to the directory):**
   \`\`\`bash
   cd TEAM-6-Dr.N.G.P.-Institute-of-Technology
   \`\`\`

3. **Start the development server:**
   The app will typically be available at \`http://localhost:5173\`.

---

## 🤖 AI Mode Configuration

The application features an AI toggle in the top navigation bar:
- **Mock Mode:** Returns local, pre-configured responses tailored to the active AI persona. Useful for testing and development.
- **Live Mode:** Connects to the Google Gemini API for dynamic, context-aware mentorship. 

*(Note: Ensure your Gemini API key is configured properly in \`src/services/geminiService.ts\` or via environment variables for Live Mode to function optimally).*

---

## 🎓 About

This project was developed by **Team 6** to revolutionize campus skill assessment and career readiness. By combining rigorous diagnostic testing with AI-guided sandbox learning, we aim to bridge the gap between academic knowledge and industry-ready skills.
