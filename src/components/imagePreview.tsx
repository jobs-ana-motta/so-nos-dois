import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export default function ImagePreview({ src }: { src: string | Array<string> }) {
  const photos = Array.isArray(src) ? src : [src];
  return (
    <Carousel>
      <CarouselContent>
        {photos.map((url, index) => (
          <CarouselItem key={index} className="flex justify-center">
          <div className="w-full max-w-[401px] h-auto rounded-xl overflow-hidden">
            <Image
              src={url}
              alt="Foto de casal"
              width={400}
              height={640}
              quality={100}
              className="object-cover w-full h-auto"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
