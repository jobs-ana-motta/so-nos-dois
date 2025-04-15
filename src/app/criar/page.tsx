"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Form, Formik } from "formik";
import { initialValues } from "./forms/initialValues";
import InputFormik from "@/components/forms/input";
import {
  User,
  Calendar,
  MessageSquare,
  Smile,
  Palette,
  Upload,
  Heart,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/recorteImg";

const EMOJIS = [
  "❤️",
  "💕",
  "💘",
  "💖",
  "💗",
  "💓",
  "💞",
  "💝",
  "💑",
  "👩‍❤️‍👨",
  "👨‍❤️‍👨",
  "👩‍❤️‍👩",
  "🌹",
  "✨",
  "🔥",
  "🥰",
  "😍",
  "💋",
  "🌈",
  "🍷",
];

const COLORS = [
  "#D22630", // Cor principal
  "#B01F28", // Variação escura
  "#E84C55", // Variação clara
  "#FF6B81", // Rosa romântico
  "#FF9999", // Rosa claro
  "#990000", // Vermelho escuro
  "#CC0000", // Vermelho
  "#800020", // Burgundy
  "#8B0000", // Dark red
  "#FF007F", // Rosa forte
  "#C71585", // Medium violet red
  "#FF1493", // Deep pink
  "#FF69B4", // Hot pink
  "#DB7093", // Pale violet red
  "#FFB6C1", // Light pink
];

export default function Create() {
  const [selectEmoji, setSelectedEmoji] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZomm] = useState(1);
  const [colorSel, setSelectedColor] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fullImage, setFullImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setModalOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(imageSrc!, croppedAreaPixels!);
    setFullImage(croppedImage);
    console.log(croppedImage);
    setModalOpen(false);
  };
  return (
    <div className="flex w-full h-screen flex-col items-center gap-5">
      <Header />
      <main className="flex-1 flex items-center flex-col gap-4 p-2">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-2xl">Crie sua página especial</h1>
          <p className="text-gray-300 text-sm text-center">
            Preencha os detalhes abaixo para criar uma página única e romântica
            para vocês dois.
          </p>
        </div>

        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="w-full flex items-center flex-col p-4 bg-[#1f1f1f] rounded shadow-md gap-4 md:min-w-[768px]">
              <div className="flex w-full justify-between gap-4">
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-md flex gap-2 items-center">
                    <User className="text-[#D22630]" /> Eu
                  </p>
                  <InputFormik name="nome1" className="flex-1 outline-none " />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p className="text-md flex gap-2 items-center">
                    <User className="text-[#D22630]" /> Meu Amor
                  </p>
                  <InputFormik name="nome2" className="flex-1 outline-none " />
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="text-md flex gap-2 items-center">
                  <Calendar className="text-[#D22630]" /> Data do início do
                  relacionamento
                </p>
                <InputFormik name="nome2" className="outline-none" />
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="text-md flex gap-2 items-center">
                  <MessageSquare className="text-[#D22630]" /> Mensagem
                  personalizada
                </p>
                <Textarea
                  name="message"
                  className="outline-none bg-card-foreground border-[0.5px] border-gray-700 resize-none max-w-[750px]"
                />
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="text-md flex gap-2 items-center">
                  <Smile className="text-[#D22630]" /> Emoji que representa o
                  casal
                </p>
                <div className="grid grid-cols-10 gap-2">
                  {EMOJIS.map((emoji) => (
                    <Button
                      key={emoji}
                      type="button"
                      variant={selectEmoji === emoji ? "secondary" : "ghost"}
                      className={cn("h-10 w-10 p-0 text-xl cursor-pointer")}
                      onClick={() => setSelectedEmoji(emoji)}
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="text-md flex gap-2 items-center">
                  <Palette className="text-[#D22630]" /> Cor de fundo
                </p>

                <div className="grid grid-cols-10 gap-8">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      className={cn(
                        "h-8 w-8 rounded-full border-2",
                        colorSel === color
                          ? "border-white ring-2 ring-primary"
                          : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Cor ${color}`}
                    />
                  ))}
                </div>
              </div>

              <div className="w-full flex flex-col gap-2">
                <p className="text-md flex gap-2 items-center">
                  <Upload className="text-[#D22630]" /> Foto especial
                </p>

                <div>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="photo" className="cursor-pointer">
                    <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed p-4 text-center">
                      Clique para fazer upload
                    </div>
                  </label>

                  <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent className="w-[90vw] max-w-xl h-[70vh]">
                      {imageSrc && (
                        <div className="relative w-full h-full">
                          <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            aspect={9 / 16}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZomm}
                          />
                          <Button
                            className="absolute bottom-4 left-1/2 -translate-x-1/2"
                            onClick={handleCrop}
                          >
                            Recortar imagem
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {fullImage && (
                <div className="mt-4 flex justify-center">
                  <Image
                    src={fullImage}
                    alt="Preview recortado"
                    width={200}
                    height={355}
                    className="rounded-lg object-cover border border-gray-600"
                  />
                </div>
              )}
            </Form>
          )}
        </Formik>
      </main>
      <Footer />
    </div>
  );
}
