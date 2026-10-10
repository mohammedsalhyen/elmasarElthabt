import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);


  const changeLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    setIsOpen(false);
    window.location.reload();
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = i18n.language === "ar" ? "Ar" : i18n.language === "zh" ? "Zh" : "En";

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-white text-gray-700 hover:bg-gray-50 transition text-sm"
      >
        <Globe className="text-gray-500" />
        {currentLang}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-sm z-20 overflow-hidden">
          <button
            onClick={() => changeLanguage("en")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
              i18n.language === "en" ? "bg-gray-100 font-medium" : ""
            }`}
          >
            English
          </button>

          <button
            onClick={() => changeLanguage("ar")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
              i18n.language === "ar" ? "bg-gray-100 font-medium" : ""
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => changeLanguage("zh")}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
              i18n.language === "zh" ? "bg-gray-100 font-medium" : ""
            }`}
          >
           中文
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
