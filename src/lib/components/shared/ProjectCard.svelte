<script lang="ts">
  import type { Project } from '$lib/types/project';
  import { openProject } from '$lib/stores/active-project';

  export let project: Project;

  let glareX = 50;
  let glareY = 35;
  const hero = project.screenshots[0] ?? null;
  const titleId = `${project.id}-title`;
  const descriptionId = `${project.id}-description`;

  function handleMove(event: MouseEvent) {
    const currentTarget = event.currentTarget as HTMLElement;
    const rect = currentTarget.getBoundingClientRect();
    glareX = ((event.clientX - rect.left) / rect.width) * 100;
    glareY = ((event.clientY - rect.top) / rect.height) * 100;
  }

  function formatStatus(status: Project['status']) {
    if (status === 'in-progress') {
      return 'In Progress';
    }

    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  function formatCategory(category: Project['category']) {
    if (category === 'fullstack') {
      return 'Full Stack';
    }

    return category.charAt(0).toUpperCase() + category.slice(1);
  }
</script>

<article
  class="group relative flex h-full overflow-hidden rounded-[1.75rem] border border-white/8 bg-[var(--bg-elevated)] transition duration-300 hover:-translate-y-2 hover:border-[var(--border-emphasis)] hover:shadow-[0_24px_80px_rgba(0,194,255,0.12)]"
  style={`--glare-x: ${glareX}%; --glare-y: ${glareY}%; border-color: color-mix(in srgb, ${project.accent} 30%, var(--border-default));`}
  on:mousemove={handleMove}
>
  <button
    type="button"
    class="absolute inset-0 z-0 rounded-[1.75rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-elevated)]"
    aria-label={`Open ${project.title} project details`}
    aria-describedby={descriptionId}
    on:click={() => openProject(project)}
  ></button>

  <div
    class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    style={`background: radial-gradient(circle at var(--glare-x) var(--glare-y), color-mix(in srgb, ${project.accent} 18%, transparent), transparent 58%);`}
  ></div>

  <div class="relative z-10 flex h-full flex-1 flex-col pointer-events-none">
    <div class="relative overflow-hidden border-b border-white/8">
      {#if hero}
        <img
          src={hero.src}
          alt={hero.alt}
          width={hero.width}
          height={hero.height}
          class="aspect-[21/10] w-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
      {:else}
        <div class="aspect-[21/10] w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0.2))]"></div>
      {/if}

      <div class="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0)_0%,rgba(3,7,18,0.16)_48%,rgba(3,7,18,0.6)_100%)]"></div>

      <div class="absolute left-4 top-4 flex flex-wrap gap-2">
        {#each project.tags as tag}
          <span class="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
            {tag}
          </span>
        {/each}
      </div>

      <div class="absolute right-4 top-4 flex flex-col items-end gap-2">
        <span class="rounded-full border border-white/10 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/90">
          {formatStatus(project.status)}
        </span>
        {#if project.featured}
          <span class="rounded-full border border-white/10 bg-[color-mix(in_srgb,var(--accent-primary)_18%,black)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
            Featured
          </span>
        {/if}
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-5 p-5">
      <div class="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
        <span>{project.year}</span>
        <span>{formatCategory(project.category)}</span>
      </div>

      <div class="space-y-3">
        <h3 id={titleId} class="font-[var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {project.title}
        </h3>
        <p class="text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent-primary)]">
          {project.tagline}
        </p>
        <p id={descriptionId} class="min-h-[4.5rem] text-sm leading-6 text-[var(--text-secondary)] sm:text-[0.95rem]">
          {project.summary}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        {#each project.stack as tech}
          <span class="rounded-full border border-white/8 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
            {tech}
          </span>
        {/each}
      </div>

      <div class="mt-auto flex flex-wrap items-center gap-3 pt-3 pointer-events-auto">
        {#if project.links.length > 0}
          {#each project.links as link}
            <a
              href={link.href}
              class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)] hover:bg-white/10"
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
            >
              {link.label}
              {#if link.external}
                <span aria-hidden="true">-></span>
              {/if}
            </a>
          {/each}
        {:else}
          <span class="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">
            Open the case study for the full story
          </span>
        {/if}
      </div>
    </div>
  </div>
</article>
