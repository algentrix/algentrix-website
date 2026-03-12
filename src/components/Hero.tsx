import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Globe from "./Globe";
import OrbitRings from "./OrbitRings";
import FloatingIcons from "./FloatingIcons";

const Hero: React.FC = () => {

  return (
    <section className="flex items-center justify-between h-screen text-white p-20" id="home">

      <div className="max-w-[520px]">
        <h1 className="text-[50px] leading-tight">
          Engineering Intelligent Technology Solutions<br />for <span className="text-hero-green">Modern Businesses</span>
        </h1>

        <p className="mt-5 text-[#a0a0a0]">
          Algentrix designs and builds advanced <Link to="/services" className="text-hero-green hover:underline">analytics platforms</Link>, enterprise software systems, and custom digital solutions that help organizations streamline operations, unlock insights from their data, and scale efficiently.
          Our team also provides reliable <Link to="/contact" className="text-hero-green hover:underline">technical support</Link> to keep your systems running smoothly and your business moving forward.
        </p>

        <p className="mt-3 text-hero-green font-semibold">
          Turning Technology into Business Advantage.
        </p>

        <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="inline-block mt-8 py-3.5 px-7 rounded-full bg-cta border-none font-bold cursor-pointer">
          Book a Consultation →
        </a>
      </div>

      <div className="relative w-[550px] h-[550px]">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight  position={[5, 0, 2]} intensity={6}/>
            <Globe />
            <OrbitRings />
          </Suspense>
          </Canvas>
        </div>
        <FloatingIcons />
      </div>

    </section>
  );
};

export default Hero;
