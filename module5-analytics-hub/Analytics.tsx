import React from 'react';
import { Users, Award, TrendingUp, CheckCircle, Search, ArrowUpRight } from 'lucide-react';

interface StudentPlacement {
  name: string;
  archetype: string;
  readiness: number;
  targetCompany: string;
  status: 'hired' | 'interviewing' | 'ready';
}

export const Analytics: React.FC = () => {
  const students: StudentPlacement[] = [
    { name: "Alex Mercer", archetype: "Logic Craftsman", readiness: 95, targetCompany: "Google (AI Division)", status: "hired" },
    { name: "Zoe Redfield", archetype: "Visual Harmonizer", readiness: 88, targetCompany: "Gensler Architects", status: "interviewing" },
    { name: "Marcus Fenix", archetype: "Strategic Executor", readiness: 92, targetCompany: "Stripe Operations", status: "ready" },
    { name: "Gordon Freeman", archetype: "Logic Craftsman", readiness: 84, targetCompany: "Black Mesa Systems", status: "ready" },
    { name: "Alyx Vance", archetype: "Logic Craftsman", readiness: 90, targetCompany: "Tesla Automation", status: "interviewing" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* KPI Counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
        {[
          { label: "Active Cohort", val: "148 Students", icon: <Users style={{ color: 'hsl(var(--primary))' }} />, change: "+12% this semester" },
          { label: "Placement Rate", val: "84.3%", icon: <TrendingUp style={{ color: 'hsl(var(--secondary))' }} />, change: "Goal: 88% by August" },
          { label: "Credentials Issued", val: "312 Badges", icon: <Award style={{ color: 'hsl(var(--warning))' }} />, change: "Averaging 2.1 per student" },
          { label: "Internship Ready", val: "32 Candidates", icon: <CheckCircle style={{ color: 'hsl(var(--success))' }} />, change: "Score > 85% benchmarks" }
        ].map((kpi, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', fontWeight: 600 }}>{kpi.label}</span>
              {kpi.icon}
            </div>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>{kpi.val}</span>
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>{kpi.change}</span>
          </div>
        ))}
      </div>

      {/* Grid: Placement Pipeline & Cohort Skill Map */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 0.7fr', gap: '24px' }}>
        
        {/* Left Panel: Student Pipeline */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Employability Pipeline</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(0,0,0,0.1)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid hsla(var(--border-glass))' }}>
              <Search size={14} style={{ color: 'hsl(var(--text-muted))' }} />
              <input type="text" placeholder="Search cohort..." style={{ background: 'transparent', border: 'none', outline: 'none', fontSize: '0.75rem', color: '#fff' }} />
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid hsla(var(--border-glass))', color: 'hsl(var(--text-muted))' }}>
                  <th style={{ padding: '12px' }}>Student Name</th>
                  <th style={{ padding: '12px' }}>Archetype</th>
                  <th style={{ padding: '12px' }}>Readiness</th>
                  <th style={{ padding: '12px' }}>Target Pipeline</th>
                  <th style={{ padding: '12px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((std, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{std.name}</td>
                    <td style={{ padding: '12px', color: 'hsl(var(--text-secondary))' }}>{std.archetype}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700 }}>{std.readiness}%</span>
                        <div style={{ flex: 1, width: '60px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${std.readiness}%`, height: '100%', background: 'hsl(var(--secondary))' }} />
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', color: 'hsl(var(--text-secondary))' }}>{std.targetCompany}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        padding: '3px 8px', 
                        borderRadius: '4px',
                        fontWeight: 700,
                        background: std.status === 'hired' ? 'rgba(50, 200, 100, 0.15)' : std.status === 'interviewing' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                        color: std.status === 'hired' ? 'hsl(var(--success))' : std.status === 'interviewing' ? 'hsl(var(--secondary))' : 'hsl(var(--warning))',
                        border: '1px solid',
                        borderColor: std.status === 'hired' ? 'rgba(50, 200, 100, 0.3)' : std.status === 'interviewing' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'
                      }}>
                        {std.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Cohort Skill mapping stats */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Cohort Core Competencies</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { skill: "JavaScript Syntax Logic", score: 82, color: 'hsl(var(--primary))' },
              { skill: "Structural Spatial Balancing", score: 68, color: 'hsl(var(--secondary))' },
              { skill: "Pricing Elasticity Simulation", score: 71, color: 'hsl(var(--warning))' },
              { skill: "Version Control Orchestration", score: 78, color: 'hsl(var(--success))' }
            ].map((s, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>
                  <span>{s.skill}</span>
                  <span style={{ fontWeight: 700, color: '#fff' }}>{s.score}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${s.score}%`, height: '100%', background: s.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', display: 'block' }}>Next Placement Cycle</span>
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>June 25, 2026</strong>
            </div>
            <a href="#" style={{ color: 'hsl(var(--secondary))', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none', fontWeight: 600 }}>
              Export CSV <ArrowUpRight size={14} />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
};
