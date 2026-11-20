import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { StarIcon } from "../components/StarIcon";
import { projects } from "../data/projects";

const subcategoryMap = {
  "neon-glow": "Branding",
  "light-forms": "Visual Merchandising",
  "mystic-arcana": "Campaign",
  "prismatic-dreams": "Branding",
  "digital-currents": "Retail Design"
};

const folderColors = [
  { bg: "hsl(var(--folder-red))", fg: "hsl(var(--folder-white))" }
];

const FolderBinder = ({ items }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [openingIdx, setOpeningIdx] = useState(null);
  const [coverTop, setCoverTop] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const itemRefs = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  const handleHover = (idx) => {
    if (openingIdx !== null) return;
    const currentEl = itemRefs.current[idx];
    const nextEl = itemRefs.current[idx + 1];
    if (currentEl) {
      setCoverTop(
        nextEl
          ? nextEl.offsetTop + 24
          : currentEl.offsetTop + currentEl.offsetHeight
      );
    }
    setHoveredIdx(idx);
  };

  const handleClick = (e, idx, id) => {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0 ||
      openingIdx !== null
    )
      return;
    e.preventDefault();
    handleHover(idx);
    setOpeningIdx(idx);
    setHoveredIdx(idx);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    timerRef.current = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      navigate(`/work/${id}`, { state: { fromBinder: true } });
    }, prefersReducedMotion ? 0 : 650);
  };

  const tabOffsets = [0, 36, 0, 58, 0];
  const tabSlant = "2.25rem";

  return (
    <div className="container-wide">
      <div className="relative">
        <div
          className={`flex flex-col pt-4 sm:pt-6 ${
            openingIdx !== null ? "overflow-visible" : "overflow-hidden"
          }`}
        >
          {items.map((project, idx) => {
            const folderColor = folderColors[idx % folderColors.length];
            const isHovered = hoveredIdx === idx;
            const isOtherOpening = openingIdx !== null && openingIdx !== idx;
            const leftPct = isMobile ? "0%" : `${tabOffsets[idx % tabOffsets.length]}%`;
            const tabWidth = isMobile ? "min(85%, 18rem)" : "min(34%, 22rem)";
            const clipPath = `polygon(${leftPct} 0, calc(${leftPct} + ${tabWidth}) 0, calc(${leftPct} + ${tabWidth} + ${tabSlant}) ${tabSlant}, 100% ${tabSlant}, 100% 100%, 0 100%, 0 ${tabSlant}, ${leftPct} ${tabSlant})`;

            return (
              <Link
                key={project.id}
                to={`/work/${project.id}`}
                ref={(el) => (itemRefs.current[idx] = el)}
                onClick={(e) => handleClick(e, idx, project.id)}
                onMouseEnter={() => handleHover(idx)}
                onFocus={() => handleHover(idx)}
                onMouseLeave={() => openingIdx === null && setHoveredIdx(null)}
                onBlur={() => openingIdx === null && setHoveredIdx(null)}
                className="group relative block first:mt-0 -mt-3 sm:-mt-8 md:-mt-10 transition-opacity duration-500"
                style={{
                  zIndex: openingIdx === idx ? 50 : idx + 1,
                  opacity: isOtherOpening ? 0.4 : 1
                }}
              >
                <div
                  className={`relative folder-paper ${
                    openingIdx === idx
                      ? "binder-folder-opening"
                      : "transition-transform duration-500 group-hover:-translate-y-3"
                  }`}
                >
                  <div
                    className="relative pb-5 sm:pb-6 md:pb-8"
                    style={{
                      background: folderColor.bg,
                      color: folderColor.fg,
                      clipPath: clipPath,
                      paddingTop: "0.6rem"
                    }}
                  >
                    <div
                      style={{
                        paddingLeft: isMobile ? "1rem" : `calc(${leftPct} + 1.5rem)`
                      }}
                      className="pr-4 sm:pr-6"
                    >
                      <span className="block text-[10px] md:text-xs font-mono tracking-widest opacity-90">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-1 sm:mt-1.5 font-display text-base sm:text-2xl lg:text-3xl font-bold uppercase tracking-tight leading-snug sm:leading-none sm:whitespace-nowrap">
                        {project.title}
                        <span className="block sm:inline font-sans font-normal normal-case text-xs sm:text-sm lg:text-base italic opacity-85 sm:ml-2">
                          — {subcategoryMap[project.id] || project.tags[0]}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <div
                    aria-hidden="true"
                    className="absolute left-0 right-0 top-full h-[150vh] transition-opacity duration-300"
                    style={{
                      background: folderColor.bg,
                      opacity: isHovered && openingIdx === null ? 1 : 0,
                      marginTop: "-1px"
                    }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Floating preview thumbnail */}
        <div className="pointer-events-none absolute inset-0 z-30 hidden sm:block">
          {items.map((project, idx) => (
            <img
              key={project.id}
              src={project.coverImage}
              alt=""
              className={`absolute right-6 md:right-16 w-32 md:w-44 aspect-[3/4] object-cover shadow-2xl transition-all duration-500 ease-out ${
                openingIdx === idx ? "binder-cover-opening" : ""
              }`}
              style={{
                top: coverTop,
                transform:
                  hoveredIdx === idx
                    ? "translateY(-100%) rotate(3deg)"
                    : "translateY(-40%) rotate(0deg)",
                opacity: hoveredIdx === idx ? 1 : 0
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const Projects = () => {
  return (
    <Layout showEchelonFooter={true}>
      <section className="container-wide pt-6 sm:pt-8 md:pt-12 pb-2 md:pb-4">
        <h1 className="relative inline-block font-display text-4xl sm:text-7xl md:text-8xl font-bold tracking-tight">
          <StarIcon className="absolute z-0 w-12 sm:w-16 md:w-24 lg:w-28 -right-[6%] -top-[18%]" />
          <span className="relative z-10">Projects</span>
        </h1>
      </section>

      <section className="pt-0 pb-16 sm:pb-24">
        <FolderBinder items={projects} />
      </section>
    </Layout>
  );
};
