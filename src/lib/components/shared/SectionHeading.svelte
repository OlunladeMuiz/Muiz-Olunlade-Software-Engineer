<script lang="ts">
  export let eyebrow = '';
  export let title = '';
  export let description = '';
</script>

<div class="mb-10 max-w-3xl space-y-4">
  {#if eyebrow}
    <p class="text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-primary)]">{eyebrow}</p>
  {/if}

  <h2 class="max-w-2xl font-[var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
    {title}
  </h2>

  {#if description}
    <p class="max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">{description}</p>
  {/if}
</div>
