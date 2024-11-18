import { NextApiRequest, NextApiResponse } from 'next';
import getRawBody from 'raw-body';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51Q7otE00ffkRUeeSNKqMZLAVvxk5Eb0hwkkw7cVVYWiWPIPPTSe2fu4p3074vbNxPALEERydW5Vxw6VrKLVgpoq100Y1WEh078", {});

export const config = {
  api: {
    bodyParser: false, // Desactiva el bodyParser para recibir el raw body de Stripe
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    // Obtiene el cuerpo en formato raw
    const rawBody = await getRawBody(req);

    // Construye el evento usando el webhook de Stripe
    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    } else {
      res.status(400).send(`Webhook Error: Unhandled exception`);
    }
    return;
  }

  // Manejar los eventos de Stripe aquí
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const appointmentId = session.metadata?.appointmentId;

    if (appointmentId) {
      try {
        // Actualizar el estado de la cita en la base de datos (debes implementar esta parte)
        await updateAppointmentStatus(appointmentId, 'Pagado');
        console.log(`Pago confirmado y cita ${appointmentId} actualizada a Pagado`);
      } catch (error) {
        console.error('Error actualizando la cita:', error);
      }
    }
  }

  res.status(200).json({ received: true });
}

async function updateAppointmentStatus(appointmentId: string, status: string) {
  // Aquí debes implementar la lógica para actualizar la cita en tu base de datos.
  // Por ejemplo, si estás usando MongoDB:
  // await Appointment.updateOne({ _id: appointmentId }, { status: status });
}
