/* global process, Buffer */
import Stripe from 'stripe';
import { sendBundleEmail } from './lib/email-logic.js';

// We initialize Stripe inside the handler to catch configuration errors
export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  console.log('--- Webhook Start ---');
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    console.error('CRITICAL: STRIPE_SECRET_KEY is not defined in environment variables.');
    return res.status(500).json({ error: 'Server configuration error: missing secret key' });
  }

  const stripe = new Stripe(secretKey);
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    if (webhookSecret && sig) {
      console.log('Attempting signature verification...');
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
      console.log('Signature verified successfully.');
    } else {
      console.warn('STRIPE_WEBHOOK_SECRET or signature missing. Using unverified body (Dev Mode).');
      event = JSON.parse(buf.toString());
    }
  } catch (err) {
    console.error(`Webhook Verification Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`Event Type: ${event.type}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_details?.email;
    const clientRef = session.client_reference_id;

    console.log('Session Details:', {
      email,
      clientRef,
      paymentStatus: session.payment_status,
      amount: session.amount_total
    });

    if (email) {
      // SMART DATA EXTRACTION:
      // 1. Try to get niche/name from client_reference_id
      // 2. Fallback to the name Hannah typed into the credit card form
      let niche = 'Creator';
      let name = session.customer_details?.name || session.collected_information?.individual_name || 'Creator';

      if (clientRef && clientRef.includes('|')) {
        [niche, name] = clientRef.split('|');
      } else if (clientRef) {
        niche = clientRef;
      }

      console.log(`Triggering Bundle Email: to=${email}, niche=${niche}`);
      
      try {
        const result = await sendBundleEmail({
          email,
          niche: niche || 'your niche',
          name: name || 'Creator',
          isFullBundle: true
        });
        console.log('Email sent successfully via Webhook:', result.data?.id || 'Success');
      } catch (err) {
        console.error('FAILED to send email from Webhook:', err.message);
      }
    } else {
      console.error('ERROR: No email found in Stripe session.');
    }
  }

  console.log('--- Webhook End ---');
  res.status(200).json({ received: true });
}
