<script lang="ts">
/**
 * @module routes/[[locale=locale]]/cv/+page
 * @description Visually styled Curriculum Vitae (CV) page with a rich, print-friendly layout.
 * Displays the portfolio owner's professional profile in four major sections:
 *
 * 1. **Personal Info Card** - Name, title, contact details (email, phone, birthday),
 *    and physical address, rendered in a glassmorphism card with print-safe styling
 * 2. **Education Section** - Timeline of education history with responsive layouts:
 *    a full horizontal timeline on `sm+` screens and a vertical border-left timeline
 *    on mobile. Each entry shows institution, date range badges, and description.
 * 3. **Experience Section** - Work experience in the same dual-timeline layout as education,
 *    with badge-based skills and descriptive text for each position
 * 4. **Skills Section** - Technical and soft skills grouped by category, displayed as
 *    `SkillCard` components within a `MasonryGrid`. Each skill shows proficiency level,
 *    experience duration badges, and an icon/image.
 *
 * Data sources:
 * - `$lib/cv-data` provides `educationItems`, `experienceItems`, `skillItems`,
 *   `skillCategories`, and the `sortByEndDate()` utility
 * - `$lib/contact` provides structured `contactDetails`
 * - Intlayer dictionaries `cv`, `aboutme`, `sites`, `layout` for i18n
 *
 * The page includes print-specific CSS classes (e.g. `print:bg-white`, `print:text-black`)
 * for clean PDF output via the browser print dialog.
 *
 * Styled CV with dual timeline rendering: horizontal layout on macOS-class
 * viewports (sm+), vertical timeline on iOS-class for better mobile readability.
 *
 * @see {@link $lib/cv-data} for CV data structures and helpers
 * @see {@link $lib/contact} for contact detail constants
 * @see {@link $lib/components/timeline-card} for timeline entry cards
 * @see {@link $lib/components/skill-card} for skill display cards
 * @see {@link routes/[[locale=locale]]/cv/+layout.svelte} for shared CV layout with print/toggle buttons
 */

