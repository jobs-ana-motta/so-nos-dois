import { stripe } from "@/lib/stripe";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const config = {
  api: {
    bodyParser: false,
  },
};

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (err: any) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const casalId = session.metadata?.casalId;

    if (casalId) {
      try {
        await updateDoc(doc(db, "casais", casalId), {
          paid: true,
        });
        console.log(`✅ Pagamento confirmado e casal ${casalId} marcado como pago.`);
      } catch (err) {
        console.error("Erro ao atualizar casal como pago:", err);
      }
    }
  }

  res.json({ received: true });
}