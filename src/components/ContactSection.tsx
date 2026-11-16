
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const ContactSection = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language.startsWith("ar");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

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

  const contactItems = [
    {
      icon: Phone,
      label: t("contact.info.phone"),
      content: (
        <>
          <div className="font-medium">+218 91 685 8449</div>
          <div className="font-medium">+218 92 000 1428</div>
        </>
      ),
      href: "tel:+218916858449",
    },
    {
      icon: Mail,
      label: t("contact.info.email"),
      content: <div className="font-medium">info@mtlift.ly</div>,
      href: "mailto:info@mtlift.ly",
    },
    {
      icon: MapPin,
      label: t("contact.info.location"),
      content: (
        <div className="font-medium">{t("contact.info.address")}</div>
      ),
      href: "https://maps.app.goo.gl/nAjT2RKqbxmM1uGz6",
      external: true,
    },
  ];

  return (
    <section className="elevator-section overflow-hidden">
      <div className="container mx-auto px-6 py-16 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <motion.div
                initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  transformOrigin: isArabic ? "right" : "left",
                }}
                className="accent-bar"
              />
            </motion.div>

            <motion.span
              variants={itemVariants}
              className="section-label"
            >
              {t("contact.label")}
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="section-title"
            >
              {t("contact.title")}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="section-desc mb-10"
            >
              {t("contact.description")}
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="space-y-6"
            >
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={
                      item.external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    variants={itemVariants}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: isArabic ? -4 : 4,
                            transition: { duration: 0.2 },
                          }
                    }
                    className="group flex items-center gap-4"
                  >
                    <motion.div
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              scale: 1.08,
                              rotate: -5,
                            }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 18,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10 transition-colors group-hover:bg-secondary/20"
                    >
                      <Icon className="h-5 w-5 text-secondary" />
                    </motion.div>

                    <div>
                      <div className="text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      {item.content}
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="card-elevated"
          >
            <motion.h3
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.5,
                delay: shouldReduceMotion ? 0 : 0.15,
              }}
              className="mb-6 font-sans text-xl font-semibold"
            >
              {t("contact.form.title")}
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-4 sm:grid-cols-2"
              >
                <motion.div variants={itemVariants}>
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
                </motion.div>

                <motion.div variants={itemVariants}>
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
                </motion.div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 18,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : 0.1,
                }}
              >
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
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 18,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.5,
                  delay: shouldReduceMotion ? 0 : 0.18,
                }}
              >
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
                  className="resize-none bg-background"
                />
              </motion.div>

              <motion.button
                type="submit"
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 14,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : { y: -2, scale: 1.01 }
                }
                whileTap={
                  shouldReduceMotion ? undefined : { scale: 0.98 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.45,
                  delay: shouldReduceMotion ? 0 : 0.24,
                }}
                className="btn-primary flex w-full items-center justify-center gap-2"
              >
                {t("contact.form.send")}
                <Send className="h-4 w-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="mt-16"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 max-w-2xl"
          >
            <h3 className="mb-2 font-sans text-2xl font-bold text-foreground">
              {t("contact.map.title")}
            </h3>

            <p className="text-muted-foreground">
              {t("contact.map.description")}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={
              shouldReduceMotion
                ? undefined
                : { y: -3, transition: { duration: 0.25 } }
            }
            className="h-[450px] w-full overflow-hidden rounded-xl border border-border/50 shadow-sm"
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 12,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.5,
          }}
          className="mt-12 border-t border-border/10 pt-8 text-center text-sm text-muted-foreground"
        >
          © 2025 {t("contact.footer.company")}.{" "}
          {t("contact.footer.rights")}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;