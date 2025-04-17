import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// 🔐 senha que será usada na query, define no .env se quiser
const PASSWORD = process.env.UPDATE_SECRET || "1234";

// @ts-ignore
export async function PATCH(
  request: NextRequest,
  {params}: {params: Promise<{ id: string }>}
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!id) {
    return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
  }

  if (secret !== PASSWORD) {
    return NextResponse.json({ error: "Senha inválida" }, { status: 401 });
  }

  try {
    const docRef = doc(db, "casais", id);
    await updateDoc(docRef, { paid: true });

    return NextResponse.json({ ok: true, message: "Casal marcado como pago." }, { status: 200 });
  } catch (error) {
    console.error("Erro ao atualizar casal:", error);
    return NextResponse.json({ error: "Erro ao atualizar casal" }, { status: 500 });
  }
}
