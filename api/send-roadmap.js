import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, niche, name } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'FacelessOS <hello@facelessos.com>',
      to: [email],
      subject: `Your Faceless Roadmap for ${niche}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 20px;">
          <h1 style="font-style: italic; text-transform: uppercase; letter-spacing: -2px;">FACELESS<span style="color: #ff3e00;">OS</span></h1>
          <p>Hi ${name || 'Creator'},</p>
          <p>Here is your personalized growth plan for the <strong>${niche}</strong> niche.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h2 style="font-size: 14px; text-transform: uppercase; color: #666;">Master Strategy</h2>
            <p>Focus on high-value, shareable tips. Use big bold text and moody visuals to capture attention.</p>
          </div>

          <div style="background: #f9f9f9; padding: 20px; border-radius: 15px; margin: 20px 0;">
            <h2 style="font-size: 14px; text-transform: uppercase; color: #666;">30-Day Post Map</h2>
            <p>Check your dashboard for your full 30-day schedule and viral scripts.</p>
          </div>

          <a href="https://facelessos.com/dashboard?paid=true" style="display: block; background: black; color: white; text-align: center; padding: 15px; border-radius: 10px; text-decoration: none; font-weight: bold; margin-top: 30px;">Access Your Full Dashboard</a>
          
          <p style="font-size: 10px; color: #999; margin-top: 40px;">&copy; 2026 FacelessOS. All rights reserved.</p>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json(error);
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
