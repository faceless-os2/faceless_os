import { useState, useEffect } from 'react';

// --- Helper: Strategy Content by Niche ---
const getNicheStrategy = (niche, vibe, platforms, schedule, experience) => {
  const n = niche?.toLowerCase() || '';
  const v = vibe?.toLowerCase() || '';
  const p = Array.isArray(platforms) ? platforms.join(', ').toLowerCase() : (platforms?.toLowerCase() || '');
  const s = schedule?.toLowerCase() || '';
  const e = experience?.toLowerCase() || '';

  // Platform specific advice overlays
  let platformAdvice = "";
  if (p.includes('tiktok') || p.includes('instagram')) platformAdvice = "Focus on 7-second loops and high-contrast text overlays to stop the scroll.";
  if (p.includes('pinterest')) platformAdvice = "Optimize for search keywords in your titles and use vertical 'Idea Pin' formats.";
  if (p.includes('youtube')) platformAdvice = "Your hook needs to match your thumbnail exactly. Focus on the first 3 seconds.";

  // Schedule advice
  let scheduleAdvice = "";
  if (s.includes('< 30')) scheduleAdvice = " Since you're short on time, use AI tools to generate B-roll and captions in batches.";
  else if (s.includes('4+')) scheduleAdvice = " With your full-time focus, aim for high-production cinematic value and original B-roll.";

  // Experience advice
  let experienceAdvice = "";
  if (e.includes('beginner')) experienceAdvice = " As a beginner, focus on quantity over quality for the first 10 posts to find your voice.";

  if (v.includes('aesthetic') || v.includes('minimalist') || v.includes('moody')) {
    return {
      title: 'The Atmosphere Architect',
      description: `You're building an aesthetic world. ${platformAdvice}${scheduleAdvice}${experienceAdvice} Curated moments are your currency.`,
      steps: [
        { t: 'The Hook', d: 'Use "POV" hooks that place the viewer in your aesthetic world.' },
        { t: 'The Value', d: 'Showcase the lifestyle/feeling of the {{niche}} space without over-explaining.'.replace('{{niche}}', niche || 'niche') },
        { t: 'The Goal', d: 'Get people to save your video as "mood board" inspiration.' }
      ]
    };
  }

  if (n.includes('ai') || n.includes('tech')) {
    return {
      title: 'The "Secret Tool" Method',
      description: `Position your page as the go-to resource for tools. ${platformAdvice}${scheduleAdvice}${experienceAdvice}`,
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
      description: `You are the guide showing the path to digital income. ${platformAdvice}${scheduleAdvice}${experienceAdvice}`,
      steps: [
        { t: 'The Hook', d: 'Focus on "Low effort, high reward" business ideas.' },
        { t: 'The Value', d: 'Break down the math. Show how $100/day is actually possible.' },
        { t: 'The Goal', d: 'Build trust by being honest about how long things actually take.' }
      ]
    };
  }
  return {
    title: 'The Value Specialist',
    description: `Solve specific problems with simple advice. ${platformAdvice}${scheduleAdvice}${experienceAdvice}`,
    steps: [
      { t: 'The Hook', d: 'Identify a "Mistake" people are making and offer a fix.' },
      { t: 'The Value', d: 'Share a "Quick Win" that someone can do in under 60 seconds.' },
      { t: 'The Goal', d: 'Focus on being the most helpful person in your niche.' }
    ]
  };
};

