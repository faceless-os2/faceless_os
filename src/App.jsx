import React, { useState, useEffect } from 'react';

// --- Helper: Strategy Content by Niche ---
const getNicheStrategy = (niche) => {
  const n = niche?.toLowerCase() || '';
  if (n.includes('ai') || n.includes('tech')) {
    return {
      title: 'The "Secret Tool" Method',
      description: "You're going to position your page as the place people go to find tools that save them time. People love efficiency.",
      steps: [
        { t: 'The Hook', d: 'Start every video with: "Stop doing [Task] manually."' },
        { t: 'The Value', d: 'Show exactly how the AI tool works in 5 seconds or less.' },
        { t: 'The Goal', d: 'Get people to save the video so they can "try it later".' }
      ]
    };
  }
  if (n.includes('wealth') || n.includes('money') || n.includes('saas')) {
    return {
      title: 'The Digital Wealth Map',
      description: "People want to know how to make money online without showing their face. You are the guide showing them the path.",
      steps: [
        { t: 'The Hook', d: 'Focus on "Low effort, high reward" business ideas.' },
        { t: 'The Value', d: 'Break down the math. Show how $100/day is actually possible.' },
        { t: 'The Goal', d: 'Build trust by being honest about how long things actually take.' }
      ]
    };
  }
  if (n.includes('stoic') || n.includes('philosophy') || n.includes('motivation')) {
    return {
      title: 'The Wisdom Architect',
      description: "Your page is a calm place in a loud world. High-quality visuals and deep thoughts are your best friends.",
      steps: [
        { t: 'The Hook', d: 'Use "Statue-bust" hooks or deep questions about life.' },
        { t: 'The Value', d: 'Share one quote or idea that changes how someone sees their day.' },
        { t: 'The Goal', d: 'Get people to comment their thoughts to boost your reach.' }
      ]
    };
  }
  return {
    title: 'The Value Specialist',
    description: "You are here to help people solve a specific problem in your niche using simple, easy-to-follow advice.",
    steps: [
      { t: 'The Hook', d: 'Identify a "Mistake" people are making and offer a fix.' },
      { t: 'The Value', d: 'Share a "Quick Win" that someone can do in under 60 seconds.' },
      { t: 'The Goal', d: 'Focus on being the most helpful person in your niche.' }
    ]
  };
};

// --- Helper: Generate 30-Day Post Map ---
const generate30DayMap = (niche) => {
  const categories = [
    { type: 'Hook: Common Mistake', template: 'Stop doing [Mistake] if you want to win in {{niche}}.' },
    { type: 'Easy Steps: How-To', template: 'How to get [Result] in {{niche}} using this 3-step plan.' },
    { type: 'Viral: Hot Take', template: 'Most creators in {{niche}} are wrong about this one thing...' },
    { type: 'Trust: Result Reveal', template: 'I looked at 100 accounts in {{niche}} and found this secret.' },
    { type: 'Call to Action', template: 'If you want to master {{niche}}, I built this to help you.' }
  ];
  
  return Array.from({ length: 30 }, (_, i) => {
    const cat = categories[i % categories.length];
    const week = Math.floor(i / 7) + 1;
    return {
      day: i + 1,
      week,
      time: i % 2 === 0 ? 'Morning (8AM)' : 'Evening (6PM)',
      type: cat.type,
      script: cat.template.replace('{{niche}}', niche || 'your niche'),
      status: 'Ready to Post'
    };
  });
};

