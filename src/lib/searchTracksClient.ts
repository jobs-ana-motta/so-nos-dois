export async function searchTracks(query: string) {
    const res = await fetch(`/api/spotify?q=${encodeURIComponent(query)}&type=track&limit=10`);
    if (!res.ok) throw new Error("Erro ao buscar músicas");
    return res.json();
  }