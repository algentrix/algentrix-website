import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  image: string;
  review: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Lincoln Calzoni",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "Exceptional service! Our website's performance and user experience have improved dramatically.",
  },
  {
    id: 2,
    name: "Corey Dorwart",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    review:
      "Professional and efficient. Delivered exactly what we needed on time. Great communication throughout the project.",
  },
  {
    id: 3,
    name: "Sarah Mitchell",
    role: "Customer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Fantastic experience working with the team. The project was delivered smoothly and exceeded expectations.",
  },
];

const Testimonials: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const visibleTestimonials = [
    testimonials[index],
    testimonials[(index + 1) % testimonials.length],
  ];

  return (
    <section className="relative py-28 px-8 overflow-hidden bg-[#05060a] text-white">
      
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#070b18] to-black opacity-95" />

      {/* Abstract wave background */}
      <img
        src="/wave-bg.png"
        alt="background"
        className="absolute right-0 top-0 h-full object-cover opacity-90 pointer-events-none"
      />

      {/* Glow Effects */}
      <div className="absolute right-[25%] top-[20%] w-[400px] h-[400px] bg-blue-500/20 blur-[140px] rounded-full" />
      <div className="absolute right-[40%] bottom-[10%] w-[300px] h-[300px] bg-purple-500/20 blur-[120px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">

        {/* Title */}
        <h2 className="text-center text-4xl font-semibold mb-20">
          What our <span className="text-green-500">client says</span>
        </h2>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {visibleTestimonials.map((t) => (
            <div
              key={t.id}
              className="relative p-8 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={t.image}
                  className="w-12 h-12 rounded-full"
                  alt={t.name}
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
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

        {/* Navigation */}
        <div className="flex justify-end gap-4 mt-12">
          <button
            onClick={prev}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={next}
            className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition"
          >
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;