// --- Profile Component ---
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
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Your Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-600 ml-1">Creator Name</label>
              <input type="text" value={localName} onChange={(e) => setLocalName(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 mt-1 outline-none focus:border-brand-primary transition-all font-light" />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-600 ml-1">Your Niche</label>
              <input type="text" value={localNiche} onChange={(e) => setLocalNiche(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 mt-1 outline-none focus:border-brand-primary transition-all font-light" />
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={saveProfile} className="flex-1 bg-white text-black py-3 rounded-xl text-xs font-black uppercase hover:bg-zinc-200 transition-all">Save Changes</button>
              <button onClick={onRequiz} className="flex-1 border border-zinc-800 py-3 rounded-xl text-xs font-bold uppercase hover:bg-white/5 transition-all">Start Over</button>
            </div>
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
  const [postMap, setPostMap] = useState([]);
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setPostMap(generate30DayMap(answers?.niche));
      setStrategy(getNicheStrategy(answers?.niche));
      setIsGenerating(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [answers]);

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 border-4 border-brand-primary/10 border-t-brand-primary rounded-full animate-spin mb-8 shadow-brand" />
        <h2 className="text-xl font-bold tracking-tighter uppercase italic">Setting up your <span className="text-gradient">Plan</span></h2>
        <p className="text-zinc-500 mt-2 font-light text-sm max-w-xs mx-auto">Building your 30-day map and visual brand...</p>
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
          { id: 'strategy', label: 'My Strategy', icon: '🎯' },
          { id: 'scripts', label: '30-Day Post Map', icon: '📅' },
          { id: 'visuals', label: 'Visual Brand', icon: '🎨' },
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
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100">Growth <span className="text-brand-primary">Plan</span></h2>
                <button onClick={() => setView('quiz')} className="text-[9px] font-black border border-zinc-800 px-4 py-2 rounded-full uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-colors">Edit Niche</button>
              </div>
              
              <div className="p-8 rounded-[2rem] bg-brand-primary/5 border border-white/5 mb-8">
                <h3 className="text-brand-primary font-bold text-[10px] uppercase mb-4 tracking-widest">Master Strategy: {strategy?.title}</h3>
                <p className="text-lg text-zinc-200 font-light mb-8 italic">"{strategy?.description}"</p>
                <div className="space-y-4">
                  {strategy?.steps.map((step, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-brand-primary">{i+1}</div>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-1">{step.t}</h4>
                        <p className="text-zinc-400 text-sm font-light">{step.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {activeTab === 'scripts' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100 mb-8">30-Day <span className="text-brand-secondary">Post Map</span></h2>
              <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {postMap.map(s => (
                  <div key={s.day} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-brand-secondary/20 transition-all group relative overflow-hidden">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em]">Day {s.day} • {s.time}</span>
                      <span className="text-[9px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 uppercase font-bold">{s.type}</span>
                    </div>
                    <p className="text-zinc-300 text-sm font-light leading-relaxed mb-4">"{s.script}"</p>
                    <div className="flex items-center space-x-2">
                       <div className="w-2 h-2 rounded-full bg-green-500/50 animate-pulse" />
                       <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Ready to go</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'visuals' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-2xl font-bold mb-10 italic uppercase tracking-tighter text-zinc-100">Visual <span className="text-brand-primary">Brand</span></h2>
              <div className="grid grid-cols-1 gap-8">
                {[
                  { t: 'The "Ghost" Look', p: `Use simple visuals with deep shadows. Use your color preference.` },
                  { t: 'Big Bold Text', p: `Use white text on dark backgrounds. It makes people stop scrolling.` },
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
          ⚠️ Offer Expires In: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic">Skip the legwork.<br/><span className="text-gradient">Get your starter deliverables.</span></h1>
        <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
          You have your niche. You have your plan. But 99% of people never start because the setup is too much work. <span className="text-white border-b border-brand-primary">We did it all for you.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {[
          { icon: '📝', t: '30 Ready-to-Post Scripts', d: `Done-for-you scripts specifically for the ${answers?.niche} niche. No thinking required.` },
          { icon: '🎨', t: 'Starter Brand Assets', d: 'The exact visual style and prompt settings to create a professional look in minutes.' },
          { icon: '📅', t: '30-Day Posting Map', d: 'Your entire first month planned out. Exactly what to post and when to post it.' },
          { icon: '🚀', t: '1k Follower Checklist', d: 'The "Quick Start" steps to take your account from zero to 1,000 followers.' }
        ].map((item, i) => (
          <div key={i} className="p-8 rounded-[3rem] bg-zinc-900/50 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 text-4xl opacity-20 group-hover:opacity-100 transition-opacity">{item.icon}</div>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter italic">{item.t}</h3>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.d}</p>
          </div>
        ))}
      </div>

      <div className="relative p-10 md:p-20 rounded-[4rem] bg-zinc-900 border border-brand-primary shadow-brand text-center overflow-hidden">
         <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">Get the Full <span className="text-gradient">FacelessOS Bundle</span></h2>
            <div className="flex items-center justify-center space-x-4 mb-10">
                <span className="text-zinc-600 line-through text-2xl font-light">$97</span>
                <span className="text-white text-6xl font-black tracking-tighter">$27</span>
            </div>
            <button onClick={onUnlock} className="w-full md:w-auto px-16 py-6 bg-gradient-brand rounded-full font-black text-sm uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-brand mb-8">Unlock Everything Now</button>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Instant Access • One-Time Payment</p>
         </div>
      </div>
    </div>
  );
};

// --- Results Component ---
const Results = ({ answers, onEmailSubmit, onUnlock }) => {
  const [isResearching, setIsResearching] = useState(true);
  const [researchStatus, setResearchStatus] = useState('Getting things ready...');
  const [score, setScore] = useState(0);
  const [customData, setCustomData] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const researchSteps = [
      { msg: `Looking at #${answers?.niche?.replace(/\s/g, '')} on TikTok...`, delay: 1000 },
      { msg: `Checking the competition...`, delay: 1000 },
      { msg: `Finalizing your growth plan...`, delay: 1000 }
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
        brand: '',
        loop: ''
      };

      if (calculatedScore >= 9.0) {
        advice.subheading = `The ${answers?.niche} niche is perfect right now. You can grow very fast here.`;
        advice.strategy = niche.includes('ai') ? 'Share secret tools that save people time.' : 'Share bold ideas that challenge the norm.';
        advice.brand = 'Keep it simple, clean, and professional.';
        advice.loop = 'Make videos that people want to save and watch later.';
      } else if (calculatedScore >= 8.0) {
        advice.subheading = `The ${answers?.niche} niche is popular but has lots of room for you to win.`;
        advice.strategy = 'Fix common mistakes that people in your niche make.';
        advice.brand = 'Use dark, moody colors and clear text.';
        advice.loop = 'Ask people to comment their opinion on your ideas.';
      } else {
        advice.subheading = `The ${answers?.niche} niche is a hidden gem. You can become the go-to expert here.`;
        advice.strategy = 'Share detailed "case studies" of how things work.';
        advice.brand = 'Focus on big, bold text so people can read easily.';
        advice.loop = 'Ask people to send you a message for more help.';
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
        <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-bold text-[10px] tracking-[0.3em] mb-8 uppercase">Plan Complete</div>
        <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tighter">Growth Potential: <span className="font-bold text-gradient italic">{score} / 10</span></h1>
        <p className="text-zinc-500 font-light text-xl">{customData?.subheading}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { title: 'Best Strategy', desc: customData?.strategy },
          { title: 'Visual Brand', desc: customData?.brand },
          { title: 'How to Grow', desc: customData?.loop }
        ].map((win, i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5">
            <h3 className="text-[10px] font-black text-brand-primary mb-3 uppercase tracking-[0.2em]">{win.title}</h3>
            <p className="text-zinc-300 font-light text-sm">{win.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto p-10 md:p-16 rounded-[3rem] bg-zinc-900/50 border border-white/5 text-center relative overflow-hidden shadow-2xl mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold mb-4 tracking-tight leading-tight">Send your {answers?.niche} roadmap to your inbox?</h2>
        <p className="text-zinc-500 mb-10 font-light text-base">We wrote a 12-page guide for you. Enter your email to get it.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input type="email" placeholder="you@example.com" className="flex-1 bg-black/50 border border-zinc-800 rounded-2xl px-6 py-5 outline-none focus:border-brand-primary text-sm font-light" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={() => onEmailSubmit(email)} className="bg-white text-black px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest whitespace-nowrap">Get My Guide</button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-10 md:p-12 rounded-[3rem] bg-gradient-to-b from-brand-primary/10 to-transparent border border-brand-primary/20 text-center shadow-2xl mb-20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 text-4xl opacity-10 group-hover:opacity-20 transition-opacity">🚀</div>
        <h3 className="text-2xl font-bold italic uppercase tracking-tighter mb-4 text-white">Get the Full <span className="text-gradient">FacelessOS Bundle</span></h3>
        <p className="text-zinc-400 text-sm mb-10 font-light leading-relaxed max-w-md mx-auto">
          The guide is just the start. Get the actual scripts, brand guides, and the posting schedule used by top creators.
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
    { id: 'goal', text: 'What is your goal?', type: 'multi-select', options: ['Affiliate Sales', 'Digital Product', 'Brand Deals', 'Followers Only', 'Other'] },
    { id: 'platform', text: 'Where do you want to post?', type: 'multi-select', options: ['TikTok', 'Instagram', 'YouTube', 'Pinterest', 'Other'] },
    { id: 'vibe', text: 'What style do you like?', type: 'select', options: ['Aesthetic/Minimalist', 'Dark/Moody', 'Fast/Hype', 'Educational', 'Other'] },
  ];

  const suggestedNiches = ['AI News & Tools', 'Stoic Philosophy', 'Digital Wealth / SaaS', 'Health & Biohacking', 'Travel Aesthetics', 'Motivation & Success', 'True Crime / Mysteries', 'Daily Facts & Trivia', 'Gaming News'];
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
    if (!finalValue || (Array.isArray(finalValue) && finalValue.length === 0)) { if (currentQuestion.type !== 'text' || !inputValue) return; }
    const newAnswers = { ...answers, [currentQuestion.id]: finalValue };
    setAnswers(newAnswers);
    setInputValue('');
    setSelectedOptions([]);
    setShowNicheSuggestions(false);
    if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1);
    else onComplete(newAnswers);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 md:mt-24 px-4 pb-20">
      <div className="relative p-10 md:p-12 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Step {currentStep + 1} of {questions.length}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-medium mb-10 tracking-tight text-zinc-100">{currentQuestion.text}</h2>
        {currentQuestion.type === 'text' && !showNicheSuggestions && (
          <div className="space-y-6">
            <input autoFocus className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl outline-none focus:border-brand-primary placeholder:text-zinc-800 font-light" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleNext()} />
            {currentQuestion.id === 'niche' && (
              <button onClick={() => setShowNicheSuggestions(true)} className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:text-white transition-colors">Don't have one? Suggest a niche →</button>
            )}
          </div>
        )}
        {currentQuestion.id === 'niche' && showNicheSuggestions && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Best niches to start with:</p>
            <div className="grid grid-cols-1 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {suggestedNiches.map(niche => (
                <button key={niche} onClick={() => { setInputValue(niche); handleNext(niche); }} className="p-5 rounded-2xl border border-white/5 bg-white/5 text-left text-sm font-medium text-zinc-300 hover:border-brand-primary/50 hover:bg-brand-primary/10 hover:text-white transition-all">{niche}</button>
              ))}
              <button onClick={() => setShowNicheSuggestions(false)} className="p-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest hover:text-zinc-400 text-center">← Go back</button>
            </div>
          </div>
        )}
        {(currentQuestion.type === 'select' || currentQuestion.type === 'multi-select') && (
          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map(opt => (
              <button key={opt} onClick={() => currentQuestion.type === 'multi-select' ? (selectedOptions.includes(opt) ? setSelectedOptions(selectedOptions.filter(o => o !== opt)) : setSelectedOptions([...selectedOptions, opt])) : handleNext(opt)} className={`p-6 rounded-2xl border transition-all text-left flex justify-between items-center ${selectedOptions.includes(opt) ? 'bg-brand-primary/20 border-brand-primary/50 text-white' : 'border-white/[0.03] bg-white/[0.02] text-zinc-400 hover:bg-white/5'}`}>
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
