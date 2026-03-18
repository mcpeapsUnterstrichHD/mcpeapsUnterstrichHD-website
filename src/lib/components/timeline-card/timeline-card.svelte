<script lang="ts">
/**
 * @component TimelineCard
 *
 * A card representing a single entry in a timeline (e.g. work experience,
 * education). Displays an avatar icon, title, date/period badges, and an
 * optional description body rendered through an optional `children` Svelte
 * snippet.
 *
 * Layout uses shadcn-svelte `Card` with `my-glass` frosted-glass backdrop.
 * The header arranges the avatar and title side-by-side with badges below.
 *
 * Timeline entry card using Liquid Glass material. Pattern inspired by iOS
 * grouped List sections with date-aligned timeline markers. Renders inline on
 * macOS-class viewports, stacked vertically on iOS-class.
 *
 * @see {@link TimelineCardSkeleton} -- Loading placeholder counterpart
 */
import * as Card from "$lib/components/ui/card";
import * as Avatar from "$lib/components/ui/avatar";
import { Badge } from "$lib/components/ui/badge";
import { cn } from "$lib/utils";
import { useLocale } from "svelte-intlayer";
import { IsMobile } from "$lib/hooks/is-mobile.svelte";
import { IsTablet } from "$lib/hooks/is-tablet.svelte";
import { onMount } from "svelte";

const { locale } = useLocale();

const isMobile = new IsMobile();
const isTablet = new IsTablet();

/**
 * Props for the TimelineCard component.
 *
 * @property {string} image - URL or path to the timeline entry's avatar/icon.
 * @property {string} imageAlt - Accessible alt text for the avatar image.
 * @property {string} imageFallback - Short fallback text shown while the image loads or if it fails.
 * @property {string} title - Display title of the timeline entry (e.g. job title, degree).
 * @property {string[]} badges - Array of labels rendered as Badge components (e.g. date range, location).
 * @property {import('svelte').Snippet} [children] - Optional Svelte snippet for extended description content.
 */
interface Props {
  image: string;
  imageAlt: string;
  imageFallback: string;
  title: string;
  badges: string[];
  startTime: Date;
  endTime: Date;
  children?: import("svelte").Snippet;
}

let {
  image,
  imageAlt,
  imageFallback,
  title,
  badges,
  startTime,
  endTime,
  children,
}: Props = $props();

const dateString = $derived.by(() => {
  // 1. If both are missing, return empty
  if (!startTime && !endTime) return "";

  // 2. Format start time safely
  const startStr = startTime
    ? startTime.toLocaleDateString([$locale], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  // 3. Format end time safely (fallback to "Present" or empty if missing)
  const endStr = endTime
    ? endTime.toLocaleDateString([$locale], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : ""; // or whatever text you want for ongoing jobs

  // 4. Return combined string
  return `${startStr} - ${endStr}`;
});

let isPrinting = $state(false);

let lbadges = $derived.by(() => {
  // If it is mobile/tablet AND the print dialog is NOT open, add the date string
  if ((isMobile.current || isTablet.current) && !isPrinting) {
    return [...badges, dateString]
      .filter((b) => b && typeof b === "string" && b.trim() !== "")
      .sort((a, b) => a.localeCompare(b));
  }
  // Otherwise, just return standard badges
  return badges
    .filter((b) => b && typeof b === "string" && b.trim() !== "")
    .sort((a, b) => a.localeCompare(b));
});

onMount(() => {
  // 2. Define the event handlers
  const onBeforePrint = () => (isPrinting = true);
  const onAfterPrint = () => (isPrinting = false);

  // 3. Listen for the browser's print dialog opening and closing
  window.addEventListener("beforeprint", onBeforePrint);
  window.addEventListener("afterprint", onAfterPrint);

  return () => {
    window.removeEventListener("beforeprint", onBeforePrint);
    window.removeEventListener("afterprint", onAfterPrint);
  };
});
</script>

<div class={cn("relative")}>
  <div class={cn("absolute -left-7.5 top-5 w-2.75 h-2.75 rounded-full bg-transparent border-2 border-muted-foreground z-10 shadow-sm")}></div>
  <Card.Root class={cn("my-glass")}>
    <Card.Header>
    <div class={cn("flex flex-row items-center justify-between gap-1")}>
      <div class={cn("flex flex-row items-center gap-3")}>
        <Avatar.Root>
          <Avatar.Image src={image} alt={imageAlt} />
          <Avatar.Fallback>{imageFallback}</Avatar.Fallback>
        </Avatar.Root>
        <Card.Title>{title}</Card.Title>
      </div>
      {#if !isMobile.current && !isTablet.current && dateString && dateString.trim() !== ""}
        <Badge variant="default">{dateString}</Badge>
      {/if}
      </div>
      <Card.Description>
        {#if lbadges  && lbadges.length > 0}
          <span class={cn("flex flex-wrap gap-2")}>
            {#each lbadges as badge}
              <Badge variant="default">{badge}</Badge>
              {/each}
            </span>
          {/if}
      </Card.Description>
    </Card.Header>
    <Card.Content>
      {#if children}
        {@render children()}
      {/if}
    </Card.Content>
  </Card.Root>
</div>
