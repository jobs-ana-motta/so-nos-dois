"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import { Field, Form, Formik } from "formik";
import { initialValues } from "./forms/initialValues";
import InputFormik from "@/components/forms/input";
import {
  User,
  CalendarIcon,
  MessageSquare,
  Smile,
  Palette,
  Upload,
  Loader,
  Music,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { DialogContent, Dialog, DialogTitle } from "@/components/ui/dialog";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "@/lib/recorteImg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { dataUrlToFile } from "@/lib/dataUrlTofile";
import { objectToFormData } from "@/lib/objectToFormData";
import { validationSchema } from "./forms/validationSchema";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Preview from "@/components/preview";
import SearchSpotfy from "@/components/searchSpotfy";
import { Track } from "@/lib/types/track";

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
  const [music, setMusica] = useState<Track>();
  const [modalOpen, setModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [fullImage, setFullImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState(initialValues);

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

  const handleSubmit = async (
    values: any,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    setLoading(true);
    const file = dataUrlToFile(values.file);
    const formateddValues = { ...values, file };
    formateddValues.nome = `${values.nome1} e ${values.nome2}`;
    formateddValues.idMusic = values.music.id
    delete formateddValues.nome1;
    delete formateddValues.nome2;
    delete formateddValues.music;
    const sendValues = objectToFormData(formateddValues);

    const response = await fetch("/api/casal", {
      method: "POST",
      body: sendValues,
    });

    const data = await response.json();
    console.log(data);
    setFullImage("");
    setSelectedEmoji("");
    setSelectedColor("");
    setSubmitting(false);
    setLoading(false);
    resetForm();

    if (response.ok && data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      alert("Erro ao criar sessão de pagamento.");
      console.error(data);
    }
  };

  return (
    <div className="flex w-full h-screen flex-col items-center gap-5">
      <Header />
      <main className="flex-1 flex flex-col xl:flex-row gap-6 p-4 mt-20 w-full max-w-7xl mx-auto">
        <div>
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl">Crie sua página especial</h1>
            <p className="text-gray-300 text-sm text-center">
              Preencha os detalhes abaixo para criar uma página única e
              romântica para vocês dois.
            </p>
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              setFieldTouched
            }) => {
              const handleCrop = async () => {
                const croppedImage = await getCroppedImg(
                  imageSrc!,
                  croppedAreaPixels!
                );
                setFullImage(croppedImage);
                setFieldValue("file", [...values.file, croppedImage]);
                setModalOpen(false);
              };

              useEffect(() => {
                setPreviewData(values);
              }, [values]);
              return (
                <Form className="w-full flex items-center flex-col p-4 bg-[#1f1f1f] rounded shadow-md gap-4 md:min-w-[768px]">
                  <div className="flex w-full justify-between gap-4">
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-md flex gap-2 items-center">
                        <User className="text-[#D22630]" /> Eu
                      </p>
                      <InputFormik
                        name="nome1"
                        className="flex-1 outline-none "
                        placeholder="Seu Nome"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.nome1 && touched.nome1 ? (
                        <div className="text-[#D22630] text-xs">
                          {errors.nome1}
                        </div>
                      ) : (
                        " "
                      )}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <p className="text-md flex gap-2 items-center">
                        <User className="text-[#D22630]" /> Meu Amor
                      </p>
                      <InputFormik
                        name="nome2"
                        className="flex-1 outline-none "
                        placeholder="Nome do seu amor"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.nome2 && touched.nome2 ? (
                        <div className="text-[#D22630] text-xs">
                          {errors.nome2}
                        </div>
                      ) : (
                        <div>{""}</div>
                      )}
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <p className="text-md flex gap-2 items-center">
                      <CalendarIcon className="text-[#D22630]" /> Data do início
                      do relacionamento
                    </p>

                    <Field name="data">
                      {({ form, field }: any) => {
                        const date = field.value ? new Date(field.value) : null;

                        return (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                className={cn(
                                  "w-full flex justify-start items-center text-left cursor-pointer px-4 py-2 rounded-md bg-card-foreground gap-2 border-[0.5px] border-gray-700"
                                )}
                              >
                                <CalendarIcon className="h-4 w-4" />
                                {date
                                  ? format(date, "dd/MM/yyyy")
                                  : "Selecione a data"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <DatePicker
                                selected={
                                  values.data ? values.data : new Date()
                                }
                                onChange={(d) => {
                                  form.setFieldValue("data", d);
                                }}
                                dateFormat={"dd/MM/yyyy"}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                locale={ptBR}
                                className="w-full p-2 text-sm rounded-md focus:outline-none"
                                inline
                              />
                            </PopoverContent>
                          </Popover>
                        );
                      }}
                    </Field>

                    {errors.data && touched.data ? (
                      <div className="text-[#D22630] text-xs">
                        {errors.data}
                      </div>
                    ) : (
                      <div>{""}</div>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <p className="text-md flex gap-2 items-center">
                      <Music className="text-[#D22630]" /> Escolha a música de
                      vocês
                    </p>

                    <SearchSpotfy
                      value={values.music}
                      onChange={(track) => {
                        setFieldValue("music", track);
                        setMusica(track);
                      }}
                      onBlur={() => setFieldTouched("music", true)}
                    />

                    {errors.music && touched.music ? (
                      <div className="text-[#D22630] text-xs">
                        {errors.music}
                      </div>
                    ) : (
                      " "
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <p className="text-md flex gap-2 items-center">
                      <MessageSquare className="text-[#D22630]" /> Mensagem
                      personalizada
                    </p>
                    <Textarea
                      name="message"
                      className="outline-none bg-card-foreground border-[0.5px] border-gray-700 resize-none"
                      placeholder="Messagem fofinha"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.message && touched.message ? (
                      <div className="text-[#D22630] text-xs">
                        {errors.message}
                      </div>
                    ) : (
                      <div>{""}</div>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <p className="text-md flex gap-2 items-center">
                      <Smile className="text-[#D22630]" /> Emoji que representa
                      o casal
                    </p>
                    <div className="grid grid-cols-10 gap-2">
                      {EMOJIS.map((emoji) => (
                        <Button
                          key={emoji}
                          type="button"
                          variant={
                            selectEmoji === emoji ? "secondary" : "ghost"
                          }
                          className={cn("h-10 w-10 p-0 text-xl cursor-pointer")}
                          onClick={() => {
                            setSelectedEmoji(emoji);
                            setFieldValue("emoji", emoji);
                          }}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>

                    {errors.emoji && touched.emoji ? (
                      <div className="text-[#D22630] text-xs">
                        {errors.emoji}
                      </div>
                    ) : (
                      <div>{""}</div>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <p className="text-md flex gap-2 items-center">
                      <Palette className="text-[#D22630]" /> Cor de fundo
                    </p>

                    <div className="grid grid-cols-10 gap-3 md:gap-6">
                      {COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={cn(
                            "h-6 w-6 rounded-full border-2 cursor-pointer",
                            colorSel === color
                              ? "border-white ring-2 ring-primary"
                              : "border-transparent"
                          )}
                          style={{ backgroundColor: color }}
                          onClick={() => {
                            setSelectedColor(color);
                            setFieldValue("cor", color);
                          }}
                          aria-label={`Cor ${color}`}
                        />
                      ))}
                    </div>

                    {errors.cor && touched.cor ? (
                      <div className="text-[#D22630] text-xs">{errors.cor}</div>
                    ) : (
                      <div>{""}</div>
                    )}
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
                        disabled={values.file.length === 5}
                      />
                      <label
                        htmlFor="photo"
                        className={`${
                          values.file.length === 5
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        <div className="flex h-32 w-full items-center justify-center rounded-lg border border-dashed p-4 text-center">
                          Clique para fazer upload
                        </div>
                      </label>

                      {errors.file && touched.file ? (
                        <div className="text-[#D22630] text-xs">
                          {errors.file}
                        </div>
                      ) : (
                        <div>{""}</div>
                      )}

                      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogTitle className="hidden">
                          Recorte sua foto
                        </DialogTitle>
                        <DialogContent className="w-[90vw] max-w-xl h-[70vh]">
                          {imageSrc && (
                            <div className="relative w-full h-full">
                              <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={12 / 16}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZomm}
                              />
                              <Button
                                className="absolute left-1/2 -translate-x-1/2 -bottom-6 bg-[#D22630] cursor-pointer"
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
                    <div className="my-4 flex gap-2 flex-wrap">
                      {values.file.map((img, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={img}
                            alt={`Foto ${index}`}
                            width={100}
                            height={160}
                            className="rounded-md object-cover border border-gray-600"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updated = values.file.filter(
                                (_, i) => i !== index
                              );
                              setFieldValue("file", updated);
                            }}
                            className="absolute top-1 right-1 bg-[#D22630] text-white text-xs px-2 py-1 rounded cursor-pointer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <Button
                    onClick={() => handleSubmit()}
                    className="bg-[#D22630] w-full cursor-pointer"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <p className="font-semibold text-gray-400 opacity-90">
                          Carregando...
                        </p>
                        <Loader className="h-5 w-5 animate-spin" />
                      </div>
                    ) : (
                      "Criar sua página"
                    )}
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="flex justify-center items-center">
          <Preview
            cor={previewData.cor}
            data={previewData?.data?.toISOString() || null}
            emoji={previewData.emoji}
            message={previewData.message}
            nome={`${previewData.nome1} e ${previewData.nome2}`}
            fotosUrl={previewData.file}
            trackId={music?.id || null}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
