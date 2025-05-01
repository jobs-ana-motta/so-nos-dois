import { Suspense } from "react";
import Gratidao from "./gratidaoContent";
import Loading from "@/components/loading";

export default function GratidaoPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Gratidao />
    </Suspense>
  );
}
