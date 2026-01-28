"use client";

import { useEffect } from "react";

type Props = {
  vanity: string; // your LinkedIn username (vanity), e.g. "nadunadm"
  locale?: string; // "en_US"
  theme?: "light" | "dark";
  size?: "small" | "medium" | "large";
  type?: "HORIZONTAL" | "VERTICAL";
};

export default function LinkedInBadge({
  vanity,
  locale = "en_US",
  theme = "light",
  size = "large",
  type = "HORIZONTAL",
}: Props) {
  useEffect(() => {
    // Load LinkedIn badge script (needed for rendering)
    const existing = document.querySelector(
      'script[src="https://platform.linkedin.com/badges/js/profile.js"]'
    ) as HTMLScriptElement | null;

    if (!existing) {
      const s = document.createElement("script");
      s.src = "https://platform.linkedin.com/badges/js/profile.js";
      s.async = true;
      s.defer = true;
      document.body.appendChild(s);
    } else {
      // If script already exists, LinkedIn will usually render automatically
      // (Sometimes a refresh needs remount; this is typically enough.)
    }
  }, []);

  return (
    <div
      className="badge-base LI-profile-badge"
      data-locale={locale}
      data-size={size}
      data-theme={theme}
      data-type={type}
      data-vanity={vanity}
      data-version="v1"
    >
      <a
        className="badge-base__link LI-simple-link"
        href={`https://www.linkedin.com/in/${vanity}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View LinkedIn
      </a>
    </div>
  );
}
