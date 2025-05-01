import { motion } from "motion/react";
import Image from "next/image";

interface PhotoInterface { 
    src : string,
    index : number,
    curva : number
}

export default function Photo({ src, index : i, curva } : PhotoInterface) {
    return (
        <motion.div
            className="foto w-[300px] h-[300px] object-cover shadow-md flex justify-center items-center overflow-hidden relative"
            style={{ transformOrigin: "top center" }}
              initial={{
                rotate: i % 2 === 0 ? -3 : 3,
                translateY: curva,
              }}
              animate={{
                rotate: [
                  i % 2 === 0 ? -3 : 3,
                  i % 2 === 0 ? 3 : -3,
                  i % 2 === 0 ? -3 : 3,
                ],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                easing: "ease-in-out",
            }}
        >
            <Image src={src} fill alt="image" className="bg-white  object-cover p-6"/>
            
        </motion.div>
    )
}