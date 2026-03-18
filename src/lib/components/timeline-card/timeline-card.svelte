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

const { locale } = useLocale();

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
</script>

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
    <Badge variant="default">{startTime.toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" })} - {endTime.toLocaleDateString([$locale], { year: "numeric", month: "2-digit", day: "2-digit" })}</Badge>
    </div>
    <Card.Description>
      <span class={cn("flex flex-wrap gap-2")}>
        {#if badges && badges.length > 0}
        {#each badges.filter(b => b && b.trim() !== "").sort((a: string, b: string) => a.localeCompare(b)) as badge}
            <Badge variant="default">{badge}</Badge>
          {/each}
        {/if}
      </span>
    </Card.Description>
  </Card.Header>
  <Card.Content>
    {#if children}
      {@render children()}
    {/if}
  </Card.Content>
</Card.Root>
