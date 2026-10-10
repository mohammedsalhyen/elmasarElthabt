
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: t("contact.toast.title"),
      description: t("contact.toast.description"),
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section className="elevator-section">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Info */}
          <div>
            <div className="accent-bar" />

            <span className="section-label">
              {t("contact.label")}
            </span>

            <h2 className="section-title">
              {t("contact.title")}
            </h2>

            <p className="section-desc mb-10">
              {t("contact.description")}
            </p>

            <div className="space-y-6">
              {/* Phone */}
              <a
                href="tel:+218916858449"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    {t("contact.info.phone")}
                  </div>

                  <div className="font-medium">
                    +218 91 685 8449
                  </div>

                  <div className="font-medium">
                    +218 92 000 1428
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@mtlift.ly"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Mail className="w-5 h-5 text-secondary" />
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    {t("contact.info.email")}
                  </div>

                  <div className="font-medium">
                    info@mtlift.ly
                  </div>
                </div>
              </a>

              {/* Location */}
              <a
                href="https://maps.app.goo.gl/nAjT2RKqbxmM1uGz6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">
                    {t("contact.info.location")}
                  </div>

                  <div className="font-medium">
                    {t("contact.info.address")}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div className="card-elevated">
            <h3 className="text-xl font-semibold mb-6 font-sans">
              {t("contact.form.title")}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder={t("contact.form.name")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                  className="bg-background"
                />

                <Input
                  type="email"
                  placeholder={t("contact.form.email")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  required
                  className="bg-background"
                />
              </div>

              <Input
                type="tel"
                placeholder={t("contact.form.phone")}
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="bg-background"
              />

              <Textarea
                placeholder={t("contact.form.message")}
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    message: e.target.value,
                  })
                }
                required
                className="bg-background resize-none"
              />

              <button
                type="submit"
                className="btn-primary w-full"
              >
                {t("contact.form.send")}

                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <div className="max-w-2xl mb-8">
            <h3 className="text-2xl font-bold font-sans text-foreground mb-2">
              {t("contact.map.title")}
            </h3>

            <p className="text-muted-foreground">
              {t("contact.map.description")}
            </p>
          </div>

          <div className="w-full h-[450px] rounded-xl overflow-hidden border border-border/50 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d422.40281223020105!2d20.0694256!3d32.1172929!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13831d00786dca55%3A0x273725c1015a2a1e!2z2YXYqNmG2Yog2KfZhNis2YjZh9ix2Kk!5e0!3m2!1sde!2sch!4v1769053245326!5m2!1sde!2sch"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("contact.map.iframeTitle")}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-border/10 mt-12 pt-8 text-center text-muted-foreground text-sm">
          © 2025 {t("contact.footer.company")}.{" "}
          {t("contact.footer.rights")}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
