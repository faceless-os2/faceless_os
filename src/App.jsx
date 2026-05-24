import React, { useState, useEffect } from 'react';

// --- Dashboard Component ---
const Dashboard = ({ answers }) => {
  const [activeTab, setActiveTab] = useState('strategy');
  const [chatMessage, setChatMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsGenerating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin mb-8" />
        <h2 className="text-2xl font-bold tracking-tighter uppercase italic">Initializing Your <span className="text-gradient">Personal CCO</span></h2>
        <p className="text-zinc-500 mt-2 font-light">Analyzing {answers.niche} algorithm data and tailoring your 30-day roadmap...</p>
      </div>
    );
  }

  const platforms = Array.isArray(answers.platform) ? answers.platform.join(', ') : answers.platform;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8 animate-in fade-in duration-700">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-1 space-y-2">
        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 mb-8">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Active Profile</div>
          <div className="text-lg font-bold text-gradient truncate">{answers.niche}</div>
          <div className="text-xs text-zinc-400 mt-1 uppercase">{platforms} • {answers.vibe}</div>
        </div>
        
        {[
          { id: 'strategy', label: 'Master Strategy', icon: '🎯' },
          { id: 'scripts', label: '30-Day Scripts', icon: '📝' },
          { id: 'visuals', label: 'Visual Library', icon: '🎨' },
          { id: 'chat', label: 'CCO Chat', icon: '🤖' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all ${
              activeTab === tab.id ? 'bg-gradient-brand text-white shadow-brand' : 'hover:bg-white/5 text-zinc-400'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-bold text-sm uppercase tracking-tight">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-6">
        <div className="p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-xl min-h-[600px] relative overflow-hidden">
          {activeTab === 'strategy' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold mb-6 italic uppercase tracking-tighter">Your <span className="text-brand-primary">Growth Engine</span></h2>
              <div className="prose prose-invert max-w-none">
                <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 mb-8">
                  <h3 className="text-brand-primary font-bold text-sm uppercase mb-2">The North Star</h3>
                  <p className="text-lg text-zinc-200 italic">"Dominate the {answers.niche} space by positioning yourself as the only transparent, data-driven authority for {platforms} users."</p>
                </div>
                <h4 className="text-white font-bold mb-4">Phase 1: Authority Building (Days 1-10)</h4>
                <p className="text-zinc-400 mb-6 font-light italic">Targeting: {platforms}</p>
                <p className="text-zinc-400 mb-6 font-light leading-relaxed">Focus on high-value "Take-downs" of common myths in the {answers.niche} niche. Use high-contrast text overlays and minimal lo-fi backgrounds.</p>
                <h4 className="text-white font-bold mb-4">Phase 2: Viral Velocity (Days 11-20)</h4>
                <p className="text-zinc-400 font-light leading-relaxed">Introduce "The Gap" hooks. Purposefully leave out one minor detail to drive comments and engagement.</p>
              </div>
            </div>
          )}

          {activeTab === 'scripts' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter">Script <span className="text-brand-secondary">Bank</span></h2>
                <button className="text-[10px] font-bold border border-zinc-700 px-4 py-2 rounded-full hover:bg-white/5 transition-colors uppercase tracking-widest text-zinc-500">Download All (.CSV)</button>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-secondary/30 transition-colors">
                    <div className="flex justify-between mb-4">
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Day {i} • Viral Hook Model</span>
                      <button className="text-brand-secondary text-xs font-bold uppercase hover:underline">Edit</button>
                    </div>
                    <p className="text-zinc-300 font-light leading-relaxed">"Stop doing [Common Mistake] if you want to scale your {answers.niche} profile in 2024. Most creators tell you to..."</p>
                  </div>
                ))}
                <div className="text-center py-8">
                  <p className="text-zinc-600 text-sm italic font-light">+ 27 more scripts optimized for {platforms}...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="flex flex-col h-full animate-in fade-in duration-500">
              <div className="flex-1 space-y-6 overflow-y-auto mb-6 pr-2">
                <div className="flex space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center text-xs font-black italic">OS</div>
                  <div className="flex-1 bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <p className="text-zinc-300 text-sm font-light leading-relaxed">I've finalized your {answers.niche} roadmap for {platforms}. How can I help you refine your first batch of scripts today?</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Ask your CCO anything..."
                  className="w-full bg-black/50 border border-zinc-800 rounded-2xl px-6 py-5 outline-none focus:border-brand-primary transition-all font-light pr-16"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center text-lg hover:scale-105 transition-transform shadow-brand">
                  ↑
                </button>
              </div>
            </div>
          )}

          {activeTab === 'visuals' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-3xl font-bold mb-8 italic uppercase tracking-tighter">Aesthetic <span className="text-brand-primary">Assets</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { t: 'Midjourney Base', p: `Cinematic 4k, ${answers.vibe} lighting, minimal desk setup, macro lens --ar 9:16` },
                  { t: 'Color Grading', p: `Teal & Orange highlights, crushed shadows, 35mm film grain texture.` },
                ].map((v, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5">
                    <h3 className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-3">{v.t}</h3>
                    <p className="text-zinc-300 text-sm font-light italic bg-black/50 p-4 rounded-xl border border-zinc-800">"{v.p}"</p>
                    <button className="mt-4 text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">Copy Prompt</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Quiz Component ---
const Quiz = ({ onComplete }) => {
  const questions = [
    { id: 'niche', text: 'What is your niche?', type: 'text', placeholder: 'e.g. AI Tools, Stoicism...' },
    { id: 'goal', text: 'Primary goal?', type: 'multi-select', options: ['Affiliate Sales', 'Digital Product', 'Brand Deals', 'Followers Only'] },
    { id: 'platform', text: 'Target Platforms?', type: 'multi-select', options: ['TikTok', 'Instagram', 'Pinterest', 'YouTube'] },
    { id: 'vibe', text: 'The Vibe?', type: 'select', options: ['Aesthetic/Minimalist', 'Dark/Moody', 'Fast/Hype', 'Educational'] },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const currentQuestion = questions[currentStep];

  const handleNext = (val) => {
    let finalValue = val;
    
    if (currentQuestion.type === 'text') {
      finalValue = inputValue;
    } else if (currentQuestion.type === 'multi-select') {
      finalValue = [...selectedOptions];
      if (showOtherInput && otherValue) finalValue.push(otherValue);
    } else if (currentQuestion.type === 'select') {
      if (showOtherInput && otherValue) finalValue = otherValue;
    }

    if (!finalValue || (Array.isArray(finalValue) && finalValue.length === 0)) {
      if (currentQuestion.type !== 'text') return;
      if (!inputValue) return;
    }
    
    const newAnswers = { ...answers, [currentQuestion.id]: finalValue };
    setAnswers(newAnswers);
    
    // Reset state for next question
    setInputValue('');
    setSelectedOptions([]);
    setShowOtherInput(false);
    setOtherValue('');
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const toggleOption = (opt) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter(o => o !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 md:mt-24 px-4 pb-20">
      <div className="relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-secondary/10 blur-[100px] rounded-full" />

        <div className="relative">
          <div className="flex items-center justify-between mb-10">
            <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-500 uppercase">Phase {currentStep + 1} of {questions.length}</span>
            <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-brand transition-all duration-700 ease-out" 
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-zinc-100">{currentQuestion.text}</h2>
          
          {currentQuestion.type === 'text' && (
            <div className="space-y-6">
              <input 
                autoFocus
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-xl outline-none focus:border-brand-primary transition-all duration-300 placeholder:text-zinc-800 font-light"
                placeholder={currentQuestion.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
              />
            </div>
          )}

          {(currentQuestion.type === 'select' || currentQuestion.type === 'multi-select') && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map(opt => (
                <button 
                  key={opt}
                  onClick={() => currentQuestion.type === 'multi-select' ? toggleOption(opt) : handleNext(opt)}
                  className={`group flex items-center justify-between p-5 rounded-xl border transition-all duration-200 text-left ${
                    selectedOptions.includes(opt) 
                    ? 'bg-brand-primary/20 border-brand-primary/50' 
                    : 'border-white/[0.03] bg-white/[0.02] hover:bg-white/[0.05]'
                  }`}
                >
                  <span className={`font-medium ${selectedOptions.includes(opt) ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    selectedOptions.includes(opt) ? 'border-brand-primary' : 'border-zinc-700'
                  }`}>
                    <div className={`w-2 h-2 rounded-full bg-brand-primary transition-opacity ${selectedOptions.includes(opt) ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </button>
              ))}
              
              {!showOtherInput ? (
                <button 
                  onClick={() => setShowOtherInput(true)}
                  className="p-5 rounded-xl border border-dashed border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-all text-left text-sm font-medium"
                >
                  + Other / Custom
                </button>
              ) : (
                <input 
                  autoFocus
                  className="w-full bg-white/[0.02] border border-brand-primary/30 rounded-xl p-5 text-zinc-200 outline-none placeholder:text-zinc-700 font-light italic"
                  placeholder="Type your custom option..."
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                />
              )}
            </div>
          )}

          <div className="mt-10">
            <button 
              onClick={() => handleNext()}
              className="w-full py-4 rounded-xl bg-gradient-brand font-semibold text-sm tracking-wider uppercase hover:opacity-90 transition-opacity shadow-brand active:scale-[0.98] transform"
            >
              {currentStep === questions.length - 1 ? 'Generate My OS' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('quiz');
  const [data, setData] = useState(null);

  // Quick-access for testing: Add "?admin=true" to URL to see dashboard
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setView('dashboard');
    }
  }, []);

  const handlePurchase = () => {
    setView('dashboard');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-brand-primary selection:text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto">
        <span className="font-bold text-2xl tracking-tighter uppercase italic cursor-pointer" onClick={() => setView('quiz')}>
          FACELESS<span className="text-gradient not-italic uppercase font-black">OS</span>
        </span>
        <div className="hidden md:flex space-x-10 text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">
          <span className={`${view === 'dashboard' ? 'text-white underline decoration-brand-primary underline-offset-8' : ''} cursor-pointer`} onClick={() => setView('dashboard')}>Console</span>
          <span className="hover:text-zinc-200 transition-colors cursor-pointer">Science</span>
          <span className="hover:text-zinc-200 transition-colors cursor-pointer">Access</span>
        </div>
      </nav>

      <main className="relative z-10">
        {view === 'quiz' && <Quiz onComplete={(ans) => { setData(ans); setView('results'); }} />}
        {view === 'results' && <Results answers={data} onUnlock={handlePurchase} />}
        {view === 'dashboard' && <Dashboard answers={data || { niche: 'Stoicism', platform: ['TikTok', 'Instagram'], vibe: 'Dark/Moody' }} />}
      </main>

      <footer className="relative z-10 py-16 text-center text-zinc-700 text-[9px] font-bold tracking-[0.5em] uppercase">
        © 2024 FacelessOS Research Division
      </footer>
    </div>
  );
}

// --- Results Component ---
const Results = ({ answers, onUnlock }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-1000">
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-medium text-[11px] tracking-widest mb-6 uppercase">
          Neural Analysis Complete
        </div>
        <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
          Niche Potential: <span className="font-bold text-gradient italic">8.5 / 10</span>
        </h1>
        <p className="text-zinc-500 font-light text-lg">
          The <span className="text-zinc-200">{answers?.niche}</span> market is currently in a "Breakout" phase.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {[
          { title: 'Viral Strategy', desc: 'Leverage "The Gap" in current competitor hooks.' },
          { title: 'Aesthetic DNA', desc: `${answers?.vibe} color grading with lo-fi grain.` },
          { title: 'Growth Loop', desc: 'Optimize for "Shareability" via polarized takes.' }
        ].map((win, i) => (
          <div key={i} className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
            <h3 className="text-sm font-semibold text-zinc-400 mb-2 uppercase tracking-wider">{win.title}</h3>
            <p className="text-zinc-300 font-light leading-relaxed">{win.desc}</p>
          </div>
        ))}
      </div>

      {!isSubmitted ? (
        <div className="max-w-2xl mx-auto p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 text-center relative overflow-hidden mb-20 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-tight">Send report to your inbox?</h2>
            <p className="text-zinc-500 mb-8 font-light text-sm">Enter your email to save these results and get a custom 0-1k roadmap.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-black/50 border border-zinc-800 rounded-xl px-6 py-4 outline-none focus:border-brand-primary transition-all font-light"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                onClick={() => setIsSubmitted(true)}
                className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors whitespace-nowrap"
              >
                Send Report
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 mb-20 bg-brand-primary/5 rounded-[2.5rem] border border-brand-primary/10 animate-in zoom-in-95 duration-500">
          <div className="text-4xl mb-4">📩</div>
          <h2 className="text-2xl font-semibold text-zinc-200">Report Sent.</h2>
          <p className="text-zinc-500 font-light">Check your inbox for your niche deep-dive.</p>
        </div>
      )}

      <div className="relative p-[1px] rounded-[2.5rem] bg-gradient-brand shadow-brand overflow-hidden">
        <div className="p-10 md:p-16 rounded-[2.45rem] bg-black text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">
              Automate your next <br/> <span className="text-gradient">30 days of content</span>
            </h2>
            <p className="mb-10 text-zinc-400 text-lg max-w-lg mx-auto font-light leading-relaxed italic">
              Unlock 30 custom scripts, your unique visual prompt library, and the exact schedule to hit 1k followers in record time.
            </p>
            <button 
              onClick={onUnlock}
              className="px-12 py-5 bg-gradient-brand rounded-full font-bold text-lg tracking-tight hover:scale-[1.02] transition-transform shadow-2xl active:scale-95 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
            >
              Unlock Full Blueprint — $47
            </button>
            <div className="mt-8 flex items-center justify-center space-x-6 text-[10px] font-bold text-zinc-600 tracking-[0.2em] uppercase">
              <span>Beta Access</span>
              <span>•</span>
              <span>Verified AI Strategy</span>
            </div>
        </div>
      </div>
    </div>
  );
};
