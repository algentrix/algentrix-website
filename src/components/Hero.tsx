import { useLayoutEffect, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import gsap from "gsap";
import { initGSAP } from "../lib/gsap";
import Globe from "./Globe";
import OrbitRings from "./OrbitRings";
import FloatingIcons from "./FloatingIcons";
import { SectionTag } from "./SectionTag";
import { AgMagneticButton } from "./ag";

const AG = {
  gold: "#c9a84c",
  goldD: "#8a6f2e",
  silver: "#a8b8cc",
};

const Hero: React.FC = () => {
  const secRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const sec = secRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const bar = barRef.current;
    const desc = descRef.current;
    const btns = btnsRef.current;
    const tag = tagRef.current;
    const bgText = bgTextRef.current;

    if (!sec || !line1 || !line2 || !bar || !desc || !btns || !tag) return;

    initGSAP();

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(tag, { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, 0.5)
      .fromTo(line1, { y: "120%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1.2 }, 0.7)
      .fromTo(line2, { y: "120%", opacity: 0 }, { y: "0%", opacity: 1, duration: 1.2 }, 0.88)
      .fromTo(bar, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.3, transformOrigin: "left" }, 1.1)
      .fromTo(desc, { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }, 1.3)
      .fromTo(btns, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 1.6);

    let parallaxTween: gsap.core.Tween | null = null;
    let deco1Tween: gsap.core.Tween | null = null;
    let deco2Tween: gsap.core.Tween | null = null;

    if (bgText) {
      parallaxTween = gsap.to(bgText, {
        y: -120,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "bottom top",
          scrub: 1.8,
        },
      });
    }

    const decorative1 = sec.querySelector('.deco-1') as HTMLElement | null;
    const decorative2 = sec.querySelector('.deco-2') as HTMLElement | null;

    if (decorative1) {
      deco1Tween = gsap.to(decorative1, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }

    if (decorative2) {
      deco2Tween = gsap.to(decorative2, {
        y: 120,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    return () => {
      tl.kill();
      parallaxTween?.kill();
      deco1Tween?.kill();
      deco2Tween?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    const sec = secRef.current;
    const glow = glowRef.current;
    if (!sec || !glow) return;
    const r = sec.getBoundingClientRect();
    gsap.set(glow, { x: r.width / 2, y: r.height / 2, xPercent: -50, yPercent: -50 });
  }, []);

  useEffect(() => {
    const sec = secRef.current;
    const glow = glowRef.current;
    if (!sec || !glow) return;

    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;

      gsap.to(glow, {
        x,
        y,
        xPercent: -50,
        yPercent: -50,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    sec.addEventListener("mousemove", onMove);
    return () => sec.removeEventListener("mousemove", onMove);
  }, []);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={secRef}
      className="relative flex flex-col lg:flex-row items-center justify-start lg:justify-between min-h-screen text-ag-white pt-28 md:pt-24 px-[5%] pb-16 md:pb-20 gap-10 md:gap-8 overflow-hidden"
      id="home"
    >
      {/* AG hero background (grid + mouse glow + rails) — globe column unchanged below */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />
      {/* Decorative floating orbs with animation */}
      <div
        className="deco-1 pointer-events-none absolute left-[15%] top-[25%] opacity-30 animate-float"
        style={{
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
        }}
        aria-hidden
      />
      <div
        className="deco-2 pointer-events-none absolute right-[20%] top-[60%] opacity-20 animate-float"
        style={{
          width: '60px',
          height: '60px',
          background: 'radial-gradient(circle, rgba(168,184,204,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(25px)',
          animationDelay: '1s',
        }}
        aria-hidden
      />

      <div
        ref={glowRef}
        className="absolute left-0 top-0 w-[min(700px,90vw)] h-[500px] pointer-events-none will-change-transform"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.08) 35%, transparent 70%)",
          mixBlendMode: 'screen',
        }}
        aria-hidden
      />
      <div
        className="absolute top-0 right-[22%] w-px h-[45%] pointer-events-none opacity-30"
        style={{
          background: `linear-gradient(180deg, transparent, ${AG.gold}, transparent)`,
        }}
        aria-hidden
      />
      <div
        className="absolute top-0 right-[calc(22%+52px)] w-px h-[28%] pointer-events-none opacity-25"
        style={{ background: `linear-gradient(180deg, transparent, ${AG.goldD})` }}
        aria-hidden
      />
      <div
        ref={bgTextRef}
        className="absolute -right-[2%] -bottom-[8%] font-serif font-black leading-none pointer-events-none select-none text-transparent"
        style={{
          fontSize: "clamp(200px, 28vw, 400px)",
          WebkitTextStroke: "1px rgba(201,168,76,0.04)",
          letterSpacing: "-0.05em",
          willChange: "transform",
        }}
        aria-hidden
      >
        IX
      </div>

      {/* Row 1 (mobile / tablet): globe — row 2: copy + CTAs; lg+ copy left, globe right */}
      <div className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-none lg:w-[550px] h-[260px] sm:h-[300px] lg:h-[550px] shrink-0 mx-auto lg:mx-0 z-10 lg:order-2">
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

      <div className="max-w-[520px] w-full relative z-10 lg:order-1">
        <div ref={tagRef} className="mb-7 opacity-0">
          <SectionTag>Enterprise Technology Group</SectionTag>
        </div>

        <div className="overflow-hidden">
          <h1
            ref={line1Ref}
            className="font-serif font-black text-[clamp(2.5rem,7vw,4.5rem)] leading-[1] tracking-[-0.03em] text-ag-white opacity-0"
          >
            Intelligence
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1
            ref={line2Ref}
            className="font-serif italic font-normal text-[clamp(2.5rem,7vw,4.5rem)] leading-[1] tracking-[-0.02em] text-ag-gold opacity-0"
          >
            at scale.
          </h1>
        </div>

        <div
          ref={barRef}
          className="h-px max-w-[500px] my-9 opacity-0"
          style={{ background: `linear-gradient(90deg, ${AG.gold}, transparent)` }}
        />

        <p
          ref={descRef}
          className="font-sans text-[clamp(0.95rem,1.4vw,1.1rem)] font-light text-ag-silver leading-[1.85] max-w-[520px] mb-12 opacity-0"
        >
          Algentrix partners with enterprise leaders to architect data-driven advantage — from{" "}
          <Link to="/services" className="text-ag-gold hover:underline">
            analytics infrastructure
          </Link>{" "}
          to AI-powered operations and strategic technology consulting. We also provide{" "}
          <Link to="/contact" className="text-ag-gold hover:underline">
            technical support
          </Link>{" "}
          to keep your systems running smoothly.
        </p>

        <div ref={btnsRef} className="flex flex-wrap gap-4 opacity-0">
          <AgMagneticButton>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 py-4 px-6 sm:px-8 rounded-none font-sans text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-ag-void bg-ag-gold border border-transparent transition-all duration-300 hover:bg-ag-gold-l hover:shadow-[0_14px_44px_rgba(201,168,76,0.32)] min-h-[44px]"
            >
              Schedule a Consultation
            </a>
          </AgMagneticButton>
          <AgMagneticButton>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 py-4 px-6 sm:px-7 rounded-none font-sans text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-ag-silver border border-ag-fog bg-transparent transition-all duration-300 hover:text-ag-white hover:border-ag-silver min-h-[44px]"
            >
              View Capabilities →
            </Link>
          </AgMagneticButton>
        </div>
      </div>

      <div
        className="absolute bottom-10 left-[5%] flex items-center gap-3.5 pointer-events-none z-10"
        aria-hidden
      >
        <div
          className="w-px h-[52px] opacity-70 animate-pulse"
          style={{
            background: `linear-gradient(180deg, transparent, ${AG.gold})`,
          }}
        />
        <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-ag-fog">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
