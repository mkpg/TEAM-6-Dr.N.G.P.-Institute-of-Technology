import React from 'react';
import { 
  Compass, 
  Code, 
  LayoutGrid, 
  Landmark, 
  Award, 
  ShieldCheck
} from 'lucide-react';

export type ViewType = 
  | 'module1'
  | 'module2'
  | 'module3'
  | 'module4'
  | 'module5';

interface NavItem {
  id: ViewType;
  label: string;
  group: 'evaluation' | 'sandbox' | 'analytics';
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  archetypeTitle?: string;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  currentView, 
  onViewChange, 
  archetypeTitle, 
  children 
}) => {
  
  const navItems: NavItem[] = [
    { id: 'module1', label: 'Module 1: Career Assessment', group: 'evaluation', icon: <Compass size={18} /> },
    { id: 'module2', label: 'Module 2: Coding & Tutor', group: 'sandbox', icon: <Code size={18} /> },
    { id: 'module3', label: 'Module 3: Architecture Canvas', group: 'sandbox', icon: <LayoutGrid size={18} /> },
    { id: 'module4', label: 'Module 4: Business Simulator', group: 'sandbox', icon: <Landmark size={18} /> },
    { id: 'module5', label: 'Module 5: Credentials & Stats', group: 'analytics', icon: <Award size={18} /> }
  ];

  const renderNavGroup = (group: 'evaluation' | 'sandbox' | 'analytics', title: string) => {
    return (
      <div style={{ marginBottom: '24px' }}>
        <span style={{ 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          color: 'hsl(var(--text-muted))', 
          textTransform: 'uppercase', 
          letterSpacing: '1px', 
          display: 'block', 
          padding: '0 16px 8px' 
        }}>
          {title}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.filter(item => item.group === group).map((item) => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: active ? 'hsla(var(--primary-glow))' : 'transparent',
                  color: active ? '#fff' : 'hsl(var(--text-secondary))',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'var(--transition-fast)',
                  borderLeft: active ? '3px solid hsl(var(--primary))' : '3px solid transparent'
                }}
              >
                {item.icon}
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      
      {/* Sidebar Navigation */}
      <aside 
        className="glass-panel" 
        style={{ 
          borderRadius: 0, 
          borderTop: 'none', 
          borderBottom: 'none', 
          borderLeft: 'none', 
          padding: '24px 16px', 
          display: 'flex', 
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 16px 30px', borderBottom: '1px solid hsla(var(--border-glass))', marginBottom: '24px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
            boxShadow: '0 0 10px hsla(var(--primary-glow))'
          }} />
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', letterSpacing: '0.5px' }}>
              Employability <span className="text-gradient">Engine</span>
            </h1>
            <span style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', fontWeight: 600, textTransform: 'uppercase' }}>
              Student Platform v1.2
            </span>
          </div>
        </div>

        {/* Navigation Lists */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderNavGroup('evaluation', 'Aptitude Assessment')}
          {renderNavGroup('sandbox', 'Specialized Sandbox Modules')}
          {renderNavGroup('analytics', 'milestones & dashboard')}
        </div>

        {/* User Card footer */}
        <div style={{ 
          borderTop: '1px solid hsla(var(--border-glass))', 
          paddingTop: '16px', 
          marginTop: 'auto', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid hsla(var(--border-glass))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck size={18} style={{ color: 'hsl(var(--success))' }} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', display: 'block' }}>
              Student User
            </span>
            <span style={{ fontSize: '0.7rem', color: 'hsl(var(--text-secondary))' }}>
              {archetypeTitle || 'Awaiting Archetype'}
            </span>
          </div>
        </div>

      </aside>

      {/* Main Workspace Frame */}
      <main style={{ overflowY: 'auto', height: '100vh', background: 'rgba(0,0,0,0.1)' }}>
        {children}
      </main>

    </div>
  );
};
export default DashboardLayout;
