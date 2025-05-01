import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    {params}: {params: Promise<{ id: string }>}
) {
    const { id } = await params;

    if(!id) { 
        return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    try {
        const docRef = doc(db, "casais", id);
        const snapshot = await getDoc(docRef);

        if(!snapshot.exists()) {
            return NextResponse.json({ error: "Casal nao encontrado" }, { status: 404 });
        }

        if(snapshot.data().paid == false) { 
            return NextResponse.json({ error: "Casal nao pago" }, { status: 403 });
        }
        let data = snapshot.data()
        let info = { fotoUrl: data.fotoUrl, cor: data.cor, emoji: data.emoji, data: data.data, nome: data.nome, message: data.message, paid: data.paid, idMusic : data.idMusic };
        return NextResponse.json(info, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar casal" }, { status: 500 });
    }
}