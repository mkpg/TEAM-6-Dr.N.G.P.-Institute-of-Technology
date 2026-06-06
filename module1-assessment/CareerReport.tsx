import React from 'react';
import { type AnalysisResult } from './AnalysisEngine';
import { Award, Compass, User, DollarSign, TrendingUp, Sparkles } from 'lucide-react';

interface CareerReportProps {
  result: AnalysisResult;
  onExploreModules: () => void;
}

export const CareerReport: React.FC<CareerReportProps> = ({ result, onExploreModules }) => {
  const { archetype, domainMatches, skillsBreakdown } = result;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', animation: 'fadeIn 0.5s ease' }}>
      
      {/* Archetype Hero Panel */}
      <div className="glass-panel" style={{ padding: '40px', marginBottom: '30px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(var(--primary), 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, hsla(var(--secondary), 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px hsla(var(--primary-glow))'
          }}>
            <User size={36} color="white" />
          </div>

          <div style={{ flex: '1 1 500px' }}>
            <span style={{ fontSize: '0.9rem', color: 'hsl(var(--secondary))', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              Your Custom Assessment Archetype
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '4px', marginBottom: '8px' }}>
              {archetype.title}
            </h1>
            <h3 style={{ fontSize: '1.2rem', color: 'hsl(var(--text-secondary))', fontWeight: 500, marginBottom: '16px' }}>
              {archetype.subtitle}
            </h3>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '750px' }}>
              {archetype.description}
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid hsla(var(--border-glass))', marginTop: '30px', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {archetype.strengths.map((str, idx) => (
            <span 
              key={idx} 
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid hsla(var(--border-glass))',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'hsl(var(--text-primary))',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              ✦ {str}
            </span>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
        
        {/* Domain Alignment */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Compass size={22} style={{ color: 'hsl(var(--primary))' }} /> Domain Affinity Matrix
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {domainMatches.map((dm, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{dm.name}</span>
                  <span style={{ fontWeight: 700, color: 'hsl(var(--secondary))' }}>{dm.score}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${dm.score}%`, 
                      height: '100%', 
                      background: idx === 0 
                        ? 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)))' 
                        : 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '4px'
                    }} 
                  />
                </div>
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
                  {dm.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={22} style={{ color: 'hsl(var(--secondary))' }} /> Skills Diagnostics
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {skillsBreakdown.map((skill, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.9rem' }}>
                  <span style={{ color: 'hsl(var(--text-secondary))' }}>{skill.name}</span>
                  <span style={{ fontWeight: 600 }}>{skill.value} / 100</span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Array.from({ length: 10 }).map((_, segmentIdx) => {
                    const active = skill.value >= (segmentIdx + 1) * 10;
                    return (
                      <div 
                        key={segmentIdx}
                        style={{
                          flex: 1,
                          height: '8px',
                          borderRadius: '2px',
                          background: active 
                            ? 'hsl(var(--secondary))'
                            : 'rgba(255,255,255,0.05)',
                          boxShadow: active ? '0 0 8px hsla(var(--secondary-glow))' : 'none',
                          transition: 'var(--transition-fast)'
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px' }}>
            <Sparkles size={20} style={{ color: 'hsl(var(--warning))', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
              Your cognitive indicators reveal a high degree of adaptability. Focus on the core roadmap below to construct a robust student portfolio.
            </span>
          </div>
        </div>
      </div>

      {/* Careers & Growth Roadmap */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px', marginBottom: '40px' }}>
        
        {/* Careers */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>
            Recommended Career Pathways
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {archetype.careers.map((car, idx) => (
              <div 
                key={idx} 
                style={{ 
                  padding: '20px', 
                  borderRadius: 'var(--radius-md)', 
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid hsla(var(--border-glass))',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>{car.title}</h4>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <DollarSign size={14} /> Average: {car.salary}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <TrendingUp size={14} /> Outlook: {car.outlook}
                    </span>
                  </div>
                </div>
                <span style={{ fontSize: '0.75rem', padding: '4px 10px', background: 'rgba(50, 200, 100, 0.1)', border: '1px solid rgba(50,200,100,0.3)', color: 'hsl(var(--success))', borderRadius: '50px', fontWeight: 700 }}>
                  High Match
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Roadmap */}
        <div className="glass-panel" style={{ padding: '30px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '20px' }}>
            Aptitude Growth Roadmap
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {archetype.growthRoadmap.map((stepDesc, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'hsla(var(--primary), 0.1)',
                  border: '1px solid hsl(var(--primary))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'hsl(var(--primary))',
                  flexShrink: 0
                }}>
                  {idx + 1}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4', paddingTop: '2px' }}>
                  {stepDesc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <button className="btn-primary glow-pulse" style={{ padding: '16px 36px', fontSize: '1.1rem' }} onClick={onExploreModules}>
          Activate Sandbox & Domain Tools <Sparkles size={20} />
        </button>
      </div>

    </div>
  );
};
