<script lang="ts">
import { onMount } from "svelte";
import { useIntlayer } from "svelte-intlayer";
import { Search } from "@lucide/svelte";
import { Button } from "$lib/components/ui/button";
import { Kbd, KbdGroup } from "$lib/components/ui/kbd";
import { toggleCommandMenu } from "$lib/components/command-menu/command-menu-state.svelte";
import { cn } from "$lib/utils";
import { createWebHaptics } from "web-haptics/svelte";
import { onDestroy } from "svelte";
import { t } from "$lib/i18n";
const { trigger, destroy } = createWebHaptics();
onDestroy(destroy);

let isMac = $state(false);
interface Props {
  sidebar?: boolean;
}

let { sidebar }: Props = $props();

onMount(() => {
  isMac = /Mac|iPhone|iPad|iPod/.test(navigator.userAgent);
});

const commandMenu = useIntlayer("commandMenu");
</script>

<Button
  variant="outline"
  class={cn("flex items-center gap-2 text-muted-foreground", sidebar ? "w-full": "w-80")}
  onclick={() => {
    // ... dein haptic trigger
    toggleCommandMenu();
  }}
>
  <Search class={cn("h-4 w-4 shrink-0")} />

  <span class={cn("hidden sm:inline flex-1 text-left")}>
    {t($commandMenu, "commandPalette")}
  </span>

  <KbdGroup class={cn("ml-auto")}>
    <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
    <Kbd>J</Kbd>
  </KbdGroup>
</Button>