// --- Helper: Generate 30-Day Post Map ---
const generate30DayMap = (niche, vibe, platforms) => {
  const v = vibe?.toLowerCase() || '';
  const p = Array.isArray(platforms) ? platforms.join(', ').toLowerCase() : (platforms?.toLowerCase() || '');
  
  let categories = [
    { type: 'Hook: Common Mistake', template: 'Stop making this common {{niche}} mistake if you want to grow.' },
    { type: 'Easy Steps: How-To', template: '3 easy steps to get [Result] in the {{niche}} space.' },
    { type: 'Viral: Hot Take', template: 'The one thing most {{niche}} creators get wrong...' },
    { type: 'Trust: Result Reveal', template: 'The "Secret" used by the top 1% of {{niche}} accounts.' },
    { type: 'Call to Action', template: 'I built the ultimate system for {{niche}} creators. Link in bio.' }
  ];

  if (v.includes('aesthetic') || v.includes('minimalist') || v.includes('moody')) {
    categories = [
      { type: 'Hook: POV', template: 'POV: You finally found the perfect {{niche}} routine.' },
      { type: 'Mood: Atmosphere', template: 'This is your sign to start your {{niche}} journey today.' },
      { type: 'Ritual: Habits', template: 'The small {{niche}} habits that changed my life.' },
      { type: 'Trust: Aesthetic', template: 'A day in the life: {{niche}} creator edition.' },
      { type: 'Call to Action', template: 'Join the {{niche}} community for more. Link in bio.' }
    ];
  }

  // Final template adjustment based on platform
  const adjustForPlatform = (template) => {
    let t = template;
    if (p.includes('pinterest')) t = t.replace('POV:', 'Ideal:').replace('Link in bio', 'Link in description');
    if (p.includes('youtube')) t = t.replace('Link in bio', 'Check the pinned comment');
    return t;
  };
  
  return Array.from({ length: 30 }, (_, i) => {
    const cat = categories[i % categories.length];
    const week = Math.floor(i / 7) + 1;
    return {
      day: i + 1,
      week,
      time: i % 2 === 0 ? 'Morning (8AM)' : 'Evening (6PM)',
      type: cat.type,
      script: adjustForPlatform(cat.template).replace('{{niche}}', niche || 'your niche'),
      status: 'Ready to Post'
    };
  });
};

// --- Profile Component ---
const Profile = ({ data, setData, onBack, onRequiz }) => {
  const [localName, setLocalName] = useState(data?.name || 'Creator');
  const [localNiche, setLocalNiche] = useState(data?.niche || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setData({ ...data, name: localName, niche: localNiche });
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <button onClick={onBack} className="text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-white transition-colors">← Dashboard</button>
        <h2 className="text-xl font-bold tracking-tighter uppercase italic text-white">Creator <span className="text-brand-primary">Profile</span></h2>
      </div>

      <div className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-2xl space-y-8">
        <div>
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Creator Name</label>
          <input 
            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all font-light text-white"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Your Niche</label>
          <input 
            className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-brand-primary transition-all font-light text-white"
            value={localNiche}
            onChange={(e) => setLocalNiche(e.target.value)}
          />
        </div>

        <div className="pt-8 space-y-4">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/10"
          >
            {isSaving ? 'Updating...' : 'Save Profile Changes'}
          </button>
          
          <button 
            onClick={onRequiz}
            className="w-full py-5 border border-white/5 text-zinc-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/5 hover:text-white transition-all"
          >
            Restart Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [view, setView] = useState('landing');
  const [data, setData] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      setView('access');
      return;
    }

    const saved = localStorage.getItem('faceless_creator_data');
    if (saved) {
      const parsed = JSON.parse(saved);
      setData(parsed);
      setIsPaid(true); // If they have saved data, they've been through the flow
      setView('dashboard');
    }
  }, []);

  const handleQuizComplete = (answers) => {
    setData(answers);
    setView('results');
  };

  const handleUnlock = (incomingData) => {
    const finalData = incomingData || data;
    if (finalData) {
      setData(finalData);
      localStorage.setItem('faceless_creator_data', JSON.stringify(finalData));
    }
    setIsPaid(true);
    setView('dashboard');
  };

  const handleStoreRedirect = () => {
    window.location.href = "https://stan.store/Facelessosapp/p/facelessos-bundle";
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-brand-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      </div>

      <nav className="relative z-50 flex justify-between items-center px-6 md:px-12 py-8 max-w-7xl mx-auto">
        <div 
          onClick={() => setView('landing')} 
          className="text-2xl font-black tracking-tighter cursor-pointer hover:opacity-80 transition-opacity"
        >
          Faceless<span className="text-brand-primary font-light italic">Method</span>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          {view === 'dashboard' && (
             <button onClick={() => setView('profile')} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
               Account
             </button>
          )}
          <button onClick={() => setView('sales')} className="px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            The Bundle
          </button>
        </div>
      </nav>

      <main className="relative z-10">
        {view === 'landing' && <Quiz onComplete={handleQuizComplete} />}
        {view === 'access' && (
          <Quiz 
            isAccessFlow={true}
            onComplete={async (answers) => {
              // Trigger the bundle email
              try {
                await fetch('/api/send-roadmap', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    ...answers,
                    isFullBundle: true
                  })
                });
              } catch (err) {
                console.error('Email trigger error:', err);
              }
              // Set data and go to dashboard
              handleUnlock(answers);
            }} 
          />
        )}
        {view === 'results' && (
          <Results 
            answers={data} 
            setData={setData}
            onUnlock={handleStoreRedirect} 
          />
        )}
        {view === 'sales' && <SalesPage answers={data} onUnlock={handleStoreRedirect} />}
        {view === 'dashboard' && (isPaid || isAdmin ? <Dashboard answers={data} setView={setView} setData={setData} /> : <SalesPage answers={data} onUnlock={handleStoreRedirect} />)}
        {view === 'profile' && <Profile data={data} setData={setData} onBack={() => setView('dashboard')} onRequiz={() => setView('quiz')} />}
      </main>

      <footer className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase">
          &copy; 2026 Faceless Method. All rights reserved.
        </div>
        <div className="flex items-center space-x-8">
          <a href="mailto:Facelessos.app@gmail.com" className="text-[10px] font-bold tracking-widest text-zinc-500 hover:text-white uppercase transition-colors">
            Need Help? Facelessos.app@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}

