<script lang="ts">
  import { accent, accentPalette, theme, type AccentColor } from '$lib/stores/theme';

  const accents = Object.keys(accentPalette) as AccentColor[];
</script>

<div class="flex items-center gap-3">
  <button
    type="button"
    class="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)] hover:bg-white/10"
    on:click={() => theme.toggle()}
    aria-label="Toggle theme"
  >
    <span class="text-base">{ $theme === 'dark' ? 'Dark' : 'Light' }</span>
  </button>

  <div class="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1">
    {#each accents as accentName}
      <button
        type="button"
        class={`h-7 w-7 rounded-full border transition-transform hover:scale-110 ${
          $accent === accentName ? 'border-white/60' : 'border-white/10'
        }`}
        style={`background: ${accentPalette[accentName]}`}
        aria-label={`Select ${accentName} accent`}
        aria-pressed={$accent === accentName}
        on:click={() => accent.set(accentName)}
      ></button>
    {/each}
  </div>
</div>
