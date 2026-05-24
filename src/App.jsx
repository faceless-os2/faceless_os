import React, { useState } from 'react';

const Quiz = ({ onComplete }) => {
  const questions = [
    { id: 'niche', text: 'What is your niche?', type: 'text', placeholder: 'e.g. AI Tools, Stoicism...' },
    { id: 'goal', text: 'Primary goal?', type: 'select', options: ['Affiliate Sales', 'Digital Product', 'Brand Deals', 'Followers Only'] },
    { id: 'platform', text: 'Target Platform?', type: 'select', options: ['TikTok', 'Instagram', 'Pinterest', 'YouTube'] },
    { id: 'vibe', text: 'The Vibe?', type: 'select', options: ['Aesthetic/Minimalist', 'Dark/Moody', 'Fast/Hype', 'Educational'] },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = (val) => {
    const newAnswers = { ...answers, [questions[currentStep].id]: val };
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 md:mt-24 p-1 px-4">
      <div className="relative p-8 md:p-12 rounded-[2rem] bg-zinc-900/50 border border-white/10 backdrop-blur-xl overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-accent/20 blur-[100px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-brand-accent/10 blur-[100px] rounded-full" />

        <div className="relative">
          <div className="flex items-center justify-between mb-12">
            <span className="text-xs font-black tracking-[0.2em] text-zinc-500 uppercase">Step {currentStep + 1} of {questions.length}</span>
            <div className="w-32 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-accent transition-all duration-700 ease-out shadow-[0_0_15px_rgba(255,59,48,0.5)]" 
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">{questions[currentStep].text}</h2>
          
          {questions[currentStep].type === 'text' ? (
            <div className="group relative">
              <input 
                autoFocus
                className="w-full bg-black/40 border-b-2 border-zinc-800 p-6 text-xl md:text-2xl outline-none focus:border-brand-accent transition-all duration-300 placeholder:text-zinc-700"
                placeholder={questions[currentStep].placeholder}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) handleNext(e.target.value);
                }}
              />
              <div className="absolute right-4 bottom-6 text-xs text-zinc-500 font-medium">Press Enter ↵</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[currentStep].options.map(opt => (
                <button 
                  key={opt}
                  onClick={() => handleNext(opt)}
                  className="group relative text-left p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-brand-accent hover:border-brand-accent transition-all duration-300 shadow-xl"
                >
                  <span className="font-bold text-lg group-hover:text-white transition-colors">{opt}</span>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Results = ({ answers }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-accent/20 blur-[120px] -z-10 rounded-full" />
        <div className="inline-flex items-center px-6 py-2 rounded-full border border-brand-accent/30 bg-brand-accent/10 text-brand-accent font-bold text-sm mb-8 animate-pulse">
          <span className="mr-2">●</span> ANALYSIS COMPLETE
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic uppercase">
          Score: <span className="text-brand-accent">8.5</span>
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed italic">
          The <span className="text-white font-bold underline decoration-brand-accent">"{answers.niche}"</span> market is showing explosive momentum. Your strategy is ready.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { icon: '🔥', title: 'Viral Hook', desc: 'The "Anti-Niche" Angle. Use: "The secret nobody tells you about..."', color: 'bg-orange-500' },
          { icon: '🎨', title: 'Visual DNA', desc: `${answers.vibe} grainy overlays with fast cuts.`, color: 'bg-blue-500' },
          { icon: '📈', title: 'Scale Factor', desc: 'Post 4x weekly. Primary time: 6PM EST.', color: 'bg-green-500' }
        ].map((win, i) => (
          <div key={i} className="group p-8 border border-white/10 rounded-[2rem] bg-zinc-900/40 hover:border-brand-accent/50 transition-all duration-500">
            <div className={`w-12 h-12 rounded-xl ${win.color}/20 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
              {win.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{win.title}</h3>
            <p className="text-zinc-400 leading-relaxed">{win.desc}</p>
          </div>
        ))}
      </div>

      <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-brand-accent to-purple-600 overflow-hidden shadow-[0_0_50px_rgba(255,59,48,0.3)]">
        <div className="p-10 md:p-16 rounded-[2.9rem] bg-black text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-none">
              Generate 30 Days of <br/> <span className="text-brand-accent italic">Viral Content</span>
            </h2>
            <p className="mb-10 text-zinc-400 text-lg max-w-xl mx-auto leading-relaxed">
              Unlock the full OS: 30 custom scripts, your visual prompt library, and the exact growth loops we used to scale to 100k+ followers.
            </p>
            <button className="relative group px-12 py-5 bg-brand-accent rounded-full font-black text-xl tracking-tighter uppercase hover:shadow-[0_0_30px_rgba(255,59,48,0.6)] transition-all duration-300 transform active:scale-95">
              <span className="relative z-10">Get Full OS — $47</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-full" />
            </button>
            <div className="mt-8 flex items-center justify-center space-x-6 text-xs font-bold text-zinc-500 tracking-widest uppercase">
              <span>Verified AI Results</span>
              <span>•</span>
              <span>Limited Beta Pricing</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('quiz');
  const [data, setData] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-brand-accent selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto">
        <span className="font-black text-3xl tracking-tighter italic">FACELESS<span className="text-brand-accent not-italic font-black">OS</span></span>
        <div className="hidden md:flex space-x-8 text-xs font-black tracking-[0.3em] uppercase text-zinc-400">
          <span className="text-white underline decoration-brand-accent decoration-2 underline-offset-8 cursor-pointer">Engine</span>
          <span className="hover:text-white transition-colors cursor-pointer">Showcase</span>
          <span className="hover:text-white transition-colors cursor-pointer">Pricing</span>
        </div>
      </nav>

      <main className="relative z-10">
        {view === 'quiz' ? (
          <Quiz onComplete={(ans) => { setData(ans); setView('results'); }} />
        ) : (
          <Results answers={data} />
        )}
      </main>

      <footer className="relative z-10 py-12 text-center text-zinc-600 text-[10px] font-bold tracking-[0.5em] uppercase">
        © 2024 FacelessOS Digital Research Lab
      </footer>
    </div>
  );
}

/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
/home/engine/.bashrc: line 1: syntax error near unexpected token `('
/home/engine/.bashrc: line 1: `. /etc/profile.d/workload-containment.shn# ~/.bashrc: executed by bash(1) for non-login shells.'
