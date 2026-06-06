import React, { useState } from 'react';
import { Sparkles, Upload, CheckCircle, ArrowUpRight } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  category: 'code' | 'architecture' | 'business';
  date: string;
  score: number;
  grade: string;
  feedback: string;
  status: 'graded' | 'pending';
}

export const PortfolioEngine: React.FC = () => {
  const [items, setItems] = useState<PortfolioItem[]>([
    {
      id: "1",
      title: "Interactive Glow Button Sandbox",
      category: "code",
      date: "2026-06-05",
      score: 95,
      grade: "A+",
      feedback: "Core HTML hierarchy is clean. CSS structures use excellent transition coordinates and box-shadow glows. JS event bindings compile error-free.",
      status: "graded"
    },
    {
      id: "2",
      title: "Commercial Warehouse Structural Plot",
      category: "architecture",
      date: "2026-06-03",
      score: 88,
      grade: "A-",
      feedback: "Foundational column weights successfully anchor load-bearing beams. Aesthetics can be expanded by replacing solid walls with window filters.",
      status: "graded"
    },
    {
      id: "3",
      title: "Student Target Market Projections",
      category: "business",
      date: "2026-05-28",
      score: 72,
      grade: "C+",
      feedback: "Overestimated pricing tolerance indices. Students are price-elastic; recommend shifting unit pricing under $20 to align overhead sales.",
      status: "graded"
    }
  ]);

  const [uploadName, setUploadName] = useState<string>('');
  const [uploadCategory, setUploadCategory] = useState<'code' | 'architecture' | 'business'>('code');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  const handleUploadItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadName.trim()) return;

    const newItem: PortfolioItem = {
      id: Math.random().toString(),
      title: uploadName,
      category: uploadCategory,
      date: new Date().toISOString().split('T')[0],
      score: 80,
      grade: "B",
      feedback: "AI system identified active upload. Evaluation is scheduled for next compilation cycle.",
      status: "pending"
    };

    setItems([newItem, ...items]);
    setUploadName('');
    setShowUploadModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn-primary" onClick={() => setShowUploadModal(true)}>
          <Upload size={16} /> Upload Project Artifact
        </button>
      </div>

      {showUploadModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(4px)'
        }}>
          <div className="glass-panel" style={{ padding: '30px', width: '450px', background: 'hsl(var(--bg-card))' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Upload Project File</h3>
            <form onSubmit={handleUploadItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Project Title</label>
                <input 
                  type="text" 
                  className="glass-input" 
                  value={uploadName} 
                  onChange={(e) => setUploadName(e.target.value)} 
                  placeholder="e.g. Chat Widget Design"
                  required 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Module Category</label>
                <select 
                  className="glass-input"
                  value={uploadCategory} 
                  onChange={(e) => setUploadCategory(e.target.value as any)}
                  style={{ background: 'rgba(10, 14, 26, 0.9)' }}
                >
                  <option value="code">Software Engineering</option>
                  <option value="architecture">Design & Architecture</option>
                  <option value="business">Business Strategy</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button className="btn-secondary" type="button" onClick={() => setShowUploadModal(false)}>Cancel</button>
                <button className="btn-primary" type="submit">Submit File</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grid Portfolio items */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {items.map((item) => (
          <div key={item.id} className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ 
                  fontSize: '0.7rem', 
                  padding: '3px 8px', 
                  borderRadius: '50px', 
                  fontWeight: 700, 
                  background: item.category === 'code' ? 'rgba(139, 92, 246, 0.15)' : item.category === 'architecture' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  color: item.category === 'code' ? 'hsl(var(--primary))' : item.category === 'architecture' ? 'hsl(var(--secondary))' : 'hsl(var(--warning))',
                  border: '1px solid',
                  borderColor: item.category === 'code' ? 'rgba(139, 92, 246, 0.3)' : item.category === 'architecture' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)',
                  textTransform: 'uppercase'
                }}>
                  {item.category === 'code' ? 'Software Code' : item.category === 'architecture' ? 'Architecture' : 'Venture Strategy'}
                </span>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '8px', lineHeight: '1.4' }}>{item.title}</h3>
                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Uploaded: {item.date}</span>
              </div>

              {item.status === 'graded' ? (
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'hsl(var(--success))', display: 'block', lineHeight: '1' }}>
                    {item.grade}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>({item.score}/100)</span>
                </div>
              ) : (
                <span style={{ fontSize: '0.75rem', padding: '3px 8px', background: 'rgba(255,255,255,0.05)', color: 'hsl(var(--text-secondary))', borderRadius: '4px', border: '1px solid hsla(var(--border-glass))' }}>
                  Queueing
                </span>
              )}
            </div>

            <div style={{ padding: '14px', background: 'rgba(255,255,255,0.015)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Sparkles size={14} style={{ color: 'hsl(var(--warning))' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>AI Grading Feedback</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
                {item.feedback}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid hsla(var(--border-glass))', paddingTop: '14px', marginTop: 'auto', fontSize: '0.8rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'hsl(var(--text-secondary))' }}>
                <CheckCircle size={14} style={{ color: 'hsl(var(--success))' }} /> Credential Verified
              </span>
              <a href="#" style={{ color: 'hsl(var(--secondary))', display: 'flex', alignItems: 'center', gap: '2px', textDecoration: 'none', fontWeight: 600 }}>
                View Artifact <ArrowUpRight size={14} />
              </a>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
