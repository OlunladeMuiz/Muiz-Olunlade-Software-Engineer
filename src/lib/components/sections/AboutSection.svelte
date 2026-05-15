<script lang="ts">
  import { onMount } from 'svelte';
  import { scrollReveal } from '$lib/actions/scrollReveal';
  import { sectionObserver } from '$lib/actions/sectionObserver';
  import SectionHeading from '$lib/components/shared/SectionHeading.svelte';
  import { prefersReducedMotion } from '$lib/utils/animations';

  export let id = 'about';

  const profileImage = '/images/profile/muiz-profile.png';

  let years = 0;
  let projects = 0;
  let tools = 0;

  onMount(() => {
    if (prefersReducedMotion()) {
      years = 2;
      projects = 10;
      tools = 5;
      return;
    }

    const start = performance.now();
    const duration = 1000;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      years = Math.round(progress * 2);
      projects = Math.round(progress * 10);
      tools = Math.round(progress * 5);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  });
</script>

<section id={id} class="section-shell" use:sectionObserver={{ id }}>
  <div class="section-inner">
    <div class="reveal" use:scrollReveal>
      <SectionHeading
        eyebrow="About"
        title="Systems thinking, intentional design, and practical shipping discipline."
        description="I like interfaces that feel composed. The goal is to combine strong visual identity with engineering choices that keep the experience fast, accessible, and easy to extend."
      />
    </div>

    <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div class="reveal" use:scrollReveal>
        <div class="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(0,194,255,0.18),rgba(123,97,255,0.12))] p-6">
          <div class="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[var(--bg-base)]">
            <img
              src={profileImage}
              alt="Portrait of Olunlade Abdulmuiz"
              width="864"
              height="1184"
              class="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
              decoding="async"
            />
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.18),transparent_42%),linear-gradient(180deg,rgba(6,8,15,0)_35%,rgba(6,8,15,0.68)_100%)]"></div>
            <div class="absolute inset-0 flex items-end p-6">
              <div class="space-y-3">
                <p class="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-tertiary)]">Profile</p>
                <p class="font-[var(--font-display)] text-3xl font-semibold text-[var(--text-primary)]">Olunlade Abdulmuiz</p>
                <p class="max-w-xs text-sm leading-6 text-[var(--text-secondary)]">Frontend-specialized full-stack developer focused on clean interfaces, clear systems, and polished shipping.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-5 grid grid-cols-3 gap-3">
          <div class="surface-soft rounded-[1.25rem] p-4 text-center">
            <p class="text-3xl font-[var(--font-display)] font-semibold text-[var(--text-primary)]">{years}+</p>
            <p class="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Years</p>
          </div>
          <div class="surface-soft rounded-[1.25rem] p-4 text-center">
            <p class="text-3xl font-[var(--font-display)] font-semibold text-[var(--text-primary)]">{projects}+</p>
            <p class="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Projects</p>
          </div>
          <div class="surface-soft rounded-[1.25rem] p-4 text-center">
            <p class="text-3xl font-[var(--font-display)] font-semibold text-[var(--text-primary)]">{tools}+</p>
            <p class="mt-1 text-xs uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Tools</p>
          </div>
        </div>
      </div>

      <div class="reveal space-y-6" use:scrollReveal>
        <div class="surface rounded-[2rem] p-6 sm:p-8">
          <p class="text-base leading-7 text-[var(--text-secondary)]">
            I am a <mark class="rounded bg-[color-mix(in_srgb,var(--accent-primary)_15%,transparent)] px-1 text-[var(--text-primary)]">frontend-specialized full-stack developer</mark> who enjoys shaping product experiences with a strong design point of view. I care about the details that users can feel immediately: spacing, motion, timing, and clarity.
          </p>
          <p class="mt-4 text-base leading-7 text-[var(--text-secondary)]">
            My recent work centers on <mark class="rounded bg-[color-mix(in_srgb,var(--accent-primary)_15%,transparent)] px-1 text-[var(--text-primary)]">FXGuard</mark>, a fintech product for African SMEs, and on building portfolio experiences that signal taste, technical judgment, and execution quality.
          </p>
        </div>

        <div class="surface rounded-[2rem] p-6 sm:p-8">
          <h3 class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Journey</h3>
          <div class="mt-5 space-y-5">
            {#each [
              { label: 'University', value: 'CS training and foundational systems thinking' },
              { label: 'Freelancing', value: 'Client work, product interfaces, and delivery discipline' },
              { label: 'FXGuard', value: 'Fintech product exploration and applied frontend architecture' },
              { label: 'Now', value: 'Stage 5b portfolio and a sharper design system' }
            ] as step, index}
              <div class="flex gap-4">
                <div class="flex flex-col items-center">
                  <span class="mt-1 h-3 w-3 rounded-full bg-[var(--accent-primary)]"></span>
                  {#if index < 3}
                    <span class="h-full w-px bg-white/10"></span>
                  {/if}
                </div>
                <div class="pb-1">
                  <p class="text-sm font-semibold text-[var(--text-primary)]">{step.label}</p>
                  <p class="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{step.value}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
