<script lang="ts">
  import { activeProject, closeProject } from '$lib/stores/active-project';
  import type { Project, ProjectLink, ProjectScreenshot } from '$lib/types/project';
  import { fade, scale } from 'svelte/transition';
  import { trapFocus } from '$lib/actions/trapFocus';
  import { onMount } from 'svelte';

  let closeButton: HTMLButtonElement | null = null;
  let previousFocus: HTMLElement | null = null;
  let heroScreenshot: ProjectScreenshot | null = null;
  let projectLinks: ProjectLink[] = [];

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeProject();
    }
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

  function buildLinks(project: Project | null) {
    if (!project) {
      return [];
    }

    const seen = new Set<string>();
    const combined: ProjectLink[] = [
      ...project.links,
      ...(project.liveUrl
        ? [
            {
              label: 'Live Demo',
              href: project.liveUrl,
              external: true
            }
          ]
        : []),
      ...(project.repoUrl
        ? [
            {
              label: 'Source Code',
              href: project.repoUrl,
              external: true
            }
          ]
        : [])
    ];

    return combined.filter((link) => {
      if (seen.has(link.href)) {
        return false;
      }

      seen.add(link.href);
      return true;
    });
  }

  onMount(() => {
    return () => {
      if (previousFocus) {
        previousFocus.focus();
      }
    };
  });

  $: if (typeof document !== 'undefined') {
    document.body.style.overflow = $activeProject ? 'hidden' : '';
  }

  $: if ($activeProject && typeof document !== 'undefined') {
    previousFocus = document.activeElement as HTMLElement | null;
    heroScreenshot = $activeProject.screenshots[0] ?? null;
    projectLinks = buildLinks($activeProject);
    queueMicrotask(() => {
      closeButton?.focus();
    });
  }

  $: if (!$activeProject && typeof document !== 'undefined') {
    document.body.style.overflow = '';
    heroScreenshot = null;
    projectLinks = [];
    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $activeProject}
  <div class="fixed inset-0 z-[80] flex items-center justify-center px-4 py-6">
    <button
      type="button"
      class="absolute inset-0 bg-black/65 backdrop-blur-sm"
      aria-label="Close project modal"
      transition:fade
      on:click={closeProject}
    ></button>

    <div
      class="relative z-10 w-full max-w-5xl max-h-[calc(100vh-3rem)] overflow-y-auto rounded-[2rem] border border-white/10 bg-[var(--bg-surface)] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
      transition:scale={{ start: 0.96, duration: 220 }}
      use:trapFocus
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <div class="flex items-start justify-between gap-4 border-b border-white/8 p-6 sm:p-8">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-primary)]">Case Study</p>
          <h2 id="project-title" class="font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
            {$activeProject.title}
          </h2>
          <p class="max-w-2xl text-sm font-medium uppercase tracking-[0.24em] text-[var(--accent-primary)]">
            {$activeProject.tagline}
          </p>
          <p class="max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
            {$activeProject.description}
          </p>
        </div>

        <button
          type="button"
          bind:this={closeButton}
          class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)] hover:bg-white/10"
          aria-label="Close project modal"
          on:click={closeProject}
        >
          x
        </button>
      </div>

      <div class="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="space-y-6">
          <div class="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/15">
            {#if heroScreenshot}
              <img
                src={heroScreenshot.src}
                alt={heroScreenshot.alt}
                width={heroScreenshot.width}
                height={heroScreenshot.height}
                class="aspect-[21/10] w-full object-cover object-center"
                loading="lazy"
                decoding="async"
              />
            {:else}
              <div class="aspect-[21/10] w-full bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0.2))]"></div>
            {/if}
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:p-6">
            <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Project Story</h3>
            <p class="mt-4 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
              {$activeProject.longDescription}
            </p>
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(0,0,0,0.12))] p-5 sm:p-6">
            <div class="grid gap-3 sm:grid-cols-3">
              {#each $activeProject.metrics as metric}
                <div class="rounded-2xl border border-white/8 bg-black/15 p-4">
                  <p class="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">{metric.label}</p>
                  <p class="mt-2 font-[var(--font-display)] text-lg text-[var(--text-primary)]">{metric.value}</p>
                </div>
              {/each}
            </div>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Highlights</h3>
              <ul class="mt-4 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                {#each $activeProject.highlights as highlight}
                  <li class="flex gap-3">
                    <span class="mt-1 h-2 w-2 rounded-full bg-[var(--accent-primary)]"></span>
                    <span>{highlight}</span>
                  </li>
                {/each}
              </ul>
            </div>

            <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Challenges</h3>
              <ul class="mt-4 space-y-3 text-sm leading-6 text-[var(--text-secondary)]">
                {#each $activeProject.challenges as challenge}
                  <li class="flex gap-3">
                    <span class="mt-1 h-2 w-2 rounded-full bg-[color-mix(in_srgb,var(--accent-primary)_70%,white)]"></span>
                    <span>{challenge}</span>
                  </li>
                {/each}
              </ul>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Overview</h3>
              <div class="flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--text-tertiary)]">
                <span class="rounded-full border border-white/10 bg-black/20 px-3 py-1">{formatStatus($activeProject.status)}</span>
                <span class="rounded-full border border-white/10 bg-black/20 px-3 py-1">{formatCategory($activeProject.category)}</span>
                <span class="rounded-full border border-white/10 bg-black/20 px-3 py-1">{ $activeProject.year }</span>
              </div>
            </div>

            <div class="mt-4 flex flex-wrap gap-2">
              {#each $activeProject.tags as tag}
                <span class="rounded-full border border-white/8 bg-black/15 px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
                  {tag}
                </span>
              {/each}
            </div>
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Technologies</h3>
            <div class="mt-4 flex flex-wrap gap-2">
              {#each $activeProject.technologies as tech}
                <span class="rounded-2xl border border-white/8 bg-black/15 px-3 py-2 text-xs text-[var(--text-primary)]">
                  <span class="block font-medium">{tech.name}</span>
                  <span class="mt-1 block text-[10px] uppercase tracking-[0.2em] text-[var(--text-tertiary)]">{tech.category}</span>
                </span>
              {/each}
            </div>
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Why it matters</h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {$activeProject.aiContext}
            </p>
          </div>

          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Outcome</h3>
            <p class="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              {$activeProject.impact}
            </p>
          </div>

          {#if projectLinks.length > 0}
            <div class="flex flex-wrap gap-3">
              {#each projectLinks as link}
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
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}
