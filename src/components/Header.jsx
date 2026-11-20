import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Mail, Instagram, Phone } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { label: "Projects", path: "/work" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" }
];

export const Header = ({ revealMode = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(!revealMode);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // On mobile screens, always keep header visible so users have navigation
    const isMobile = window.innerWidth < 768;
    if (!revealMode || isMobile) {
      setVisible(true);
      return;
    }
    const handleMouseMove = (e) => {
      setVisible(e.clientY < 100);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [revealMode]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 bg-background border-b border-separator/20 shadow-sm ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="container-wide relative">
          <div className="flex items-center justify-between h-16 sm:h-20 md:h-24">
            <Link
              to="/"
              className="font-display text-base sm:text-lg font-semibold tracking-tight text-foreground hover:text-accent transition-colors duration-300"
            >
              Blessy Tuscano
            </Link>

            <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/work" && location.pathname.startsWith("/work"));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-xs font-sans tracking-widest uppercase transition-all duration-300 hover:tracking-[0.2em] hover:text-accent ${
                      isActive
                        ? "text-foreground font-bold underline underline-offset-8 decoration-accent"
                        : "text-foreground/80 hover:text-accent hover:underline underline-offset-8 decoration-foreground/30"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className="md:hidden flex items-center gap-1 sm:gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                className="p-2 text-foreground focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Solid Backdrop Mobile Drawer Overlay */}
      {menuOpen && (
        <div
          className="md:hidden fixed inset-0 top-16 sm:top-20 z-[100] bg-background animate-fade-in flex flex-col justify-between p-6 sm:p-8 overflow-y-auto border-t border-separator/20 shadow-2xl"
          style={{ backgroundColor: "hsl(var(--background))", opacity: 1 }}
        >
          <nav className="flex flex-col gap-6 pt-4">
            {navItems.map((item, index) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === "/work" && location.pathname.startsWith("/work"));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={`text-3xl sm:text-4xl font-display uppercase tracking-tight transition-colors duration-300 animate-fade-in-up underline underline-offset-8 ${
                    isActive ? "text-accent font-bold decoration-accent" : "text-foreground hover:text-accent decoration-foreground/30"
                  }`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-separator/30 pt-6 space-y-4 text-sm text-foreground/80">
            <p className="text-label text-[10px]">Contact</p>
            <div className="space-y-2">
              <a
                href="mailto:blessytuscano@gmail.com"
                className="flex items-center gap-3 hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/30"
              >
                <Mail size={16} />
                <span>blessytuscano@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/blessy_creates"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/30"
              >
                <Instagram size={16} />
                <span>@blessy_creates</span>
              </a>
              <a
                href="tel:+918237503021"
                className="flex items-center gap-3 hover:text-accent transition-colors underline underline-offset-4 decoration-foreground/30"
                title="Call phone"
              >
                <Phone size={16} />
                <span>+91 8237503021</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
