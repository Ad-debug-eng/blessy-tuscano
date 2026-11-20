import React, { useEffect } from "react";
import { useParams, useLocation, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "../components/Layout";
import { projects } from "../data/projects";

export const ProjectDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const fromBinder = location.state?.fromBinder === true;
  const project = projects.find((p) => p.id === id);

  const themeBg = project?.themeBackground;
  const themeFg = project?.themeForeground ?? "0 0% 100%";

  useEffect(() => {
    if (!themeBg) return;
    const root = document.documentElement;
    const isDarkFg =
      Number(themeFg.split(" ")[2]?.replace("%", "")) < 50;
    const overrides = {
      "--background": themeBg,
      "--foreground": themeFg,
      "--muted-foreground": isDarkFg
        ? `${themeFg.split(" ").slice(0, 2).join(" ")} 25%`
        : "0 0% 88%",
      "--border": isDarkFg ? themeFg : "0 0% 100%",
      "--separator": isDarkFg ? themeFg : "0 0% 60%",
      "--hover-bg": themeBg,
      "--card": themeBg,
      "--card-foreground": themeFg
    };

    Object.entries(overrides).forEach(([prop, val]) =>
      root.style.setProperty(prop, val)
    );

    return () => {
      Object.keys(overrides).forEach((prop) =>
        root.style.removeProperty(prop)
      );
    };
  }, [themeBg, themeFg]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <Layout noPadding={true} headerRevealMode={true} showEchelonFooter={true}>
      <div key={id} className={fromBinder ? "binder-project-enter" : undefined}>
        {/* Fullscreen Hero Cover */}
        <section className="relative h-[85vh] sm:h-screen overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/50" />

          {/* Quick back link for mobile right at the top */}
          <div className="absolute top-20 sm:top-28 left-0 right-0 z-20 container-wide">
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/80 hover:text-accent transition-colors bg-background/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-foreground/20"
            >
              <ArrowLeft size={14} />
              <span>Projects</span>
            </Link>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-foreground text-center animate-fade-in break-words max-w-full">
              {project.title}
            </h1>
          </div>

          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 z-10 container-wide">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
              {project.year ? (
                <div className="text-label">{project.year}</div>
              ) : (
                <div />
              )}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] md:text-xs uppercase tracking-widest px-2.5 py-1 border border-foreground/30 text-foreground/90 bg-background/30 backdrop-blur-sm rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Narrative / Brief */}
        <section className="container-wide py-12 sm:py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-20">
            <div className="space-y-6 sm:space-y-8">
              {project.client && (
                <div>
                  <p className="text-label mb-1.5">Client</p>
                  <p className="text-foreground font-medium">{project.client}</p>
                </div>
              )}
              {project.year && (
                <div>
                  <p className="text-label mb-1.5">Year</p>
                  <p className="text-foreground">{project.year}</p>
                </div>
              )}
              <div>
                <p className="text-label mb-2">Categories</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs sm:text-sm border border-separator px-3 py-1 rounded-sm text-foreground/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery Image Stream */}
        <section className="container-wide pb-16 sm:pb-24">
          <div className="space-y-6 sm:space-y-8 md:space-y-12">
            {project.images.map((imgSrc, idx) => (
              <div
                key={idx}
                className="image-reveal animate-fade-in-up rounded-sm overflow-hidden"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <img
                  src={imgSrc}
                  alt={`${project.title} - ${idx + 1}`}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Back Link */}
        <section className="container-wide pb-16 sm:pb-24">
          <Link
            to="/work"
            className="inline-flex items-center gap-3 text-muted-foreground hover-highlight group py-2 underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-accent"
          >
            <ArrowLeft
              size={20}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span className="font-medium">Back to projects</span>
          </Link>
        </section>
      </div>
    </Layout>
  );
};
