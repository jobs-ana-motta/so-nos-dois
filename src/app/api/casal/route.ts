import { uploadToCloudinary } from "@/lib/cloudnary";
import { db } from "@/lib/firebase";
import { formDataToObject } from "@/lib/formDataToObject";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const casalSchema = z.object({
  nome: z.string().min(1, "Nome obrigatorio"),
  message: z.string().min(1, "Mensagem obrigatorio"),
  emoji: z.string().min(1, "Emoji obrigatorio"),
  data: z.string().min(1, "Data de inicio obrigatorio"),
  cor: z.string().min(1, "Cor de fundo obrigatorio"),
  fotoUrl: z.string().min(1, "Url da foto obrigatorio"),
  paid: z.boolean().default(false),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "Imagem não enviada" },
        { status: 400 }
      );
    }

    const fields = formDataToObject(formData); // transforma tudo em um objeto

    const fotoUrl = await uploadToCloudinary(file, "casais");
    const parsed = casalSchema.safeParse({ ...fields, fotoUrl, paid : false });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Erro de validação", detalhes: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "casais"), {
      ...parsed.data,
      criadoEm: Timestamp.now(),
    });
    let url =  `${process.env.PUBLIC_URL}/api/casal/${docRef.id}`
    return NextResponse.json({ id: docRef.id, ok: true, url }, { status: 201 });
  } catch (error) {
    console.error("❌ Erro em /api/casal:", error);
    return NextResponse.json(
      { error: "Erro interno ao salvar no Firebase", detalhes: error },
      { status: 500 }
    );
  }
}
