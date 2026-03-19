import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import gsap from "gsap";
import { initGSAP } from "../lib/gsap";
import Globe from "./Globe";
import OrbitRings from "./OrbitRings";
import FloatingIcons from "./FloatingIcons";

const Hero: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const content = contentRef.current;
    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;

    if (!content || !heading || !subheading || !tagline || !cta) return;

    initGSAP();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    const words = heading.querySelectorAll(".hero-word");
    tl.fromTo(
      words,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 }
    )
      .fromTo(subheading, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.2")
      .fromTo(tagline, { opacity: 0 }, { opacity: 1, duration: 0.4 }, "-=0.3")
      .fromTo(cta, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4 }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-screen text-white pt-24 md:pt-20 p-6 md:p-20 gap-8 md:gap-0" id="home">

      <div ref={contentRef} className="order-2 md:order-1 max-w-[520px] w-full">
        <h1 ref={headingRef} className="text-[32px] md:text-[52px] leading-tight tracking-tight font-bold">
          <span className="hero-word">Engineering</span>{" "}
          <span className="hero-word">Intelligent</span>{" "}
          <span className="hero-word">Technology</span>{" "}
          <span className="hero-word">Solutions</span>
          <br />
          <span className="hero-word">for</span>{" "}
          <span className="hero-word text-hero-green">Modern Businesses</span>
        </h1>

        <p ref={subheadingRef} className="mt-6 text-lg text-[#b4b4c4] leading-relaxed">
          Algentrix designs and builds advanced <Link to="/services" className="text-hero-green hover:underline">analytics platforms</Link>, enterprise software systems, and custom digital solutions that help organizations streamline operations, unlock insights from their data, and scale efficiently.
          Our team also provides reliable <Link to="/contact" className="text-hero-green hover:underline">technical support</Link> to keep your systems running smoothly and your business moving forward.
        </p>

        <p ref={taglineRef} className="mt-3 text-hero-green font-semibold">
          Turning Technology into Business Advantage.
        </p>

        <a ref={ctaRef} href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="inline-block mt-8 py-4 px-8 rounded-full btn-gradient text-bg-dark font-bold cursor-pointer transition-all duration-300">
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

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-white/10 animate-floating" />
        <div className="absolute top-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-hero-green/20 animate-floating" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[30%] left-[20%] w-1 h-1 rounded-full bg-white/15 animate-floating" style={{ animationDelay: "2s" }} />
      </div>
    </section>
  );
};

export default Hero;
