<script lang="ts">
/**
 * @module routes/[[locale=locale]]/projects/+page
 * ...
 */

import { useIntlayer } from "svelte-intlayer";
import AuroraText from "$lib/components/AuroraText.svelte";
import MasonryGrid from "$lib/components/MasonryGrid.svelte";
import * as ProjectCard from "$lib/components/project-card";
import PinnedProjects from "$lib/components/PinnedProjects.svelte";
import { FolderOpen, Grid3x3Icon as Grid3X3 } from "@lucide/svelte";
import { getAllProjectsData } from "$lib/project-data";
import { t } from "$lib/i18n";
import { cn } from "$lib/utils";

const projects = useIntlayer("projects");
const layout = useIntlayer("layout");

let completedProjects = $derived(
  getAllProjectsData()
    .map((project) => ({ ...project, key: project.id })) // Inject 'key' here
    .sort((a, b) =>
      String(t($projects, `items.${a.id}.title`)).localeCompare(
        String(t($projects, `items.${b.id}.title`)),
      ),
    ),
);
</script>

  <svelte:head>
    <title>{t($projects, "title")} | {$layout.title}</title>
  </svelte:head>

  <div class={cn("flex flex-col gap-12 px-6 py-10 lg:px-8 mx-auto")}>
    <section class={cn("text-center space-y-4")}>
      <AuroraText
        class={cn("text-4xl md:text-5xl lg:text-6xl font-bold")}
        colors={["#C16069", "#A2BF8A", "#C16069", "#A2BF8A"]}
        speed={3}
      >
        {t($projects, "title")}
      </AuroraText>
      <p class={cn("text-muted-foreground text-lg flex items-center justify-center gap-2")}>
        <FolderOpen class={cn("w-6 h-6")} />
        {t($projects, "projectCount").replace(
          "{count}",
          completedProjects.length.toString(),
        )}
      </p>
    </section>

    <section>
      <PinnedProjects />
    </section>

    <section class={cn("space-y-6")}>
      <h2
        class={cn("text-3xl md:text-4xl font-bold text-center flex items-center justify-center gap-3")}
      >
        <Grid3X3 class={cn("w-7 h-7 text-primary")} />
        {t($projects, 'all')}:
      </h2>
      <MasonryGrid items={completedProjects}>
        {#snippet children(project)}
          <ProjectCard.Root
            projektImage={project.image}
            projektImageAlt={t($projects, `items.${project.id}.imgAlt`)}
            projektImageBgColor={project.bgColor}
            projektTitle={t($projects, `items.${project.id}.title`)}
            projektBadges={project.badges}
            projektLink={project.link}
          >
            {#snippet children()}
              {t($projects, `items.${project.id}.description`)}
            {/snippet}
          </ProjectCard.Root>
        {/snippet}
      </MasonryGrid>
    </section>
  </div>
