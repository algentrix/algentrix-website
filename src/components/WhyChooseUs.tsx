export function WhyChooseUs() {
  return (
    <section id="about" className="relative py-24 px-8 overflow-hidden text-white">

      {/* Gradient overlay - lets global gradient show through */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />

      {/* Glow effects */}
      <div className="absolute left-[30%] top-[20%] w-[400px] h-[400px] bg-purple-500/30 blur-[150px] rounded-full" />
      <div className="absolute right-[10%] bottom-[20%] w-[500px] h-[500px] bg-orange-500/30 blur-[150px] rounded-full" />

      <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          {/* Heading Glass Box */}
          <div className="inline-block mb-8 px-10 py-6 rounded-[40px] border border-white/20 bg-white/5 backdrop-blur-xl">
            <h2 className="text-5xl font-bold leading-tight">
              Why You <br /> Choose Us
            </h2>
          </div>

          <p className="text-gray-300 leading-relaxed max-w-lg mb-10">
            Algentrix is a technology consulting company focused on helping businesses build reliable, scalable, and efficient digital systems.
            We combine strong engineering expertise with deep understanding of business operations to deliver solutions that drive measurable results.
          </p>
          <p className="text-gray-300 leading-relaxed max-w-lg mb-10">
            Our mission is simple: Help businesses use technology more effectively to improve efficiency, gain better insights, and support long-term growth.
          </p>

          <button className="flex items-center gap-2 bg-yellow-500 text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
            Learn More →
          </button>
        </div>

        {/* RIGHT SIDE IMAGES - Overlapping, stacked collage */}
        <div className="relative h-[420px] flex items-center justify-center ">
          {/* Bottom layer - peeking from behind */}

          {/* Middle layer - largest, most prominent */}
          <img
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984"
            alt="Technology consulting team collaboration at Algentrix"
            loading="lazy"
            className="absolute top-[60%] left-[30%] -translate-x-1/2 -translate-y-1/2 
            w-[320px] h-[240px] object-cover rounded-2xl shadow-xl z-[3]
            [clip-path:polygon(0%_0%,20%_0%,28%_10%,50%_10%,55%_0%,100%_0%,100%_100%,0%_100%)]"

          />
          {/* Top layer - partially visible at top right */}
          <img
            src="https://images.unsplash.com/photo-1551434678-e076c223a692"
            alt="Business team working on technology solutions"
            loading="lazy"
            className="absolute top-0 right-[4vw] w-[260px] h-[180px] object-cover rounded-2xl shadow-xl z-[2]"
          />
        </div>

      </div>
    </section>
  );
}