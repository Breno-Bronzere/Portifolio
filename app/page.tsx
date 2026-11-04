import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import { Stack, TituloSecao } from "@/components/ui";
import { GaleriaNuis, Numeros } from "@/components/vitrine";
import { dataNumeros, numerosReset, nuis, projetos, stackGrupos } from "@/lib/projetos";

export default function Home() {
  return (
    <main>
      <section className="grid items-center gap-12 pt-20 pb-20 sm:pt-28 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="enter">
          <h1 className="text-display text-6xl leading-none text-foreground sm:text-7xl">Breno Bronzere</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-foreground/90">
            Sou desenvolvedor full stack. Opero a Reset GG, um servidor de GTA RP por onde já passaram
            3,4 mil jogadores, e escrevo o que roda em volta dele: a loja, os bots, as telas dentro do
            jogo e a infraestrutura.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-muted-foreground">
            Uso IA para a parte bruta do código e valido cada alteração antes de ela entrar no projeto.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/projetos"
              className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Ver os projetos
              <ArrowRight size={15} />
            </Link>
            <a
              href="/Curriculo.pdf"
              download
              className="inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Download size={15} />
              Baixar currículo
            </a>
          </div>
        </div>

        <figure className="flex flex-col gap-3">
          <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-[#141c24] shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/5">
            <Image
              src="/nuis/guia.png"
              alt="Guia de boas-vindas da Reset GG, a primeira tela de quem entra na cidade"
              fill
              priority
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="text-sm text-muted-foreground">
            Guia de boas-vindas da Reset GG.
          </figcaption>
        </figure>
      </section>

      <section className="pb-28" aria-label="Números da Reset GG">
        <Numeros itens={numerosReset} />
        <p className="mt-6 text-sm text-muted-foreground">
          Números da Reset GG, tirados do banco da cidade em {dataNumeros}.
        </p>
      </section>

      <section className="pb-28" aria-labelledby="projetos">
        <TituloSecao
          id="projetos"
          titulo="Projetos"
          texto="Tudo aqui está no ar e tem gente usando."
        />
        <ul className="mt-12 flex flex-col gap-2">
          {projetos.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/projetos#${p.slug}`}
                className="group grid gap-2 rounded-md px-4 py-6 transition-colors hover:bg-card/80 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] lg:items-baseline lg:gap-10"
              >
                <div>
                  <h3 className="text-display text-3xl text-foreground">{p.nome}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.tipo}</p>
                </div>
                <div>
                  <p className="text-[15px] leading-relaxed text-foreground/85">{p.resumo}</p>
                  <Stack itens={p.stack} className="mt-3" />
                </div>
                <ArrowUpRight
                  size={18}
                  className="hidden text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground lg:block"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="pb-28" aria-labelledby="nuis">
        <TituloSecao
          id="nuis"
          titulo="Telas dentro do jogo"
          texto="Interfaces em HTML, CSS e JavaScript que rodam por cima do jogo. Os nomes nos prints são de exemplo."
        />
        <div className="mt-12">
          <GaleriaNuis itens={nuis.filter((n) => n.src !== "/nuis/guia.png")} />
        </div>
      </section>


      <section className="pb-12" aria-labelledby="stack">
        <TituloSecao id="stack" titulo="Ferramentas" />
        <dl className="mt-12 grid gap-x-16 gap-y-6 sm:grid-cols-2">
          {stackGrupos.map((g) => (
            <div key={g.titulo} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-4">
              <dt className="text-sm text-muted-foreground">{g.titulo}</dt>
              <dd className="text-[15px] text-foreground/90">{g.itens}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-12 text-[15px] text-muted-foreground">
          O código que é aberto fica no{" "}
          <a
            href="https://github.com/Breno-Bronzere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline decoration-muted-foreground/50 underline-offset-4 hover:decoration-foreground"
          >
            meu GitHub
          </a>
          .
        </p>
      </section>
    </main>
  );
}
