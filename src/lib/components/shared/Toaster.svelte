<script lang="ts">
  import { toasts, dismissToast } from '$lib/stores/toast';
  import { fade, fly } from 'svelte/transition';
</script>

<div class="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(92vw,22rem)] flex-col gap-3">
  {#each $toasts as toast (toast.id)}
    <article
      in:fly={{ y: 12, duration: 220 }}
      out:fade={{ duration: 160 }}
      class={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-xl backdrop-blur ${
        toast.tone === 'success'
          ? 'border-emerald-400/30 bg-emerald-500/15 text-emerald-100'
          : toast.tone === 'danger'
            ? 'border-rose-400/30 bg-rose-500/15 text-rose-100'
            : 'border-white/10 bg-[var(--bg-elevated)] text-[var(--text-primary)]'
      }`}
      role="status"
      aria-live="polite"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="space-y-1">
          <h3 class="text-sm font-semibold">{toast.title}</h3>
          {#if toast.description}
            <p class="text-sm text-[color:var(--text-secondary)]">{toast.description}</p>
          {/if}
        </div>
        <button
          type="button"
          class="rounded-full px-2 py-1 text-[var(--text-secondary)] transition hover:bg-white/10 hover:text-[var(--text-primary)]"
          aria-label="Dismiss notification"
          on:click={() => dismissToast(toast.id)}
        >
          x
        </button>
      </div>
    </article>
  {/each}
</div>
