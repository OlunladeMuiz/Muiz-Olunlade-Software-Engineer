<script lang="ts">
  export let className = '';
</script>

<a
  href="#main"
  class={`skip-link fixed left-4 top-4 z-[100] -translate-y-16 rounded-full border border-white/10 bg-[var(--bg-elevated)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] shadow-lg transition-transform duration-200 focus:translate-y-0 ${className}`}
>
  Skip to content
</a>
