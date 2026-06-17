import { ArrowUpRight, CodeXml } from "lucide-react";

type Project = {
  name: string;
  description: string | null;
  href: string;
  lastCommit: string | null;
  stack: string[];
};

async function getProjects(): Promise<Project[]> {
  const response = await fetch(
    "https://api.github.com/users/Breno-Bronzere/repos",
    {
      headers:{
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
      },
      next: {
        revalidate: 1300,
      },
    }
  );
  const repos = await response.json();
      return Promise.all(
      repos.map(async (repo: any) => {
        const [languageRes] = await Promise.all([
          fetch(repo.languages_url, {
            next: { revalidate: 3600 },
          })
        ]);

        const languages = await languageRes.json();

        return {
          name: repo.name,
          description: repo.description,
          href: repo.html_url,
          stack: Object.keys(languages),
          lastCommit: repo.pushed_at,
        };
      })
    );
}

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
      
      <div className="mb-1 flex items-center justify-between">
        <div className={"mb-3 flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#8FA9BE] "} ><CodeXml /> </div>
        <h3 className="text-[20px] font-medium flex-1 text-[#3D6479] pl-3">
          {project.name}
        </h3>
        <p className="mb-2 text-[11px] text-[#8FA9BE] justify-end pr-1">
          Último commit:{" "}
          {project.lastCommit
            ? new Date(project.lastCommit).toLocaleDateString("pt-BR")
            : "Não disponível"}
        </p>
        <ArrowUpRight
          size={14}
          className="
            text-[#AABECB]
            transition-all duration-200
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
            group-hover:text-[#5B85A3]
            
          "
        />

      </div>

      <p className="mb-3 flex-1 text-[12px] leading-relaxed text-[#8FA9BE]">
        {project.description ?? "Sem descrição."}
      </p>

      <ul className="flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="
              rounded-[5px]
              border border-[#C3D0DD]
              bg-[#EDF1F5]
              px-2 py-0.5
              text-[11px]
              text-[#5B85A3]
            "
          >
            {tech}
          </li>
        ))}
      </ul>
    </a>
  );
}

export default async function card() {
  const projects = await getProjects();

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
    <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar:none] h-140">
      {projects.map((project) => (
        <ProjectCard  key={project.name} project={project} />
      ))}
    </div>

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