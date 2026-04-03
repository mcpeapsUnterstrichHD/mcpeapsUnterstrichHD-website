<script lang="ts">
/**
 * @component PinnedProjects
 *
 * Displays the portfolio's pinned (featured) projects in a responsive masonry
 * grid.
 * ...
 */
import { useIntlayer } from "svelte-intlayer";
import MasonryGrid from "$lib/components/MasonryGrid.svelte";
import * as ProjectCard from "$lib/components/project-card";
import { Pin } from "@lucide/svelte";
import { t } from "$lib/i18n";
import { getPinnedProjectsData } from "$lib/project-data";
import { cn } from "$lib/utils";

/** Intlayer dictionary for the "projects" content key, providing localized strings. */
const projectsInt = useIntlayer("projects");

/** Derived array of pinned project data objects, dynamically injecting the 'key' property required by MasonryGrid. */
let pinnedProjects = $derived(
  getPinnedProjectsData().map((project) => ({ ...project, key: project.id })),
);
</script>

  <div class={cn("w-full px-4")}>
    <h2
      class={cn("text-2xl md:text-3xl font-bold text-center flex items-center justify-center gap-2")}
    >
      <Pin class={cn("w-6 h-6 text-primary")} />
      {t($projectsInt, "pinned")}:
    </h2>
    <MasonryGrid variant="pinned_projects" items={pinnedProjects}>
      {#snippet children(project)}
        <ProjectCard.Root
          projektImage={project.image}
          projektImageAlt={t($projectsInt, `items.${project.id}.imgAlt`)}
          projektImageBgColor={project.bgColor}
          projektTitle={t($projectsInt, `items.${project.id}.title`)}
          projektBadges={project.badges}
          projektLink={project.link}
        >
          {#snippet children()}{t(
              $projectsInt,
              `items.${project.id}.description`,
            )}{/snippet}
        </ProjectCard.Root>
      {/snippet}
    </MasonryGrid>
  </div>
