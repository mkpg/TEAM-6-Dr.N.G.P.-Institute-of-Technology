import React, { useState } from 'react';
import { CodingEvaluation } from './CodingEvaluation';
import { ProgrammingTutor } from './ProgrammingTutor';
import { Code, BookOpen } from 'lucide-react';

export const Module2TechSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sandbox' | 'curriculum'>('sandbox');

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Header controls for Module 2 */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code style={{ color: 'hsl(var(--primary))' }} /> Module 2: Coding Sandbox & Tutor
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))' }}>
            Develop custom scripts, compile code parameters, and verify algorithm performance metrics.
          </span>
        </div>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.15)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid hsla(var(--border-glass))' }}>
          <button
            onClick={() => setActiveTab('sandbox')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'sandbox' ? 'hsl(var(--primary))' : 'transparent',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'var(--transition-fast)'
            }}
          >
            <Code size={14} /> Sandbox Workspace
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'curriculum' ? 'hsl(var(--primary))' : 'transparent',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'var(--transition-fast)'
            }}
          >
            <BookOpen size={14} /> Algorithms Curriculum
          </button>
        </div>
      </div>

      {activeTab === 'sandbox' ? <CodingEvaluation /> : <ProgrammingTutor />}

    </div>
  );
};

export default Module2TechSandbox;
