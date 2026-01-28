import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/i8n";

export default function useTranslate() {
  const { language } = useLanguage();

  console.log("useTranslate called with:", language);

  return (key: string) => {
    console.log("TRANSLATE:", key, translations[language]?.[key]);
    return translations[language]?.[key] || key;
  };
}
