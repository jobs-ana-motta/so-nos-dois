import { Track } from "@/lib/types/track";

export interface initialValues {
  nome1: string;
  nome2: string;
  data: Date | null;
  message: string;
  emoji: string;
  cor: string;
  file: string[];
  music: Track | null;
  type: "pix" | null | "card";
}

export const initialValues: initialValues = {
  nome1: "",
  nome2: "",
  data: null as Date | null,
  message: "",
  emoji: "",
  cor: "",
  file: [] as string[],
  music: null,
  type: null,
};
