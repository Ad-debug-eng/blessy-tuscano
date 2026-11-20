import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "../components/Layout";
import { StarIcon } from "../components/StarIcon";
import { collageItems } from "../data/collage";
import { getBlessyAge } from "../utils/age";

const expertiseSkills = [
  "Brand Identity",
  "Illustration",
  "Creative Strategy",
  "Visual Design",
  "Art Direction",
  "Visual Merchandising"
];

const round1Dec = (val) => Math.round(val * 10) / 10;

const CollageEditor = ({ initialItems }) => {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState(null);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const dragRef = useRef(null);

  const updateItem = (id, changes) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...changes } : item))
    );
  };

  const handlePointerDown = (e, item) => {
    e.preventDefault();
    const rect = sectionRef.current.getBoundingClientRect();
    dragRef.current = {
      id: item.id,
      dx: ((e.clientX - rect.left) / rect.width) * 100 - item.left,
      dy: ((e.clientY - rect.top) / rect.height) * 100 - item.top
    };
    setActiveId(item.id);
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag) return;
    const rect = sectionRef.current.getBoundingClientRect();
    updateItem(drag.id, {
      left: round1Dec(((e.clientX - rect.left) / rect.width) * 100 - drag.dx),
      top: round1Dec(((e.clientY - rect.top) / rect.height) * 100 - drag.dy)
    });
  };

  const selectedItem = items.find((i) => i.id === activeId);

  const copyLayout = async () => {
    const layoutStr = items
      .map(
        (h) =>
          `  { id: "${h.id}", top: ${h.top}, left: ${h.left}, width: ${h.width}, rotate: ${h.rotate}, z: ${h.z} },`
      )
      .join("\n");
    await navigator.clipboard.writeText(layoutStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      <section
        ref={sectionRef}
        onPointerMove={handlePointerMove}
        onPointerUp={() => (dragRef.current = null)}
        className="relative w-full h-[110vh] md:h-[100vh] overflow-hidden outline-dashed outline-2 outline-primary"
      >
        {items.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt={item.alt}
            draggable={false}
            onPointerDown={(e) => handlePointerDown(e, item)}
            onWheel={(e) =>
              updateItem(item.id, {
                width: round1Dec(
                  Math.max(3, item.width + (e.deltaY < 0 ? 0.5 : -0.5))
                )
              })
            }
            className={`absolute cursor-move select-none touch-none ${
              item.cutout ? "" : "shadow-lg"
            } ${activeId === item.id ? "outline outline-2 outline-primary" : ""}`}
            style={{
              top: `${item.top}%`,
              left: `${item.left}%`,
              width: `${item.width}%`,
              zIndex: item.z,
              transform: `rotate(${item.rotate}deg)`
            }}
          />
        ))}
      </section>

      <div className="fixed bottom-4 right-4 z-[100] w-72 bg-card text-card-foreground border border-border p-4 space-y-3 text-sm shadow-xl">
        <p className="font-bold">Collage editor</p>
        <p className="text-muted-foreground text-xs">
          Drag photos to move. Scroll on a photo to resize.
        </p>
        {selectedItem ? (
          <div className="space-y-2">
            <p>
              Selected: <b>{selectedItem.alt}</b>
            </p>
            <label className="block">
              Size {selectedItem.width}%
              <input
                type="range"
                min={3}
                max={50}
                step={0.5}
                value={selectedItem.width}
                onChange={(e) =>
                  updateItem(selectedItem.id, { width: +e.target.value })
                }
                className="w-full"
              />
            </label>
            <label className="block">
              Tilt {selectedItem.rotate}°
              <input
                type="range"
                min={-45}
                max={45}
                value={selectedItem.rotate}
                onChange={(e) =>
                  updateItem(selectedItem.id, { rotate: +e.target.value })
                }
                className="w-full"
              />
            </label>
            <div className="flex gap-2">
              <button
                className="border border-border px-2 py-1"
                onClick={() =>
                  updateItem(selectedItem.id, { z: selectedItem.z + 1 })
                }
              >
                Forward
              </button>
              <button
                className="border border-border px-2 py-1"
                onClick={() =>
                  updateItem(selectedItem.id, {
                    z: Math.max(0, selectedItem.z - 1)
                  })
                }
              >
                Backward
              </button>
              <span className="self-center">Layer {selectedItem.z}</span>
            </div>
          </div>
        ) : (
          <p>Click a photo to select it.</p>
        )}
        <button
          onClick={copyLayout}
          className="w-full bg-primary text-primary-foreground py-2 font-bold"
        >
          {copied ? "Copied!" : "Copy layout"}
        </button>
      </div>
    </>
  );
};

