import { useState } from 'react';
import { DashboardLayout, type ViewType } from './components/DashboardLayout';
import { Module1Assessment, runAnalysisEngine, type AnalysisResult, type AssessmentAnswers } from '../module1-assessment';
import { Module2TechSandbox } from '../module2-tech-sandbox';
import { Module3ArchSandbox } from '../module3-arch-sandbox';
import { Module4BizSandbox } from '../module4-biz-sandbox';
import { Module5AnalyticsHub } from '../module5-analytics-hub';
import { Sparkles, Compass } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('module1');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAssessmentComplete = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCurrentView('module1'); // Stays on Module 1 to show the CareerReport results
  };

  const handleAutoFillAssessment = () => {
    const mockAnswers: AssessmentAnswers = {
      interests: [10, 4, 6, 8, 9], // High technology & coding logic
      skills: [9, 3, 5, 7, 10],   // High code syntax & logic
      workStyle: 'independent'
    };
    const result = runAnalysisEngine(mockAnswers);
    handleAssessmentComplete(result);
  };

  const renderActiveView = () => {
    // Block sandbox modules until Module 1 Assessment is completed
    if (!analysisResult && currentView !== 'module1') {
      return (
        <div style={{ maxWidth: '600px', margin: '80px auto', padding: '0 20px', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
          <div className="glass-panel glow-pulse" style={{ padding: '40px' }}>
            <Compass size={48} style={{ color: 'hsl(var(--primary))', marginBottom: '20px' }} />
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '12px' }}>Assessment Required</h2>
            <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              You must complete Module 1: Career Assessment to activate other sandbox modules and credentials dashboards.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button className="btn-primary" onClick={() => setCurrentView('module1')}>
                Start Module 1
              </button>
              <button className="btn-secondary" onClick={handleAutoFillAssessment}>
                <Sparkles size={16} /> Auto-Fill Assessment
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'module1':
        return (
          <Module1Assessment 
            savedResult={analysisResult}
            onComplete={handleAssessmentComplete}
            onExploreNext={() => setCurrentView('module2')}
          />
        );
      case 'module2':
        return <Module2TechSandbox />;
      case 'module3':
        return <Module3ArchSandbox />;
      case 'module4':
        return <Module4BizSandbox />;
      case 'module5':
        return <Module5AnalyticsHub />;
      default:
        return (
          <Module1Assessment 
            savedResult={analysisResult}
            onComplete={handleAssessmentComplete}
            onExploreNext={() => setCurrentView('module2')}
          />
        );
    }
  };

  return (
    <DashboardLayout 
      currentView={currentView} 
      onViewChange={setCurrentView}
      archetypeTitle={analysisResult?.archetype.title}
    >
      {renderActiveView()}
    </DashboardLayout>
  );
}

export default App;
