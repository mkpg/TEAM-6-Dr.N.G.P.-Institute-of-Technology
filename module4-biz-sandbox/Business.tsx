import React, { useState } from 'react';
import { Sparkles, RefreshCw, AlertCircle, TrendingUp, ShieldAlert, Award } from 'lucide-react';

export const Business: React.FC = () => {
  const [unitPrice, setUnitPrice] = useState<number>(49);
  const [marketingSpend, setMarketingSpend] = useState<number>(5000);
  const [targetMarket, setTargetMarket] = useState<'students' | 'gamers' | 'enterprise'>('gamers');
  const [staffCount, setStaffCount] = useState<number>(2);

  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  interface FinancialStatement {
    unitsSold: number;
    revenue: number;
    marketingCosts: number;
    overheadCosts: number;
    netProfit: number;
    roi: number;
    elasticityReview: string;
    strategicTip: string;
  }
  const [statement, setStatement] = useState<FinancialStatement | null>(null);

  const triggerSimulation = () => {
    setIsSimulating(true);
    setStatement(null);

    setTimeout(() => {
      setIsSimulating(false);

      let baseDemand = Math.floor(marketingSpend / 15);
      let priceSensitivityCoefficient = 1;
      let optimalPrice = 50;
      let overheadPerStaff = 3000;

      if (targetMarket === 'students') {
        optimalPrice = 19;
        priceSensitivityCoefficient = 2.5;
      } else if (targetMarket === 'gamers') {
        optimalPrice = 59;
        priceSensitivityCoefficient = 1.5;
      } else if (targetMarket === 'enterprise') {
        optimalPrice = 249;
        priceSensitivityCoefficient = 0.5;
      }

      const priceDiff = unitPrice - optimalPrice;
      let demandModifier = 1;
      if (priceDiff > 0) {
        demandModifier = Math.max(0.1, 1 - (priceDiff / optimalPrice) * priceSensitivityCoefficient);
      } else {
        demandModifier = Math.min(1.8, 1 + (Math.abs(priceDiff) / optimalPrice) * 0.5);
      }

      let staffMultiplier = 1;
      if (targetMarket === 'enterprise' && staffCount < 4) {
        staffMultiplier = 0.15;
      }

      const unitsSold = Math.round(baseDemand * demandModifier * staffMultiplier);
      const revenue = unitsSold * unitPrice;
      const marketingCosts = marketingSpend;
      const overheadCosts = staffCount * overheadPerStaff + 2000;
      const netProfit = revenue - (marketingCosts + overheadCosts);
      const roi = marketingCosts + overheadCosts > 0 
        ? Math.round((netProfit / (marketingCosts + overheadCosts)) * 100) 
        : 0;

      let elasticityReview = "Demand is operating stably. Pricing coordinates align with customer wallets.";
      if (unitPrice > optimalPrice * 1.5) {
        elasticityReview = `Demand is highly ELASTIC for this target. Your price of $${unitPrice} is significantly above the market tolerance of $${optimalPrice}, causing customers to churn to alternatives.`;
      } else if (unitPrice < optimalPrice * 0.6) {
        elasticityReview = `Money is being left on the table. Customer demand is high, but your margins are too slim to cover marketing overhead. Recommend raising unit pricing.`;
      }

      let strategicTip = "Maintain current parameters. Introduce minor digital feature sets to justify a 10% price optimization in the next quarter.";
      if (netProfit < 0) {
        if (targetMarket === 'enterprise' && staffCount < 4) {
          strategicTip = "Enterprise contracts require high-grade technical account management. Hire at least 4 operations staff to scale support, unlocking complete demand pipelines.";
        } else {
          strategicTip = "Consolidate marketing acquisition costs. Reduce monthly ad spend and re-align unit pricing closer to the optimal market tolerance index.";
        }
      } else if (roi > 40) {
        strategicTip = "EXCELLENT ACQUISITION: High ROI unlocked. Scale up marketing ad spend by 50% to capture broader market share before competitors respond.";
      }

      setStatement({
        unitsSold,
        revenue,
        marketingCosts,
        overheadCosts,
        netProfit,
        roi,
        elasticityReview,
        strategicTip
      });

    }, 1500);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      
      {/* Left Panel: Simulator Inputs */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Quarterly Financial Variables</h3>
        
        {/* Target Demographics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Target Demographic Market</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[
              { id: 'students', label: 'Students', desc: 'Elastic wallet, low margins' },
              { id: 'gamers', label: 'Gamers', desc: 'Moderate tolerance, high volume' },
              { id: 'enterprise', label: 'Enterprise', desc: 'Inelastic wallet, high support demands' }
            ].map((m) => (
              <div 
                key={m.id}
                onClick={() => setTargetMarket(m.id as any)}
                style={{
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid',
                  borderColor: targetMarket === m.id ? 'hsl(var(--primary))' : 'hsla(var(--border-glass))',
                  background: targetMarket === m.id ? 'hsla(var(--primary-glow))' : 'rgba(255,255,255,0.01)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'var(--transition-fast)'
                }}
              >
                <span style={{ fontWeight: 700, fontSize: '0.9rem', display: 'block', marginBottom: '2px', color: targetMarket === m.id ? '#fff' : 'hsl(var(--text-primary))' }}>
                  {m.label}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))' }}>{m.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Model Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Unit Product Price</label>
            <span style={{ fontWeight: 700, color: 'hsl(var(--secondary))', fontSize: '1.1rem' }}>${unitPrice}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="500" 
            value={unitPrice} 
            onChange={(e) => setUnitPrice(parseInt(e.target.value))}
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

        {/* Marketing Spend Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Marketing / Advertising Budget</label>
            <span style={{ fontWeight: 700, color: 'hsl(var(--primary))', fontSize: '1.1rem' }}>${marketingSpend.toLocaleString()}</span>
          </div>
          <input 
            type="range" 
            min="500" 
            max="50000" 
            step="500"
            value={marketingSpend} 
            onChange={(e) => setMarketingSpend(parseInt(e.target.value))}
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

        {/* Operations Staff Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <label style={{ fontWeight: 600, fontSize: '0.95rem' }}>Operations Staff Hired</label>
            <span style={{ fontWeight: 700, color: 'hsl(var(--warning))', fontSize: '1.1rem' }}>{staffCount} Engineers</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={staffCount} 
            onChange={(e) => setStaffCount(parseInt(e.target.value))}
            style={{
              width: '100%',
              accentColor: 'hsl(var(--warning))',
              background: 'rgba(255, 255, 255, 0.1)',
              height: '6px',
              borderRadius: '3px',
              outline: 'none',
              cursor: 'pointer'
            }}
          />
          {targetMarket === 'enterprise' && staffCount < 4 && (
            <span style={{ fontSize: '0.75rem', color: 'hsl(var(--danger))', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <ShieldAlert size={14} /> Warning: Enterprise requires at least 4 support engineers.
            </span>
          )}
        </div>

        <button className="btn-primary" onClick={triggerSimulation}>
          Simulate Financial Quarter
        </button>
      </div>

      {/* Right Panel: Simulated Income Statement results */}
      <div className="glass-panel" style={{ padding: '24px', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'hsl(var(--warning))' }} /> AI Venture Analytics Board
        </h3>

        {isSimulating && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <RefreshCw className="glow-text" style={{ animation: 'spin 1.5s linear infinite', color: 'hsl(var(--primary))' }} size={32} />
            <span style={{ fontSize: '0.9rem', color: 'hsl(var(--text-secondary))' }}>Running customer acquisition funnels and economic elasticity calculations...</span>
          </div>
        )}

        {!isSimulating && !statement && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'hsl(var(--text-muted))', textAlign: 'center', padding: '0 20px' }}>
            <AlertCircle size={36} style={{ marginBottom: '12px', strokeWidth: 1.5 }} />
            <span style={{ fontSize: '0.9rem' }}>Business variables configured. Click simulate above to execute market projections and view balance statements.</span>
          </div>
        )}

        {!isSimulating && statement && (
          <div style={{ animation: 'fadeIn 0.5s ease', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))', display: 'block' }}>Units Sold</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>{statement.unitsSold.toLocaleString()} units</span>
              </div>
              
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))', display: 'block' }}>Gross Revenue</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'hsl(var(--secondary))' }}>
                  ${statement.revenue.toLocaleString()}
                </span>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))', display: 'block' }}>Marketing Overhead</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'hsl(var(--primary))' }}>
                  -${statement.marketingCosts.toLocaleString()}
                </span>
              </div>

              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.01)', border: '1px solid hsla(var(--border-glass))', borderRadius: 'var(--radius-md)' }}>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))', display: 'block' }}>Operational Overhead</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'hsl(var(--warning))' }}>
                  -${statement.overheadCosts.toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: statement.netProfit >= 0 ? 'rgba(50,200,100,0.08)' : 'rgba(235,70,80,0.08)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid', borderColor: statement.netProfit >= 0 ? 'rgba(50,200,100,0.2)' : 'rgba(235,70,80,0.2)' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))' }}>Net Quarterly Profit</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, display: 'block', color: statement.netProfit >= 0 ? 'hsl(var(--success))' : 'hsl(var(--danger))' }}>
                  {statement.netProfit >= 0 ? '+' : ''}${statement.netProfit.toLocaleString()}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))', display: 'block' }}>Quarterly ROI</span>
                <span style={{ fontSize: '1.3rem', fontWeight: 800, color: statement.netProfit >= 0 ? 'hsl(var(--success))' : 'hsl(var(--danger))', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <TrendingUp size={16} /> {statement.roi}%
                </span>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--secondary))', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Elasticity Diagnostics
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4', marginBottom: '16px' }}>
                {statement.elasticityReview}
              </p>

              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'hsl(var(--primary))', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Strategic Recommendations
              </h4>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: 'hsl(var(--text-secondary))', lineHeight: '1.4' }}>
                <Award size={18} style={{ color: 'hsl(var(--warning))', flexShrink: 0, marginTop: '2px' }} />
                <span>{statement.strategicTip}</span>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
