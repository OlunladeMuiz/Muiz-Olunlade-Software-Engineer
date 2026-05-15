<script lang="ts">
  import { onMount } from 'svelte';
  import { typewriter } from '$lib/actions/typewriter';
  import { magneticHover } from '$lib/actions/magneticHover';
  import { sectionObserver } from '$lib/actions/sectionObserver';
  import ParticleCanvas from '$lib/components/shared/ParticleCanvas.svelte';
  import { prefersReducedMotion } from '$lib/utils/animations';

  export let id = 'hero';

  const roles = ['Full-Stack Engineer', 'Frontend Architect', 'Fintech Builder', 'CS Student'];
  const name = 'Olunlade Abdulmuiz';
  const letters = Array.from(name);
  const profileImage = '/images/profile/muiz-profile.png';

  let heroCopy: HTMLElement | null = null;
  let heroPanel: HTMLElement | null = null;

  onMount(async () => {
    if (prefersReducedMotion() || !heroCopy || !heroPanel) {
      return;
    }

    const { gsap } = await import('gsap');

    gsap.from([heroCopy, heroPanel], {
      opacity: 0,
      y: 22,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12
    });
  });
</script>

<section
  id={id}
  class="section-shell relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32"
  use:sectionObserver={{ id }}
>
  <div class="absolute inset-0">
    <ParticleCanvas density={84} />
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.12),transparent_45%),linear-gradient(to_bottom,transparent,rgba(6,8,15,0.92))]"></div>
  </div>

  <div class="section-inner relative z-10">
    <div class="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
      <div bind:this={heroCopy} class="space-y-8">
        <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--text-secondary)]">
          <span class="h-2 w-2 rounded-full bg-[var(--accent-success)]"></span>
          Frontend Wizards Stage 5b
        </div>

        <div class="space-y-4">
          <h1 class="max-w-4xl text-balance font-[var(--font-display)] text-[clamp(3.5rem,9vw,7rem)] font-semibold leading-[0.95] tracking-tight text-[var(--text-primary)]">
            {#each letters as letter, index}
              <span class="hero-letter" style={`--delay: ${index * 40}ms`}>
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            {/each}
          </h1>

          <div class="flex flex-wrap items-center gap-3 text-lg sm:text-xl">
            <span class="text-[var(--text-secondary)]">I build</span>
            <span
              use:typewriter={{ words: roles, typingSpeed: 42, pause: 1500 }}
              class="min-h-[1.5em] font-[var(--font-display)] font-semibold text-[var(--accent-primary)]"
              aria-live="polite"
              aria-atomic="true"
            ></span>
            <span class="cursor-blink text-[var(--accent-primary)]">|</span>
          </div>
        </div>

        <p class="max-w-2xl text-lg leading-8 text-[var(--text-secondary)] sm:text-xl">
          I design and ship interactive web experiences that feel like polished products, not template pages. The goal is simple: make the first ten seconds impossible to ignore.
        </p>

        <div class="flex flex-wrap gap-4">
          <a
            href="#projects"
            use:magneticHover={{ strength: 14 }}
            class="inline-flex items-center justify-center rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110"
          >
            View Work
          </a>
          <a
            href="/resume"
            use:magneticHover={{ strength: 12 }}
            class="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)] hover:bg-white/10"
          >
            Download CV
          </a>
        </div>

        <div class="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
          <a class="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[var(--border-emphasis)] hover:text-[var(--text-primary)]" href="https://github.com/OlunladeMuiz" target="_blank" rel="noreferrer">GitHub</a>
          <a class="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[var(--border-emphasis)] hover:text-[var(--text-primary)]" href="www.linkedin.com/in/muiz-olunlade-1b12693a6" target="_blank" rel="noreferrer">LinkedIn</a>
          <a class="rounded-full border border-white/10 bg-white/5 px-4 py-2 transition hover:border-[var(--border-emphasis)] hover:text-[var(--text-primary)]" href="https://www.instagram.com/muiz_olunlade/" target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>

      <div bind:this={heroPanel} class="relative">
        <div class="floating rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="relative h-20 w-20 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(0,194,255,0.18),rgba(123,97,255,0.08))]">
                <img
                  src={profileImage}
                  alt="Portrait of Olunlade Abdulmuiz"
                  width="864"
                  height="1184"
                  class="h-full w-full object-cover object-top"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
                <div class="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,8,15,0)_45%,rgba(6,8,15,0.2)_100%)]"></div>
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Currently building</p>
                <p class="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--text-primary)]">Premium web experiences</p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-3">
              <div class="rounded-2xl border border-white/8 bg-black/15 p-4">
                <p class="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Focus</p>
                <p class="mt-2 text-sm font-medium text-[var(--text-primary)]">Frontend systems</p>
              </div>
              <div class="rounded-2xl border border-white/8 bg-black/15 p-4">
                <p class="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Stack</p>
                <p class="mt-2 text-sm font-medium text-[var(--text-primary)]">Svelte + TS</p>
              </div>
              <div class="rounded-2xl border border-white/8 bg-black/15 p-4">
                <p class="text-xs uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Mode</p>
                <p class="mt-2 text-sm font-medium text-[var(--text-primary)]">Ship fast</p>
              </div>
            </div>

            <div class="rounded-[1.5rem] border border-white/8 bg-black/10 p-4">
              <div class="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                <span>Hero motion</span>
                <span>Deliberate</span>
              </div>
              <div class="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                <div class="h-full w-[82%] rounded-full bg-[linear-gradient(90deg,var(--accent-primary),var(--accent-secondary))]"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center justify-center">
          <a href="#about" class="inline-flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--text-tertiary)] transition hover:text-[var(--text-primary)]">
            <span>Scroll</span>
            <span class="text-xl text-[var(--accent-primary)]" aria-hidden="true">v</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
