import ChamadaContato from "@/components/chamada-contato";

const links = [
  { href: "https://github.com/Breno-Bronzere", label: "GitHub" },
  { href: "https://www.linkedin.com/in/breno-bronzere-freitas-de-oliveira-184966365", label: "LinkedIn" },
  { href: "https://www.instagram.com/breno_rsx/", label: "Instagram" },
  { href: "/Curriculo.pdf", label: "Currículo em PDF" },
];

export default function Footer() {
  return (
    <footer className="mx-auto mt-28 w-[calc(100%-2rem)] max-w-6xl pb-10 md:w-[calc(100%-6rem)]">
      <ChamadaContato />

      <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Breno Bronzere, {new Date().getFullYear()}</span>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
