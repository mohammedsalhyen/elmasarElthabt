
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

const features = [
  "about.features.technicians",
  "about.features.components",
  "about.features.warranty",
  "about.features.energyEfficient",
  "about.features.customDesigns",
  "about.features.rapidResponse",
];

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="elevator-section">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="lg:col-span-3">
            <div className="accent-bar" />

            <span className="section-label">
              {t("about.label")}
            </span>

            <h2 className="section-title">
              {t("about.title")}
            </h2>

            <div className="space-y-4 mt-6">
              <p className="text-muted-foreground leading-relaxed">
                {t("about.paragraph1.before")}{" "}
                <strong className="text-foreground">
                  {t("about.companyName")}
                </strong>{" "}
                {t("about.paragraph1.after")}
              </p>

              <p className="text-muted-foreground leading-relaxed">
                {t("about.paragraph2")}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-secondary" />
                  </div>

                  <span className="text-sm">
                    {t(feature)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="card-elevated text-center py-8">
              <div className="stat-number">200+</div>
              <div className="text-muted-foreground text-sm mt-1">
                {t("about.stats.projects")}
              </div>
            </div>

            <div className="card-elevated text-center py-8">
              <div className="stat-number">1000+</div>
              <div className="text-muted-foreground text-sm mt-1">
                {t("about.stats.clients")}
              </div>
            </div>

            <div className="card-elevated text-center py-8">
              <div className="stat-number">10+</div>
              <div className="text-muted-foreground text-sm mt-1">
                {t("about.stats.years")}
              </div>
            </div>

            <div className="card-elevated text-center py-8">
              <div className="stat-number">100%</div>
              <div className="text-muted-foreground text-sm mt-1">
                {t("about.stats.safety")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
