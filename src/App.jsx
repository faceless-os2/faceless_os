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
              <div className="text-xs text-zinc-500">One-time purchase ($27)</div>
            </div>
            <button className="px-4 py-2 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-bold border border-brand-primary/20">Active</button>
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
      <div className="lg:col-span-1 space-y-2">
        <div className="p-6 rounded-[2rem] bg-zinc-900/50 border border-white/5 mb-6 relative overflow-hidden group">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Active Profile</div>
          <div className="text-lg font-bold text-zinc-100 truncate mb-1">{answers?.name || 'Creator'}</div>
          <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{answers?.niche}</div>
          <div className="text-[9px] text-brand-secondary mt-1 uppercase font-black">{platforms}</div>
        </div>
        {[
          { id: 'strategy', label: 'Master Strategy', icon: '🎯' },
          { id: 'scripts', label: '30-Day Scripts', icon: '📝' },
          { id: 'visuals', label: 'Visual DNA', icon: '🎨' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all ${activeTab === tab.id ? 'bg-gradient-brand text-white shadow-brand' : 'hover:bg-white/5 text-zinc-500'}`}>
            <span className="text-sm">{tab.icon}</span>
            <span className="font-bold text-[11px] uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="lg:col-span-3 space-y-6">
        <div className="p-8 md:p-12 rounded-[3rem] bg-zinc-900/30 border border-white/5 backdrop-blur-xl min-h-[600px] relative overflow-hidden">
          {activeTab === 'strategy' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100">Growth <span className="text-brand-primary">Blueprint</span></h2>
                <button onClick={() => setView('quiz')} className="text-[9px] font-black border border-zinc-800 px-4 py-2 rounded-full uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Edit Parameters</button>
              </div>
              <div className="mb-10 p-8 rounded-[2rem] bg-brand-primary/5 border border-brand-primary/10">
                <h3 className="text-xs font-bold text-brand-primary uppercase mb-4 tracking-widest">Refine Your Strategy</h3>
                <div className="flex flex-col gap-4">
                  <input type="text" placeholder="Type your target mission..." className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-4 text-sm outline-none focus:border-brand-primary transition-all font-light" value={goalExpansion} onChange={(e) => setGoalExpansion(e.target.value)} />
                  <button className="w-full bg-white text-black px-6 py-4 rounded-xl text-[10px] font-black uppercase hover:bg-zinc-200 transition-all shadow-xl">Recalibrate</button>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 mb-8">
                  <h3 className="text-brand-primary font-bold text-[10px] uppercase mb-2 tracking-widest">Core Strategy</h3>
                  <p className="text-lg text-zinc-200 italic font-light">"Position the {answers?.niche} channel as the premier destination for high-value content through aggressive myth-busting and visual authority."</p>
                </div>
                <h4 className="text-white font-bold text-xs uppercase mb-4 tracking-widest">Phase 1: Authority Building (Days 1-10)</h4>
                <p className="text-zinc-400 mb-8 font-light leading-relaxed text-sm">Focus on high-value "Take-downs" of common myths in the {answers?.niche} niche.</p>
              </div>
            </div>
          )}
          {activeTab === 'scripts' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-8">
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100">30-Day <span className="text-brand-secondary">Production Queue</span></h2>
              </div>
              <div className="grid grid-cols-1 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {scripts.map(s => (
                  <div key={s.day} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-secondary/20 transition-all group">
                    <span className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-2 block">Day {s.day} • {s.type}</span>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed">"{s.script}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'visuals' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-bold mb-10 italic uppercase tracking-tighter text-zinc-100">Visual <span className="text-brand-primary">Assets</span></h2>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { t: 'The "Ghost" Aesthetic', p: `Minimalist desk, focused shadows, ${answers?.vibe} color grade.` },
                  { t: 'Dynamic Typography', p: `Bold Helvetica, tracking -5%, white on black.` },
                ].map((v, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 group transition-all">
                    <h3 className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-4">{v.t}</h3>
                    <p className="text-zinc-400 text-sm font-light italic leading-relaxed bg-black/40 p-4 rounded-xl">"{v.p}"</p>
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

// --- Sales Page Component ---
const SalesPage = ({ answers, onUnlock }) => {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-bold tracking-widest uppercase mb-6">
          ⚠️ Special Offer Expires In: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic">Strategy is Step 1.<br/><span className="text-gradient">Automation is Step 2.</span></h1>
        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          You have the niche. You have the roadmap. But 99% of creators fail because they spend 10 hours a week struggling with <span className="text-white border-b border-brand-primary">writing and prompts</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {[
          { icon: '📝', t: '30 Viral Scripts', d: `Custom-tuned for the ${answers?.niche} niche. Every script includes a high-retention hook, a value-bridge, and a strategic CTA.` },
          { icon: '🎨', t: 'Visual DNA Prompt Library', d: 'The exact Midjourney and DALL-E prompts to create that "Ghost Creator" aesthetic that stops the scroll.' },
          { icon: '📅', t: 'The 30-Day Production Map', d: 'Exactly when to post, how to sequence your content, and how to use "The Gap" strategy for maximum comments.' },
          { icon: '🚀', t: 'First 1,000 Roadmap', d: 'A step-by-step checklist to take your new account from 0 to 1,000 followers in 30 days or less.' }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-[3rem] bg-zinc-900/50 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{item.icon}</div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter italic">{item.t}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.d}</p>
          </div>
        ))}
      </div>

      <div className="relative p-10 md:p-20 rounded-[4rem] bg-zinc-900 border border-brand-primary shadow-brand text-center overflow-hidden">
         <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
         <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">Get the Full <span className="text-gradient">FacelessOS Bundle</span></h2>
            <div className="flex items-center justify-center space-x-4 mb-10">
                <span className="text-zinc-600 line-through text-2xl font-light">$97</span>
                <span className="text-white text-6xl font-black tracking-tighter">$27</span>
            </div>
            <button onClick={onUnlock} className="w-full md:w-auto px-16 py-6 bg-gradient-brand rounded-full font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-brand mb-8">Unlock Everything Now</button>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Instant Dashboard Access • Lifetime Updates • One-Time Payment</p>
         </div>
      </div>
    </div>
  );
};

// --- Results Component ---
const Results = ({ answers, onEmailSubmit, onUnlock }) => {
  const [isResearching, setIsResearching] = useState(true);
  const [researchStatus, setResearchStatus] = useState('Initializing Neural Core...');
  const [score, setScore] = useState(0);
  const [customData, setCustomData] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const researchSteps = [
      { msg: `Scanning TikTok for #${answers?.niche?.replace(/\s/g, '')} trends...`, delay: 1000 },
      { msg: `Analyzing saturation...`, delay: 1000 },
      { msg: `Finalizing Viral Blueprint...`, delay: 1000 }
    ];

    let currentStep = 0;
    const runResearch = async () => {
      for (const step of researchSteps) {
        setResearchStatus(step.msg);
        await new Promise(r => setTimeout(r, step.delay));
      }
      
      const niche = answers?.niche?.toLowerCase() || '';
      let calculatedScore = parseFloat((Math.random() * (9.8 - 7.2) + 7.2).toFixed(1));
      
      if (niche.includes('ai') || niche.includes('tech') || niche.includes('wealth')) {
        calculatedScore = Math.max(calculatedScore, 9.2);
      }

      let advice = {
        subheading: '',
        strategy: '',
        aesthetic: '',
        loop: ''
      };

      if (calculatedScore >= 9.0) {
        advice.subheading = `The ${answers?.niche} market is currently in a "Breakout" phase. Your profile is primed for rapid scale.`;
        advice.strategy = niche.includes('ai') ? 'Aggressive focus on "Secret Tool" reveals.' : 'Polarizing "Counter-Culture" takes that challenge the status quo.';
        advice.aesthetic = 'Ultra-minimalist, high-contrast, "Ghost" DNA.';
        advice.loop = 'Frictionless sharing via "Save for later" authority hooks.';
      } else if (calculatedScore >= 8.0) {
        advice.subheading = `The ${answers?.niche} market is highly competitive but scalable. Visual authority is your key differentiator.`;
        advice.strategy = 'Systematic myth-busting and high-frequency production maps.';
        advice.aesthetic = 'Dark, moody, high-grain texture with serif accents.';
        advice.loop = 'Comment-driven engagement via "The Gap" strategy.';
      } else {
        advice.subheading = `The ${answers?.niche} market requires precision. Authority-building in this micro-niche is your path to 10k.`;
        advice.strategy = 'Deep-dive case studies and personality-led authority without a face.';
        advice.aesthetic = 'Clean, professional, heavy focus on bold typography.';
        advice.loop = 'Trust-building via community-centric CTAs and "DM for access" loops.';
      }

      setScore(calculatedScore);
      setCustomData(advice);
      setIsResearching(false);
    };

    runResearch();
  }, [answers]);

  if (isResearching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <h2 className="text-xl font-bold tracking-tighter uppercase italic text-gradient animate-pulse">{researchStatus}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in duration-1000">
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-bold text-[10px] tracking-[0.3em] mb-8 uppercase">Neural Analysis Complete</div>
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tighter">Niche Potential: <span className="font-bold text-gradient italic">{score} / 10</span></h1>
        <p className="text-zinc-500 font-light text-xl">{customData?.subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { title: 'Viral Strategy', desc: customData?.strategy },
          { title: 'Aesthetic DNA', desc: customData?.aesthetic },
          { title: 'Growth Loop', desc: customData?.loop }
        ].map((win, i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5">
            <h3 className="text-[10px] font-black text-brand-primary mb-3 uppercase tracking-[0.2em]">{win.title}</h3>
            <p className="text-zinc-300 font-light text-sm">{win.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto p-10 md:p-16 rounded-[3rem] bg-zinc-900/50 border border-white/5 text-center relative overflow-hidden shadow-2xl mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4 tracking-tight leading-tight">Send full {answers?.niche} roadmap to your inbox?</h2>
        <p className="text-zinc-500 mb-10 font-light text-base">We've generated a 12-page PDF. Enter your email to receive it.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="email" placeholder="you@example.com" className="flex-1 bg-black/50 border border-zinc-800 rounded-2xl px-6 py-5 outline-none focus:border-brand-primary text-sm font-light" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => onEmailSubmit(email)} className="bg-white text-black px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap">Receive PDF</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-10 md:p-12 rounded-[3rem] bg-gradient-to-b from-brand-primary/10 to-transparent border border-brand-primary/20 text-center shadow-2xl mb-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">🚀</div>
        <h3 className="text-2xl font-bold italic uppercase tracking-tighter mb-4 text-white">Unlock the Full <span className="text-gradient">FacelessOS Bundle</span></h3>
        <p className="text-zinc-400 text-sm mb-10 font-light leading-relaxed max-w-md mx-auto">
          The PDF roadmap is just the beginning. Get the actual viral scripts, visual DNA prompts, and the production system used by the world's top ghost creators.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <button onClick={onUnlock} className="w-full sm:w-auto px-12 py-5 bg-gradient-brand rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:scale-105 transition-all">
            Get the Bundle Now - $27
          </button>
          <button onClick={onUnlock} className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] hover:text-white transition-colors py-2">
            Learn more about what's inside →
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('quiz');
  const [data, setData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') { setIsAdmin(true); setView('dashboard'); }
    if (params.get('paid') === 'true') { setIsPaid(true); setView('dashboard'); }
  }, []);

  const handleUnlock = () => { window.location.href = "https://buy.stripe.com/dRm6oA2iq9Jm8z78RGeUU00"; };

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-brand-primary pb-10">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>

      <nav className="sticky top-0 z-[100] w-full bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-xl md:text-2xl tracking-tighter uppercase italic cursor-pointer flex-shrink-0" onClick={() => setView('quiz')}>FACELESS<span className="text-gradient font-black">OS</span></span>
          <div className="flex items-center space-x-4">
            {(view === 'dashboard' || view === 'profile') && <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500 mr-4">Console</span>}
            <button onClick={() => setView('profile')} className={`w-10 h-10 rounded-full border flex-shrink-0 flex items-center justify-center transition-all ${view === 'profile' ? 'border-brand-primary bg-brand-primary/10 shadow-brand' : 'border-white/10 bg-white/5 text-zinc-500'}`}>👤</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {view === 'quiz' && <Quiz onComplete={(ans) => { setData(ans); setView('results'); }} />}
        {view === 'results' && <Results answers={data} onEmailSubmit={() => setView('sales')} onUnlock={() => setView('sales')} />}
        {view === 'sales' && <SalesPage answers={data} onUnlock={handleUnlock} />}
        {view === 'dashboard' && (isPaid || isAdmin ? <Dashboard answers={data} setView={setView} /> : <SalesPage answers={data} onUnlock={handleUnlock} />)}
        {view === 'profile' && <Profile data={data} setData={setData} onBack={() => setView('dashboard')} onRequiz={() => setView('quiz')} />}
      </main>
    </div>
  );
}

// --- Quiz Component ---
const Quiz = ({ onComplete }) => {
  const questions = [
    { id: 'name', text: 'What is your creator name?', type: 'text', placeholder: 'e.g. Stoic Soul...' },
    { id: 'niche', text: 'What is your niche?', type: 'text', placeholder: 'e.g. AI Tools, Stoicism...' },
    { id: 'goal', text: 'Primary goal?', type: 'multi-select', options: ['Affiliate Sales', 'Digital Product', 'Brand Deals', 'Followers Only', 'Other'] },
    { id: 'platform', text: 'Target Platforms?', type: 'multi-select', options: ['TikTok', 'Instagram', 'YouTube', 'Pinterest', 'Other'] },
    { id: 'vibe', text: 'The Vibe?', type: 'select', options: ['Aesthetic/Minimalist', 'Dark/Moody', 'Fast/Hype', 'Educational', 'Other'] },
  ];

  const suggestedNiches = [
    'AI News & Tools',
    'Stoic Philosophy',
    'Digital Wealth / SaaS',
    'Health & Biohacking',
    'Travel Aesthetics',
    'Motivation & Success',
    'True Crime / Mysteries',
    'Daily Facts & Trivia',
    'Gaming News'
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showNicheSuggestions, setShowNicheSuggestions] = useState(false);

  const currentQuestion = questions[currentStep];

  const handleNext = (val) => {
    let finalValue = val;
    if (currentQuestion.type === 'text') finalValue = inputValue;
    else if (currentQuestion.type === 'multi-select') finalValue = [...selectedOptions];

    if (!finalValue || (Array.isArray(finalValue) && finalValue.length === 0)) {
        if (currentQuestion.type !== 'text' || !inputValue) return;
    }
    
    const newAnswers = { ...answers, [currentQuestion.id]: finalValue };
    setAnswers(newAnswers);
    setInputValue('');
    setSelectedOptions([]);
    setShowNicheSuggestions(false);
    
    if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1);
    else onComplete(newAnswers);
  };

  const selectSuggestedNiche = (niche) => {
    setInputValue(niche);
    handleNext(niche);
  };

  const toggleOption = (opt) => {
    if (selectedOptions.includes(opt)) setSelectedOptions(selectedOptions.filter(o => o !== opt));
    else setSelectedOptions([...selectedOptions, opt]);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 md:mt-24 px-4 pb-20">
      <div className="relative p-10 md:p-12 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Phase {currentStep + 1} of {questions.length}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium mb-10 tracking-tight text-zinc-100">{currentQuestion.text}</h2>
        
        {currentQuestion.type === 'text' && !showNicheSuggestions && (
          <div className="space-y-6">
            <input autoFocus className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl outline-none focus:border-brand-primary placeholder:text-zinc-800 font-light" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNext()} />
            {currentQuestion.id === 'niche' && (
              <button onClick={() => setShowNicheSuggestions(true)} className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:text-white transition-colors">
                Don't have one? Suggest a niche →
              </button>
            )}
          </div>
        )}

        {currentQuestion.id === 'niche' && showNicheSuggestions && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">High Potential Faceless Niches</p>
            <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {suggestedNiches.map(niche => (
                <button key={niche} onClick={() => selectSuggestedNiche(niche)} className="p-5 rounded-2xl border border-white/5 bg-white/5 text-left text-sm font-medium text-zinc-300 hover:border-brand-primary/50 hover:bg-brand-primary/10 hover:text-white transition-all">
                  {niche}
                </button>
              ))}
              <button onClick={() => setShowNicheSuggestions(false)} className="p-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest hover:text-zinc-400 text-center">
                ← Go back
              </button>
            </div>
          </div>
        )}

        {(currentQuestion.type === 'select' || currentQuestion.type === 'multi-select') && (
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map(opt => (
              <button key={opt} onClick={() => currentQuestion.type === 'multi-select' ? toggleOption(opt) : handleNext(opt)} className={`p-6 rounded-2xl border transition-all text-left flex justify-between items-center ${selectedOptions.includes(opt) ? 'bg-brand-primary/20 border-brand-primary/50 text-white' : 'border-white/[0.03] bg-white/[0.02] text-zinc-400 hover:bg-white/5'}`}>
                <span className="text-sm font-medium">{opt}</span>
                {selectedOptions.includes(opt) && <span className="text-brand-primary text-xs font-bold">✓</span>}
              </button>
            ))}
          </div>
        )}
        
        {!showNicheSuggestions && (
          <button onClick={() => handleNext()} className="w-full mt-12 py-5 rounded-2xl bg-gradient-brand font-black text-xs uppercase tracking-[0.2em] shadow-brand hover:opacity-90 active:scale-95 transition-all">Continue</button>
        )}
      </div>
    </div>
  );
};
