<script lang="ts">
/**
 * @component LinkCard
 * ...
 */
import * as Card from "$lib/components/ui/card";
import { cn } from "$lib/utils";
import { createWebHaptics } from "web-haptics/svelte";
import { onDestroy, type Snippet } from "svelte";
import LocalizedLink from "../LocalizedLink.svelte";

const { trigger, destroy } = createWebHaptics();
onDestroy(destroy);

interface Props {
  title: string;
  description: string;
  heading: string;
  url?: string;
  icon: string;
}

let { title, description, heading, url, icon, children }: Props = $props();

const hapticsConfig = [
  { duration: 60, intensity: 1 },
  { delay: 30, duration: 60, intensity: 0.75 },
  { delay: 30, duration: 60 },
  { delay: 30, duration: 60, intensity: 0.75 },
  { delay: 30, duration: 60, intensity: 1 },
];
</script>

  {#snippet cardContent()}
    <Card.Root class={cn("my-glass")}>
      <Card.Header>
        <div class={cn("flex items-center gap-3")}>
          <img src={icon} alt={title} class={cn("w-8 h-8 rounded")} />
          <div>
            <Card.Title class={cn("text-base")}>{title}</Card.Title>
            <p class={cn("text-sm text-muted-foreground")}>{heading}</p>
          </div>
        </div>
        <Card.Description>{description}</Card.Description>
      </Card.Header>
    </Card.Root>
  {/snippet}

  {#if url}
    <LocalizedLink
      href={url}
      onclick={() => trigger(hapticsConfig)}
      onpointerenter={() => trigger(hapticsConfig)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {@render cardContent()}
    </LocalizedLink>
  {:else}
    {@render cardContent()}
  {/if}
