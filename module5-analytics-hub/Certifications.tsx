import React, { useState } from 'react';
import { Award, ShieldCheck, Download, Printer } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  category: 'code' | 'architecture' | 'business';
  status: 'unlocked' | 'locked';
  hash: string;
  date: string;
}

export const Certifications: React.FC = () => {
  const [certs] = useState<Certification[]>([
    {
      id: "cert_code",
      name: "Syntax Craftsman & Logic Certificate",
      category: "code",
      status: "unlocked",
      hash: "8bf5...1c93",
      date: "2026-06-05"
    },
    {
      id: "cert_arch",
      name: "Spatial Composition & Balance Specialist",
      category: "architecture",
      status: "unlocked",
      hash: "e54a...92de",
      date: "2026-06-03"
    },
    {
      id: "cert_biz",
      name: "Venture Economic Optimization Certificate",
      category: "business",
      status: "locked",
      hash: "-----------------",
      date: "Pending Q2 Quarter"
    }
  ]);

  const [activePreview, setActivePreview] = useState<Certification | null>(certs[0]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
      
      {/* Left Panel: Available Certificates list */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Earned Credentials</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {certs.map((c) => (
            <div 
              key={c.id}
              onClick={() => {
                if (c.status === 'unlocked') setActivePreview(c);
              }}
              style={{
                padding: '20px',
                borderRadius: 'var(--radius-lg)',
                background: activePreview?.id === c.id ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.01)',
                border: '1px solid',
                borderColor: c.status === 'locked' 
                  ? 'rgba(255,255,255,0.03)' 
                  : activePreview?.id === c.id 
                  ? 'hsl(var(--primary))' 
                  : 'hsla(var(--border-glass))',
                cursor: c.status === 'unlocked' ? 'pointer' : 'not-allowed',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                opacity: c.status === 'locked' ? 0.5 : 1,
                transition: 'var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: c.status === 'locked' 
                    ? 'rgba(255,255,255,0.02)' 
                    : c.category === 'code' 
                    ? 'rgba(139, 92, 246, 0.1)' 
                    : 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px dashed',
                  borderColor: c.status === 'locked' 
                    ? 'rgba(255,255,255,0.2)' 
                    : c.category === 'code' 
                    ? 'hsl(var(--primary))' 
                    : 'hsl(var(--secondary))',
                }}>
                  <Award size={20} style={{ 
                    color: c.status === 'locked' 
                      ? 'hsl(var(--text-muted))' 
                      : c.category === 'code' 
                      ? 'hsl(var(--primary))' 
                      : 'hsl(var(--secondary))' 
                  }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{c.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>
                    {c.status === 'unlocked' ? `Verified: ${c.date}` : 'Awaiting Sandbox Submissions'}
                  </span>
                </div>
              </div>

              {c.status === 'unlocked' && (
                <span style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: 'hsl(var(--success))', fontWeight: 600 }}>
                  <ShieldCheck size={16} /> Authenticated
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: Digital Certificate Print Preview */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Certificate Display Preview</h3>

        {activePreview ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
            
            <div 
              id="printable-cert"
              style={{ 
                background: 'linear-gradient(135deg, #090b14 0%, #15192c 100%)', 
                border: '8px double hsla(var(--border-glass))', 
                padding: '30px', 
                borderRadius: 'var(--radius-md)', 
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '1px dashed rgba(255,255,255,0.05)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 80%)',
                pointerEvents: 'none'
              }} />

              <div style={{ color: 'hsl(var(--warning))', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>
                EMPLOYABILITY ENGINE PLATFORM
              </div>
              
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                Certificate of Achievement
              </h2>
              
              <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', marginBottom: '20px' }}>
                This credential is chronologically awarded to the candidate for completing validation benchmarks.
              </p>

              <div style={{ width: '60px', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 auto 16px' }} />

              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'hsl(var(--secondary))', marginBottom: '4px' }}>
                Student Candidate
              </div>
              <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Candidate ID: EE-9992BC</span>

              <div style={{ margin: '24px 0', fontSize: '0.85rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.5', padding: '0 20px' }}>
                For outstanding achievements in verifying variables within <br />
                <strong style={{ color: '#fff' }}>{activePreview.name}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', fontSize: '0.7rem', color: 'hsl(var(--text-muted))', padding: '0 10px' }}>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase' }}>Security Hash</span>
                  <strong style={{ color: 'hsl(var(--text-secondary))' }}>{activePreview.hash}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', textTransform: 'uppercase' }}>Completion Date</span>
                  <strong style={{ color: 'hsl(var(--text-secondary))' }}>{activePreview.date}</strong>
                </div>
              </div>

            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn-secondary" style={{ flex: 1, padding: '10px' }} onClick={handlePrint}>
                <Printer size={16} /> Print Certificate
              </button>
              <button className="btn-primary" style={{ flex: 1, padding: '10px' }}>
                <Download size={16} /> Download PDF
              </button>
            </div>

          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--text-muted))', textAlign: 'center' }}>
            <Award size={48} style={{ marginBottom: '12px', opacity: 0.5 }} />
            <span>Select an unlocked certificate on the left to display.</span>
          </div>
        )}

      </div>

    </div>
  );
};
