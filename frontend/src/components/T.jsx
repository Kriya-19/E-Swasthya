// src/components/T.jsx
import useTranslate from "@/hooks/useTranslate";

export default function T({ k, children }) {
  const t = useTranslate();

  // If no explicit key is provided, try translating a string child directly.
  if (!k && typeof children === "string") {
    const normalized = children.trim();
    return <>{t(normalized)}</>;
  }

  return <>{k ? t(k) : children}</>;
}
