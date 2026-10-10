
import { ArrowRight, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import Elevator3D from "./Elevator3D";

interface HeroSectionProps {
  onNavigate: (floor: number) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="elevator-section relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-xl">
            <div className="animate-fade-up">
              <span className="section-label">
                {t("hero.since")}
              </span>
            </div>

            <h1 className="section-title animate-fade-up delay-100">
              {t("hero.title")}{" "}
              <span className="text-secondary">
                {t("hero.titleHighlight")}
              </span>
            </h1>

            <p className="section-desc animate-fade-up delay-200">
              {t("hero.description")}
            </p>

            <div className="flex flex-wrap gap-4 mt-8 animate-fade-up delay-300">
              <button
                className="btn-primary"
                onClick={() => onNavigate(4)}
              >
                {t("hero.getQuote")}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                className="btn-secondary"
                onClick={() => onNavigate(3)}
              >
                {t("hero.seeOurWork")}
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex gap-10 mt-12 pt-8 border-t border-border animate-fade-up delay-400">
              <div>
                <div className="stat-number">200+</div>
                <div className="text-muted-foreground text-sm mt-1">
                  {t("hero.stats.installations")}
                </div>
              </div>

              <div>
                <div className="stat-number">10+</div>
                <div className="text-muted-foreground text-sm mt-1">
                  {t("hero.stats.years")}
                </div>
              </div>

              <div>
                <div className="stat-number">100%</div>
                <div className="text-muted-foreground text-sm mt-1">
                  {t("hero.stats.safety")}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - 3D Elevator */}
          <div className="hidden lg:flex justify-center animate-fade-in delay-200">
            <Elevator3D />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => onNavigate(1)}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-secondary transition-colors"
      >
        <span className="text-xs tracking-wide">
          {t("hero.scroll")}
        </span>

        <ChevronDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
