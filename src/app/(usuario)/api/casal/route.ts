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
  fotoUrl: z.array(z.string()).min(1, "Foto obrigatoria"),
  idMusic: z.string().min(1, "Musica obrigatoria"),
  type: z.string().min(1, "Tipo obrigatório"),
});

let message = (idPagina: string) => {
  return `Olá! Gostaria de realizar o pagamento via Pix.

  Chave Pix: motta.phenrique@gmail.com
  Nome do Titular: Paulo Henrique Ribeiro Motta
  Valor: R$14.99
  
  Por favor, envie o comprovante de pagamento respondendo esta mensagem.
  
  ID da Página: ${idPagina}`;
};

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file") as File[] | null;
    if (!files) {
      return NextResponse.json(
        { error: "Imagem não enviada" },
        { status: 400 }
      );
    }
    const fotoUrl = [];

    for (let file of files) {
      let picture = await uploadToCloudinary(file, "casais");
      fotoUrl.push(picture);
    }
    const fields = formDataToObject(formData);
    const parsed = casalSchema.safeParse({ ...fields, fotoUrl });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Erro de validação", detalhes: parsed.error.flatten() },
        { status: 400 }
      );
    }

    // Cria no banco com paid = false
    const docRef = await addDoc(collection(db, "casais"), {
      ...parsed.data,
      paid: false,
      criadoEm: Timestamp.now(),
    });

    if (parsed.data.type == "card") {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID!,
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
    } else {
      return NextResponse.json({ checkoutUrl: 'https://wa.me/5543999179636?text=' + message(docRef.id) }, { status: 200, statusText: 'OK' });
    }

    // Cria sessão de pagamento com ID do casal
  } catch (error) {
    console.error("❌ Erro ao criar casal:", error);
    return NextResponse.json(
      { error: "Erro interno", detalhes: error },
      { status: 500 }
    );
  }
}