export const About = () => {
  const location = useLocation();
  const isEditing = new URLSearchParams(location.search).has("edit");
  const age = getBlessyAge();
  const desktopCollageRef = useRef(null);
  const [bioMarginTop, setBioMarginTop] = useState(null);

  const calculateBioSpacing = useCallback(() => {
    if (!desktopCollageRef.current || window.innerWidth < 640) {
      setBioMarginTop(null);
      return;
    }

    const container = desktopCollageRef.current;
    const containerRect = container.getBoundingClientRect();
    const imgs = container.querySelectorAll("img.collage-item");
    if (!imgs || imgs.length === 0) return;

    let maxBottom = 0;
    imgs.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const bottomRelativeToContainer = rect.bottom - containerRect.top;
      if (bottomRelativeToContainer > maxBottom) {
        maxBottom = bottomRelativeToContainer;
      }
    });

    if (maxBottom > 0) {
      // Snug, natural gap: 32px on tablet, 38px on desktop (never overlapping, never too much space)
      const gap = window.innerWidth >= 1024 ? 38 : 30;
      const targetMargin = Math.round(maxBottom + gap - containerRect.height);
      setBioMarginTop(targetMargin);
    }
  }, []);

  useEffect(() => {
    calculateBioSpacing();

    const handleResize = () => calculateBioSpacing();
    window.addEventListener("resize", handleResize);

    const container = desktopCollageRef.current;
    let ro = null;
    if (container && window.ResizeObserver) {
      ro = new ResizeObserver(() => calculateBioSpacing());
      ro.observe(container);
    }

    if (container) {
      const imgs = container.querySelectorAll("img.collage-item");
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", calculateBioSpacing);
        }
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (ro) ro.disconnect();
      if (container) {
        const imgs = container.querySelectorAll("img.collage-item");
        imgs.forEach((img) => {
          img.removeEventListener("load", calculateBioSpacing);
        });
      }
    };
  }, [calculateBioSpacing]);

  return (
    <Layout showEchelonFooter={true}>
      {/* Title */}
      <section className="container-wide pt-8 sm:pt-16 md:pt-24">
        <h1 className="relative inline-block text-display animate-fade-in-up text-4xl sm:text-7xl md:text-8xl">
          <StarIcon className="absolute z-0 w-10 sm:w-14 md:w-20 -right-[9%] -top-[12%]" />
          <span className="relative z-10">About</span>
        </h1>
      </section>

      {/* Scattered collage canvas */}
      {isEditing ? (
        <CollageEditor initialItems={collageItems} />
      ) : (
        <>
          {/* Mobile Collage View: Organic clustered showcase */}
          <div className="sm:hidden relative z-10 px-4 py-8 overflow-hidden">
            <div className="relative h-72 w-full">
              {collageItems.slice(0, 8).map((item, idx) => {
                // Responsive positions tailored for mobile 375-400px width
                const mobilePos = [
                  { top: 5, left: 10, width: 34, rotate: -4, z: 2 },
                  { top: 12, left: 52, width: 38, rotate: 6, z: 3 },
                  { top: 40, left: 4, width: 30, rotate: 8, z: 1 },
                  { top: 42, left: 42, width: 44, rotate: -3, z: 4 },
                  { top: 2, left: 70, width: 26, rotate: -12, z: 5 },
                  { top: 55, left: 74, width: 24, rotate: 10, z: 2 },
                  { top: 18, left: 32, width: 28, rotate: -5, z: 6 },
                  { top: 50, left: 24, width: 26, rotate: 4, z: 3 }
                ];
                const pos = mobilePos[idx] || item;
                return (
                  <img
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className={`collage-item absolute ${item.cutout ? "" : "shadow-md rounded-sm"}`}
                    style={{
                      top: `${pos.top}%`,
                      left: `${pos.left}%`,
                      width: `${pos.width}%`,
                      zIndex: pos.z,
                      "--r": `${pos.rotate}deg`,
                      animationDelay: `${idx * 0.3}s`
                    }}
                  />
                );
              })}
            </div>
          </div>

          {/* Desktop/Tablet Collage Canvas */}
          <section
            ref={desktopCollageRef}
            className="hidden sm:block relative z-10 w-full h-[110vh] md:h-[100vh]"
          >
            {collageItems.map((item, idx) => (
              <img
                key={item.id}
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className={`collage-item absolute ${item.cutout ? "" : "shadow-lg"}`}
                style={{
                  top: `${item.top}%`,
                  left: `${item.left}%`,
                  width: `${item.width}%`,
                  zIndex: item.z,
                  "--r": `${item.rotate}deg`,
                  animationDelay: `${idx * 0.4}s`
                }}
              />
            ))}
          </section>
        </>
      )}

      {/* Narrative & Bio */}
      <section
        style={
          !isEditing && bioMarginTop !== null
            ? { marginTop: `${bioMarginTop}px`, transition: "margin-top 0.15s ease-out" }
            : undefined
        }
        className={`container-wide md:!px-[96px] pb-16 md:pb-24 relative z-10 ${
          isEditing
            ? "pt-8"
            : bioMarginTop !== null
            ? "pt-0"
            : "mt-4 sm:mt-6 pt-0"
        }`}
      >
        <div className="w-full space-y-8">
          <div className="w-full">
            <div className="space-y-5 sm:space-y-6 text-base sm:text-lg md:text-xl leading-relaxed text-muted-foreground text-left md:text-justify">
              <p>
                <span>
                  Hello! I'm Blessy Tuscano. I am a {age} year old creative, who
                  loves art of all forms. I specialize in branding, art
                  direction, creative direction and visual merchandising.
                </span>
              </p>
              <p>
                <span>
                  I have a soft spot for handiwork, and when it comes to crisp,
                  straight edges, you’ll probably find me passing with flying
                  colours. But when I’m creating, I love going in the opposite
                  direction playing with vibrant colours, bold patterns, and
                  unexpected combinations.
                </span>
                <br />
                <br />
                <span>
                  The questions I always come back to are: How would it translate?
                  How does it feel? Because for me, the best creative work isn’t
                  just something you look at it’s something you experience.
                </span>
              </p>
              <p>
                <span>
                  Without a coffee in hand, I don’t think I could start my day.
                  Once I’m caffeinated, I’m reaching for an outfit that’s bright,
                  fun, and gives me that little dopamine rush to carry me
                  through the day.
                </span>
                <br />
                <br />
                <span>
                  And on my side quests, whenever I get a break, you’ll probably
                  find me in the kitchen experimenting with food. Sourdough has
                  been in the testing phase for far too long, but don’t worry, I
                  can always fix us up with some really good butter chicken.
                </span>
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-label mb-4 sm:mb-6">Expertise</h2>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {expertiseSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs sm:text-sm border border-border px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-sm cursor-pointer transition-colors duration-300 hover:bg-accent hover:text-accent-foreground hover:border-accent"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
