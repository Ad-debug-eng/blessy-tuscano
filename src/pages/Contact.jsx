import React, { useState } from "react";
import { Mail, Instagram, Phone, Download, Copy, Check } from "lucide-react";
import { Layout } from "../components/Layout";
import { StarIcon } from "../components/StarIcon";
import { contactPortrait } from "../data/collage";

export const Contact = () => {
  const [copiedType, setCopiedType] = useState(null);

  const copyToClipboard = (e, text, type) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 1500);
  };

  return (
    <Layout showEchelonFooter={true}>
      <section className="container-wide py-10 sm:py-16 md:py-24 min-h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className="space-y-8 sm:space-y-12 pl-2 sm:pl-0">
            <div>
              <h1 className="text-display mb-6 animate-fade-in-up leading-[1.05] text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
                <span className="relative inline-block">
                  <StarIcon className="absolute z-0 w-[0.8em] left-[-0.15em] sm:left-[-0.32em] top-[-0.08em]" />
                  <span className="relative z-10">Let's</span>
                </span>
                <br />
                <span className="relative inline-block">work</span>
                <br />
                <span className="relative inline-block">
                  <StarIcon className="absolute z-0 w-[0.8em] left-[2.2em] sm:left-[2.46em] top-[-0.18em]" />
                  <span className="relative z-10">together.</span>
                </span>
              </h1>
              <p
                className="text-lg sm:text-xl text-muted-foreground animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              />
            </div>

            <div
              className="space-y-4 sm:space-y-5 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Clickable Email (opens Mail app) + Copy button */}
              <div className="flex items-center gap-3">
                <a
                  href="mailto:blessytuscano@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-foreground hover:text-accent group py-1 underline underline-offset-4 decoration-foreground/40 hover:decoration-accent transition-colors duration-150"
                  title="Click to open default email client"
                >
                  <Mail
                    size={20}
                    className="text-foreground/75 group-hover:text-accent transition-colors duration-150 flex-shrink-0"
                  />
                  <span className="break-all sm:break-normal">blessytuscano@gmail.com</span>
                </a>
                <button
                  onClick={(e) => copyToClipboard(e, "blessytuscano@gmail.com", "email")}
                  className="p-1.5 text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-md transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedType === "email" ? (
                    <span className="text-[10px] text-accent font-mono font-bold flex items-center gap-1">
                      <Check size={12} /> Copied
                    </span>
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-3">
                <a
                  href="https://instagram.com/blessy_creates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-foreground hover:text-accent group py-1 underline underline-offset-4 decoration-foreground/40 hover:decoration-accent transition-colors duration-150"
                  title="Open Instagram"
                >
                  <Instagram
                    size={20}
                    className="text-foreground/75 group-hover:text-accent transition-colors duration-150 flex-shrink-0"
                  />
                  <span>@blessy_creates</span>
                </a>
              </div>

              {/* Clickable Phone Number (opens Phone / Dialer app) + Copy button */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+918237503021"
                  className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg text-foreground hover:text-accent group py-1 underline underline-offset-4 decoration-foreground/40 hover:decoration-accent transition-colors duration-150"
                  title="Click to dial / call +91 8237503021"
                >
                  <Phone
                    size={20}
                    className="text-foreground/75 group-hover:text-accent transition-colors duration-150 flex-shrink-0"
                  />
                  <span>+91 8237503021</span>
                </a>
                <button
                  onClick={(e) => copyToClipboard(e, "+918237503021", "phone")}
                  className="p-1.5 text-foreground/60 hover:text-foreground hover:bg-foreground/10 rounded-md transition-colors"
                  title="Copy phone number to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedType === "phone" ? (
                    <span className="text-[10px] text-accent font-mono font-bold flex items-center gap-1">
                      <Check size={12} /> Copied
                    </span>
                  ) : (
                    <Copy size={15} />
                  )}
                </button>
              </div>

              {/* Download Contact Card (.vcf) button */}
              <div className="pt-3">
                <a
                  href="/blessy-tuscano.vcf"
                  download="Blessy_Tuscano_Contact.vcf"
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-foreground/30 text-xs font-mono uppercase tracking-widest text-foreground hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm group cursor-pointer"
                  title="Download vCard to add Blessy Tuscano directly to contacts"
                >
                  <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
                  <span>Download Contact Card (.vcf)</span>
                </a>
              </div>
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <p className="text-label mb-1.5">Based in</p>
              <p className="text-base sm:text-lg font-medium text-foreground">India</p>
            </div>

            {/* Mobile portrait showcase */}
            <div className="block lg:hidden pt-4">
              <div className="max-w-xs aspect-[4/5] bg-secondary overflow-hidden shadow-2xl rounded-sm">
                <img
                  src={contactPortrait}
                  alt="Blessy Tuscano photographing with a camera on a tripod"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="aspect-[4/5] bg-secondary overflow-hidden shadow-2xl rounded-sm">
              <img
                src={contactPortrait}
                alt="Blessy Tuscano photographing with a camera on a tripod"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
