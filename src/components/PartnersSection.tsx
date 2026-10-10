
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
  link: string;
  created_at: string;
  updated_at: string;
}

interface PartnersResponse {
  success: boolean;
  data: Partner[];
}

const PartnersSection = () => {
  const { t } = useTranslation();

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dashboard.mtliftgroup.ly/api/partners"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch partners");
        }

        const data: PartnersResponse = await response.json();

        if (data.success) {
          setPartners(data.data);
        } else {
          throw new Error("API returned unsuccessful response");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An error occurred"
        );

        console.error("Error fetching partners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="elevator-section">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-2xl mb-12">
            <div className="accent-bar" />

            <span className="section-label">
              {t("partners.label")}
            </span>

            <h2 className="section-title">
              {t("partners.title")}
            </h2>

            <p className="section-desc">
              {t("partners.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-card border border-border p-6 animate-pulse"
              >
                <div className="w-full h-24 rounded-lg bg-muted mb-6" />

                <div className="h-6 bg-muted rounded mb-3 w-3/4" />

                <div className="h-20 bg-muted rounded mb-6" />

                <div className="h-10 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="elevator-section">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-2xl mb-12">
            <div className="accent-bar" />

            <span className="section-label">
              {t("partners.label")}
            </span>

            <h2 className="section-title">
              {t("partners.title")}
            </h2>
          </div>

          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {t("partners.error")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="elevator-section">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-2xl mb-12">
          <div className="accent-bar" />

          <span className="section-label">
            {t("partners.label")}
          </span>

          <h2 className="section-title">
            {t("partners.title")}
          </h2>

          <p className="section-desc">
            {t("partners.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="rounded-xl bg-card border border-border p-6 flex flex-col items-start hover:border-secondary/50 transition-all duration-300 group hover:-translate-y-1 shadow-sm"
            >
              {/* Logo Area */}
              <div className="w-full h-24 rounded-lg bg-white flex items-center justify-center mb-6 px-4 py-4 border border-border/50 group-hover:border-secondary/20 transition-colors overflow-hidden">
                <img
                  src={partner.logo}
                  alt={`${partner.name} ${t("partners.logo")}`}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Name */}
              <h3 className="text-xl font-semibold mb-3 font-sans group-hover:text-primary transition-colors">
                {partner.name}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {partner.description}
              </p>

              {/* Button */}
              <Button
                variant="outline"
                className="w-full group/btn"
                asChild
              >
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("partners.visitWebsite")}

                  <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
