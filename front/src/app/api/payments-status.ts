// pages/api/payment-status.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51Q7otE00ffkRUeeSNKqMZLAVvxk5Eb0hwkkw7cVVYWiWPIPPTSe2fu4p3074vbNxPALEERydW5Vxw6VrKLVgpoq100Y1WEh078", {

});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id as string);

    if (session.payment_status === 'paid') {
      // Suponiendo que el appointmentId está en los metadatos de la sesión
      const appointmentId = session.metadata?.appointmentId;

      res.status(200).json({ status: 'paid', appointmentId });
    } else {
      res.status(400).json({ status: 'unpaid' });
    }
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    res.status(500).json({ error: 'Error retrieving payment status' });
  }
}
