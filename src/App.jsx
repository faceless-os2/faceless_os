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
    <div className="max-w-xl mx-auto mt-20 p-8 border border-white/10 rounded-2xl bg-zinc-900">
      <div className="mb-8">
        <div className="h-1 bg-zinc-800 rounded-full">
          <div 
            className="h-1 bg-brand-accent rounded-full transition-all duration-500" 
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">{questions[currentStep].text}</h2>
      
      {questions[currentStep].type === 'text' ? (
        <input 
          className="w-full bg-black border border-zinc-700 p-4 rounded-xl focus:border-brand-accent outline-none"
          placeholder={questions[currentStep].placeholder}
          onKeyDown={(e) => e.key === 'Enter' && handleNext(e.target.value)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {questions[currentStep].options.map(opt => (
            <button 
              key={opt}
              onClick={() => handleNext(opt)}
              className="w-full text-left p-4 rounded-xl border border-zinc-700 hover:border-brand-accent hover:bg-zinc-800 transition-all"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const Results = ({ answers }) => {
  return (
    <div className="max-w-3xl mx-auto mt-20 p-8">
      <div className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-brand-accent/20 text-brand-accent text-4xl font-bold mb-4">
          8.5/10
        </div>
        <h1 className="text-4xl font-bold mb-4">Your Niche Potential is High.</h1>
        <p className="text-zinc-400">The "{answers.niche}" niche on {answers.platform} is currently underserved.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'Viral Hook', desc: 'Use "The secret nobody tells you about..."' },
          { title: 'Visual Style', desc: `Go with ${answers.vibe} overlays.` },
          { title: 'Frequency', desc: 'Post 4x weekly at 6 PM EST.' }
        ].map((win, i) => (
          <div key={i} className="p-6 border border-white/10 rounded-xl bg-zinc-900">
            <h3 className="font-bold mb-2">{win.title}</h3>
            <p className="text-sm text-zinc-400">{win.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 border-2 border-brand-accent rounded-2xl bg-brand-accent/5 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to automate the next 30 days?</h2>
        <p className="mb-8 text-zinc-300">Get 30 custom scripts, your visual prompt library, and a viral posting schedule generated specifically for your {answers.niche} account.</p>
        <button className="bg-brand-accent text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all">
          Unlock Full Blueprint ($47)
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('quiz');
  const [data, setData] = useState(null);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <nav className="p-6 flex justify-between items-center border-b border-white/5">
        <span className="font-black text-2xl tracking-tighter">FACELESS<span className="text-brand-accent">OS</span></span>
      </nav>

      {view === 'quiz' ? (
        <Quiz onComplete={(ans) => { setData(ans); setView('results'); }} />
      ) : (
        <Results answers={data} />
      )}
    </div>
  );
}
