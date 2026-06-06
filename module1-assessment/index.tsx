import React, { useState } from 'react';
import { Onboarding } from './Onboarding';
import { CareerReport } from './CareerReport';
import { runAnalysisEngine, type AssessmentAnswers, type AnalysisResult } from './AnalysisEngine';

interface Module1AssessmentProps {
  onComplete: (result: AnalysisResult) => void;
  savedResult: AnalysisResult | null;
  onExploreNext: () => void;
}

export const Module1Assessment: React.FC<Module1AssessmentProps> = ({ 
  onComplete, 
  savedResult, 
  onExploreNext 
}) => {
  const [result, setResult] = useState<AnalysisResult | null>(savedResult);

  const handleCompleteSurvey = (answers: AssessmentAnswers) => {
    const analysis = runAnalysisEngine(answers);
    setResult(analysis);
    onComplete(analysis);
  };

  if (!result) {
    return <Onboarding onComplete={handleCompleteSurvey} />;
  }

  return (
    <CareerReport 
      result={result} 
      onExploreModules={onExploreNext} 
    />
  );
};

export default Module1Assessment;
export { runAnalysisEngine };
export type { AnalysisResult, AssessmentAnswers };
