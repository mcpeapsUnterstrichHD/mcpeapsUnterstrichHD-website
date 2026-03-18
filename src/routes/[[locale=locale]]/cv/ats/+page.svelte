<script lang="ts">
/**
 * @module routes/[[locale=locale]]/cv/ats/+page
 * @description ATS (Applicant Tracking System) optimized version of the CV page.
 * Renders the curriculum vitae in a plain-text, machine-readable format designed
 * to maximize compatibility with automated resume parsing systems.
 *
 * Unlike the styled CV page (`/cv`), this version:
 * - Uses simple semantic HTML without complex layouts or images
 * - Avoids masonry grids, skill level bars, and timeline cards
 * - Formats dates as `MM/YYYY` via the `formatDate()` helper
 * - Lists skills inline as comma-separated text grouped by category
 * - Strips bullet point characters and normalizes whitespace in descriptions
 * - Uses scoped CSS with plain fonts, borders, and minimal styling
 *
 * The page is structured as:
 * 1. **Header** - Name, title, and contact info (email, phone, address, birthday)
 * 2. **Education** - Entries with title, date range, and description
 * 3. **Experience** - Entries with title, date range, and description
 * 4. **Skills** - Categories with inline comma-separated skill names and details
 *
 * Data sources are shared with the styled CV page via `$lib/cv-data` and `$lib/contact`.
 * Includes scoped CSS providing ATS-friendly typography and layout.
 *
 * @see {@link routes/[[locale=locale]]/cv/+page.svelte} for the visually styled CV
 * @see {@link routes/[[locale=locale]]/cv/+layout.svelte} for the shared CV layout
 * @see {@link $lib/cv-data} for CV data structures
 * @see {@link $lib/contact} for contact details
 */

import { useIntlayer, useLocale } from "svelte-intlayer";
import { contactDetails } from "$lib/contact";
import {
  educationItems,
  experienceItems,
  skillItems,
  skillCategories,
  sortByEndDate,
  getDurationKeyLabel,
} from "$lib/cv-data";
import { t, tArr } from "$lib/i18n";
import { cn } from "$lib/utils";

const { locale } = useLocale();

const cv = useIntlayer("cv");
const aboutme = useIntlayer("aboutme");
const sites = useIntlayer("sites");
const layout = useIntlayer("layout");
const contact = useIntlayer("contact");

/** @constant {Array} sortedEducation - Education entries sorted by end date (most recent first) */
const sortedEducation = sortByEndDate(educationItems);
/** @constant {Array} sortedExperience - Experience entries sorted by end date (most recent first) */
const sortedExperience = sortByEndDate(experienceItems);
</script>

<svelte:head>
  <title>{t($sites, "cv")} | {t($layout, "title")}</title>
</svelte:head>

