import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = ({
  children,
  hideFooter = false,
  footerOnMobileOnly = false,
  noPadding = false,
  showEchelonFooter = false,
  headerRevealMode = false
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header revealMode={headerRevealMode} />
      <main className={`flex-1 ${noPadding ? "" : "pt-16 sm:pt-20 md:pt-24"}`}>
        {children}
      </main>
      {!hideFooter && (
        <div className={footerOnMobileOnly ? "block md:hidden" : ""}>
          <Footer variant={showEchelonFooter ? "echelon" : "default"} />
        </div>
      )}
    </div>
  );
};
