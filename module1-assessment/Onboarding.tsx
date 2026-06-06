import React, { useState } from 'react';
import { type AssessmentAnswers } from './AnalysisEngine';
import { Sparkles, Brain, Award, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (answers: AssessmentAnswers) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [interests, setInterests] = useState<number[]>([5, 5, 5, 5, 5]);
  const interestLabels = [
    { label: "Software Development & Coding", desc: "Writing scripts, resolving code logic, automating workflows" },
    { label: "Visual Art & Design Blueprints", desc: "Drafting layouts, choosing color schemes, geometric structures" },
    { label: "Project Management & Strategy", desc: "Budget planning, defining milestones, timeline structures" },
    { label: "Team Leadership & Pitching", desc: "Coordinating teammates, presenting ideas, persuading clients" },
    { label: "Algorithmic Logic & Puzzles", desc: "Cracking math riddles, sorting logic, finding root-causes" }
  ];

  const [skills, setSkills] = useState<number[]>([5, 5, 5, 5, 5]);
  const skillLabels = [
    { label: "Mathematical Logic", desc: "Calculations, algebraic operations, geometry formulas" },
    { label: "Artistic Rendering", desc: "Sketching, proportions, color harmony" },
    { label: "Business Literacy", desc: "Cost-benefit estimation, market awareness" },
    { label: "Behavioral Analysis", desc: "Predicting patterns, assessing team bottlenecks" },
    { label: "Code Syntax Familiarity", desc: "Reading code tags, brackets, parameters" }
  ];

  const [workStyle, setWorkStyle] = useState<string>('collaborative');

  const handleInterestChange = (index: number, val: number) => {
    const next = [...interests];
    next[index] = val;
    setInterests(next);
  };

  const handleSkillChange = (index: number, val: number) => {
    const next = [...skills];
    next[index] = val;
    setSkills(next);
  };

  const handleSubmit = () => {
    onComplete({ interests, skills, workStyle });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <div className="glass-panel" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(var(--primary), 0.3) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        {step === 0 && (
          <div style={{ textAlign: 'center', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'hsla(var(--primary), 0.1)', marginBottom: '24px' }}>
              <Brain size={48} className="glow-text" style={{ color: 'hsl(var(--primary))' }} />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '16px' }}>
              Welcome to the <span className="text-gradient-primary">Employability Engine</span>
            </h1>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
              This platform maps your cognitive behaviors, technical logic, and creative instincts into 
              five distinct career modules. Complete this brief assessment to unlock your personalized archetype report 
              and custom-tailored simulation tools.
            </p>
            <button className="btn-primary" onClick={() => setStep(1)}>
              Start Assessment <ArrowRight size={20} />
            </button>
          </div>
        )}

        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'hsl(var(--secondary))', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Step 1 of 3</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '4px' }}>Interest Survey</h2>
              </div>
              <Sparkles style={{ color: 'hsl(var(--secondary))' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              {interestLabels.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.label}</label>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--primary))', fontSize: '1.1rem' }}>{interests[idx]} / 10</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '-4px' }}>{item.desc}</p>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={interests[idx]} 
                    onChange={(e) => handleInterestChange(idx, parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: 'hsl(var(--primary))',
                      background: 'rgba(255, 255, 255, 0.1)',
                      height: '6px',
                      borderRadius: '3px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn-secondary" onClick={() => setStep(0)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(2)}>
                Next Step <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'hsl(var(--secondary))', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Step 2 of 3</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '4px' }}>Cognitive Skillsets</h2>
              </div>
              <Award style={{ color: 'hsl(var(--secondary))' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
              {skillLabels.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <label style={{ fontWeight: 600, fontSize: '1.05rem' }}>{item.label}</label>
                    <span style={{ fontWeight: 700, color: 'hsl(var(--secondary))', fontSize: '1.1rem' }}>{skills[idx]} / 10</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', marginTop: '-4px' }}>{item.desc}</p>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={skills[idx]} 
                    onChange={(e) => handleSkillChange(idx, parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: 'hsl(var(--secondary))',
                      background: 'rgba(255, 255, 255, 0.1)',
                      height: '6px',
                      borderRadius: '3px',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button className="btn-primary" onClick={() => setStep(3)}>
                Next Step <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div>
                <span style={{ fontSize: '0.9rem', color: 'hsl(var(--secondary))', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Step 3 of 3</span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '4px' }}>Workplace Environment</h2>
              </div>
              <ShieldAlert style={{ color: 'hsl(var(--secondary))' }} />
            </div>

            <p style={{ color: 'hsl(var(--text-secondary))', marginBottom: '24px' }}>
              How do you naturally operate when tasked with building projects or solving complex issues? Select the statement that most closely maps to your personality.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {[
                { id: 'creative', label: 'The Creator', desc: 'Thrives in unstructured setups, prioritizing visual originality and innovative paths.' },
                { id: 'collaborative', label: 'The Orchestrator', desc: 'Thrives in team sprints, brainstorm sessions, and collective problem-solving.' },
                { id: 'independent', label: 'The Solo Builder', desc: 'Thrives in quiet focus, hacking away on complex logic and syntax individually.' },
                { id: 'structured', label: 'The Architect', desc: 'Thrives on rigorous blueprints, well-defined parameters, and checklists.' }
              ].map((style) => (
                <div 
                  key={style.id}
                  onClick={() => setWorkStyle(style.id)}
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: workStyle === style.id ? 'hsl(var(--primary))' : 'hsla(var(--border-glass))',
                    background: workStyle === style.id ? 'hsla(var(--primary-glow))' : 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{style.label}</span>
                    {workStyle === style.id && <Check size={18} style={{ color: 'hsl(var(--primary))' }} />}
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>{style.desc}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button className="btn-primary" onClick={handleSubmit}>
                Finalize & Analyze <Sparkles size={20} />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
