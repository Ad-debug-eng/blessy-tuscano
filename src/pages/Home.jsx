import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import { StarIcon } from "../components/StarIcon";
import { projects } from "../data/projects";
import { getBlessyAge } from "../utils/age";

export const Home = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const covers = projects.map((p) => p.coverImage);
  const age = getBlessyAge();

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;
    const x = (e.clientX - rect.left - halfWidth) / halfWidth;
    const y = (e.clientY - rect.top - halfHeight) / halfHeight;
    setCoords({ x, y });
  };

  return (
    <Layout
      hideFooter={false}
      footerOnMobileOnly={true}
      showEchelonFooter={true}
      noPadding={true}
    >
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-[100dvh] md:h-screen md:max-h-screen md:overflow-hidden flex flex-col justify-between select-none"
      >
        {/* Parallax background grid of project covers */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out pointer-events-none"
          style={{
            transform: `translate(${-coords.x * 35}px, ${-coords.y * 35}px)`
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8 p-6 sm:p-12 md:p-16 w-full max-w-7xl">
            {covers.map((src, idx) => (
              <div
                key={idx}
                className={`aspect-[3/4] overflow-hidden rounded-sm ${
                  idx === 4 ? "hidden sm:block" : ""
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover opacity-50 sm:opacity-60"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Ambient tint overlay */}
        <div className="absolute inset-0 bg-background/40 sm:bg-background/30 pointer-events-none" />

        {/* Hero centerpiece with red stars */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
          <div className="relative pointer-events-auto text-center">
            <StarIcon className="absolute z-0 w-8 sm:w-12 md:w-16 lg:w-20 left-[6%] sm:left-[10%] -top-[80%] sm:-top-[95%]" />
            <StarIcon className="absolute z-0 w-10 sm:w-16 md:w-24 lg:w-28 right-[6%] sm:right-[10%] -bottom-[85%] sm:-bottom-[100%]" />
            <h1 className="relative z-10 text-[11.5vw] sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight text-foreground select-none leading-none">
              Blessy Tuscano
            </h1>
          </div>
        </div>

        {/* Bottom bio link */}
        <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-4 sm:left-6 md:left-12 z-10 max-w-[calc(100vw-2rem)] sm:max-w-xs md:max-w-sm">
          <Link
            to="/about"
            className="block text-xs sm:text-sm md:text-base font-sans text-foreground/90 leading-relaxed transition-colors duration-300 hover:text-accent cursor-pointer p-3 sm:p-0 rounded-md bg-background/50 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none underline underline-offset-4 decoration-foreground/30 hover:decoration-accent"
          >
            Hey! I'm Blessy. I am a {age} year old creative, who loves art of all forms. I specialize in branding, art direction, creative direction and visual merchandising.
          </Link>
        </div>
      </section>
    </Layout>
  );
};
