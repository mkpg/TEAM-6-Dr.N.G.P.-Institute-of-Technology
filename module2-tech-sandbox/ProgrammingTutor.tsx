import React, { useState } from 'react';
import { CheckCircle, Sparkles, Send, HelpCircle } from 'lucide-react';
import { askGemini } from '../src/services/geminiService';

interface SyllabusNode {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  quizQuestion: string;
  quizOptions: string[];
  correctAnswer: number;
}

export const ProgrammingTutor: React.FC = () => {
  const [nodes, setNodes] = useState<SyllabusNode[]>([
    {
      id: "git",
      title: "Module 1: Version Control & Git Workflows",
      duration: "4 hours",
      completed: true,
      quizQuestion: "Which command maps a local repository to a remote server link?",
      quizOptions: ["git remote add origin <url>", "git push -u origin main", "git init remote", "git clone <url>"],
      correctAnswer: 0
    },
    {
      id: "datastructures",
      title: "Module 2: Structural Collections & Complexity",
      duration: "6 hours",
      completed: false,
      quizQuestion: "What is the average time complexity to lookup a key in a balanced Hash Map?",
      quizOptions: ["O(N)", "O(log N)", "O(1)", "O(N^2)"],
      correctAnswer: 2
    },
    {
      id: "apis",
      title: "Module 3: REST Protocols & CORS Integrity",
      duration: "8 hours",
      completed: false,
      quizQuestion: "Which HTTP verb should represent an idempotent modification of a complete entity resource?",
      quizOptions: ["POST", "PATCH", "PUT", "DELETE"],
      correctAnswer: 2
    },
    {
      id: "architecture",
      title: "Module 4: System Scaling & Load Distributing",
      duration: "10 hours",
      completed: false,
      quizQuestion: "Which architectural strategy handles database write-scaling bottlenecks?",
      quizOptions: ["Caching layers", "Read replicas", "Horizontal sharding", "Load balancers"],
      correctAnswer: 2
    }
  ]);

  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizChecked, setQuizChecked] = useState<boolean>(false);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);
  
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: "Hello! I am your AI Algorithms Advisor. Stressed about data structure traversal or scale bottlenecks? Ask me anything!" }
  ]);
  const [chatInput, setChatInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const activeNode = nodes[activeNodeIdx];

  const handleSelectAnswer = (idx: number) => {
    if (quizChecked) return;
    setSelectedAnswer(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;
    setQuizChecked(true);
    const correct = selectedAnswer === activeNode.correctAnswer;
    setQuizSuccess(correct);

    if (correct) {
      const updatedNodes = [...nodes];
      updatedNodes[activeNodeIdx].completed = true;
      setNodes(updatedNodes);
    }
  };

  const handleNextNode = () => {
    setSelectedAnswer(null);
    setQuizChecked(false);
    setQuizSuccess(null);
    if (activeNodeIdx < nodes.length - 1) {
      setActiveNodeIdx(prev => prev + 1);
    } else {
      setActiveNodeIdx(0);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const systemInstruction = "You are Sarah Connor, Senior Staff AI Engineer at Cyberdyne. You help students learn coding logic, data structures, and system scalability. Keep answers concise.";

    askGemini(userMsg, systemInstruction).then(reply => {
      setChatMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    });
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      
      {/* Left Panel: Course Syllabus & Quiz */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Course Syllabus Nodes</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {nodes.map((node, idx) => (
            <div 
              key={node.id}
              onClick={() => {
                setActiveNodeIdx(idx);
                setSelectedAnswer(null);
                setQuizChecked(false);
                setQuizSuccess(null);
              }}
              style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                background: activeNodeIdx === idx ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.01)',
                border: '1px solid',
                borderColor: activeNodeIdx === idx ? 'hsl(var(--primary))' : 'hsla(var(--border-glass))',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'var(--transition-fast)'
              }}
            >
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: activeNodeIdx === idx ? 'hsl(var(--text-primary))' : 'hsl(var(--text-secondary))' }}>
                  {node.title}
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))' }}>Est. time: {node.duration}</span>
              </div>
              {node.completed ? (
                <CheckCircle size={18} style={{ color: 'hsl(var(--success))' }} />
              ) : (
                <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1px solid hsla(var(--border-glass))' }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid hsla(var(--border-glass))', paddingTop: '20px', marginTop: '10px' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={18} style={{ color: 'hsl(var(--secondary))' }} /> Module Checkpoint Quiz
          </h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.4' }}>{activeNode.quizQuestion}</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {activeNode.quizOptions.map((opt, idx) => (
              <div 
                key={idx}
                onClick={() => handleSelectAnswer(idx)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: selectedAnswer === idx ? 'hsl(var(--secondary))' : 'hsla(var(--border-glass))',
                  background: selectedAnswer === idx ? 'hsla(var(--secondary-glow))' : 'rgba(255,255,255,0.01)',
                  fontSize: '0.85rem',
                  cursor: quizChecked ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'var(--transition-fast)'
                }}
              >
                <span>{opt}</span>
                <div style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  border: '1px solid',
                  borderColor: selectedAnswer === idx ? 'hsl(var(--secondary))' : 'hsla(var(--border-glass))',
                  background: selectedAnswer === idx ? 'hsl(var(--secondary))' : 'transparent'
                }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {!quizChecked ? (
              <button 
                className="btn-primary" 
                style={{ padding: '8px 20px', fontSize: '0.85rem' }} 
                disabled={selectedAnswer === null}
                onClick={handleCheckAnswer}
              >
                Verify Answer
              </button>
            ) : (
              <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: quizSuccess ? 'hsl(var(--success))' : 'hsl(var(--danger))' }}>
                  {quizSuccess ? "✓ Correct! Concept verified." : "✗ Incorrect, review the materials and try again."}
                </span>
                <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={handleNextNode}>
                  {activeNodeIdx < nodes.length - 1 ? 'Next Module' : 'Repeat Quiz'}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Right Panel: Algorithms AI Tutor Chat */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '520px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} style={{ color: 'hsl(var(--warning))' }} /> Code & Algorithm Tutor
        </h3>

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px', marginBottom: '16px' }}>
          {chatMessages.map((msg, idx) => (
            <div 
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'user' ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.04)',
                padding: '10px 14px',
                borderRadius: '16px',
                borderTopRightRadius: msg.sender === 'user' ? '2px' : '16px',
                borderTopLeftRadius: msg.sender === 'ai' ? '2px' : '16px',
                maxWidth: '85%',
                fontSize: '0.85rem',
                lineHeight: '1.4',
                border: '1px solid',
                borderColor: msg.sender === 'user' ? 'transparent' : 'hsla(var(--border-glass))'
              }}
            >
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.04)', padding: '10px 14px', borderRadius: '16px', fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>
              Sarah Connor is typing...
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="text" 
            className="glass-input" 
            placeholder="Ask an algorithmic question..." 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            style={{ flex: 1, padding: '10px 16px', fontSize: '0.85rem' }}
          />
          <button className="btn-primary" style={{ padding: '10px 16px' }} type="submit">
            <Send size={16} />
          </button>
        </form>
      </div>

    </div>
  );
};
