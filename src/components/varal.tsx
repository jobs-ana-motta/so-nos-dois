"use client";

import { motion } from "motion/react";
import { useRef, useLayoutEffect, useState, useEffect } from "react";
import Photo from "./photo";

const fotos = [
  "https://res.cloudinary.com/dp7byiv7j/image/upload/v1744913467/casais/a3567gzfowl6wp0bqh98.webp",
  "https://res.cloudinary.com/dp7byiv7j/image/upload/v1744898331/casais/jkl9beykqdmpsfh4fbwy.webp",
  "https://res.cloudinary.com/dp7byiv7j/image/upload/v1746038794/casais/ldsgdkvz85amusut135d.webp",
  "https://res.cloudinary.com/dp7byiv7j/image/upload/v1744897335/casais/tp6pkacfqozb5ek4gqdu.webp",
  "https://res.cloudinary.com/dp7byiv7j/image/upload/v1744898229/casais/bxfi03kvnagjnhvl9myg.webp",
];

export default function VaralComLinha() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const updatePoints = () => {
      const fotos = containerRef.current?.querySelectorAll(".foto");
      const containerRect = contentRef.current?.getBoundingClientRect();

      if (fotos && containerRect) {
        const newPoints = Array.from(fotos).map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top + rect.height * 0.05,
          };
        });
        setPoints(newPoints);
      }
    };

    updatePoints(); // chama inicialmente
    window.addEventListener("resize", updatePoints);
    window.addEventListener("scroll", updatePoints);

    return () => {
      window.removeEventListener("resize", updatePoints);
      window.removeEventListener("scroll", updatePoints);
    };
  }, []);

  const curva = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
  
    let d = `M ${points[0].x},${points[0].y}`;
  
    for (let i = 1; i < points.length - 1; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
  
      const xc1 = (p0.x + p1.x) / 2;
      const yc1 = (p0.y + p1.y) / 2;
      const xc2 = (p1.x + p2.x) / 2;
      const yc2 = (p1.y + p2.y) / 2;
  
      d += ` Q ${p1.x},${p1.y} ${xc2},${yc2}`;
    }
  
    // linha até o último ponto
    const last = points[points.length - 1];
    d += ` T ${last.x},${last.y}`;
  
    return d;
  };

  const meio = Math.floor(fotos.length / 2);

  return (
    <div className="w-full relative" ref={containerRef}>
      <div
        ref={contentRef}
        className="flex gap-16 px-6 py-10 w-fit min-w-full relative z-10"
      >
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
          width={contentRef.current?.offsetWidth || 0}
          height={contentRef.current?.offsetHeight || 0}
        >
          <path
            d={curva(points)}
            stroke="#fff"
            strokeWidth="2"
            fill="none"
            strokeDasharray="0"
          />
        </svg>
        {fotos.map((src, i) => {
          const distanciaDoCentro = Math.abs(i - meio);
          const curvaY = -distanciaDoCentro * 12;

          return (
           <Photo key={i} src={src} curva={curvaY} index={i}/>
          );
        })}
      </div>
    </div>
  );
}
