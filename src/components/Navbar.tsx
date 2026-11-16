
import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Home, Wrench, Building2, FolderOpen, Handshake, Mail } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.svg";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavbarProps {
  currentFloor: number;
  onNavigate: (floor: number) => void;
}

const navItems = [
  { key: "home", floor: 0, icon: Home },
  { key: "services", floor: 1, icon: Wrench },
  { key: "about", floor: 2, icon: Building2 },
  { key: "projects", floor: 3, icon: FolderOpen },
  { key: "partners", floor: 4, icon: Handshake },
  { key: "contact", floor: 5, icon: Mail },
];

const Navbar = ({ currentFloor, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();

  const isArabic = i18n.language.startsWith("ar");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [i18n.language]);

  const handleNav = (floor: number) => {
    onNavigate(floor);
    setIsOpen(false);
  };

  return (
    <nav
      dir={isArabic ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/50"
          : "bg-background/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-5 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => handleNav(0)}
            className="flex items-center gap-3 shrink-0"
            aria-label={t("navbar.logo")}
          >
            <img
              src={logo}
              alt={t("navbar.logo")}
              className="h-8 w-auto"
            />

            <span className="font-semibold text-sm text-foreground">
              {t("navbar.companyName")}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.floor}
                onClick={() => handleNav(item.floor)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                  currentFloor === item.floor
                    ? "text-secondary font-semibold bg-secondary/10"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {t(`navbar.items.${item.key}`)}
              </button>
            ))}

            <div className="ms-3">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 ${
                isOpen
                  ? "bg-secondary text-white border-secondary"
                  : "bg-background border-border hover:bg-muted"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-center"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                key="menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 top-16 z-40 bg-black/30 backdrop-blur-[2px] md:hidden"
              />

              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 right-0 top-full z-50 md:hidden"
              >
                <div className="container mx-auto px-4 pb-4">
                  <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl shadow-black/10">
                    <div className="px-5 pt-5 pb-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                        {t("navbar.companyName")}
                      </p>

                      <p className="mt-1 text-lg font-bold text-foreground">
                        {isArabic ? "استكشف موقعنا" : "Explore our website"}
                      </p>
                    </div>

                    <div className="px-3 pb-3">
                      {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = currentFloor === item.floor;

                        return (
                          <motion.button
                            key={item.floor}
                            initial={{ opacity: 0, x: isArabic ? 12 : -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.2,
                              delay: index * 0.04,
                            }}
                            onClick={() => handleNav(item.floor)}
                            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3.5 text-start transition-all duration-200 ${
                              isActive
                                ? "bg-secondary/10 text-secondary"
                                : "text-foreground/75 hover:bg-muted hover:text-foreground"
                            }`}
                          >
                            <span
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                                isActive
                                  ? "bg-secondary text-white shadow-md shadow-secondary/20"
                                  : "bg-muted text-muted-foreground group-hover:bg-secondary/10 group-hover:text-secondary"
                              }`}
                            >
                              <Icon className="h-[19px] w-[19px]" />
                            </span>

                            <span
                              className={`flex-1 text-sm ${
                                isActive ? "font-semibold" : "font-medium"
                              }`}
                            >
                              {t(`navbar.items.${item.key}`)}
                            </span>

                            <ChevronRight
                              className={`h-4 w-4 shrink-0 text-muted-foreground/60 transition-all group-hover:text-secondary ${
                                isArabic
                                  ? "rotate-180 group-hover:-translate-x-1"
                                  : "group-hover:translate-x-1"
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                    </div>

                    <div className="border-t border-border/60 bg-muted/30 px-5 py-3">
                      <p className="text-center text-xs text-muted-foreground">
                        {isArabic
                          ? "المسار الثابت للمصاعد • جودة تثق بها"
                          : "El Masar El Thabet • Quality you can trust"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;