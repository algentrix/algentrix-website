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
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);
  const secondaryCtaRef = useRef<HTMLAnchorElement>(null);
  const bgOrbsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const heading = headingRef.current;
    const subheading = subheadingRef.current;
    const tagline = taglineRef.current;
    const primaryCta = primaryCtaRef.current;
    const secondaryCta = secondaryCtaRef.current;
    const bgOrbs = bgOrbsRef.current;

    if (!heading || !subheading || !tagline || !primaryCta || !ctaGroupRef.current) return;

    initGSAP();

    const isMobile = window.innerWidth < 768;
    const mult = isMobile ? 1.6 : 1;
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Stagger text reveal
    const words = heading.querySelectorAll(".hero-word");
    tl.fromTo(
      words,
      { y: 36, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55 * mult, stagger: 0.07 * mult }
    )
      .fromTo(subheading, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 * mult }, "-=0.25")
      .fromTo(tagline, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 * mult }, "-=0.3");

    // CTA buttons scale-in
    const ctas = secondaryCta ? [primaryCta, secondaryCta] : [primaryCta];
    tl.fromTo(
      ctas,
      { scale: 0.85, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45 * mult, stagger: 0.08, ease: "back.out(1.2)" },
      "-=0.2"
    );

    // Subtle animated background orbs (GSAP)
    if (bgOrbs) {
      const orbs = bgOrbs.querySelectorAll<HTMLElement>(".hero-orb");
      gsap.set(orbs, { opacity: 0, scale: 0.8 });
      gsap.to(orbs, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power2.out",
        delay: 0.3,
      });
      orbs.forEach((orb, i) => {
        const driftY = (i % 2 === 0 ? 1 : -1) * (12 + i * 3);
        const driftX = (i % 3 === 0 ? 1 : -1) * (8 + i * 2);
        gsap.to(orb, {
          y: driftY,
          x: driftX,
          duration: 4 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between min-h-screen text-white pt-24 md:pt-20 p-6 md:p-20 gap-8 md:gap-0 overflow-hidden"
      id="home"
    >
      {/* Subtle animated background (hero-specific) */}
      <div ref={bgOrbsRef} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div className="hero-orb absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-accent-green/8 blur-[80px]" />
        <div className="hero-orb absolute top-[25%] right-[10%] w-48 h-48 rounded-full bg-accent-purple/10 blur-[60px]" />
        <div className="hero-orb absolute bottom-[20%] left-[15%] w-40 h-40 rounded-full bg-accent-blue/8 blur-[50px]" />
        <div className="hero-orb absolute bottom-[30%] right-[20%] w-56 h-56 rounded-full bg-hero-green/6 blur-[70px]" />
      </div>

      <div ref={contentRef} className="order-2 md:order-1 max-w-[520px] w-full relative z-10">
        <h1
          ref={headingRef}
          className="text-[32px] md:text-[52px] leading-tight tracking-tight font-bold"
        >
          <span className="hero-word">Engineering</span>{" "}
          <span className="hero-word hero-gradient-text">Intelligent</span>{" "}
          <span className="hero-word">Technology</span>{" "}
          <span className="hero-word">Solutions</span>
          <br />
          <span className="hero-word">for</span>{" "}
          <span className="hero-word hero-gradient-text">Modern Businesses</span>
        </h1>

        <p ref={subheadingRef} className="mt-6 text-lg text-text-muted leading-relaxed">
          Algentrix designs and builds advanced{" "}
          <Link to="/services" className="text-hero-green hover:underline">
            analytics platforms
          </Link>
          , enterprise software systems, and custom digital solutions that help organizations
          streamline operations, unlock insights from their data, and scale efficiently. Our team
          also provides reliable{" "}
          <Link to="/contact" className="text-hero-green hover:underline">
            technical support
          </Link>{" "}
          to keep your systems running smoothly and your business moving forward.
        </p>

        <p ref={taglineRef} className="mt-3 text-hero-green font-semibold">
          Turning Technology into Business Advantage.
        </p>

        <div ref={ctaGroupRef} className="flex flex-wrap gap-4 mt-8">
          <a
            ref={primaryCtaRef}
            href="#contact"
            onClick={scrollToContact}
            className="inline-block py-4 px-8 rounded-full btn-gradient text-bg-dark font-bold cursor-pointer transition-all duration-300 hover:scale-[1.02]"
          >
            Book a Consultation →
          </a>
          <Link
            ref={secondaryCtaRef}
            to="/services"
            className="inline-block py-4 px-8 rounded-full border border-white/20 text-white font-semibold cursor-pointer transition-all duration-300 hover:bg-white/5 hover:border-white/30"
          >
            Explore Services
          </Link>
        </div>
      </div>

      <div className="order-1 md:order-2 relative w-full max-w-[260px] md:max-w-none md:w-[550px] h-[260px] md:h-[550px] shrink-0 mx-auto md:mx-0 z-10">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Canvas camera={{ position: [0, 0, 6] }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 0, 2]} intensity={6} />
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
        <div
          className="absolute top-[40%] right-[15%] w-1.5 h-1.5 rounded-full bg-hero-green/20 animate-floating"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-[30%] left-[20%] w-1 h-1 rounded-full bg-white/15 animate-floating"
          style={{ animationDelay: "2s" }}
        />
      </div>
    </section>
  );
};

export default Hero;
