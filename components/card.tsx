
import { ArrowUpRight, BarChart2, Zap, Users } from "lucide-react";

type Project = {
  icon: React.ReactNode;
  name: string;
  description: string;
  stack: string[];
  href: string;
  accent: string;
};

const projects: Project[] = [
  {
    icon: <BarChart2 size={18} className="text-[#5B85A3]" />,
    name: "Portifólio",
    description: "Meu próprio portifólio de full stack.",
    stack: ["Next.js", "TailWind", "lucide-react"],
    href: "https://github.com/Breno-Bronzere/Portifolio",
    accent: "bg-[#EDF1F5]",
  },
  {
    icon: <Zap size={18} className="text-[#5B85A3]" />,
    name: "MGR-Call",
    description:
      "Aplicativo de abertura de chamados com sincronização automática, desenvolvido com colegas de classe.",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
    href: "https://github.com/YanGDBr/MGRCall",
    accent: "bg-[#E4ECF2]",
  },
  {
    icon: <Users size={18} className="text-[#5B85A3]" />,
    name: "LaravelAngular",
    description: "Projeto de estudo em aula.",
    stack: ["Angular", "Laravel", "Tailwind"],
    href: "https://github.com",
    accent: "bg-[#EDF1F5]",
  },
];


function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group flex flex-col
        rounded-xl border border-[#C3D0DD] bg-white
        p-5 transition-all duration-200
        hover:border-[#8FA9BE] hover:shadow-sm
      "
    >
      <div
        className={`mb-3 flex h-9 w-9 items-center justify-center rounded-[9px] ${project.accent}`}
      >
        {project.icon}
      </div>

      <div className="mb-1 flex items-center justify-between">
        <h3 className="text-[13px] font-medium text-[#3D6479]">
          {project.name}
        </h3>
        <ArrowUpRight
          size={14}
          className="
            text-[#AABECB] transition-all duration-200
            group-hover:translate-x-0.5 group-hover:-translate-y-0.5
            group-hover:text-[#5B85A3]
          "
        />
      </div>

      <p className="mb-3 flex-1 text-[12px] leading-relaxed text-[#8FA9BE]">
        {project.description}
      </p>

      <ul className="flex flex-wrap gap-1.5" aria-label="Stack tecnológica">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="
              rounded-[5px] border border-[#C3D0DD]
              bg-[#EDF1F5] px-2 py-0.5
              text-[11px] text-[#5B85A3]
            "
          >
            {tech}
          </li>
        ))}
      </ul>
    </a>
  );
}

export default function Card() {
  return (
    <div
      className="
         z-10
        mt-12 lg:mt-0
        w-full lg:w-105 lg:shrink-0
        flex flex-col gap-3 pr-0
      "
    >
      <div className="mb-1 flex items-center gap-3">
        <span className="text-[11px] uppercase tracking-[0.09em] text-[#8FA9BE]">
          Projetos selecionados
        </span>
        <span className="h-px flex-1 bg-[#C3D0DD]" />
      </div>

      {projects.map((project) => (
        <ProjectCard key={project.name} project={project} />
      ))}

      <a
        href="/projetos"
        className="
          mt-1 inline-flex items-center gap-1.5 self-center
          text-[12px] text-[#8FA9BE]
          transition-colors hover:text-[#5B85A3]
        "
      >
        Ver todos os projetos
        <ArrowUpRight size={13} />
      </a>
    </div>
  );
}