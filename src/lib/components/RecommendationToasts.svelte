<script lang="ts">
/**
 * @component RecommendationToasts
 *
 * A headless component (renders no DOM) that periodically shows toast
 * notifications recommending pages and social media links to the visitor.
 * The first toast appears immediately on mount, then subsequent toasts
 * rotate every 10 minutes through the full list of recommendations.
 *
 * Recommendations include internal pages (projects, about me, CV, link hub)
 * and external social links (GitHub, Twitter/X, Instagram, TikTok, Threads,
 * Bluesky). Internal links use SvelteKit's `goto()` for client-side
 * navigation; external links open in a new tab via `window.open()`.
 *
 * All recommendation titles and descriptions are localized via `svelte-intlayer`.
 * Internal hrefs are localized using `intlayer`'s `getLocalizedUrl`.
 *
 * This component has no external props and no visible template -- it is a
 * side-effect-only component that should be mounted once in the root layout.
 */
import { onMount } from "svelte";
import { toast } from "svelte-sonner";
import { goto } from "$app/navigation";
import { useIntlayer, useLocale } from "svelte-intlayer";
import { getLocalizedUrl, t } from "$lib/i18n";
import { createWebHaptics } from "web-haptics/svelte";
import { onDestroy } from "svelte";
const { trigger, destroy } = createWebHaptics();
onDestroy(destroy);

/** The current locale from svelte-intlayer, used to localize internal recommendation links. */
const { locale } = useLocale();
/** Intlayer dictionary for the "recommendation" content key, providing localized titles and descriptions. */
const recommendation = useIntlayer("recommendation");

/** Tracks which recommendation to show next, cycling through the array with modular arithmetic. */
let currentIndex = 0;

/**
 * Derived array of recommendation objects, re-evaluated when locale changes.
 * Each entry has a localized `title`, `description`, and either an internal
 * `href` (localized path) or an `external` URL (absolute social media link).
 */
let recommendations = $derived([
  {
    title: t($recommendation, "projects.title"),
    description: t($recommendation, "projects.description"),
    href: getLocalizedUrl("/projects", $locale),
  },
  {
    title: t($recommendation, "aboutme.title"),
    description: t($recommendation, "aboutme.description"),
    href: getLocalizedUrl("/aboutme", $locale),
  },
  {
    title: t($recommendation, "cv.title"),
    description: t($recommendation, "cv.description"),
    href: getLocalizedUrl("/cv", $locale),
  },
  {
    title: t($recommendation, "linkhub.title"),
    description: t($recommendation, "linkhub.description"),
    href: getLocalizedUrl("/linkhub", $locale),
  },
  {
    title: t($recommendation, "github.title"),
    description: t($recommendation, "github.description"),
    external: "https://github.com/mcpeapsUnterstrichHD",
  },
  {
    title: t($recommendation, "twitter.title"),
    description: t($recommendation, "twitter.description"),
    external: "https://x.com/mcpeaps_HD",
  },
  {
    title: t($recommendation, "instagram.title"),
    description: t($recommendation, "instagram.description"),
    external: "https://instagram.com/mcpeaps_hd",
  },
  {
    title: t($recommendation, "tiktok.title"),
    description: t($recommendation, "tiktok.description"),
    external: "https://tiktok.com/@mcpeaps_hd",
  },
  {
    title: t($recommendation, "threads.title"),
    description: t($recommendation, "threads.description"),
    external: "https://threads.com/@mcpeaps_hd",
  },
  {
    title: t($recommendation, "bluesky.title"),
    description: t($recommendation, "bluesky.description"),
    external: "https://bsky.mcpeapsunterstrichhd.dev",
  },
]);

/**
 * On mount, shows the first recommendation toast immediately, then sets up
 * a 10-minute interval to rotate through subsequent recommendations.
 * Each toast displays a title, description, and an action button that either
 * navigates to an internal page or opens an external link.
 * Cleanup clears the interval on component destroy.
 */
onMount(() => {
  function showRecommendation() {
    const rec = recommendations[currentIndex];
    toast(rec.title, {
      description: rec.description,
      action: {
        label: rec.external ? "↗" : "→",
        onClick: () => {
          if (rec.external) {
            window.open(rec.external, "_blank");
          } else if (rec.href) {
            goto(rec.href);
          }
        },
      },
    });
    currentIndex = (currentIndex + 1) % recommendations.length;
  }

  // Show first recommendation immediately
  showRecommendation();

  // Rotate every 10 minutes
  const intervalId = setInterval(showRecommendation, 10 * 60 * 1000);

  return () => clearInterval(intervalId);
});
</script>
