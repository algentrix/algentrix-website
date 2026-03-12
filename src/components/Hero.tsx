import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Globe from "./Globe";
import OrbitRings from "./OrbitRings";
import FloatingIcons from "./FloatingIcons";

const Hero: React.FC = () => {

  return (
    <section className="flex flex-col md:flex-row items-center justify-between min-h-screen text-white pt-24 md:pt-20 p-6 md:p-20 gap-8 md:gap-0" id="home">

      <div className="order-2 md:order-1 max-w-[520px] w-full">
        <h1 className="text-[32px] md:text-[50px] leading-tight">
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

      <div className="order-1 md:order-2 relative w-full max-w-[260px] md:max-w-none md:w-[550px] h-[260px] md:h-[550px] flex-shrink-0 mx-auto md:mx-0">
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
