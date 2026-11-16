
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "react-i18next";

const features = [
  "about.features.technicians",
  "about.features.components",
  "about.features.warranty",
  "about.features.energyEfficient",
  "about.features.customDesigns",
  "about.features.rapidResponse",
];

const stats = [
  { value: 200, suffix: "+", label: "about.stats.projects" },
  { value: 1000, suffix: "+", label: "about.stats.clients" },
  { value: 10, suffix: "+", label: "about.stats.years" },
  { value: 100, suffix: "%", label: "about.stats.safety" },
];

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  reduceMotion: boolean;
}

const Counter = ({
  value,
  suffix = "",
  duration = 2,
  reduceMotion,
}: CounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const count = useMotionValue(0);

  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString("en-US")
  );

  useEffect(() => {
    if (!isInView) return;

    if (reduceMotion) {
      count.set(value);
      return;
    }

    const controls = animate(count, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });

    return () => controls.stop();
  }, [isInView, count, value, duration, reduceMotion]);

  return (
    <span className="inline-flex items-center">
      <motion.span ref={ref}>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const isArabic = i18n.language.startsWith("ar");

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

  return (
    <section className="elevator-section overflow-hidden">
      <div className="container mx-auto px-6 py-16 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            className="lg:col-span-3"
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
              className="section-label inline-block"
            >
              {t("about.label")}
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="section-title mt-3"
            >
              {t("about.title")}
            </motion.h2>

            <motion.div
              variants={containerVariants}
              className="mt-6 space-y-4"
            >
              <motion.p
                variants={itemVariants}
                className="leading-relaxed text-muted-foreground"
              >
                {t("about.paragraph1.before")}{" "}
                <strong className="font-semibold text-foreground">
                  {t("about.companyName")}
                </strong>{" "}
                {t("about.paragraph1.after")}
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="leading-relaxed text-muted-foreground"
              >
                {t("about.paragraph2")}
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {features.map((feature) => (
                <motion.div
                  key={feature}
                  variants={itemVariants}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          x: isArabic ? -4 : 4,
                          transition: { duration: 0.2 },
                        }
                  }
                  className="group flex items-center gap-3"
                >
                  <motion.span
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : { scale: 1.12, rotate: -8 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 transition-colors duration-300 group-hover:bg-secondary/20"
                  >
                    <Check className="h-3.5 w-3.5 text-secondary" />
                  </motion.span>

                  <span className="text-sm leading-relaxed text-foreground/85">
                    {t(feature)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 lg:col-span-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 30,
                  scale: shouldReduceMotion ? 1 : 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                  amount: 0.35,
                }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.6,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                        transition: { duration: 0.25 },
                      }
                }
                className="card-elevated group relative overflow-hidden py-8 text-center"
              >
                <motion.div
                  aria-hidden="true"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transformOrigin: isArabic ? "right" : "left",
                  }}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-secondary"
                />

                <div className="stat-number">
                  <Counter
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                    reduceMotion={!!shouldReduceMotion}
                  />
                </div>

                <p className="mt-2 px-2 text-sm leading-relaxed text-muted-foreground">
                  {t(stat.label)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;