import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Content Helpers (Replicated from App.jsx for consistency) ---
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
    { type: 'Hook: Common Mistake', template: 'Stop doing [Mistake] if you want to win in {{niche}}.' },
    { type: 'Easy Steps: How-To', template: 'How to get [Result] in {{niche}} using this 3-step plan.' },
    { type: 'Viral: Hot Take', template: 'Most creators in {{niche}} are wrong about this one thing...' },
    { type: 'Trust: Result Reveal', template: 'I looked at 100 accounts in {{niche}} and found this secret.' },
    { type: 'Call to Action', template: 'If you want to master {{niche}}, I built this to help you.' }
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

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, niche, name, isFullBundle } = req.body;
  const strategy = getNicheStrategy(niche);
  const postMap = generate30DayMap(niche);

  const roadmapHtml = strategy.steps.map((s, i) => `
    <div style="margin-bottom: 15px;">
      <strong style="color: #ff3e00;">Step ${i+1}: ${s.t}</strong><br/>
      <span style="color: #666; font-size: 13px;">${s.d}</span>
    </div>
  `).join('');

  const postMapHtml = postMap.slice(0, 7).map(d => `
    <div style="padding: 10px; border-bottom: 1px solid #eee; font-size: 12px;">
      <strong>Day ${d.day} (${d.type}):</strong> "${d.script}"
    </div>
  `).join('');

  const fullBundleNote = isFullBundle 
    ? `<p style="background: #e6fffa; color: #2c7a7b; padding: 10px; border-radius: 8px; font-size: 12px; font-weight: bold;">✓ Full Bundle Contents Included Below</p>`
    : `<p style="font-size: 12px; color: #666;">Note: This is your summary. Unlock the full bundle for all 30 scripts and assets.</p>`;

  try {
    console.log('Attempting to send email to:', email);
    const result = await resend.emails.send({
      from: 'FacelessOS <hello@facelessos.app>',
      to: [email],
      subject: isFullBundle ? `[COMPLETED] Your Full FacelessOS Bundle: ${niche}` : `Your Faceless Roadmap: ${niche}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eee; border-radius: 30px; color: #111;">
          <h1 style="font-style: italic; text-transform: uppercase; letter-spacing: -2px; margin-bottom: 30px;">FACELESS<span style="color: #ff3e00;">OS</span></h1>
          
          <p style="font-size: 16px; line-height: 1.6;">Hi ${name || 'Creator'},</p>
          <p style="font-size: 16px; line-height: 1.6;">Your <strong>${niche}</strong> growth engine is ready. ${isFullBundle ? "Below is your full 30-day posting plan and master strategy." : "Here is your starter roadmap."}</p>
          
          ${fullBundleNote}

          <div style="margin-top: 40px; padding: 25px; background: #fafafa; border-radius: 20px;">
            <h2 style="font-size: 12px; text-transform: uppercase; color: #ff3e00; letter-spacing: 1px; margin-bottom: 15px;">Master Strategy: ${strategy.title}</h2>
            <p style="font-style: italic; font-size: 15px; margin-bottom: 20px;">"${strategy.description}"</p>
            ${roadmapHtml}
          </div>

          <div style="margin-top: 30px; padding: 25px; background: #fafafa; border-radius: 20px;">
            <h2 style="font-size: 12px; text-transform: uppercase; color: #ff3e00; letter-spacing: 1px; margin-bottom: 15px;">Week 1 Posting Plan</h2>
            ${postMapHtml}
            <p style="font-size: 11px; color: #999; margin-top: 15px;">+ 23 more days in your dashboard.</p>
          </div>

          <div style="margin-top: 30px; padding: 25px; background: #fafafa; border-radius: 20px;">
            <h2 style="font-size: 12px; text-transform: uppercase; color: #ff3e00; letter-spacing: 1px; margin-bottom: 15px;">The 1k Checklist</h2>
            <ul style="font-size: 13px; color: #444; line-height: 1.8; padding-left: 20px;">
              <li>Optimize Profile (Bio & Link)</li>
              <li>Post 1-2x Daily</li>
              <li>Engage with 10 competitors daily</li>
              <li>Analyze hooks after 10 posts</li>
            </ul>
          </div>

          <a href="https://facelessos.com/dashboard?paid=true" style="display: block; background: #ff3e00; color: white; text-align: center; padding: 20px; border-radius: 15px; text-decoration: none; font-weight: bold; margin-top: 40px; box-shadow: 0 10px 20px rgba(255, 62, 0, 0.2);">Access Full Dashboard & Assets</a>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;" />
          <p style="font-size: 10px; color: #bbb; text-align: center;">&copy; 2026 FacelessOS. All rights reserved. Delivered to ${email}.</p>
        </div>
      `,
    });
    console.log('Resend response:', result);
    if (result.error) {
      console.error('Resend Error:', result.error);
      return res.status(400).json({ error: result.error });
    }
    res.status(200).json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error('Catch Error:', err);
    res.status(500).json({ error: err.message });
  }
}
