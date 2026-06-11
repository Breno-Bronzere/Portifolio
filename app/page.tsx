import Image from 'next/image'
import background from '../public/background.png'
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 bg-background">
        <Image src={background} alt="Background" className="absolute inset-0 w-full h-full object-cover blur-lg opacity-30" />
        
          <h1 className="text-4xl font-bold text-[#213c66]">Prazer, meu nome é Breno</h1>
          <p className="text-xl text-[#355168]">Desenvolvedor Front-end</p>
          
    </div>
  );
}
