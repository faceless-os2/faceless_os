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
  const [inputValue, setInputValue] = useState('');

  const handleNext = (val) => {
    const value = val || inputValue;
    if (!value && questions[currentStep].type === 'text') return;
    
    const newAnswers = { ...answers, [questions[currentStep].id]: value };
    setAnswers(newAnswers);
    setInputValue('');
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 md:mt-24 px-4">
      <div className="relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl">
        {/* Ombre Glows */}
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
          
          <h2 className="text-2xl md:text-3xl font-medium mb-8 tracking-tight text-zinc-100">{questions[currentStep].text}</h2>
          
          {questions[currentStep].type === 'text' ? (
            <div className="space-y-6">
              <input 
                autoFocus
                className="w-full bg-transparent border-b border-zinc-700 py-4 text-xl outline-none focus:border-brand-primary transition-all duration-300 placeholder:text-zinc-800 font-light"
                placeholder={questions[currentStep].placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleNext();
                }}
              />
              <button 
                onClick={() => handleNext()}
                className="w-full py-4 rounded-xl bg-gradient-brand font-semibold text-sm tracking-wider uppercase hover:opacity-90 transition-opacity shadow-brand"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {questions[currentStep].options.map(opt => (
                <button 
                  key={opt}
                  onClick={() => handleNext(opt)}
                  className="group flex items-center justify-between p-5 rounded-xl border border-white/[0.03] bg-white/[0.02] hover:bg-white/[0.05] hover:border-brand-primary/30 transition-all duration-200 text-left"
                >
                  <span className="font-medium text-zinc-300 group-hover:text-white">{opt}</span>
                  <div className="w-5 h-5 rounded-full border border-zinc-700 group-hover:border-brand-primary flex items-center justify-center transition-colors">
                    <div className="w-2 h-2 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
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
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-16 relative">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary font-medium text-[11px] tracking-widest mb-6 uppercase">
          Neural Analysis Complete
        </div>
        <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
          Niche Potential: <span className="font-bold text-gradient italic">8.5 / 10</span>
        </h1>
        <p className="text-zinc-500 font-light text-lg">
          The <span className="text-zinc-200">{answers.niche}</span> market is currently in a "Breakout" phase on {answers.platform}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
        {[
          { title: 'Viral Strategy', desc: 'Leverage "The Gap" in current competitor hooks.' },
          { title: 'Aesthetic DNA', desc: `${answers.vibe} color grading with lo-fi grain.` },
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
            <p className="text-zinc-500 mb-8 font-light">Enter your email to save these results and get a custom 0-1k roadmap.</p>
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
        <div className="text-center py-12 mb-20 bg-brand-primary/5 rounded-[2.5rem] border border-brand-primary/10">
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
            <button className="px-12 py-5 bg-gradient-brand rounded-full font-bold text-lg tracking-tight hover:scale-[1.02] transition-transform shadow-2xl active:scale-95">
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

export default function App() {
  const [view, setView] = useState('quiz');
  const [data, setData] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased selection:bg-brand-primary selection:text-white">
      {/* Background Ombre Effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-secondary/5 blur-[120px] rounded-full" />
      </div>

      <nav className="relative z-10 p-8 flex justify-between items-center max-w-7xl mx-auto">
        <span className="font-bold text-2xl tracking-tighter uppercase italic">FACELESS<span className="text-gradient not-italic">OS</span></span>
        <div className="hidden md:flex space-x-10 text-[10px] font-bold tracking-[0.4em] uppercase text-zinc-500">
          <span className="text-zinc-200 cursor-pointer">Engine</span>
          <span className="hover:text-zinc-200 transition-colors cursor-pointer">Science</span>
          <span className="hover:text-zinc-200 transition-colors cursor-pointer">Access</span>
        </div>
      </nav>

      <main className="relative z-10">
        {view === 'quiz' ? (
          <Quiz onComplete={(ans) => { setData(ans); setView('results'); }} />
        ) : (
          <Results answers={data} />
        )}
      </main>

      <footer className="relative z-10 py-16 text-center text-zinc-700 text-[9px] font-bold tracking-[0.5em] uppercase">
        © 2024 FacelessOS Research Division
      </footer>
    </div>
  );
}
