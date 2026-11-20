import React from "react";
import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { StarIcon } from "./StarIcon";

export const Footer = ({ variant = "default" }) => {
  const currentYear = new Date().getFullYear();

  if (variant === "echelon") {
    return (
      <footer className="border-t border-separator mt-auto">
        <div className="container-wide py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            <div className="space-y-2 sm:space-y-3">
              <p className="text-label text-[11px] sm:text-xs">Location</p>
              <div className="text-sm text-foreground space-y-1">
                <p>India</p>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-label text-[11px] sm:text-xs">Navigation</p>
              <div className="text-sm space-y-1.5">
                <Link
                  to="/work"
                  className="block text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/40 hover:decoration-accent"
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  className="block text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/40 hover:decoration-accent"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block text-foreground hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/40 hover:decoration-accent"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-label text-[11px] sm:text-xs">Contact</p>
              <div className="text-sm text-foreground space-y-1.5">
                <a
                  href="mailto:blessytuscano@gmail.com"
                  className="block hover:text-accent transition-colors break-all sm:break-normal underline underline-offset-4 decoration-foreground/40 hover:decoration-accent"
                  title="Send email"
                >
                  blessytuscano@gmail.com
                </a>
                <a
                  href="tel:+918237503021"
                  className="block hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/40 hover:decoration-accent"
                  title="Call phone"
                >
                  +91 8237503021
                </a>
                <a
                  href="/blessy-tuscano.vcf"
                  download="Blessy_Tuscano_Contact.vcf"
                  className="inline-block text-xs text-muted-foreground hover:text-accent transition-colors pt-0.5 underline underline-offset-4 decoration-muted-foreground/50 hover:decoration-accent"
                  title="Download contact vCard (.vcf)"
                >
                  Save Contact (.vcf)
                </a>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <p className="text-label text-[11px] sm:text-xs">Social</p>
              <div className="text-sm text-foreground space-y-1.5">
                <a
                  href="https://instagram.com/blessy_creates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors group underline underline-offset-4 decoration-foreground/40 hover:decoration-accent"
                >
                  <Instagram size={16} className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                  <span>@blessy_creates</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Continuous Endless Marquee */}
        <div className="border-t border-separator overflow-hidden py-3 sm:py-5 md:py-6 flex select-none w-full marquee-container group">
          <div className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]">
            {Array.from({ length: 8 }).map((_, r) => (
              <a
                key={r}
                href="https://instagram.com/blessy_creates"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground hover:text-accent transition-colors mx-5 sm:mx-8 select-none whitespace-nowrap"
              >
                @blessy_creates
              </a>
            ))}
          </div>
          <div aria-hidden="true" className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused]">
            {Array.from({ length: 8 }).map((_, r) => (
              <a
                key={r}
                href="https://instagram.com/blessy_creates"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground hover:text-accent transition-colors mx-5 sm:mx-8 select-none whitespace-nowrap"
              >
                @blessy_creates
              </a>
            ))}
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-separator">
      <div className="container-wide py-10 sm:py-12 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-8">
          <div className="space-y-3 sm:space-y-4">
            <p className="font-display text-lg sm:text-xl font-semibold">Blessy Tuscano</p>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Branding · Art Direction · Visual Merchandising
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
            <Link to="/work" className="hover-highlight underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-accent">
              Work
            </Link>
            <Link to="/about" className="hover-highlight underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-accent">
              About
            </Link>
            <Link to="/contact" className="hover-highlight underline underline-offset-4 decoration-muted-foreground/40 hover:decoration-accent">
              Contact
            </Link>
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground">
            <p>© {currentYear} Blessy Tuscano</p>
            <p className="mt-1">India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
