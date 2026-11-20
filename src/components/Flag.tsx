import type { Lang } from "@/lib/i18n";

/** Bandiere tonde (come il selettore lingua di Wix). */
export function Flag({ lang, size = 22 }: { lang: Lang; size?: number }) {
  const id = `flag-clip-${lang}`;
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true" className="flag">
      <defs>
        <clipPath id={id}>
          <circle cx="11" cy="11" r="11" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {lang === "en" && (
          <>
            <rect width="22" height="22" fill="#012169" />
            <path d="M0 0 22 22M22 0 0 22" stroke="#fff" strokeWidth="4.4" />
            <path d="M0 0 22 22M22 0 0 22" stroke="#C8102E" strokeWidth="1.6" />
            <path d="M11 0v22M0 11h22" stroke="#fff" strokeWidth="6" />
            <path d="M11 0v22M0 11h22" stroke="#C8102E" strokeWidth="3.4" />
          </>
        )}
        {lang === "it" && (
          <>
            <rect width="7.4" height="22" fill="#009246" />
            <rect x="7.3" width="7.4" height="22" fill="#fff" />
            <rect x="14.6" width="7.4" height="22" fill="#CE2B37" />
          </>
        )}
        {lang === "es" && (
          <>
            <rect width="22" height="22" fill="#AA151B" />
            <rect y="5.5" width="22" height="11" fill="#F1BF00" />
          </>
        )}
      </g>
    </svg>
  );
}
