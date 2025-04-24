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
      <CarouselContent className="w-[335px]">
        {photos.map((url, index) => (
          <CarouselItem key={index} className="flex justify-center basis-auto " >
            <Image
              src={url}
              alt="Foto de casal"
              width={320}
              height={640}
              quality={100}
              priority
              className="rounded-lg"
            />
        </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
