"use client";
import { Command, CommandInput, CommandItem, CommandList } from "./ui/command";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { searchTracks } from "@/lib/searchTracksClient";
import { X } from "lucide-react";

interface SearchSpotifyProps {
    value: any | null;
    onChange: (track: any | null) => void;
}

export default function SearchSpotfy({ value, onChange }: SearchSpotifyProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
    } else {
      const fetchTracks = async () => {
        const tracks = await searchTracks(debouncedQuery);
        setResults(tracks);
      };

      fetchTracks();
    }
  }, [debouncedQuery]);

  if (value) {
    return (
      <div className="w-full h-16 max-w-lg flex justify-start gap-3 rounded-lg border shadow-md bg-accent-foreground text-white border-accent-foreground">
        <img
          src={value.album.images?.[2]?.url}
          className="h-full rounded"
        />
        <div>
          <div>
            <p className="font-bold text-start">{value.name}</p>
            <p className="text-sm text-muted-foreground text-start line-clamp-1">
              {value.artists.map((a: any) => a.name).join(", ")}
            </p>
          </div>
        </div>
        <button
            onClick={() => {
                onChange(null)
                setQuery('')    
                }
            }
            className="ml-auto px-3 py-1  rounded text-sm text-white"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <Command className="w-full flex justify-center  h-16 max-w-lg rounded-lg border shadow-md bg-transparent text-white border-accent-foreground relative overflow-visible">
      <CommandInput
        placeholder="Buscar música no Spotify..."
        value={query}
        onValueChange={setQuery}
        className="py-0 "
      />
      <CommandList className="absolute h-auto top-12 z-50 bg-card-foreground w-full">
        {results.map((track) => (
          <CommandItem
            key={track.id}
            value={track.name}
            onSelect={() => {
              onChange(track);
            }}
          >
            <div className="flex items-center gap-2">
              <img
                src={track.album.images?.[2]?.url}
                alt={track.name}
                className="w-8 h-8 rounded"
              />
              <span>
                {track.name} —{" "}
                {track.artists.map((a: any) => a.name).join(", ")}
              </span>
            </div>
          </CommandItem>
        ))}
      </CommandList>
    </Command>
  );
}
