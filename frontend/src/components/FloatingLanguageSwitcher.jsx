import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function FloatingLanguage() {
  return (
    <div
      className="fixed bottom-4 left-4 z-50 bg-white shadow-lg rounded-md px-3 py-2"
      aria-label="Language Selector"
    >
      <LanguageSwitcher />
    </div>
  );
}
