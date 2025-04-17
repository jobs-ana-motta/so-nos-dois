import { stripe } from "@/lib/stripe";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};


export async function POST(req: NextRequest) {
    const sig = req.headers.get("stripe-signature")!;
    const rawBody = await req.text(); // body como texto cru, essencial pra verificação do Stripe
  
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
  
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const casalId = session.metadata?.casalId;
  
      if (casalId) {
        try {
          await updateDoc(doc(db, "casais", casalId), { paid: true });
          console.log("✅ Pagamento confirmado para o casal:", casalId);
        } catch (err) {
          console.error("Erro ao atualizar o casal no Firestore:", err);
        }
      }
    }
  
    return NextResponse.json({ received: true });
  }