<div class={cn("ats-cv")}>
  <div>
    <div class={cn("text-center pb-2")}>
      <h1 class={cn("text-4xl md:text-5xl font-bold")}>{t($aboutme, "name")}</h1>
      <p class={cn("text-xl text-muted-foreground")}>{t($cv, "about.title")}</p>
    </div>
    <div>
      <div
        class={cn("justify-center grid grid-cols-1 md:grid-cols-2 gap-6 text-base")}
      >
        <!-- Contact Info -->
        <div class={cn("flex flex-col gap-2")}>
          <p class={cn("flex items-center gap-2 hover:text-primary transition-colors")}>
            Email: {contactDetails.email.display}
          </p>
          <p class={cn("flex items-center gap-2 hover:text-primary transition-colors")}>
            {t($contact, "mobilephone")}: {contactDetails.telephone.display}
          </p>
          <div class={cn("flex items-center gap-2 text-muted-foreground")}>
            {t($cv, "about.birthday")}: {new Date("2003-06-06").toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" })}
          </div>
        </div>
        <!-- Address -->
        <div class={cn("flex flex-col gap-2")}>
          <p class={cn("flex items-start gap-2 hover:text-primary transition-colors")}>
            {t($contact, "address")}:
            <span>
              {contactDetails.address.street}<br />
              {contactDetails.address.zip}
              {t($cv, "about.address.berlin")}, {t($cv, "about.address.germany")}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>

  <!-- Education -->
  <h2>{t($cv, "education.title")}</h2>
  {#each sortedEducation as edu}
    {@const dateRange = `${edu.startdate ? edu.startdate.toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" }) : ""} – ${edu.enddate ? edu.enddate.toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" }) : ""}`}
    {@const description = t($cv, edu.descriptionKey).replace(/[•]/g, "-")}

    {@const badges = edu.badgesKeys && edu.badgesKeys.length > 0
      ? [...edu.badgesKeys.map(k => t($cv, k)), getDurationKeyLabel($cv, edu.badgeDurationKey)].filter(b => b && b.trim() !== "").sort((a, b) => a.localeCompare(b)).join(", ")
      : ""}


    <div class={cn("entry")}>
      <div class={cn("entry-header")}>
        <span class={cn("entry-title")}>{t($cv, edu.nameKey)}</span>
        <span class={cn("entry-date")}>{dateRange}</span>
      </div>
      {#if badges}
        <p class={cn("entry-badges")}><strong>Keywords:</strong> {badges}</p>
      {/if}
      <p class={cn("entry-description")}>{description}</p>
    </div>
  {/each}

  <!-- Experience -->
  <h2>{t($cv, "experience.title")}</h2>
  {#each sortedExperience as exp}
    {@const dateRange = `${exp.startdate ? exp.startdate.toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" }) : ""} – ${exp.enddate ? exp.enddate.toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" }) : ""}`}
    {@const description = t($cv, exp.descriptionKey)
      .replace(/[•]/g, "")
      .replace(/\n/g, " ")
      .trim()}

    {@const badges = exp.badgesKeys ? [...tArr($cv, exp.badgesKeys), getDurationKeyLabel($cv, exp.badgeDurationKey)].filter(b => b && b.trim() !== "").sort((a, b) => a.localeCompare(b)).join(", ")
    : ""}

    <div class={cn("entry")}>
      <div class={cn("entry-header")}>
        <span class={cn("entry-title")}>{t($cv, exp.nameKey)}</span>
        <span class={cn("entry-date")}>{dateRange}</span>
      </div>
      {#if badges}
        <p class={cn("entry-badges")}><strong>Keywords:</strong> {badges}</p>
      {/if}
      <p class={cn("entry-description")}>{description}</p>
    </div>
  {/each}

  <!-- Skills -->
  <h2>{t($cv, "skills.title")}</h2>
  {#each skillCategories as cat}
    {@const catSkills = skillItems
      .filter((s) => s.category === cat.key)
      .map((s) => {
        const detailsParts: string[] = [];
        if (s.experience) {
          detailsParts.push(getDurationKeyLabel($cv, s.experience)
          );
        }
        if (s.badgeKeys && s.badgeKeys.length > 0) {
          detailsParts.push(
            ...s.badgeKeys
              .filter((k) => k !== "Cv.skills.badges.language")
              .map((k) => t($cv, k)),
          );
        }
        if (s.staticBadges && s.staticBadges.length > 0) {
          detailsParts.push(...s.staticBadges);
        }
        const details =
          detailsParts.length > 0 ? ` (${detailsParts.join(", ")})` : "";
        return `${s.title}${details}`;
      }).filter(s => s && s.trim() !== "").sort((a, b) => a.localeCompare(b))
      .join(", ")}
    {#if catSkills}
      <div class={cn("skills-category")}>
        <span class={cn("skills-title")}>{t($cv, cat.titleKey)}: </span>
        <span class={cn("skills-list")}>{catSkills}</span>
      </div>
    {/if}
  {/each}
</div>

<style>
  .ats-cv h1 {
    font-size: 18pt;
    margin: 0 0 4px 0;
    text-align: center;
  }
  .ats-cv .subtitle {
    font-size: 12pt;
    text-align: center;
    margin-bottom: 12px;
  }
  .ats-cv .contact-info {
    text-align: center;
    margin-bottom: 16px;
    font-size: 10pt;
  }
  .ats-cv .contact-info span {
    margin: 0 8px;
  }
  .ats-cv h2 {
    font-size: 12pt;
    border-bottom: 1px solid var(--color-border);
    padding-bottom: 4px;
    margin: 16px 0 8px 0;
    text-transform: uppercase;
  }
  .ats-cv .entry {
    margin-bottom: 12px;
  }
  .ats-cv .entry-header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 2px;
  }
  .ats-cv .entry-title {
    font-weight: bold;
  }
  .ats-cv .entry-date {
    font-weight: normal;
    white-space: nowrap;
  }
  .ats-cv .entry-description {
    margin: 0;
  }
  .ats-cv .skills-category {
    margin-bottom: 8px;
  }
  .ats-cv .skills-title {
    font-weight: bold;
    display: inline;
  }
  .ats-cv .skills-list {
    display: inline;
  }
  .ats-cv .entry-badges {
    margin: 4px 0 0 0;
    font-size: 0.9em;
    color: var(--color-muted-foreground); /* Optional, falls du es leicht gräulich haben willst */
  }
</style>
