<script lang="ts">
  import { navigation } from '$lib/data/navigation';
</script>

<footer class="border-t border-white/8 bg-[var(--bg-base)] py-10">
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div class="max-w-xl space-y-3">
        <p class="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-tertiary)]">Olunlade Abdulmuiz</p>
        <p class="text-sm leading-6 text-[var(--text-secondary)]">
          Designed to feel like a product, built to read like a clean engineering case study.
        </p>
      </div>

      <nav class="flex flex-wrap gap-3" aria-label="Footer">
        {#each navigation as item}
          <a
            href={item.href}
            class="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-emphasis)] hover:text-[var(--text-primary)]"
          >
            {item.label}
          </a>
        {/each}
      </nav>
    </div>

    <div class="flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-[var(--text-tertiary)] md:flex-row md:items-center md:justify-between">
      <p>Built with SvelteKit, Tailwind CSS, and a lot of intention.</p>
      <p>Available for frontend and full-stack roles in Lagos or remote.</p>
    </div>
  </div>
</footer>
