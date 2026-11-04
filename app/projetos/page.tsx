import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import RepoGrid from "@/components/card";
import { Stack, TituloSecao } from "@/components/ui";
import { GaleriaNuis } from "@/components/vitrine";
import { nuis, projetos } from "@/lib/projetos";

export const metadata: Metadata = {
  title: "Projetos · Breno Bronzere",
  description:
    "Servidor de GTA RP, treino de mira, loja com entrega no jogo, bots do Discord e um app financeiro.",
};

export default function Projetos() {
  return (
    <main className="pt-20 sm:pt-28">
      <div className="enter max-w-2xl">
        <h1 className="text-display text-6xl leading-none text-foreground sm:text-7xl">Projetos</h1>
        <p className="mt-8 text-lg leading-8 text-foreground/90">Cinco projetos no ar.</p>
      </div>

      <div className="mt-24 flex flex-col gap-32">
        {projetos.map((p) => (
          <article key={p.slug} id={p.slug} className="scroll-mt-24">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
              <div>
                <p className="text-sm text-muted-foreground">
                  {p.tipo}, {p.ano}
                </p>
                <h2 className="text-display mt-2 text-5xl leading-none text-foreground sm:text-6xl">{p.nome}</h2>
                <p className="mt-6 text-[17px] leading-8 text-foreground/90">{p.resumo}</p>

                {p.numeros && (
                  <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                    {p.numeros.map((n) => (
                      <div key={n.rotulo}>
                        <dd className="text-display text-4xl tabular-nums text-foreground">{n.valor}</dd>
                        <dt className="text-sm text-muted-foreground">{n.rotulo}</dt>
                      </div>
                    ))}
                  </dl>
                )}

                <Stack itens={p.stack} className="mt-8" />

                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-1.5 text-[15px] text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground"
                  >
                    {p.link.label}
                    <ArrowUpRight size={15} />
                  </a>
                )}
              </div>

              <div>
                <h3 className="text-display text-2xl text-foreground">O que eu fiz</h3>
                <ul className="mt-5 flex flex-col gap-4">
                  {p.feito.map((d) => (
                    <li key={d} className="text-[15px] leading-relaxed text-foreground/85">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {p.imagem && (
              <div className="relative mt-12 aspect-[1150/700] overflow-hidden rounded-md bg-[#141c24] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/5">
                <Image src={p.imagem.src} alt={p.imagem.alt} fill sizes="(min-width: 1152px) 1100px, 100vw" className="object-cover object-left-top" />
              </div>
            )}
          </article>
        ))}
      </div>

      <section className="mt-36" aria-labelledby="nuis">
        <TituloSecao
          id="nuis"
          titulo="Telas dentro do jogo"
          texto="Os nomes nos prints são de exemplo."
        />
        <div className="mt-12">
          <GaleriaNuis itens={nuis} />
        </div>
      </section>

      <section className="mt-32" aria-labelledby="github">
        <TituloSecao id="github" titulo="No GitHub" texto="Repositórios públicos." />
        <div className="mt-12">
          <RepoGrid />
        </div>
      </section>
    </main>
  );
}
