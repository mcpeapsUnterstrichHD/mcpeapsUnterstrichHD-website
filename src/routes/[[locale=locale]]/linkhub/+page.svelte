<script lang="ts">
/**
 * @module routes/[[locale=locale]]/linkhub/+page
 * @description Link hub / "link in bio" page aggregating all social media profiles,
 * websites, and other external links.
 */

import { useIntlayer } from "svelte-intlayer";
import AuroraText from "$lib/components/AuroraText.svelte";
import ConsentIframe from "$lib/components/cookie/ConsentIframe.svelte";
import MasonryGrid from "$lib/components/MasonryGrid.svelte";
import * as LinkCard from "$lib/components/link-card";
import { Share2, Globe, MoreHorizontal } from "@lucide/svelte";
import { t } from "$lib/i18n";

const linkhub = useIntlayer("linkhub");
const aboutme = useIntlayer("aboutme");
const sites = useIntlayer("sites");
const layout = useIntlayer("layout");

// --- Daten-Arrays für das neue MasonryGrid ---
// Jedes Objekt benötigt ein 'key', da dein MasonryGrid dies erzwingt (generics="T extends { key: ... }")

const socialLinks = [
  {
    key: "instagram",
    url: "https://instagram.com/mcpeaps_hd",
    icon: "/pictures/linkhub/instagram-dark.svg",
  },
  {
    key: "tiktok",
    url: "https://www.tiktok.com/@mcpeaps_hd",
    icon: "/pictures/linkhub/tiktok.svg",
  },
  {
    key: "threads",
    url: "https://www.threads.net/@mcpeaps_hd",
    icon: "/pictures/linkhub/threads-dark.svg",
  },
  {
    key: "bsky",
    url: "https://bsky.mcpeapsunterstrichhd.dev",
    icon: "/pictures/linkhub/bsky.svg",
  },
  {
    key: "twitter",
    url: "https://x.com/mcpeaps_HD",
    icon: "/pictures/linkhub/twitter-dark.svg",
  },
  {
    key: "discord",
    url: "https://discord.gg/XHGTbb4mTF",
    icon: "/pictures/linkhub/discord.svg",
  },
  {
    key: "youtube",
    url: "https://youtube.com/@mcpeaps_HD",
    icon: "/pictures/linkhub/youtube.svg",
  },
];

const websiteLinks = [
  {
    key: "myWebsite",
    url: "https://mcpeapsunterstrichhd.dev",
    icon: "/pictures/logo.png",
  },
  {
    key: "cbps",
    url: "https://comboompunktsucht.app",
    icon: "/pictures/cbps_logo.png",
  },
  {
    key: "blogCBPS",
    url: "https://blog.comboompunktsucht.app",
    icon: "/pictures/cbps_logo.png",
  },
];

// Für die 'Other'-Sektion nutzen wir ein 'type'-Feld, um im Snippet das richtige Layout zu rendern
const otherLinks = [
  {
    key: "github",
    type: "link",
    url: "https://github.com/mcpeapsUnterstrichHD",
    icon: "/pictures/linkhub/github-dark.svg",
  },
  {
    key: "playlist",
    type: "playlist",
    url: "https://music.apple.com/de/playlist/favorite/pl.u-aZb0kXDFP7zBoV2",
    icon: "/pictures/linkhub/apple-musik.svg",
  },
  {
    key: "song",
    type: "song",
    url: "https://song.link/festival_dream&theme=dark",
    icon: "/pictures/linkhub/apple-musik.svg",
  },
];
</script>

  <svelte:head>
    <title>{t($sites, "linkhub")} | {t($layout, "title")}</title>
  </svelte:head>

  <div class="flex flex-col gap-12 px-6 py-10 lg:px-8 mx-auto">
    <section class="text-center space-y-4">
      <AuroraText class="text-4xl md:text-5xl lg:text-6xl font-bold" colors={['#C16069', '#A2BF8A', '#C16069', '#A2BF8A']} speed={3}>
        {t($aboutme, "name")}
      </AuroraText>
      <p class="text-muted-foreground text-lg">
        {t($linkhub, "description")}
      </p>
    </section>

    <section class="space-y-6">
      <h2 class="text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3">
        <Share2 class="w-7 h-7 text-primary" />
        {t($linkhub, "socialMedia.title")}
      </h2>
      <MasonryGrid variant="links" items={socialLinks}>
        {#snippet children(link)}
          <div class="break-inside-avoid mb-4">
            <LinkCard.Root
              title={t($linkhub, `sections.socialMedia.${link.key}.title`)}
              description={t($linkhub, `sections.socialMedia.${link.key}.description`)}
              heading={t($linkhub, `sections.socialMedia.${link.key}.headding`)}
              url={link.url}
              icon={link.icon}
            />
          </div>
        {/snippet}
      </MasonryGrid>
    </section>

    <section class="space-y-6">
      <h2 class="text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3">
        <Globe class="w-7 h-7 text-primary" />
        {t($linkhub, "sections.websites.title")}
      </h2>
      <MasonryGrid variant="links" items={websiteLinks}>
        {#snippet children(link)}
          <div class="break-inside-avoid mb-4">
            <LinkCard.Root
              title={t($linkhub, `sections.websites.${link.key}.title`)}
              description={t($linkhub, `sections.websites.${link.key}.description`)}
              heading={t($linkhub, `sections.websites.${link.key}.headding`)}
              url={link.url}
              icon={link.icon}
            />
          </div>
        {/snippet}
      </MasonryGrid>
    </section>

    <section class="space-y-6">
      <h2 class="text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3">
        <MoreHorizontal class="w-7 h-7 text-primary" />
        {t($linkhub, "sections.other.title")}
      </h2>
      <MasonryGrid variant="links" items={otherLinks}>
        {#snippet children(link)}
          <div class="break-inside-avoid mb-4">
            {#if link.type === "link"}
              <LinkCard.Root
                title={t($linkhub, `sections.other.${link.key}.title`)}
                description={t($linkhub, `sections.other.${link.key}.description`)}
                heading={t($linkhub, `sections.other.${link.key}.headding`)}
                url={link.url}
                icon={link.icon}
              />

            {:else if link.type === "playlist"}
              <LinkCard.Big
                title={t($linkhub, `sections.other.${link.key}.title`)}
                heading={t($linkhub, `sections.other.${link.key}.headding`)}
                description={t($linkhub, `sections.other.${link.key}.description`)}
                url={link.url}
                icon={link.icon}
              >
                <ConsentIframe
                  category="multimedia"
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  class="w-full rounded-lg"
                  height="450"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src="https://embed.music.apple.com/de/playlist/favorite/pl.u-aZb0kXDFP7zBoV2"
                  title={t($linkhub, "sections.other.playlist.description") as unknown as string}
                />
              </LinkCard.Big>

            {:else if link.type === "song"}
              <LinkCard.Big
                title={t($linkhub, `sections.other.${link.key}.title`)}
                heading={t($linkhub, `sections.other.${link.key}.headding`)}
                description={t($linkhub, `sections.other.${link.key}.description`)}
                url={link.url}
                icon={link.icon}
              >
                <ConsentIframe
                  category="multimedia"
                  class="w-full rounded-lg"
                  height="450"
                  src="https://odesli.co/embed/?url=https%3A%2F%2Fsong.link%2Ffestival_dream&theme=dark"
                  allowFullScreen
                  sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
                  allow="clipboard-read; clipboard-write"
                  title={t($linkhub, "sections.other.song.description") as unknown as string}
                />
              </LinkCard.Big>
            {/if}
          </div>
        {/snippet}
      </MasonryGrid>
    </section>
  </div>
