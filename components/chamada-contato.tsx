"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function ChamadaContato() {
  if (usePathname() === "/contato") return null;

  return (
    <div className="mb-8 rounded-md bg-card/90 px-6 py-12 sm:px-12">
      <p className="text-display max-w-xl text-4xl leading-tight text-foreground sm:text-5xl">
        Quer conversar sobre um projeto?
      </p>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
        Me manda uma mensagem pelo formulário ou pelo WhatsApp.
      </p>
      <Link
        href="/contato"
        className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
      >
        Ir para o contato
        <ArrowRight size={15} />
      </Link>
    </div>
  );
}