// --- Quiz Component ---
const Quiz = ({ onComplete, isAccessFlow = false }) => {
  const questions = [
    { id: 'name', text: 'What is your creator name?', type: 'text', placeholder: 'e.g. Stoic Soul...' },
    { id: 'niche', text: 'What is your niche?', type: 'text', placeholder: 'e.g. AI Tools, Stoicism...' },
    { id: 'goal', text: 'What is your goal?', type: 'multi-select', options: ['Affiliate Sales', 'Digital Product', 'Brand Deals', 'Followers Only', 'Other'] },
    { id: 'experience', text: 'What is your experience level?', type: 'select', options: ['Total Beginner', 'Some Experience', 'Advanced Creator'] },
    { id: 'schedule', text: 'How much time can you spend daily?', type: 'select', options: ['< 30 mins', '1-2 hours', '4+ hours (Full Time)'] },
    { id: 'platform', text: 'Where do you want to post?', type: 'multi-select', options: ['TikTok', 'Instagram', 'YouTube', 'Pinterest', 'Other'] },
    { id: 'vibe', text: 'What style do you like?', type: 'select', options: ['Aesthetic/Minimalist', 'Dark/Moody', 'Fast/Hype', 'Educational', 'Other'] },
  ];

  // Add email question if it's the access flow
  const allQuestions = isAccessFlow 
    ? [...questions, { id: 'email', text: 'Where should we send your bundle?', type: 'text', placeholder: 'you@example.com' }]
    : questions;

  const suggestedNiches = ['AI News & Tools', 'Stoic Philosophy', 'Digital Wealth / SaaS', 'Health & Biohacking', 'Travel Aesthetics', 'Motivation & Success', 'True Crime / Mysteries', 'Daily Facts & Trivia', 'Gaming News'];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showNicheSuggestions, setShowNicheSuggestions] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const currentQuestion = allQuestions[currentStep];

  const handleNext = (val) => {
    let finalValue = val;
    if (currentQuestion.type === 'text') finalValue = inputValue;
    else if (currentQuestion.type === 'multi-select') {
      finalValue = [...selectedOptions];
      if (isOtherSelected && inputValue) {
        finalValue = finalValue.filter(o => o !== 'Other');
        finalValue.push(inputValue);
      }
    } else if (currentQuestion.type === 'select') {
      if (val === 'Other') {
        setIsOtherSelected(true);
        return;
      }
      if (isOtherSelected && inputValue) {
        finalValue = inputValue;
      }
    }

    if (!finalValue || (Array.isArray(finalValue) && finalValue.length === 0)) { 
      if (currentQuestion.type !== 'text' || !inputValue) return; 
    }
    
    // Basic email validation if it's the email step
    if (currentQuestion.id === 'email' && !finalValue.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }

    const newAnswers = { ...answers, [currentQuestion.id]: finalValue };
    setAnswers(newAnswers);
    setInputValue('');
    setSelectedOptions([]);
    setShowNicheSuggestions(false);
    setIsOtherSelected(false);
    if (currentStep < allQuestions.length - 1) setCurrentStep(currentStep + 1);
    else onComplete(newAnswers);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 md:mt-24 px-4 pb-20">
      {currentStep === 0 ? (
        <div className="relative p-10 md:p-12 rounded-[3.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-700">
          <div className="absolute top-0 right-0 p-8">
            <div className="w-20 h-20 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          <div className="relative z-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-8">
              {isAccessFlow ? 'Bundle Access' : 'Creator Assessment'}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-[0.95] text-white">
              {isAccessFlow ? 'Access My' : 'Find your faceless niche —'} <br />
              <span className="text-brand-primary">{isAccessFlow ? 'Bundle.' : 'and get a 30-day plan to grow it.'}</span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-sm">
              {isAccessFlow 
                ? "Answer these 7 quick questions to personalize your dashboard. We'll send your files to your email immediately after."
                : "Answer 7 quick questions and get your personalized niche score, your best content strategy, and a roadmap for your first 30 days built around your answers."}
            </p>

            {!isAccessFlow && (
              <div className="space-y-4 mb-12">
                {[
                  'Niche score',
                  '30-day posting map',
                  'Your first move'
                ].map(item => (
                  <div key={item} className="flex items-center space-x-3 text-sm font-bold text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center">
                      <span className="text-brand-primary text-[10px]">✓</span>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-12 italic">
              The more honest your answers, the sharper your plan
            </p>

            <div className="pt-8 border-t border-white/5">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4">Let's get started</p>
              <h2 className="text-xl font-bold mb-6 text-white">{currentQuestion.text}</h2>
              <input 
                autoFocus 
                className="w-full bg-transparent border-b border-zinc-800 py-4 text-xl outline-none focus:border-brand-primary placeholder:text-zinc-800 font-light mb-8" 
                placeholder={currentQuestion.placeholder}
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleNext()} 
              />
              
              <button 
                onClick={() => handleNext()}
                className="group relative w-full py-6 bg-gradient-brand rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10">Continue</span>
                <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
              
              <p className="text-center mt-6 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                Takes less than 60 seconds
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative p-10 md:p-12 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between mb-8">
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Step {currentStep + 1} of {allQuestions.length}</span>
              <button onClick={() => { setCurrentStep(currentStep - 1); setIsOtherSelected(false); }} className="text-[10px] font-bold tracking-widest text-zinc-600 hover:text-white uppercase transition-colors">← Back</button>
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

          {(currentQuestion.type === 'select' || currentQuestion.type === 'multi-select') && !showNicheSuggestions && (
            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map(opt => (
                <button 
                  key={opt} 
                  onClick={() => {
                    if (opt === 'Other') {
                      setIsOtherSelected(!isOtherSelected);
                    } else {
                      currentQuestion.type === 'multi-select' 
                        ? (selectedOptions.includes(opt) ? setSelectedOptions(selectedOptions.filter(o => o !== opt)) : setSelectedOptions([...selectedOptions, opt])) 
                        : handleNext(opt);
                    }
                  }} 
                  className={`p-6 rounded-2xl border transition-all text-left flex justify-between items-center ${(selectedOptions.includes(opt) || (opt === 'Other' && isOtherSelected)) ? 'bg-brand-primary/20 border-brand-primary/50 text-white' : 'border-white/[0.03] bg-white/[0.02] text-zinc-400 hover:bg-white/5'}`}
                >
                  <span className="text-sm font-medium">{opt}</span>
                  {(selectedOptions.includes(opt) || (opt === 'Other' && isOtherSelected)) && <span className="text-brand-primary text-xs font-bold">✓</span>}
                </button>
              ))}

              {isOtherSelected && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-2">Type your answer:</p>
                  <input 
                    autoFocus 
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl px-6 py-4 outline-none focus:border-brand-primary transition-all font-light text-white" 
                    placeholder="Describe your 'Other' choice..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  />
                </div>
              )}
            </div>
          )}
          
          {(currentQuestion.type === 'multi-select' || currentQuestion.type === 'text' || isOtherSelected) && !showNicheSuggestions && (
            <div className="mt-12">
              <button onClick={() => handleNext()} className="w-full py-5 bg-gradient-brand text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:opacity-90 transition-all shadow-xl shadow-brand/20">
                {currentStep === allQuestions.length - 1 ? 'Finish' : 'Next Step'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- Results Component ---
const Results = ({ answers, onUnlock, setData }) => {
  const [score, setScore] = useState(0);
  const [isResearching, setIsResearching] = useState(true);
  const [researchStatus, setResearchStatus] = useState('Analyzing Niche Demand...');
  const [customData, setCustomData] = useState(null);
  const [error, setError] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState(null);
  const [postMap, setPostMap] = useState([]);

  const researchSteps = [
    { msg: 'Analyzing Niche Demand...', delay: 1500 },
    { msg: 'Evaluating Competition...', delay: 1800 },
    { msg: 'Scanning Meta Trends...', delay: 1500 },
    { msg: 'Calculating Viral Potential...', delay: 1200 },
    { msg: 'Finalizing Roadmap...', delay: 1000 }
  ];

  const isValidNiche = (n) => {
    if (!n) return false;
    const forbidden = ['test', 'asd', 'nothing', 'none', 'help', 'idk'];
    return !forbidden.includes(n.toLowerCase()) && n.length > 2;
  };

  useEffect(() => {
    const runResearch = async () => {
      const niche = answers?.niche?.toLowerCase() || '';
      
      if (!isValidNiche(niche)) {
        setResearchStatus(`Sorry, I couldn't generate a score for "${answers?.niche}" niche. It doesn't seem to be a valid growth category. Please try a more specific niche like "AI Tools" or "Motivation".`);
        setError(true);
        setIsResearching(false);
        return;
      }

      for (const step of researchSteps) {
        setResearchStatus(step.msg);
        await new Promise(r => setTimeout(r, step.delay));
      }
      
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

      const vibe = answers?.vibe?.toLowerCase() || '';
      const platforms = Array.isArray(answers?.platform) ? answers.platform.join(', ').toLowerCase() : (answers?.platform?.toLowerCase() || '');

      let platformHook = "";
      if (platforms.includes('pinterest')) platformHook = "Use high-quality static pins and search-rich titles.";
      else if (platforms.includes('youtube')) platformHook = "Focus on the first 3 seconds to match your thumbnail.";
      else platformHook = "Use 7-second loops with trending audio.";

      if (vibe.includes('aesthetic') || vibe.includes('minimalist') || vibe.includes('moody')) {
        advice.subheading = `The {{niche}} space is all about the 'vibe' right now. You can win with high-quality, curated content.`.replace('{{niche}}', answers?.niche);
        advice.strategy = `Use cinematic "POV" shots that pull viewers into your world. ${platformHook}`;
        advice.brand = 'Keep it minimal with deep shadows and clean, elegant text.';
        advice.loop = 'Make content that people want to save for inspiration.';
      } else if (calculatedScore >= 9.0) {
        advice.subheading = `The {{niche}} space is perfect right now. You can grow very fast here.`.replace('{{niche}}', answers?.niche);
        advice.strategy = niche.includes('ai') ? `Share secret tools that save people time. ${platformHook}` : `Share bold ideas that challenge the norm. ${platformHook}`;
        advice.brand = 'Keep it simple, clean, and professional.';
        advice.loop = 'Make videos that people want to watch later.';
      } else if (calculatedScore >= 8.0) {
        advice.subheading = `The {{niche}} market is popular but has lots of room for you to win.`.replace('{{niche}}', answers?.niche);
        advice.strategy = `Fix common mistakes that people in your niche make. ${platformHook}`;
        advice.brand = 'Use dark, moody colors and clear text.';
        advice.loop = 'Ask people to comment their opinion on your ideas.';
      } else {
        advice.subheading = `The {{niche}} niche is a hidden gem. You can become the go-to expert here.`.replace('{{niche}}', answers?.niche);
        advice.strategy = `Share detailed "case studies" of how things work. ${platformHook}`;
        advice.brand = 'Focus on big, bold text so people can read easily.';
        advice.loop = 'Ask people to send you a message for more help.';
      }

      setScore(calculatedScore);
      setCustomData(advice);
      setIsResearching(false);
    };
    runResearch();
  }, [answers]);

  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setPostMap(generate30DayMap(answers?.niche, answers?.vibe, answers?.platform));
      setStrategy(getNicheStrategy(answers?.niche, answers?.vibe, answers?.platform, answers?.schedule, answers?.experience));
      setIsGenerating(false);

      // Automated Email Delivery for paid users
      if (answers?.email) {
        const hasSentEmail = sessionStorage.getItem(`sent_full_bundle_${answers?.email}`);
        if (!hasSentEmail) {
          fetch('/api/send-roadmap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: answers?.email,
              niche: answers?.niche,
              name: answers?.name,
              isFullBundle: true,
              vibe: answers?.vibe,
              platforms: answers?.platform
              })
              }).then(() => {
            sessionStorage.setItem(`sent_full_bundle_${answers?.email}`, 'true');
          }).catch(err => console.error('Auto-email error:', err));
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [answers]);

  if (isResearching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <h2 className="text-xl font-bold tracking-tighter uppercase italic text-gradient animate-pulse">{researchStatus}</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 animate-in fade-in duration-500">
        <h2 className="text-xl font-bold tracking-tighter uppercase italic text-red-500 mb-6">{researchStatus}</h2>
        <button 
          onClick={() => window.location.reload()} 
          className="px-8 py-4 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all"
        >
          Try Again
        </button>
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

      <div className="max-w-2xl mx-auto p-10 md:p-12 rounded-[3rem] bg-gradient-to-b from-brand-primary/10 to-transparent border border-brand-primary/20 text-center shadow-2xl mb-12 relative overflow-hidden group">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter italic uppercase text-white">Unlock Your Full <br/><span className="text-brand-primary">Faceless Game Plan</span></h2>
          <p className="text-zinc-400 font-light mb-10 text-sm leading-relaxed max-w-md mx-auto">
            You have the score. Now get the tools. We've built your custom 30-day posting map, master strategy, and production system. 
          </p>
          
          <div className="space-y-4 mb-10 text-left max-w-xs mx-auto">
            {[
              'Custom 30-Day Script Map',
              'The Viral Content Library',
              'Automated Production System',
              'Master Hook Guide'
            ].map(item => (
              <div key={item} className="flex items-center space-x-3 text-xs font-bold text-zinc-300">
                <span className="text-brand-primary">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <button 
            onClick={onUnlock}
            className="w-full py-6 bg-gradient-brand rounded-3xl font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all mb-6"
          >
            Claim My Full Bundle — $27
          </button>
          <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Instant Dashboard Access • One-Time Payment</p>
        </div>
      </div>
      
      <div className="pt-20 border-t border-white/5 text-center">
         <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-4 italic">Want just the roadmap for free?</p>
         <button onClick={onUnlock} className="text-zinc-500 hover:text-white transition-colors text-xs font-bold underline decoration-brand-primary/30 underline-offset-8">Send my free summary via email instead →</button>
      </div>
    </div>
  );
};

// --- Dashboard Component ---
const Dashboard = ({ answers, setView, setData }) => {
  const [activeTab, setActiveTab] = useState('strategy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState(null);
  const [postMap, setPostMap] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [emailStatus, setEmailStatus] = useState('idle'); // idle, sending, success, error
  const [isPaid, setIsPaid] = useState(true); // Assuming paid if on dashboard
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsGenerating(true);
    const timer = setTimeout(() => {
      setPostMap(generate30DayMap(answers?.niche, answers?.vibe, answers?.platform));
      setStrategy(getNicheStrategy(answers?.niche, answers?.vibe, answers?.platform, answers?.schedule, answers?.experience));
      setIsGenerating(false);

      // Automated Email Delivery for paid users
      if (answers?.email) {
        const hasSentEmail = sessionStorage.getItem(`sent_full_bundle_${answers?.email}`);
        if (!hasSentEmail) {
          fetch('/api/send-roadmap', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: answers?.email,
              niche: answers?.niche,
              name: answers?.name,
              isFullBundle: true,
              vibe: answers?.vibe,
              platforms: answers?.platform
              })
              }).then(() => {
            sessionStorage.setItem(`sent_full_bundle_${answers?.email}`, 'true');
          }).catch(err => console.error('Auto-email error:', err));
        }
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [answers]);

  const submitManualEmail = async () => {
    if (!emailInput || !emailInput.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    setEmailStatus('sending');
    try {
      const response = await fetch('/api/send-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailInput,
          niche: answers?.niche || 'Creator', // Fallback if data was lost
          name: answers?.name || 'Creator',
          isFullBundle: true, // Since they are on the dashboard, they likely paid or are testing
          vibe: answers?.vibe,
          platforms: answers?.platform
          })
          });
      if (response.ok) {
        setData({ ...answers, email: emailInput });
        setEmailStatus('success');
        sessionStorage.setItem(`sent_full_bundle_${emailInput}`, 'true');
      } else {
        const errData = await response.json();
        console.error('Manual claim error:', errData);
        setEmailStatus('error');
      }
    } catch (err) {
      console.error(err);
      setEmailStatus('error');
    }
  };

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <div className="w-16 h-16 border-t-2 border-brand-primary rounded-full animate-spin mb-8 shadow-[0_0_20px_rgba(139,92,246,0.2)]"></div>
        <h2 className="text-xl font-bold tracking-tighter uppercase italic text-zinc-100 animate-pulse">Personalizing Your Dashboard...</h2>
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
          { id: 'scripts', label: '30-Day Map & Scripts', icon: '📅' },
          { id: 'visuals', label: 'Starter Brand Assets', icon: '🎨' },
          { id: 'checklist', label: 'Your First Move (1k)', icon: '🚀' },
          { id: 'production', label: 'The Production System', icon: '⚙️' },
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
                <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100">Master <span className="text-brand-primary">Strategy</span></h2>
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
              <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100 mb-8">30-Day <span className="text-brand-secondary">Posting Map & Scripts</span></h2>
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
              <h2 className="text-2xl font-bold mb-10 italic uppercase tracking-tighter text-zinc-100">Starter <span className="text-brand-primary">Brand Assets</span></h2>
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
          {activeTab === 'checklist' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100 mb-8">Your First Move: <span className="text-brand-primary">1k Checklist</span></h2>
              <div className="space-y-4">
                {[
                  { t: 'Optimize Profile', d: 'Clear profile picture, keyword-rich bio, and a link in bio (even if it is just a newsletter).' },
                  { t: 'The First 5 Posts', d: 'Focus on high-value, shareable tips in your niche to seed your account.' },
                  { t: 'Engage with Giants', d: 'Leave thoughtful comments on the top 10 accounts in your niche every day.' },
                  { t: 'Consistent Volume', d: 'Post 1-2 times a day for 30 days. No excuses.' },
                  { t: 'Analyze & Pivot', d: 'After 10 posts, see which hook worked best and double down on that style.' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center space-x-4 p-6 rounded-2xl bg-black/40 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">✓</div>
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-widest">{step.t}</h4>
                      <p className="text-zinc-500 text-sm font-light">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'production' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-zinc-100 mb-8">The <span className="text-brand-secondary">Production System</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { t: 'The 10-Minute Edit', d: 'Use a single font, consistent colors, and 1-2 transitions maximum. Speed is king.' },
                  { t: 'Batch Processing', d: 'Write all 7 scripts for the week on Sunday. Record them all on Monday.' },
                  { t: 'Sound Selection', d: 'Use trending sounds but keep them at 5-10% volume so your voice/text is the focus.' },
                  { t: 'Caption Strategy', d: 'Use Claude or ChatGPT to turn your video scripts into daily captions. Keep them short and use 3-5 niche-specific hashtags.' },
                  { t: 'B-Roll Library', d: 'Find high-quality faceless footage on Canva, Pexels, or Pixabay. Search for "aesthetic," "minimalist," or your specific niche.' }
                ].map((item, i) => (
                  <div key={i} className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5">
                    <h3 className="text-[10px] font-black text-brand-secondary uppercase tracking-widest mb-4">{item.t}</h3>
                    <p className="text-zinc-400 text-sm font-light">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-8 rounded-[3rem] bg-zinc-900/50 border border-white/5 flex flex-col items-center justify-between gap-6 group">
          {answers?.email ? (
            <div className="text-center w-full py-4 animate-in fade-in zoom-in duration-700">
              <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-xl shadow-[0_0_20px_rgba(34,197,94,0.2)]">✓</div>
              <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-1">Bundle Delivered!</h4>
              <p className="text-zinc-500 text-sm font-light italic">Your full digital assets have been sent to <span className="text-brand-primary font-medium">{answers?.email}</span>. Check your inbox (and spam just in case).</p>
            </div>
          ) : (
            <div className="w-full">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-white uppercase italic tracking-tighter mb-1">Where should we deliver your bundle?</h4>
                <p className="text-zinc-500 text-sm font-light">You haven't set a delivery email yet. Enter it below to receive your full 30-day plan.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="you@example.com" 
                  className="flex-1 bg-black/40 border border-zinc-800 rounded-xl px-6 py-4 outline-none focus:border-brand-primary transition-all font-light"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <button 
                  onClick={submitManualEmail}
                  disabled={emailStatus === 'sending'}
                  className="bg-brand-primary text-white px-8 py-4 rounded-xl text-xs font-black uppercase hover:bg-brand-secondary transition-all"
                >
                  {emailStatus === 'sending' ? 'Sending...' : 'Deliver My Bundle'}
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5 w-full text-center">
                <p className="text-[10px] text-zinc-600 mb-3 uppercase font-bold">Already paid but no email?</p>
                <button 
                  onClick={() => {
                    if (!emailInput || !emailInput.includes('@')) {
                      alert('Please enter your email above first.');
                      return;
                    }
                    setEmailStatus('sending');
                    fetch('/api/send-roadmap', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        email: emailInput,
                        niche: answers?.niche,
                        name: answers?.name,
                        isFullBundle: true,
                        vibe: answers?.vibe,
                        platforms: answers?.platform
                      })
                    }).then(r => r.ok ? setEmailStatus('success') : setEmailStatus('error'));
                  }}
                  className="text-[10px] text-brand-primary/60 hover:text-brand-primary uppercase font-bold tracking-widest transition-colors"
                >
                  Try Force-Resending Bundle →
                </button>
              </div>
              {emailStatus === 'success' && <p className="text-green-500 text-[10px] mt-4 text-center font-bold uppercase tracking-widest">Sent! Check your inbox. ✓</p>}
              {emailStatus === 'error' && <p className="text-red-500 text-[10px] mt-4 text-center font-bold uppercase tracking-widest">Failed to send. Please try again.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- SalesPage Component ---
const SalesPage = ({ answers, onUnlock }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700">
      <div className="text-center mb-20">
         <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none italic uppercase text-white">
           The <span className="text-brand-primary">Faceless Creator</span> Bundle
         </h1>
         <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
           Skip the legwork. Everything you need to launch your faceless account today. The strategy, 30 scripts, your brand look, and a day-by-day plan for your first month.
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
         <div className="space-y-8">
            <h3 className="text-2xl font-bold italic uppercase tracking-tight text-white underline decoration-brand-primary decoration-4 underline-offset-8">What You Get:</h3>
            <div className="space-y-6">
               {[
                 { t: 'Master Strategy', d: 'A complete game plan for your niche, built to drive engagement and authority.' },
                 { t: '30-Day Map & Scripts', d: '30 pre-written, high-conversion scripts tailored to your specific platform and style.' },
                 { t: 'Starter Brand Assets', d: 'Custom visual guidelines, color palettes, and fonts for a professional "ghost" look.' },
                 { t: 'Your First Move: 1k Checklist', d: 'A step-by-step roadmap to hit your first 1,000 followers as fast as possible.' },
                 { t: 'The Production System', d: 'Our streamlined workflow for batching, editing, and posting content in record time.' }
               ].map((item, i) => (
                 <div key={i} className="flex items-start space-x-4">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0 text-brand-primary text-[10px]">✓</div>
                    <div>
                       <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-1">{item.t}</h4>
                       <p className="text-zinc-500 text-sm leading-relaxed">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="bg-zinc-900/50 border border-white/5 rounded-[3rem] p-10 flex flex-col justify-between items-center text-center shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-[10px] font-black text-brand-primary uppercase tracking-widest mb-8">One-Time Payment</span>
              <div className="text-6xl font-black text-white mb-4 tracking-tighter italic">$27</div>
              <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-12">Lifetime Dashboard Access</p>
              
              <button 
                onClick={onUnlock}
                className="w-full py-6 bg-gradient-brand rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all mb-6"
              >
                Unlock My Bundle Now
              </button>
              
              <div className="flex flex-col space-y-4">
                 <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest flex items-center justify-center space-x-2">
                    <span>💳 Secure Checkout</span>
                    <span>•</span>
                    <span>🚀 Instant Access</span>
                 </p>
              </div>
            </div>
            
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-[80px]"></div>
         </div>
      </div>
    </div>
  );
};