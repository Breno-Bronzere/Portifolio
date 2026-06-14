// app/page.tsx
import { Download, ArrowRight } from "lucide-react";

const stack = [
  "Next.js",
  "Node.js",
  "TypeScript",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "MySQL",
  "React.js",

];
export default function Home() {
  return (
    <section className="relative overflow-hidden bg-[#EDF1F5] w-full px-6 pt-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 "
        style={{
          background: `
            radial-gradient(ellipse 55% 45% at 15% 5%,  rgba(91,133,163,0.13) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 88% 75%, rgba(61,100,121,0.09) 0%, transparent 60%),
            radial-gradient(ellipse 30% 30% at 55% 28%, rgba(170,190,203,0.08) 0%, transparent 55%)
          `,
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-2xl">

        {/* Eyebrow */}
        <div className="mb-5 flex items-center gap-3">
          <span className="block h-px w-6 bg-[#AABECB]" />
          <span className="text-2xl uppercase tracking-[0.1em] text-[#8FA9BE]">
            Full Stack Developer
          </span>
        </div>

        {/* Título */}
        <h1 className="mb-4 text-[30px] font-medium leading-[1.2] tracking-tight text-[#3D6479] sm:text-[40px] md:text-[70px]">
          Construindo produtos{" "}<br></br>
          <em className="not-italic text-[#8FA9BE]">do back ao front.</em>
        </h1>

        {/* Subtítulo */}
        <p className="mb-8 max-w-[460px] text-[18px] leading-[1.7] text-[#8FA9BE]">
          Desenvolvo aplicações completas com foco em performance, clareza de
          código e experiências de usuário que funcionam de verdade.
        </p>

        {/* CTAs */}
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <a
            href="/projetos"
            className="
              inline-flex items-center gap-2 rounded-[9px] h-[45px]
              bg-[#3D6479] px-5 py-2.5
              text-[13px] font-medium text-[#EDF1F5]
              transition-opacity hover:opacity-90
            "
          >
            Ver projetos
            <ArrowRight size={14} />
          </a>

          <a
            href="/curriculo.pdf"
            download
            className="
              inline-flex items-center gap-2 rounded-[9px] h-[45px]
              border border-[#C3D0DD] bg-white px-5 py-2.5
              text-[13px] font-medium text-[#5B85A3]
              transition-colors hover:border-[#8FA9BE]
            "
          >
            <Download size={14} />
            Currículo
          </a>
        </div>

        {/* Badges de stack */}
        <ul className="flex flex-wrap gap-2" aria-label="Tecnologias principais">
          {stack.map((tech) => (
            <li
              key={tech}
              className="
                rounded-full border border-[#C3D0DD]
                bg-white px-3 py-2
                text-[12px] text-[#5B85A3]
              "
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}