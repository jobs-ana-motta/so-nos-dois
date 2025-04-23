import Image from "next/image";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "./ui/carousel";

export default function ImagePreview({ src }: { src: string | Array<string> }) {
    const photos = Array.isArray(src) ? src : [src];
    return (
        <Carousel>
                <CarouselContent 
                >
                  {photos.map((url, index) => (
                    <Image
                      key={index}
                      src={url}
                      alt="Foto de casal"
                      width={401}
                      height={640}
                      quality={100}
                      className="rounded-2xl object-contain w-full h-auto max-w-[401px]"
                      priority
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext />
        </Carousel>
    )
}