<script lang="ts">
  import '@fontsource/syne';
  import '@fontsource/dm-sans';
  import '@fontsource/jetbrains-mono';
  import '../app.css';

  import Navbar from '$lib/components/shared/Navbar.svelte';
  import PageTransition from '$lib/components/shared/PageTransition.svelte';
  import ProjectModal from '$lib/components/shared/ProjectModal.svelte';
  import CommandPalette from '$lib/components/shared/CommandPalette.svelte';
  import SkipNav from '$lib/components/shared/SkipNav.svelte';
  import Toaster from '$lib/components/shared/Toaster.svelte';
  import { openCommandPalette } from '$lib/stores/command';

  function handleShortcut(event: KeyboardEvent) {
    const isCommandKey = event.metaKey || event.ctrlKey;

    if (isCommandKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      openCommandPalette();
    }
  }
</script>

<svelte:head>
  <title>Olunlade Abdulmuiz | Interactive Developer Portfolio</title>
  <meta
    name="description"
    content="A cinematic SvelteKit portfolio for Olunlade Abdulmuiz, built as a premium interactive experience."
  />
  <meta property="og:title" content="Olunlade Abdulmuiz | Interactive Developer Portfolio" />
  <meta property="og:description" content="Premium SvelteKit portfolio with motion, AI assistant, and polished case studies." />
  <meta property="og:image" content="/og-image.svg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="/og-image.svg" />
  <meta name="theme-color" content="#06080F" />
</svelte:head>

<svelte:window on:keydown={handleShortcut} />

<SkipNav />
<Navbar />
<PageTransition>
  <slot />
</PageTransition>
<ProjectModal />
<CommandPalette />
<Toaster />
