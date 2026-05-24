import React, { useState, useEffect } from 'react';

// --- Helper: Generate Strategy-Backed Script Templates ---
const generate30DayScripts = (niche, platform) => {
  const categories = [
    { type: 'Hook: Negative Constraint', template: 'Stop doing [Mistake] if you want to win in {{niche}}.' },
    { type: 'Educational: The Step-by-Step', template: 'How to get [Result] in {{niche}} using this 3-step AI workflow.' },
    { type: 'Viral: The Polarizing Take', template: 'Unpopular opinion: Most creators in {{niche}} are lying to you about...' },
    { type: 'Trust: The Case Study', template: 'I analyzed 100 accounts in {{niche}} and found this one pattern.' },
    { type: 'Sales: The Soft Sell', template: 'If you are struggling with {{niche}}, I built this tool to save you 10 hours a week.' }
  ];
  
  const selectedPlatform = Array.isArray(platform) ? platform[0] : platform;

  return Array.from({ length: 30 }, (_, i) => {
    const cat = categories[i % categories.length];
    return {
      day: i + 1,
      type: cat.type,
      script: cat.template.replace('{{niche}}', niche || 'your niche'),
      status: 'Ready'
    };
  });
};

// --- Profile / Billing Component ---
const Profile = ({ data, setData, onBack, onRequiz }) => {
  const [localName, setLocalName] = useState(data?.name || 'Creator');
  const [localNiche, setLocalNiche] = useState(data?.niche || '');

  const saveProfile = () => {
    setData({ ...data, name: localName, niche: localNiche });
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 animate-in slide-in-from-right-4 duration-500">
      <button onClick={onBack} className="text-zinc-500 mb-8 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center">
        ← Back to Console
      </button>
      <h2 className="text-3xl font-bold mb-8 italic uppercase tracking-tighter text-zinc-100">Profile <span className="text-gradient">& Settings</span></h2>
      
      <div className="space-y-6">
        {/* Identity Section */}
        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5 space-y-6">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Creator Identity</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-600 ml-1">Display Name</label>
              <input 
                type="text" 
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 mt-1 outline-none focus:border-brand-primary transition-all font-light"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-600 ml-1">Current Niche</label>
              <input 
                type="text" 
                value={localNiche}
                onChange={(e) => setLocalNiche(e.target.value)}
                className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 mt-1 outline-none focus:border-brand-primary transition-all font-light"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveProfile} className="flex-1 bg-white text-black py-3 rounded-xl text-xs font-black uppercase hover:bg-zinc-200 transition-all">Save Changes</button>
              <button onClick={onRequiz} className="flex-1 border border-zinc-800 py-3 rounded-xl text-xs font-bold uppercase hover:bg-white/5 transition-all">Full Re-Calibration</button>
            </div>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Subscription Plan</h3>
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-bold">Standard Bundle</div>
              <div className="text-xs text-zinc-500">One-time purchase ($47)</div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-bold border border-brand-primary/20">Active</button>
          </div>
        </div>

        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-white/5">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Billing History</h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-400 font-light">May 24, 2024</span>
              <span className="text-zinc-200 font-medium">FacelessOS Bundle</span>
              <span className="text-brand-primary font-bold tracking-tighter">PAID</span>
            </div>
            <button className="text-xs font-bold text-brand-secondary hover:underline underline-offset-4 pt-2">Manage in Stripe →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
const Dashboard = ({ answers, setView }) => {
  const [activeTab, setActiveTab] = useState('strategy');
  const [isGenerating, setIsGenerating] = useState(true);
  const [scripts, setScripts] = useState([]);
  const [goalExpansion, setGoalExpansion] = useState('');

  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setScripts(generate30DayScripts(answers?.niche || 'Demo', answers?.platform));
      setIsGenerating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [answers]);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin mb-8 shadow-brand" />
        <h2 className="text-xl font-bold tracking-tighter uppercase italic">Recalibrating <span className="text-gradient">OS CORE</span></h2>
        <p className="text-zinc-500 mt-2 font-light text-sm max-w-xs mx-auto">Analyzing new parameters and optimizing your viral roadmap...</p>
      </div>
    );
  }

  const platforms = Array.isArray(answers?.platform) ? answers.platform.join(', ') : answers?.platform;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-2">
        <div className="p-6 rounded-[2rem] bg-zinc-900/50 border border-white/5 mb-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => setView('profile')} className="text-zinc-500 hover:text-white">⚙️</button>
          </div>
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Active Profile</div>
          <div className="text-lg font-bold text-zinc-100 truncate mb-1">{answers?.name || 'Creator'}</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{answers?.niche}</div>
          <div className="text-[9px] text-brand-secondary mt-1 uppercase font-black">{platforms}</div>
        </div>
        
        {[
          { id: 'strategy', label: 'Master Strategy', icon: '🎯' },
          { id: 'scripts', label: '30-Day Scripts', icon: '📝' },
          { id: 'visuals', label: 'Visual DNA', icon: '🎨' },
          { id: 'pro', label: 'AI Support (PRO)', icon: '⚡' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${
              activeTab === tab.id ? 'bg-gradient-brand text-white shadow-brand' : 'hover:bg-white/5 text-zinc-500'
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span className="font-bold text-[11px] uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="lg:col-span-3 space-y-6">
        <div className="p-8 md:p-12 rounded-[3rem] bg-zinc-900/30 border border-white/5 backdrop-blur-xl min-h-[600px] relative overflow-hidden">
          
          {activeTab === 'strategy' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100">Growth <span className="text-brand-primary">Blueprint</span></h2>
                <button onClick={() => setView('quiz')} className="text-[9px] font-black border border-zinc-800 px-4 py-2 rounded-full uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Edit Parameters</button>
              </div>
              
              {/* Goal Expander Section */}
              <div className="mb-10 p-8 rounded-[2rem] bg-brand-primary/5 border border-brand-primary/10">
                <h3 className="text-xs font-bold text-brand-primary uppercase mb-4 tracking-widest">Refine Your Strategy</h3>
                <p className="text-sm text-zinc-400 mb-6 font-light leading-relaxed italic">"Describe your deep goals (e.g. 'I want to reach 10k followers in 30 days selling an AI course')."</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type your target mission..." 
                    className="flex-1 bg-black/40 border border-zinc-800 rounded-xl px-4 py-4 text-sm outline-none focus:border-brand-primary transition-all font-light"
                    value={goalExpansion}
                    onChange={(e) => setGoalExpansion(e.target.value)}
                  />
                  <button className="bg-white text-black px-6 py-4 rounded-xl text-[10px] font-black uppercase hover:bg-zinc-200 transition-all shadow-xl">Recalibrate</button>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 mb-8">
                  <h3 className="text-brand-primary font-bold text-[10px] uppercase mb-2 tracking-widest">Core Strategy</h3>
                  <p className="text-lg text-zinc-200 italic font-light">"Position the {answers?.niche} channel as the premier destination for high-value {platforms} content through aggressive myth-busting and visual authority."</p>
                </div>
                <h4 className="text-white font-bold text-xs uppercase mb-4 tracking-widest">Phase 1: Authority Building (Days 1-10)</h4>
                <p className="text-zinc-400 mb-8 font-light leading-relaxed">Focus on high-value "Take-downs" of common myths in the {answers?.niche} niche. Use high-contrast text overlays and minimal lo-fi backgrounds.</p>
                <h4 className="text-white font-bold text-xs uppercase mb-4 tracking-widest">Phase 2: Viral Velocity (Days 11-20)</h4>
                <p className="text-zinc-400 font-light leading-relaxed">Introduce "The Gap" hooks for {platforms}. Purposefully leave out one minor detail to drive comments and engagement.</p>
              </div>
            </div>
          )}

          {activeTab === 'scripts' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-8">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100">30-Day <span className="text-brand-secondary">Production Queue</span></h2>
                <button className="text-[10px] font-bold bg-white text-black px-6 py-3 rounded-full uppercase tracking-widest hover:opacity-80 transition-all shadow-xl">Export CSV</button>
              </div>
              <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {scripts.map(s => (
                  <div key={s.day} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-secondary/20 transition-all group">
                    <div className="flex justify-between mb-3">
                      <span className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em]">Day {s.day} • {s.type}</span>
                      <span className="text-[10px] font-bold text-zinc-600 uppercase group-hover:text-zinc-400 transition-colors">Tailored</span>
                    </div>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed">"{s.script}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'pro' && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 rounded-3xl bg-brand-primary/10 flex items-center justify-center text-4xl mb-8 animate-pulse shadow-brand border border-brand-primary/20">🤖</div>
              <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">AI Support is <span className="text-gradient">Locked</span></h2>
              <p className="text-zinc-500 max-w-sm mx-auto font-light text-base mb-10 leading-relaxed">
                Upgrade to the <span className="text-zinc-200">FacelessOS Pro Subscription</span> to unlock your 24/7 Personal CCO and weekly strategy re-calibrations.
              </p>
              <button className="px-12 py-5 bg-gradient-brand rounded-full font-bold text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all active:scale-95">
                Upgrade to Pro — $19/mo
              </button>
            </div>
          )}

          {activeTab === 'visuals' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-3xl font-bold mb-10 italic uppercase tracking-tighter text-zinc-100">Visual <span className="text-brand-primary">Assets</span></h2>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { t: 'The "Ghost" Aesthetic', p: `Minimalist desk, high-grain 35mm film texture, focused shadows, ${answers?.vibe} color grade.` },
                  { t: 'Dynamic Typography', p: `Bold Helvetica, tracking -5%, white on high-contrast black backgrounds.` },
                  { t: 'Color Palette', p: `Dominant Hex: #000000, Accent Hex: ${answers?.vibe.includes('Dark') ? '#8B5CF6' : '#3B82F6'}, Tertiary: #FFFFFF` }
                ].map((v, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 group hover:border-brand-primary/30 transition-all">
                    <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-4">{v.t}</h3>
                    <p className="text-zinc-400 text-sm font-light italic leading-relaxed bg-black/40 p-4 rounded-xl border border-zinc-800">"{v.p}"</p>
                    <button className="mt-4 text-[10px] font-bold text-zinc-600 hover:text-white uppercase tracking-widest transition-colors">Copy Prompt</button>
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

// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('quiz');
  const [data, setData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setView('dashboard');
    }
  }, []);

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
        <div className="hidden md:flex space-x-12 text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">
          <span className={`${view === 'dashboard' ? 'text-white' : 'hover:text-zinc-200'} transition-colors cursor-pointer`} onClick={() => setView('dashboard')}>Console</span>
          <span className={`${view === 'profile' ? 'text-white' : 'hover:text-zinc-200'} transition-colors cursor-pointer`} onClick={() => setView('profile')}>Account</span>
          <span className="hover:text-zinc-200 transition-colors cursor-pointer">Archive</span>
        </div>
      </nav>

      <main className="relative z-10">
        {view === 'quiz' && <Quiz onComplete={(ans) => { setData(ans); setView('results'); }} existingData={data} />}
        {view === 'results' && <Results answers={data} onUnlock={() => setView('dashboard')} />}
        {view === 'dashboard' && <Dashboard setView={setView} answers={data} />}
        {view === 'profile' && <Profile data={data} setData={setData} onBack={() => setView('dashboard')} onRequiz={() => setView('quiz')} />}
      </main>

      <footer className="relative z-10 py-20 text-center text-zinc-800 text-[9px] font-bold tracking-[0.5em] uppercase">
        © 2024 FacelessOS Research Division
      </footer>
    </div>
  );
}

// --- Quiz Component ---
const Quiz = ({ onComplete, existingData }) => {
  const questions = [
    { id: 'name', text: 'What is your creator name?', type: 'text', placeholder: 'e.g. Digital Nomads, Stoic Soul...' },
    { id: 'niche', text: 'What is your niche?', type: 'text', placeholder: 'e.g. AI Tools, Stoicism, Parenting...' },
    { id: 'goal', text: 'Primary goal?', type: 'multi-select', options: ['Affiliate Sales', 'Digital Product', 'Brand Deals', 'Followers Only'] },
    { id: 'platform', text: 'Target Platforms?', type: 'multi-select', options: ['TikTok', 'Instagram', 'Pinterest', 'YouTube'] },
    { id: 'vibe', text: 'The Vibe?', type: 'select', options: ['Aesthetic/Minimalist', 'Dark/Moody', 'Fast/Hype', 'Educational'] },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(existingData || {});
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');

  const currentQuestion = questions[currentStep];

  useEffect(() => {
    if (existingData?.[currentQuestion.id]) {
      if (currentQuestion.type === 'text') setInputValue(existingData[currentQuestion.id]);
      if (currentQuestion.type === 'multi-select') setSelectedOptions(existingData[currentQuestion.id]);
    }
  }, [currentStep, existingData, currentQuestion.id]);

  const handleNext = (val) => {
    let finalValue = val;
    if (currentQuestion.type === 'text') finalValue = inputValue;
    else if (currentQuestion.type === 'multi-select') {
      finalValue = [...selectedOptions];
      if (showOtherInput && otherValue) finalValue.push(otherValue);
    } else if (currentQuestion.type === 'select') {
      if (showOtherInput && otherValue) finalValue = otherValue;
    }

    if (!finalValue || (Array.isArray(finalValue) && finalValue.length === 0)) {
      if (currentQuestion.type !== 'text' || !inputValue) return;
    }
    
    const newAnswers = { ...answers, [currentQuestion.id]: finalValue };
    setAnswers(newAnswers);
    setInputValue('');
    setSelectedOptions([]);
    setShowOtherInput(false);
    setOtherValue('');
    
    if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1);
    else onComplete(newAnswers);
  };

  const toggleOption = (opt) => {
    if (selectedOptions.includes(opt)) setSelectedOptions(selectedOptions.filter(o => o !== opt));
    else setSelectedOptions([...selectedOptions, opt]);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 md:mt-24 px-4 pb-20">
      <div className="relative p-10 md:p-12 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-secondary/10 blur-[100px] rounded-full" />
        <div className="relative">
          <div className="flex items-center justify-between mb-12">
            <span className="text-[10px] font-bold tracking-[0.4em] text-zinc-500 uppercase">Phase {currentStep + 1} of {questions.length}</span>
            <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-brand transition-all duration-700 ease-out shadow-brand" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-medium mb-10 tracking-tight text-zinc-100">{currentQuestion.text}</h2>
          
          {currentQuestion.type === 'text' && (
            <input autoFocus className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl outline-none focus:border-brand-primary transition-all duration-300 placeholder:text-zinc-800 font-light" placeholder={currentQuestion.placeholder} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNext()} />
          )}

          {(currentQuestion.type === 'select' || currentQuestion.type === 'multi-select') && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map(opt => (
                <button key={opt} onClick={() => currentQuestion.type === 'multi-select' ? toggleOption(opt) : handleNext(opt)} className={`group flex items-center justify-between p-6 rounded-2xl border transition-all duration-200 text-left ${selectedOptions.includes(opt) ? 'bg-brand-primary/20 border-brand-primary/50' : 'border-white/[0.03] bg-white/[0.02] hover:bg-white/[0.05]'}`}>
                  <span className={`font-medium text-sm tracking-wide ${selectedOptions.includes(opt) ? 'text-white' : 'text-zinc-400 group-hover:text-white'}`}>{opt}</span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedOptions.includes(opt) ? 'border-brand-primary shadow-brand' : 'border-zinc-800'}`}>
                    <div className={`w-2 h-2 rounded-full bg-brand-primary transition-opacity ${selectedOptions.includes(opt) ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </button>
              ))}
              {!showOtherInput ? (
                <button onClick={() => setShowOtherInput(true)} className="p-6 rounded-2xl border border-dashed border-zinc-800 text-zinc-600 hover:text-zinc-400 hover:border-zinc-700 transition-all text-left text-xs font-bold uppercase tracking-widest">+ Other / Custom</button>
              ) : (
                <input autoFocus className="w-full bg-white/[0.02] border border-brand-primary/30 rounded-2xl p-6 text-zinc-200 outline-none placeholder:text-zinc-800 font-light italic" placeholder="Type your custom option..." value={otherValue} onChange={(e) => setOtherValue(e.target.value)} />
              )}
            </div>
          )}

          <div className="mt-12">
            <button onClick={() => handleNext()} className="w-full py-5 rounded-2xl bg-gradient-brand font-bold text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity shadow-brand active:scale-[0.98] transform">
              {currentStep === questions.length - 1 ? 'Generate My OS' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Results Component ---
const Results = ({ answers, onUnlock }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-1000">
      <div className="text-center mb-20 relative">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-bold text-[10px] tracking-[0.3em] mb-8 uppercase animate-pulse">
          Neural Analysis Complete
        </div>
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tighter">
          Niche Potential: <span className="font-bold text-gradient italic">8.5 / 10</span>
        </h1>
        <p className="text-zinc-500 font-light text-xl">
          The <span className="text-zinc-200 border-b border-brand-primary/30">{answers?.niche}</span> market is currently in a "Breakout" phase.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { title: 'Viral Strategy', desc: 'Leverage "The Gap" in current competitor hooks.' },
          { title: 'Aesthetic DNA', desc: `${answers?.vibe} color grading with lo-fi grain.` },
          { title: 'Growth Loop', desc: 'Optimize for "Shareability" via polarized takes.' }
        ].map((win, i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5">
            <h3 className="text-[10px] font-black text-zinc-500 mb-3 uppercase tracking-[0.2em]">{win.title}</h3>
            <p className="text-zinc-300 font-light leading-relaxed text-sm">{win.desc}</p>
          </div>
        ))}
      </div>

      {!isSubmitted ? (
        <div className="max-w-2xl mx-auto p-10 md:p-16 rounded-[3rem] bg-zinc-900/50 border border-white/5 text-center relative overflow-hidden mb-24 shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl rounded-full" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-semibold mb-4 tracking-tight">Send report to your inbox?</h2>
            <p className="text-zinc-500 mb-10 font-light text-base">Enter your email to save these results and get a custom 0-1k roadmap.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="you@example.com" className="flex-1 bg-black/50 border border-zinc-800 rounded-2xl px-6 py-5 outline-none focus:border-brand-primary transition-all font-light" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button onClick={() => setIsSubmitted(true)} className="bg-white text-black px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors whitespace-nowrap">Send Report</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 mb-24 bg-brand-primary/5 rounded-[3rem] border border-brand-primary/10 animate-in zoom-in-95 duration-500">
          <div className="text-5xl mb-6">📩</div>
          <h2 className="text-3xl font-semibold text-zinc-200 mb-2">Report Sent.</h2>
          <p className="text-zinc-500 font-light">Check your inbox for your niche deep-dive.</p>
        </div>
      )}

      <div className="relative p-[1px] rounded-[3rem] bg-gradient-brand shadow-brand overflow-hidden">
        <div className="p-12 md:p-20 rounded-[2.95rem] bg-black text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter leading-[1.1] uppercase">Automate your next <br/> <span className="text-gradient italic">30 days of content</span></h2>
            <p className="mb-12 text-zinc-400 text-lg max-w-lg mx-auto font-light leading-relaxed italic">Unlock 30 custom scripts, your unique visual prompt library, and the exact schedule to hit 1k followers in record time.</p>
            <button onClick={onUnlock} className="px-14 py-6 bg-gradient-brand rounded-full font-black text-sm uppercase tracking-[0.3em] hover:scale-[1.02] transition-transform shadow-2xl active:scale-95 shadow-brand">Unlock Full Blueprint — $47</button>
            <div className="mt-10 flex items-center justify-center space-x-8 text-[10px] font-bold text-zinc-700 tracking-[0.3em] uppercase">
              <span>Beta Access</span><span>•</span><span>Verified AI Strategy</span>
            </div>
        </div>
      </div>
    </div>
  );
};
