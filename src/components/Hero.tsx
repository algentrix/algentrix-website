import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Globe from "./Globe";
import OrbitRings from "./OrbitRings";
import FloatingIcons from "./FloatingIcons";

const Hero: React.FC = () => {

  return (
    <section className="flex items-center justify-between h-screen bg-[#0b0b0b] text-white p-20" id="home">

      <div className="max-w-[520px]">
        <h1 className="text-[50px] leading-tight">
          Engineering Intelligent Technology Solutions for <span className="text-hero-green">Modern Businesses</span>
        </h1>

        <p className="mt-5 text-[#a0a0a0]">
          Algentrix builds AI‑driven platforms, enterprise software systems, ERP solutions, mobile applications, and custom digital products that help businesses automate operations, unlock insights from data, and scale with confidence.
        </p>

        <p className="mt-3 text-hero-green font-semibold">
          Turning Technology Into Business Advantage.
        </p>

        <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="inline-block mt-8 py-3.5 px-7 rounded-full bg-cta border-none font-bold cursor-pointer">
          Request Consultation →
        </a>
      </div>

      <div className="relative w-[550px] h-[550px]">

        <FloatingIcons />

        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight  position={[5, 0, 2]} intensity={6}/>
            <Globe />
            <OrbitRings />
          </Suspense>
        </Canvas>

      </div>

    </section>
  );
};

export default Hero;
