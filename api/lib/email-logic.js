/* global process */
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const getNicheStrategy = (niche) => {
  const n = niche?.toLowerCase() || '';
  if (n.includes('ai') || n.includes('tech')) {
    return {
      title: 'The "Secret Tool" Method',
      description: "Position your page as the place people go to find tools that save them time.",
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
      description: "You are the guide showing people how to make money online without showing their face.",
      steps: [
        { t: 'The Hook', d: 'Focus on "Low effort, high reward" business ideas.' },
        { t: 'The Value', d: 'Break down the math. Show how $100/day is actually possible.' },
        { t: 'The Goal', d: 'Build trust by being honest about how long things actually take.' }
      ]
    };
  }
  return {
    title: 'The Value Specialist',
    description: "Solve a specific problem in your niche using simple, easy-to-follow advice.",
    steps: [
      { t: 'The Hook', d: 'Identify a "Mistake" people are making and offer a fix.' },
      { t: 'The Value', d: 'Share a "Quick Win" that someone can do in under 60 seconds.' },
      { t: 'The Goal', d: 'Focus on being the most helpful person in your niche.' }
    ]
  };
};

const generate30DayMap = (niche) => {
  const categories = [
    { type: 'Hook: Common Mistake', template: 'Stop making this common {{niche}} mistake if you want to grow.' },
    { type: 'Easy Steps: How-To', template: '3 easy steps to get [Result] in the {{niche}} space.' },
    { type: 'Viral: Hot Take', template: 'The one thing most {{niche}} creators get wrong...' },
    { type: 'Trust: Result Reveal', template: 'The "Secret" used by the top 1% of {{niche}} accounts.' },
    { type: 'Call to Action', template: 'I built the ultimate system for {{niche}} creators. Link in bio.' }
  ];
  return Array.from({ length: 30 }, (_, i) => {
    const cat = categories[i % categories.length];
    return {
      day: i + 1,
      type: cat.type,
      script: cat.template.replace('{{niche}}', niche || 'your niche')
    };
  });
};

