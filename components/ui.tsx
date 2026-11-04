import { cn } from "@/lib/utils";

export function TituloSecao({
  id,
  titulo,
  texto,
  className,
}: {
  id?: string;
  titulo: React.ReactNode;
  texto?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-16", className)}>
      <h2 id={id} className="text-display text-4xl leading-[1.1] text-foreground sm:text-5xl">
        {titulo}
      </h2>
      {texto && <p className="max-w-xl text-[15px] leading-relaxed text-muted-foreground">{texto}</p>}
    </div>
  );
}

export function Stack({ itens, className }: { itens: string[]; className?: string }) {
  return <p className={cn("text-[13px] text-muted-foreground", className)}>{itens.join(" · ")}</p>;
}
