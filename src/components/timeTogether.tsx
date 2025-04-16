import { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";
import { Narnoor } from "next/font/google";

const narnoor = Narnoor({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-narnoor",
});

interface PropsMessage {
    date: Date | string
    color: string
}

const formatDuration = (duration: {
    years?: number;
    months?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const { years, months, days, hours, minutes, seconds } = duration;
  
    const timeParts: string[] = [];
  
    if (years) timeParts.push(`${years} ${years === 1 ? "ano" : "anos"}`);
    if (months) timeParts.push(`${months} ${months === 1 ? "mês" : "meses"}`);
    if (days) timeParts.push(`${days} ${days === 1 ? "dia" : "dias"}`);
    if (hours) timeParts.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
    if (minutes) timeParts.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);
    if (seconds !== undefined)
      timeParts.push(`${seconds} ${seconds === 1 ? "segundo" : "segundos"}`);
  
    return timeParts.join(", ").replace(/,([^,]*)$/, " e$1");
  };

export const Message = ({ date, color }  : PropsMessage) => {
  const startDate = new Date(date);
  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const updateElapsed = () => {
      const now = new Date();
      const duration = intervalToDuration({
        start: startDate,
        end: now,
      });

      setTimeElapsed(formatDuration(duration));
    };

    updateElapsed(); // Atualiza imediatamente
    const interval = setInterval(updateElapsed, 1000);

    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, [startDate]);

  return (
    <p className={`text-[${color}] font-bold`}>
      {timeElapsed}
    </p>
  );
};