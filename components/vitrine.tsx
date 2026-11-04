import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Nui } from "@/lib/projetos";

export function Numeros({ itens, className }: { itens: { valor: string; rotulo: string }[]; className?: string }) {
  return (
    <dl className={cn("flex flex-wrap gap-x-14 gap-y-6", className)}>
      {itens.map((n) => (
        <div key={n.rotulo} className="flex flex-col">
          <dd className="text-display text-5xl tabular-nums text-foreground sm:text-6xl">{n.valor}</dd>
          <dt className="mt-1 max-w-[14rem] text-sm text-muted-foreground">{n.rotulo}</dt>
        </div>
      ))}
    </dl>
  );
}

function Quadro({ nui, className, sizes }: { nui: Nui; className?: string; sizes: string }) {
  return (
    <figure className={cn("flex flex-col gap-3", className)}>
      <div className="relative flex-1 overflow-hidden rounded-md bg-[#141c24] shadow-[0_24px_60px_-30px_rgb(0_0_0/0.8)] ring-1 ring-white/5">
        <Image
          src={nui.src}
          alt={`${nui.titulo}: ${nui.texto}`}
          fill
          sizes={sizes}
          className={nui.enquadrar === "retrato" ? "object-contain object-top" : "object-contain"}
        />
      </div>
      <figcaption className="text-sm text-muted-foreground">
        <span className="text-foreground">{nui.titulo}.</span> {nui.texto}
      </figcaption>
    </figure>
  );
}

export function GaleriaNuis({ itens }: { itens: Nui[] }) {
  const largas = itens.filter((n) => n.enquadrar !== "retrato");
  const retratos = itens.filter((n) => n.enquadrar === "retrato");
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-8">
      {largas.slice(0, 1).map((n) => (
        <Quadro key={n.src} nui={n} sizes="(min-width: 1024px) 560px, 100vw" className="col-span-2 lg:col-span-1 [&>div]:aspect-[16/10] lg:[&>div]:aspect-auto lg:[&>div]:min-h-[420px]" />
      ))}
      {retratos.map((n) => (
        <Quadro key={n.src} nui={n} sizes="(min-width: 1024px) 280px, 50vw" className="[&>div]:aspect-[342/600] lg:[&>div]:aspect-auto lg:[&>div]:min-h-[420px]" />
      ))}
    </div>
  );
}