import { useIntlayer, useLocale } from "svelte-intlayer";
import * as Card from "$lib/components/ui/card";
import MasonryGrid from "$lib/components/MasonryGrid.svelte";
import * as TimelineCard from "$lib/components/timeline-card";
import * as SkillCard from "$lib/components/skill-card";
import { contactDetails } from "$lib/contact";
import {
  educationItems,
  experienceItems,
  skillItems,
  skillCategories,
  sortByEndDate,
  type SkillItem,
  getDurationKeyLabel,
} from "$lib/cv-data";
import {
  GraduationCap,
  Briefcase,
  Wrench,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "@lucide/svelte";
import { t, tArr } from "$lib/i18n";
import { cn } from "$lib/utils";
import LocalizedLink from "$lib/components/LocalizedLink.svelte";

const cv = useIntlayer("cv");
const aboutme = useIntlayer("aboutme");
const sites = useIntlayer("sites");
const layout = useIntlayer("layout");
const { locale } = useLocale();

/** @constant {Array} sortedEducation - Education items sorted by end date (most recent first) */
const sortedEducation = sortByEndDate(educationItems);
/** @constant {Array} sortedExperience - Experience items sorted by end date (most recent first) */
const sortedExperience = sortByEndDate(experienceItems);

/**
 * Filters and sorts skills belonging to a specific category by proficiency level (descending).
 *
 * @param {string} cat - The category key to filter skills by (e.g. 'languages', 'frameworks')
 * @returns {SkillItem[]} Array of skills in the given category, sorted highest level first
 */
function getSkillsByCategory(cat: string): SkillItem[] {
  return skillItems
    .filter((s) => s.category === cat)
    .sort((a, b) => b.level - a.level);
}

/**
 * Dynamically calculates the portfolio owner's current age based on
 * the birth date of June 6, 2003. Used in the personal info card header.
 */
// Calculate age
const today = new Date();
const birthday = new Date("2003-06-06");
let age = today.getFullYear() - birthday.getFullYear();
const mo = today.getMonth() - birthday.getMonth();
if (mo < 0 || (mo === 0 && today.getDate() < birthday.getDate())) age--;
</script>

<svelte:head>
  <title>{$sites.cv} | {$layout.title}</title>
</svelte:head>

<div class={cn("flex flex-col gap-12 px-6 py-10 lg:px-8 mx-auto")}>
  <!-- Personal Info Card -->
  <Card.Root class={cn("my-glass print:bg-white print:shadow-none")}>
    <Card.Header class={cn("text-center pb-2")}>
      <h1 class={cn("text-4xl md:text-5xl font-bold")}>{t($aboutme, "name")}</h1>
      <p class={cn("text-xl text-muted-foreground")}>{t($cv, "about.title")}</p>
    </Card.Header>
    <Card.Content>
      <div
        class={cn("grid grid-cols-1 md:grid-cols-2 gap-6 text-base")}
      >
        <!-- Contact Info -->
        <div class={cn("flex flex-col gap-2")}>
          <LocalizedLink
            href={contactDetails.email.link}
            class={cn("flex items-center gap-2 hover:text-primary transition-colors")}
          >
            <Mail class={cn("w-4 h-4")} />
            {contactDetails.email.display}
          </LocalizedLink>
          <LocalizedLink
            href={contactDetails.telephone.link}
            class={cn("flex items-center gap-2 hover:text-primary transition-colors")}
          >
            <Phone class={cn("w-4 h-4")} />
            {contactDetails.telephone.display}
          </LocalizedLink>
          <div class={cn("flex items-center gap-2 text-muted-foreground")}>
            <Calendar class={cn("w-4 h-4")} />
            {t($cv, "about.birthday")}: {new Date("2003-06-06").toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" })}
          </div>
        </div>
        <!-- Address -->
        <div class={cn("flex flex-col gap-2")}>
          <LocalizedLink
            href={contactDetails.address.link}
            target="_blank"
            rel="noreferrer"
            class={cn("flex items-start gap-2 hover:text-primary transition-colors")}
          >
            <MapPin class={cn("w-4 h-4 mt-0.5 shrink-0")} />
            <div>
              {contactDetails.address.street}<br />
              {contactDetails.address.zip}
              {t($cv, "about.address.berlin")}, {t($cv, "about.address.germany")}
            </div>
          </LocalizedLink>
        </div>
      </div>
    </Card.Content>
  </Card.Root>

  <!-- Education Section -->
  <section class={cn("space-y-6")}>
    <h2
      class={cn("text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3 mb-6")}
    >
      <GraduationCap class={cn("w-7 h-7 text-primary print:text-black")} />
      {t($cv, "education.title")}
    </h2>

    <div
      class={cn("block relative ml-3 border-l-2 border-border/50 pl-6 space-y-8 pb-4")}
    >
      {#each sortedEducation as item}
          <TimelineCard.Root
            image={item.image || ""}
            imageAlt={t($cv, item.imgAltKey)}
            imageFallback={item.imageFallback}
            title={t($cv, item.nameKey)}
            startTime={item.startdate || new Date(0)}
            endTime={item.enddate || new Date(0)}
            badges={[
              ...(item.badgesKeys && item.badgesKeys.length > 0
  ? item.badgesKeys.map(k => t($cv, k)) : []),
              getDurationKeyLabel($cv, item.badgeDurationKey),
            ]}
          >
            <p class={cn("text-sm text-muted-foreground")}>
              {t($cv, item.descriptionKey)}
            </p>
          </TimelineCard.Root>
      {/each}
    </div>
  </section>

  <!-- Experience Section -->
  <section class={cn("space-y-6")}>
    <h2
      class={cn("text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3 mb-6")}
    >
      <Briefcase class={cn("w-7 h-7 text-primary print:text-black")} />
      {t($cv, "experience.title")}
    </h2>


    <div
      class={cn("block relative ml-3 border-l-2 border-border/50 pl-6 space-y-8 pb-4")}
    >
      {#each sortedExperience as item}
          <TimelineCard.Root
            image={item.image || ""}
            imageAlt={t($cv, item.imgAltKey)}
            imageFallback={item.imageFallback}
            title={t($cv, item.nameKey)}
            startTime={item.startdate || new Date(0)}
            endTime={item.enddate || new Date(0)}
            badges={[
              ...(item.badgesKeys !== "" ? tArr($cv, item.badgesKeys) : []),
              getDurationKeyLabel($cv, item.badgeDurationKey),
            ]}
          >
            <p class={cn("text-sm text-muted-foreground whitespace-pre-line")}>
              {t($cv, item.descriptionKey)}
            </p>
          </TimelineCard.Root>
      {/each}
    </div>
  </section>

  <!-- Skills Section -->
  <section class={cn("space-y-6")}>
    <h2
      class={cn("text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3 mb-6")}
    >
      <Wrench class={cn("w-7 h-7 text-primary print:text-black")} />
      {$cv.skills.title}
    </h2>

    <div class={cn("flex flex-col gap-10")}>
      {#each skillCategories as category}
        {@const skills = getSkillsByCategory(category.key)}
        {#if skills.length > 0}
          <div class={cn("break-inside-avoid")}>
            <h3 class={cn("text-2xl font-semibold mb-6 ml-1 opacity-80")}>
              {t($cv, category.titleKey)}
            </h3>
            <MasonryGrid variant="skills">
              {#each skills as skill}
                <SkillCard.Root
                  image={skill.darkImage || skill.image || ""}
                  imagePrint={skill.darkImage ? skill.image : undefined}
                  imageAlt={t($cv, skill.imageAlt)}
                  imageFallback={skill.imageFallback}
                  title={skill.title}
                  level={skill.level}
                  badges={[
                    ...skill.badgeKeys.map((k) => t($cv, k)),
                    ...(skill.experience ? [getDurationKeyLabel($cv, skill.experience)] : []),
                    ...(skill.staticBadges || []),
                  ]}
                  category={skill.category}
                />
              {/each}
            </MasonryGrid>
          </div>
        {/if}
      {/each}
    </div>
  </section>
</div>
