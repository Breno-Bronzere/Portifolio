// app/page.tsx
import { Download, ArrowRight } from "lucide-react";
import Card from "@/components/card";
import SmokeBackground from "@/components/spooky-smoke-animation";

const Default = () => {
  return <SmokeBackground />;
};

const Customized = () => {
  return <SmokeBackground smokeColor="#3D6479" />;
};

export { Default, Customized };

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
    <section
    className="
    relative overflow-hidden bg-[#EDF1F5] min-h-screen
    px-6 pt-24 pb-16
    md:px-16
    flex flex-col lg:flex-row lg:items-center lg:gap-16 lg:pt-0
      "
      >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
          radial-gradient(ellipse 55% 45% at 15% 5%,  rgba(91,133,163,0.13) 0%, transparent 65%),
          radial-gradient(ellipse 40% 35% at 88% 75%, rgba(61,100,121,0.09) 0%, transparent 60%),
          radial-gradient(ellipse 30% 30% at 55% 28%, rgba(170,190,203,0.08) 0%, transparent 55%)
          `,
        }}
      >
        <SmokeBackground />

      </div>

      <div className="relative z-10 flex-1 max-w-lg">

        <div className="mb-5 flex items-center gap-3">
          <span className="block h-px w-6 bg-[#AABECB]" />
          <span className="text-[11px] uppercase tracking-[0.12em] text-[#8FA9BE]">
            Full Stack Developer
          </span>
        </div>

        <h1 className="
          mb-5
          text-[38px] sm:text-[52px] md:text-[64px]
          font-medium leading-[1.15] tracking-tight text-[#3D6479]
        ">
          Construindo produtos{" "}
          <em className="not-italic text-[#8FA9BE]">do back ao front.</em>
        </h1>

        <p className="mb-8 max-w-105 text-[15px] leading-[1.75] text-[#8FA9BE]">
          Desenvolvo aplicações completas com foco em performance, clareza de
          código e experiências de usuário que funcionam de verdade.
        </p>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <a
            href="/projetos"
            className="
              inline-flex items-center gap-2
              rounded-[9px] h-11 px-5
              bg-[#3D6479] text-[13px] font-medium text-[#EDF1F5]
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
              inline-flex items-center gap-2
              rounded-[9px] h-11 px-5
              border border-[#C3D0DD] bg-white
              text-[13px] font-medium text-[#5B85A3]
              transition-colors hover:border-[#8FA9BE]
            "
          >
            <Download size={14} />
            Currículo
          </a>
        </div>

        <ul className="flex flex-wrap gap-2" aria-label="Tecnologias principais">
          {stack.map((tech) => (
            <li
              key={tech}
              className="
                rounded-full border border-[#C3D0DD] bg-white
                px-3 py-1.5 text-[12px] text-[#5B85A3]
              "
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-14 lg:ml-auto w-full lg:w-100 shrink-0">
        <Card />
      </div>
    </section>
  );
}