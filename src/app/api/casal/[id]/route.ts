import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id = params.id;

    if(!id) { 
        return NextResponse.json({ error: "ID não fornecido" }, { status: 400 });
    }

    try {
        const docRef = doc(db, "casais", id);
        const snapshot = await getDoc(docRef);

        if(!snapshot.exists()) {
            return NextResponse.json({ error: "Casal nao encontrado" }, { status: 404 });
        }

        return NextResponse.json(snapshot.data(), { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar casal" }, { status: 500 });
    }
}