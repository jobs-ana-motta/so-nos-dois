import { uploadToCloudinary } from "@/lib/cloudnary";
import { db } from "@/lib/firebase";
import { formDataToObject } from "@/lib/formDataToObject";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

const casalSchema = z.object({
  nome: z.string().min(1, "Nome obrigatorio"),
  message: z.string().min(1, "Mensagem obrigatoria"),
  emoji: z.string().min(1, "Emoji obrigatorio"),
  data: z.string().min(1, "Data de início obrigatoria"),
  cor: z.string().min(1, "Cor de fundo obrigatoria"),
  fotoUrl: z.string().min(1, "Foto obrigatoria"),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Imagem não enviada" }, { status: 400 });
    }

    const fields = formDataToObject(formData);
    const fotoUrl = await uploadToCloudinary(file, "casais");
    console.log(fields)
    const parsed = casalSchema.safeParse({ ...fields, fotoUrl });

    if (!parsed.success) {
      return NextResponse.json({ error: "Erro de validação", detalhes: parsed.error.flatten() }, { status: 400 });
    }

    // Cria no banco com paid = false
    const docRef = await addDoc(collection(db, "casais"), {
      ...parsed.data,
      paid: false,
      criadoEm: Timestamp.now(),
    });

    // Cria sessão de pagamento com ID do casal
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price : process.env.STRIPE_PRICE_ID!,  
          quantity: 1,
        },
      ],
      success_url: `${process.env.PUBLIC_URL}/gratidao?id=${docRef.id}`,
      cancel_url: `${process.env.PUBLIC_URL}/pendente?id=${docRef.id}`,
      metadata: {
        casalId: docRef.id,
      },
    });
    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("❌ Erro ao criar casal:", error);
    return NextResponse.json({ error: "Erro interno", detalhes: error }, { status: 500 });
  }
}