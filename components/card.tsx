import { ArrowUpRight } from "lucide-react";
import { Stack } from "@/components/ui";

type Repo = {
  name: string;
  description: string | null;
  href: string;
  lastCommit: string | null;
  stack: string[];
};

type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string | null;
  languages_url: string;
  fork: boolean;
};

async function getRepos(): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const response = await fetch(
      "https://api.github.com/users/Breno-Bronzere/repos?sort=pushed&per_page=12",
      { headers, next: { revalidate: 1300 } },
    );
    if (!response.ok) return [];
    const repos: GithubRepo[] = await response.json();

    return Promise.all(
      repos
        .filter((r) => !r.fork && r.name !== "Breno-Bronzere")
        .map(async (repo) => {
          let stack: string[] = [];
          try {
            const res = await fetch(repo.languages_url, { headers, next: { revalidate: 3600 } });
            if (res.ok) stack = Object.keys(await res.json());
          } catch {}
          return {
            name: repo.name,
            description: repo.description,
            href: repo.html_url,
            stack,
            lastCommit: repo.pushed_at,
          };
        }),
    );
  } catch {
    return [];
  }
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <a
      href={repo.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3 rounded-md bg-card/80 p-5 transition-colors hover:bg-card focus-visible:outline-2 focus-visible:outline-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-display text-2xl text-foreground">{repo.name}</h3>
        <ArrowUpRight
          size={14}
          className="shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
        />
      </div>
      <p className="line-clamp-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
        {repo.description ?? "Sem descrição."}
      </p>
      <div className="flex items-end justify-between gap-3">
        <Stack itens={repo.stack.slice(0, 4)} />
        {repo.lastCommit && (
          <span className="shrink-0 text-[11px] text-muted-foreground">
            {new Date(repo.lastCommit).toLocaleDateString("pt-BR")}
          </span>
        )}
      </div>
    </a>
  );
}

export default async function RepoGrid() {
  const repos = await getRepos();

  if (repos.length === 0) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Não consegui carregar os repositórios agora.{" "}
        <a href="https://github.com/Breno-Bronzere" className="text-foreground underline underline-offset-4">
          Veja direto no GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <RepoCard key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
