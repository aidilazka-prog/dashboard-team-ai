import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Zap, FileText, Target, CheckSquare } from 'lucide-react';
import './AiAssistant.css';

const QUICK_ACTIONS = [
  { icon: CheckSquare, label: 'Create task from text', color: 'var(--accent-blue)' },
  { icon: FileText, label: 'Summarize meeting', color: 'var(--accent-green)' },
  { icon: Target, label: 'Check OKR health', color: 'var(--accent-amber)' },
  { icon: Zap, label: 'Prioritize my tasks', color: 'var(--accent-purple)' },
];

const INITIAL_MESSAGES = [
  {
    id: 1, role: 'assistant',
    content: "Hi Aidil! 👋 I'm your AI assistant. I can help you create tasks, summarize meetings, check OKR progress, and prioritize your work. What would you like to do?",
    time: '22:15',
  },
];

export default function AiAssistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', content: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulated AI response
    setTimeout(() => {
      const responses = [
        "I've analyzed your current tasks. Here's what I recommend:\n\n**High Priority:**\n1. Complete CI/CD pipeline setup (due Mar 22)\n2. Finish auth API endpoints (due Mar 20)\n\n**Can be deferred:**\n- User onboarding flow → move to Sprint 5\n- OKR progress dashboard → depends on OKR tracker design",
        "Based on your sprint velocity, here are some insights:\n\n📊 **Sprint Progress:** 42% complete\n⚠️ **At Risk:** 3 tasks may miss deadlines\n✅ **Completed:** 2 tasks this week\n\nWould you like me to suggest timeline adjustments?",
        "I've created a task summary for you:\n\n• **Backlog:** 3 tasks\n• **To Do:** 4 tasks\n• **In Progress:** 2 tasks\n• **Review:** 2 tasks\n• **Done:** 1 task\n\nYour team's workload looks balanced. Budi has the most active tasks (3).",
      ];
      const aiMsg = {
        id: Date.now() + 1, role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1200);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="ai-assistant">
      <div className="ai-assistant__header animate-slide-up">
        <div className="ai-assistant__header-icon">
          <Sparkles size={24} />
        </div>
        <div>
          <h1 className="ai-assistant__title">AI Assistant</h1>
          <p className="text-sm text-secondary">Powered by AI · Context-aware</p>
        </div>
      </div>

      <div className="ai-assistant__quick-actions animate-slide-up" style={{ animationDelay: '100ms' }}>
        {QUICK_ACTIONS.map((action, i) => (
          <button key={i} className="ai-assistant__quick-action glass-card">
            <action.icon size={18} style={{ color: action.color }} />
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>

      <div className="ai-assistant__chat glass-card-static">
        <div className="ai-assistant__messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-msg ${msg.role === 'user' ? 'ai-msg--user' : 'ai-msg--assistant'}`}>
              {msg.role === 'assistant' && (
                <div className="ai-msg__avatar">
                  <Sparkles size={14} />
                </div>
              )}
              <div className="ai-msg__content">
                <div className="ai-msg__bubble">
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i}>
                      {line.startsWith('**') ? <strong>{line.replace(/\*\*/g, '')}</strong> : line}
                      {i < msg.content.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
                <span className="ai-msg__time">{msg.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="ai-assistant__input-area">
          <textarea
            className="ai-assistant__input"
            placeholder="Ask me anything about your tasks, projects, or meetings..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="ai-assistant__send btn-primary"
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
