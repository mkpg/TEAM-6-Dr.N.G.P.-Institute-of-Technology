import React, { useState } from 'react';
import { PortfolioEngine } from './PortfolioEngine';
import { Certifications } from './Certifications';
import { Analytics } from './Analytics';
import { FolderGit, Award, BarChart } from 'lucide-react';

export const Module5AnalyticsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'certifications' | 'analytics'>('portfolio');

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Header Controls */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Award style={{ color: 'hsl(var(--primary))' }} /> Module 5: Credentials & Analytics Hub
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))' }}>
            Monitor academic metrics, manage verified portfolios, and display digital credentials.
          </span>
        </div>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.15)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid hsla(var(--border-glass))' }}>
          <button
            onClick={() => setActiveTab('portfolio')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'portfolio' ? 'hsl(var(--primary))' : 'transparent',
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
            <FolderGit size={14} /> Portfolio Log
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'certifications' ? 'hsl(var(--primary))' : 'transparent',
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
            <Award size={14} /> Credentials
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'analytics' ? 'hsl(var(--primary))' : 'transparent',
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
            <BarChart size={14} /> Placement Analytics
          </button>
        </div>
      </div>

      {/* Render selected view */}
      {activeTab === 'portfolio' && <PortfolioEngine />}
      {activeTab === 'certifications' && <Certifications />}
      {activeTab === 'analytics' && <Analytics />}

    </div>
  );
};

export default Module5AnalyticsHub;
