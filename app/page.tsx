import Link from 'next/link';
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-background">
        <img src="/background.png" alt="Background" className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30" />
        
        <Link key="/home" href="/home" className="text-lg text-[#20659e] hover:text-[#0844a5] flex flex-col items-center gap-4">
          <h1 className="text-4xl font-bold text-[#213c66]">Prazer, meu nome é Breno</h1>
          <p className="text-xl text-[#355168]">Desenvolvedor Front-end</p>
        </Link>
          
    </div>
  );
}
