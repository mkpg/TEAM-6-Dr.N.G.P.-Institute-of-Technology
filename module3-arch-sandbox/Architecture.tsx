import React, { useState } from 'react';
import { Sparkles, RefreshCw, PenTool, CheckCircle, Info, Construction } from 'lucide-react';

type ElementType = 'empty' | 'column' | 'wall' | 'beam' | 'glass' | 'load';

interface ElementInfo {
  type: ElementType;
  label: string;
  color: string;
  char: string;
  weight: number;
}

const ELEMENTS: Record<ElementType, ElementInfo> = {
  empty: { type: 'empty', label: 'Empty Plot', color: '#1a1d2e', char: '.', weight: 0 },
  column: { type: 'column', label: 'Support Column', color: '#3b82f6', char: '▮', weight: 4 },
  wall: { type: 'wall', label: 'Load Wall', color: '#8b5cf6', char: '█', weight: 5 },
  beam: { type: 'beam', label: 'Steel Beam', color: '#ec4899', char: '▬', weight: 2 },
  glass: { type: 'glass', label: 'Aesthetic Glass', color: '#10b981', char: '░', weight: 1 },
  load: { type: 'load', label: 'Heavy Machinery', color: '#f59e0b', char: '▲', weight: 8 }
};

export const Architecture: React.FC = () => {
  const GRID_SIZE = 5;
  const [grid, setGrid] = useState<ElementType[][]>(
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('empty'))
  );
  
  const [activeTool, setActiveTool] = useState<ElementType>('column');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  
  interface SimulationReport {
    integrity: number;
    aesthetic: number;
    rating: string;
    advice: string;
    points: string[];
  }
  const [report, setReport] = useState<SimulationReport | null>(null);

  const handleCellClick = (row: number, col: number) => {
    const next = grid.map((r, ri) => 
      r.map((c, ci) => {
        if (ri === row && ci === col) {
          return c === activeTool ? 'empty' : activeTool;
        }
        return c;
      })
    );
    setGrid(next);
    setReport(null);
  };

  const clearGrid = () => {
    setGrid(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill('empty')));
    setReport(null);
  };

  const handleSimulate = () => {
    setIsSimulating(true);
    setReport(null);

    setTimeout(() => {
      setIsSimulating(false);

      let columns = 0;
      let beams = 0;
      let walls = 0;
      let glass = 0;
      let load = 0;

      grid.forEach(row => {
        row.forEach(cell => {
          if (cell === 'column') columns++;
          if (cell === 'beam') beams++;
          if (cell === 'wall') walls++;
          if (cell === 'glass') glass++;
          if (cell === 'load') load++;
        });
      });

      const totalItems = columns + beams + walls + glass + load;

      if (totalItems === 0) {
        setReport({
          integrity: 0,
          aesthetic: 0,
          rating: "F",
          advice: "The construction plot is entirely empty. Lay down structural columns, reinforcement beams, and aesthetic layouts before initiating structural loads.",
          points: ["Plot requires foundational structures."]
        });
        return;
      }

      let heavyLoadHasSupport = true;
      if (load > 0) {
        let supportedLoads = 0;
        for (let r = 0; r < GRID_SIZE; r++) {
          for (let c = 0; c < GRID_SIZE; c++) {
            if (grid[r][c] === 'load') {
              let hasSupport = false;
              const directions = [[-1,0],[1,0],[0,-1],[0,1]];
              for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                  const neighbor = grid[nr][nc];
                  if (neighbor === 'column' || neighbor === 'wall') {
                    hasSupport = true;
                  }
                }
              }
              if (hasSupport) supportedLoads++;
            }
          }
        }
        if (supportedLoads < load) {
          heavyLoadHasSupport = false;
        }
      }

      let integrity = 50;
      if (columns > 0 || walls > 0) integrity += 25;
      if (beams > 0) integrity += 15;
      if (heavyLoadHasSupport) integrity += 10;
      else integrity -= 35;
      integrity = Math.max(10, Math.min(100, integrity));

      let aesthetic = 40;
      if (glass > 0) aesthetic += 30;
      if (walls > 0 && columns > 0) aesthetic += 20;
      if (totalItems > 15) aesthetic -= 15;
      aesthetic = Math.max(15, Math.min(100, aesthetic));

      let rating = "C";
      if (integrity >= 90 && aesthetic >= 80) rating = "A";
      else if (integrity >= 80 && aesthetic >= 70) rating = "B";
      else if (integrity < 50) rating = "D";

      let advice = "Your structural layout demonstrates basic equilibrium. To optimize the rating, ensure that all heavy loads are buffered adjacent to support columns and introduce glass filters for visual expansion.";
      if (integrity < 60) {
        advice = "CRITICAL FAILURE RISK: High load bearing items are isolated without column anchors. Place supporting elements immediately next to the yellow heavy generators.";
      } else if (integrity >= 90 && aesthetic >= 80) {
        advice = "EXCELLENT BLUEPRINT: The design is structurally sound with balanced stress transfers. Visual glass panels create clean lighting boundaries.";
      }

      setReport({
        integrity,
        aesthetic,
        rating,
        advice,
        points: [
          `Support Index: ${columns} columns, ${walls} load walls constructed.`,
          `Stress Transfer: ${beams} steel beams bridging vertical loads.`,
          heavyLoadHasSupport ? "Weight loads successfully anchored." : "Warning: Unsupported heavy loads detected."
        ]
      });

    }, 1500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px' }}>
      
      {/* Left Panel: Plot Canvas & Tool Selection */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', fontWeight: 600, display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>
            Select Construction Tool
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {(Object.keys(ELEMENTS) as ElementType[]).map((elKey) => {
              const el = ELEMENTS[elKey];
              return (
                <button
                  key={elKey}
                  onClick={() => setActiveTool(elKey)}
                  style={{
                    background: activeTool === elKey ? 'rgba(255,255,255,0.06)' : 'transparent',
                    border: '1px solid',
                    borderColor: activeTool === elKey ? 'hsl(var(--primary))' : 'hsla(var(--border-glass))',
                    color: activeTool === elKey ? '#fff' : 'hsl(var(--text-secondary))',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <span style={{ color: el.color, fontSize: '1.1rem', fontWeight: 'bold' }}>{el.char}</span>
                  {el.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid Canvas */}
        <div style={{ display: 'flex', justifyContent: 'center', background: 'rgba(0,0,0,0.15)', padding: '30px', borderRadius: 'var(--radius-lg)', border: '1px solid hsla(var(--border-glass))' }}>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${GRID_SIZE}, 60px)`, gap: '8px' }}>
            {grid.map((row, rIdx) => 
              row.map((cell, cIdx) => {
                const el = ELEMENTS[cell];
                return (
                  <div
                    key={`${rIdx}-${cIdx}`}
                    onClick={() => handleCellClick(rIdx, cIdx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: 'var(--radius-sm)',
                      background: el.color,
                      border: '1px solid rgba(255,255,255,0.05)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      color: 'white',
                      transition: 'transform 0.1s ease, background 0.3s ease',
                      boxShadow: cell !== 'empty' ? 'inset 0 0 10px rgba(0,0,0,0.3)' : 'none'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    {cell !== 'empty' && el.char}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={clearGrid}>
            Reset Grid
          </button>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }} onClick={handleSimulate}>
            <Construction size={16} /> Run Structural Load Simulation
          </button>
        </div>
      </div>

      {/* Right Panel: Simulated Structural Rating report */}
      <div className="glass-panel" style={{ padding: '24px', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'hsl(var(--warning))' }} /> Architectural AI Review Board
        </h3>

        {isSimulating && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <RefreshCw className="glow-text" style={{ animation: 'spin 1.5s linear infinite', color: 'hsl(var(--secondary))' }} size={32} />
            <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>Calculating load-bearing distributions and wind constraints...</span>
          </div>
        )}

        {!isSimulating && !report && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--text-muted))', textAlign: 'center', padding: '0 20px' }}>
            <Info size={36} style={{ marginBottom: '12px', strokeWidth: 1.5 }} />
            <span style={{ fontSize: '0.9rem' }}>Grid canvas is ready. Toggle columns/walls/beams on the plot and click load simulation to receive automated reviews.</span>
          </div>
        )}

        {!isSimulating && report && (
          <div style={{ animation: 'fadeIn 0.5s ease', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid hsla(var(--border-glass))' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'hsl(var(--text-secondary))' }}>Structural Soundness</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: report.integrity >= 80 ? 'hsl(var(--success))' : report.integrity >= 50 ? 'hsl(var(--warning))' : 'hsl(var(--danger))' }}>
                    {report.integrity}%
                  </span>
                </div>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'hsl(var(--text-secondary))' }}>Aesthetic Index</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'hsl(var(--secondary))' }}>
                    {report.aesthetic}%
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-secondary))' }}>Overall Grade</span>
                <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'hsl(var(--warning))', display: 'block', marginTop: '4px' }}>
                  {report.rating}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', padding: '16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)' }}>
              <PenTool size={18} style={{ color: 'hsl(var(--primary))', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>AI Architect Review</h4>
                <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>{report.advice}</p>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--secondary))', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Load stress checklist
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {report.points.map((pt, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))' }}>
                    <CheckCircle size={14} style={{ color: 'hsl(var(--success))' }} />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
