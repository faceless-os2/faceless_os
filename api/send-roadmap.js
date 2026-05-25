import { sendBundleEmail } from './lib/email-logic.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, niche, name, isFullBundle, vibe } = req.body;
  console.log('Roadmap Request:', { email, niche, name, isFullBundle, vibe });

  try {
    const result = await sendBundleEmail({ email, niche, name, isFullBundle, vibe });

    if (result.error) {
      return res.status(400).json({ error: result.error.message || result.error });
    }
    res.status(200).json({ success: true, id: result.data?.id });
  } catch (err) {
    console.error('Email Error:', err);
    res.status(500).json({ error: err.message });
  }
}
