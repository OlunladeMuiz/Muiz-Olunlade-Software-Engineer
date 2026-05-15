<script lang="ts">
  import { page } from '$app/stores';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
</script>

{#key $page.url.pathname}
  <div in:fly={{ y: 18, duration: 420, easing: cubicOut }} out:fly={{ y: -18, duration: 240, easing: cubicOut }}>
    <slot />
  </div>
{/key}
