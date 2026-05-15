<script lang="ts">
  import { projects } from '$lib/data/projects';
  import type { ProjectTag } from '$lib/types/project';
  import { scrollReveal } from '$lib/actions/scrollReveal';
  import { sectionObserver } from '$lib/actions/sectionObserver';
  import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
  import ProjectCard from '$lib/components/shared/ProjectCard.svelte';

  export let id = 'projects';

  type ProjectFilter = 'All' | ProjectTag;

  const filterOrder: ProjectTag[] = ['Full-Stack', 'Frontend', 'Design', 'Tooling', 'Fintech'];
  const usedTags = new Set<ProjectTag>();

  for (const project of projects) {
    for (const tag of project.tags) {
      usedTags.add(tag);
    }
  }

  const filters: ProjectFilter[] = ['All', ...filterOrder.filter((tag) => usedTags.has(tag))];
  let activeFilter: ProjectFilter = 'All';

  $: visibleProjects = [...(activeFilter === 'All' ? projects : projects.filter((project) => project.tags.includes(activeFilter as ProjectTag)))].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );
</script>

<section id={id} class="section-shell" use:sectionObserver={{ id }}>
  <div class="section-inner">
    <div class="reveal" use:scrollReveal>
      <SectionHeading
        eyebrow="Projects"
        title="Case studies and experiments with product flavor."
        description="A portfolio should prove that you can think in systems, not just ship screens. These project cards are built to open into deeper narratives when someone wants the full story."
      />
    </div>

    <div class="reveal mb-8 flex flex-wrap gap-2" use:scrollReveal>
      {#each filters as filter}
        <button
          type="button"
          class={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeFilter === filter
              ? 'bg-[color-mix(in_srgb,var(--accent-primary)_15%,transparent)] text-[var(--text-primary)] ring-1 ring-[var(--border-emphasis)]'
              : 'border border-white/10 bg-white/5 text-[var(--text-secondary)] hover:border-[var(--border-emphasis)] hover:text-[var(--text-primary)]'
          }`}
          on:click={() => (activeFilter = filter)}
        >
          {filter}
        </button>
      {/each}
    </div>

    <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {#each visibleProjects as project (project.id)}
        <div class="reveal" use:scrollReveal={{ threshold: 0.15 }}>
          <ProjectCard {project} />
        </div>
      {/each}
    </div>
  </div>
</section>
