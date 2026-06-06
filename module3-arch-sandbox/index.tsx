import React, { useState } from 'react';
import { Architecture } from './Architecture';
import { LayoutGrid, MessageCircle, Send, Sparkles } from 'lucide-react';
import { askGemini } from '../src/services/geminiService';

export const Module3ArchSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'canvas' | 'chat'>('canvas');
  const [chatInput, setChatInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { 
      sender: 'ai', 
      text: "Greetings. I am David Wright, your AI Principal Architect advisor. Stressed about loads balancing or spacing aesthetics? Ask me anything!" 
    }
  ]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');
    setIsTyping(true);

    const systemInstruction = "You are David Wright, a Senior Principal Architect advisor. You help students build structural blueprints, load distribution columns, and architectural physics. Keep replies concise and insightful.";

    askGemini(userText, systemInstruction).then(reply => {
      setChatHistory(prev => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    });
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.4s ease' }}>
      
      {/* Header Controls */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LayoutGrid style={{ color: 'hsl(var(--primary))' }} /> Module 3: Architectural Design Canvas
          </h2>
          <span style={{ fontSize: '0.85rem', color: 'hsl(var(--text-secondary))' }}>
            Layout load bearings, construct horizontal supports, and audit architectural wind shear.
          </span>
        </div>

        {/* Tab selector */}
        <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.15)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid hsla(var(--border-glass))' }}>
          <button
            onClick={() => setActiveTab('canvas')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'canvas' ? 'hsl(var(--primary))' : 'transparent',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'var(--transition-fast)'
            }}
          >
            <LayoutGrid size={14} /> Blueprint Canvas
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: activeTab === 'chat' ? 'hsl(var(--primary))' : 'transparent',
              color: '#fff',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'var(--transition-fast)'
            }}
          >
            <MessageCircle size={14} /> Architect Advisor Chat
          </button>
        </div>
      </div>

      {activeTab === 'canvas' ? (
        <Architecture />
      ) : (
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '480px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} style={{ color: 'hsl(var(--warning))' }} /> David Wright (Principal Architect)
          </h3>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '8px', marginBottom: '16px' }}>
            {chatHistory.map((msg, idx) => (
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
                David is typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              className="glass-input" 
              placeholder="Ask an architectural design question..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1, padding: '10px 16px', fontSize: '0.85rem' }}
            />
            <button className="btn-primary" style={{ padding: '10px 16px' }} type="submit">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default Module3ArchSandbox;
