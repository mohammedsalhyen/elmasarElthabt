
import {
  Wrench,
  Shield,
  Zap,
  Building2,
  Clock,
  HeadphonesIcon,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language.startsWith("ar");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 30,
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

  return (
    <section className="elevator-section overflow-hidden bg-muted/40">
      <div className="container mx-auto px-6 py-16 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={itemVariants}>
            <motion.div
              initial={{ scaleX: 0 }}
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

          <motion.div variants={itemVariants}>
            <span className="section-label">
              {t("services.label")}
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="section-title mt-3"
          >
            {t("services.title")}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="section-desc mt-4"
          >
            {t("services.description")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={itemVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -7,
                        transition: { duration: 0.25 },
                      }
                }
                className="card-elevated group relative overflow-hidden"
              >
                <motion.div
                  aria-hidden="true"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                  }}
                  className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-secondary/[0.06] blur-2xl transition-colors duration-300 group-hover:bg-secondary/[0.14]"
                />

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
                  className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 transition-colors duration-300 group-hover:bg-secondary/20"
                >
                  <Icon className="h-5 w-5 text-secondary" />
                </motion.div>

                <h3 className="relative mb-2 font-sans text-lg font-semibold transition-colors duration-300 group-hover:text-secondary">
                  {t(service.title)}
                </h3>

                <p className="relative text-sm leading-relaxed text-muted-foreground">
                  {t(service.description)}
                </p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transformOrigin: isArabic ? "right" : "left",
                  }}
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;