export async function sendBundleEmail({ email, niche, name, isFullBundle }) {
  console.log(`Sending Email: to=${email}, niche=${niche}, fullBundle=${isFullBundle}`);
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing');
    throw new Error('RESEND_API_KEY is missing');
  }

  const strategy = getNicheStrategy(niche);
  const postMap = generate30DayMap(niche);

  const roadmapHtml = strategy.steps.map((s, i) => `
    <div style="margin-bottom: 15px;">
      <strong style="color: #8b5cf6;">Step ${i+1}: ${s.t}</strong><br/>
      <span style="color: #666; font-size: 13px;">${s.d}</span>
    </div>
  `).join('');

  const displayScripts = isFullBundle ? postMap : postMap.slice(0, 7);
  const postMapHtml = displayScripts.map(d => `
    <div style="padding: 10px; border-bottom: 1px solid #eee; font-size: 12px;">
      <strong>Day ${d.day} (${d.type}):</strong> "${d.script}"
    </div>
  `).join('');

  const fullBundleHeader = isFullBundle 
    ? `<div style="background: #e0e7ff; color: #4338ca; padding: 15px; border-radius: 12px; font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 30px;">
        ✓ PURCHASE CONFIRMED: Your Complete FacelessOS Bundle is Below
       </div>`
    : `<p style="font-size: 12px; color: #666;">Note: This is your summary roadmap. Unlock the full bundle for all 30 scripts and assets.</p>`;

  const productionSystemHtml = isFullBundle ? `
    <div style="margin-top: 30px; padding: 25px; background: #fafafa; border-radius: 20px;">
      <h2 style="font-size: 12px; text-transform: uppercase; color: #8b5cf6; letter-spacing: 1px; margin-bottom: 15px;">The Production System</h2>
      <div style="font-size: 13px; color: #444; line-height: 1.6;">
        <p><strong>1. Batch Scripts:</strong> Write all 7 scripts on Sunday using the map below.</p>
        <p><strong>2. Source B-Roll:</strong> Use Pexels or Canva to find "Aesthetic" and "Minimalist" footage.</p>
        <p><strong>3. The 10-Min Edit:</strong> One font, one transition, trending sound at 5% volume.</p>
        <p><strong>4. AI Captions:</strong> Use Claude to turn your scripts into engaging captions + 3 niche hashtags.</p>
      </div>
    </div>
  ` : '';

  const brandAssetsHtml = isFullBundle ? `
    <div style="margin-top: 30px; padding: 25px; background: #fafafa; border-radius: 20px;">
      <h2 style="font-size: 12px; text-transform: uppercase; color: #8b5cf6; letter-spacing: 1px; margin-bottom: 15px;">Starter Brand Assets</h2>
      <p style="font-size: 13px; color: #444; font-style: italic;">"Dark & Moody: High contrast, deep shadows, white bold serif text."</p>
    </div>
  ` : '';

  const upsellCta = !isFullBundle ? `
    <div style="margin-top: 40px; padding: 30px; background: #EEF2FF; border: 1px solid #C7D2FE; border-radius: 25px; text-align: center;">
      <h3 style="font-size: 20px; font-weight: 800; text-transform: uppercase; font-style: italic; letter-spacing: -1px; margin-bottom: 10px; color: #1e1b4b;">Unlock the Full Bundle</h3>
      <p style="font-size: 14px; color: #4338ca; margin-bottom: 25px; font-weight: 400; line-height: 1.4;">Don't spend weeks figuring out the setup. We built the scripts, the visual brand, and the posting plan for you.</p>
      <a href="https://stan.store/Facelessosapp/p/facelessos-bundle" style="display: inline-block; background: #6366f1; color: white; text-align: center; padding: 18px 35px; border-radius: 100px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);">Get My Full Bundle Now</a>
      <p style="font-size: 10px; color: #6366f1; margin-top: 15px; text-transform: uppercase; font-weight: bold; letter-spacing: 1px;">Instant Access • One-time Payment</p>
    </div>
  ` : `
    <div style="margin-top: 40px; text-align: center;">
      <a href="https://facelessos.app/?paid=true" style="display: inline-block; background: #6366f1; color: white; text-align: center; padding: 20px 40px; border-radius: 100px; text-decoration: none; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);">Open Creator Console</a>
      <p style="font-size: 11px; color: #999; margin-top: 15px;">Use the console to manage your 30-day progress and access future updates.</p>
    </div>
  `;

  return await resend.emails.send({
    from: 'FacelessOS <hello@facelessos.app>',
    to: [email],
    subject: isFullBundle ? `[DELIVERED] Your Full FacelessOS Bundle: ${niche}` : `Your Faceless Roadmap: ${niche}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eee; border-radius: 30px; color: #111;">
        <h1 style="font-style: italic; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 30px;">FACELESS<span style="color: #6366f1;">OS</span></h1>
        
        <p style="font-size: 16px; line-height: 1.6;">Hi ${name || 'Creator'},</p>
        <p style="font-size: 16px; line-height: 1.6;">Your <strong>${niche}</strong> growth engine is ready. ${isFullBundle ? "Your full bundle deliverables are detailed below." : "Here is your starter roadmap."}</p>
        
        ${fullBundleHeader}

        <div style="margin-top: 40px; padding: 25px; background: #fafafa; border-radius: 20px;">
          <h2 style="font-size: 12px; text-transform: uppercase; color: #8b5cf6; letter-spacing: 1px; margin-bottom: 15px;">Master Strategy: ${strategy.title}</h2>
          <p style="font-style: italic; font-size: 15px; margin-bottom: 20px;">"${strategy.description}"</p>
          ${roadmapHtml}
        </div>

        ${brandAssetsHtml}

        <div style="margin-top: 30px; padding: 25px; background: #fafafa; border-radius: 20px;">
          <h2 style="font-size: 12px; text-transform: uppercase; color: #8b5cf6; letter-spacing: 1px; margin-bottom: 15px;">${isFullBundle ? '30-Day Posting Map & Scripts' : 'Week 1 Posting Plan'}</h2>
          ${postMapHtml}
          ${!isFullBundle ? '<p style="font-size: 11px; color: #999; margin-top: 15px;">+ 23 more days in your bundle.</p>' : ''}
        </div>

        <div style="margin-top: 30px; padding: 25px; background: #fafafa; border-radius: 20px;">
          <h2 style="font-size: 12px; text-transform: uppercase; color: #8b5cf6; letter-spacing: 1px; margin-bottom: 15px;">1k Follower Checklist</h2>
          <ul style="font-size: 13px; color: #444; line-height: 1.8; padding-left: 20px;">
            <li>Optimize Profile (Bio & Link)</li>
            <li>Post 1-2x Daily</li>
            <li>Engage with 10 competitors daily</li>
            <li>Analyze hooks after 10 posts</li>
          </ul>
        </div>

        ${productionSystemHtml}

        ${upsellCta}
        
        <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />
        <p style="font-size: 10px; color: #bbb; text-align: center;">&copy; 2026 FacelessOS. All rights reserved. Delivered to ${email}.</p>
      </div>
    `,
  });
}
