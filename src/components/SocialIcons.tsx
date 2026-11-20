import { siApplemusic, siFacebook, siInstagram, siSpotify, siTiktok, siX, siYoutube } from "simple-icons";
import { SOCIAL } from "@/lib/content";

const PATHS: Record<string, string | undefined> = {
  facebook: siFacebook.path,
  instagram: siInstagram.path,
  youtube: siYoutube.path,
  spotify: siSpotify.path,
  tiktok: siTiktok.path,
  x: siX.path,
  applemusic: siApplemusic.path,
};

/** Barra social del footer: icone bianche in cerchi neri, come su Wix. */
export function SocialIcons() {
  return (
    <ul className="social">
      {SOCIAL.map((s) => (
        <li key={s.icon}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="12" fill="#000" />
              {PATHS[s.icon] ? (
                <path d={PATHS[s.icon]} fill="#fff" transform="translate(5.5 5.5) scale(0.54)" />
              ) : (
                // Amazon: il marchio non è in simple-icons, si usa la "a" come nell'icona Wix
                <text x="12" y="16.6" textAnchor="middle" fontSize="15" fontWeight="700" fontFamily="Arial, sans-serif" fill="#fff">
                  a
                </text>
              )}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
