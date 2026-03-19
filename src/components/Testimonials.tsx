import React, { useRef } from "react";
import { Star } from "lucide-react";
import { useReveal } from "../hooks/useReveal";
import { useStagger } from "../hooks/useStagger";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
  review: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Ashram Kale",
    role: "Director, Kale Brothers",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=96&h=96&fit=crop",
    imageAlt: "Business technology consulting and data analytics collaboration",
    review:
      "The financial analytics developed on top of our Tally data gave us clear visibility into our business performance. The dashboards and reports helped us make faster financial decisions and improved how we monitor operations across the company.",
  },
  {
    id: 2,
    name: "Abhijeet Kokate",
    role: "Founder, Enersoul",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=96&h=96&fit=crop",
    imageAlt: "Professional workspace and technology consulting collaboration",
    review:
      "Their work helped us significantly improve our internal business processes, including payroll management and employee performance tracking. The systems they implemented brought better structure, transparency, and efficiency to our operations.",
  },
];

const Testimonials: React.FC = () => {
  const visibleTestimonials = testimonials;
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  useReveal(headingRef, { once: true });
  useStagger(gridRef, { stagger: 0.1, once: true });

  return (
    <section className="relative py-28 md:py-32 px-8 overflow-hidden bg-[#05060a] text-white">

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#070b18] to-black opacity-95" />

      {/* Abstract wave background */}
      {/* <img
        src="./wave-bg.png"
        alt="background"
        className="absolute right-0 top-0 h-full object-cover opacity-90 pointer-events-none"
      /> */}

      {/* Glow Effects */}
      <div className="absolute right-[25%] top-[20%] w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full" />
      <div className="absolute right-[40%] bottom-[10%] w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        {/* Title */}
        <h2 ref={headingRef} className="text-center text-3xl md:text-4xl font-bold tracking-tight mb-20">
          What our <span className="text-green-500">clients say</span>
        </h2>

        {/* Testimonial Cards */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-10">

          {visibleTestimonials.map((t) => (
            <div
              key={t.id}
              className="relative p-8 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  className="w-12 h-12 rounded-full object-cover"
                  alt={t.imageAlt}
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-6">
                {t.review}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <span className="text-4xl text-white/10">"</span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;