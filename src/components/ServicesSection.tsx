
import {
  Wrench,
  Shield,
  Zap,
  Building2,
  Clock,
  HeadphonesIcon,
  LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Building2,
    title: "services.items.installation.title",
    description: "services.items.installation.description",
  },
  {
    icon: Wrench,
    title: "services.items.maintenance.title",
    description: "services.items.maintenance.description",
  },
  {
    icon: Zap,
    title: "services.items.modernization.title",
    description: "services.items.modernization.description",
  },
  {
    icon: Shield,
    title: "services.items.safetyAudits.title",
    description: "services.items.safetyAudits.description",
  },
  {
    icon: Clock,
    title: "services.items.support.title",
    description: "services.items.support.description",
  },
  {
    icon: HeadphonesIcon,
    title: "services.items.consultation.title",
    description: "services.items.consultation.description",
  },
];

const ServicesSection = () => {
  const { t } = useTranslation();

  return (
    <section className="elevator-section bg-muted/40">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar" />

          <span className="section-label">
            {t("services.label")}
          </span>

          <h2 className="section-title">
            {t("services.title")}
          </h2>

          <p className="section-desc">
            {t("services.description")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <article
              key={index}
              className="card-elevated group"
            >
              <div className="w-11 h-11 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                <service.icon className="w-5 h-5 text-secondary" />
              </div>

              <h3 className="text-lg font-semibold mb-2 font-sans">
                {t(service.title)}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(service.description)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
