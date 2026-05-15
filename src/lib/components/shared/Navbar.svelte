<script lang="ts">
  import { onMount } from 'svelte';
  import { trapFocus } from '$lib/actions/trapFocus';
  import { activeSection } from '$lib/stores/active-section';
  import { openCommandPalette } from '$lib/stores/command';
  import { navigation } from '$lib/data/navigation';
  import ThemeToggle from '$lib/components/shared/ThemeToggle.svelte';

  let scrolled = false;
  let mobileOpen = false;

  function handleScroll() {
    scrolled = window.scrollY > 24;
  }

  function goToSection(href: string) {
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileOpen = false;
    }
  }

  onMount(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<header
  class={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300 ${
    scrolled ? 'border-white/8 backdrop-blur-xl' : 'border-transparent'
  }`}
  style={scrolled ? 'background: color-mix(in srgb, var(--bg-surface) 82%, transparent);' : 'background: transparent;'}
>
  <div class="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <a
      href="#hero"
      class="group inline-flex items-center gap-3 text-sm font-semibold tracking-[0.24em] text-[var(--text-primary)]"
    >
      <span class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--accent-primary)] transition group-hover:scale-105 group-hover:border-[var(--border-emphasis)]">
        OA
      </span>
      <span class="hidden sm:block">OLUNLADE ABDULMUIZ</span>
    </a>

    <nav class="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 lg:flex" aria-label="Primary">
      {#each navigation as item}
        <a
          href={item.href}
          class={`rounded-full px-4 py-2 text-sm font-medium transition ${
            $activeSection === item.href.slice(1)
              ? 'bg-[color-mix(in_srgb,var(--accent-primary)_15%,transparent)] text-[var(--text-primary)] ring-1 ring-[var(--border-emphasis)]'
              : 'text-[var(--text-secondary)] hover:bg-white/5 hover:text-[var(--text-primary)]'
          }`}
          aria-current={$activeSection === item.href.slice(1) ? 'page' : undefined}
          on:click|preventDefault={() => goToSection(item.href)}
        >
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="flex items-center gap-3">
      <button
        type="button"
        class="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)] hover:bg-white/10 lg:inline-flex"
        on:click={() => openCommandPalette()}
      >
        <span>Command</span>
        <kbd class="rounded-md border border-white/10 bg-black/20 px-2 py-0.5 font-mono text-[11px] text-[var(--text-secondary)]">Cmd/Ctrl K</kbd>
      </button>

      <div class="hidden xl:block">
        <ThemeToggle />
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold tracking-[0.18em] text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)] hover:bg-white/10 lg:hidden"
        aria-label="Open navigation menu"
        on:click={() => (mobileOpen = true)}
      >
        Nav
      </button>
    </div>
  </div>

  <div class={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
    <button
      type="button"
      class={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        mobileOpen ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Close navigation drawer"
      on:click={() => (mobileOpen = false)}
    ></button>

    <aside
      use:trapFocus
      class={`absolute right-0 top-0 flex h-full w-[min(88vw,20rem)] flex-col gap-6 border-l border-white/10 bg-[var(--bg-surface)] p-6 shadow-2xl transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-label="Mobile navigation"
    >
      <div class="flex items-center justify-between">
        <span class="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--text-secondary)]">Navigate</span>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--text-primary)]"
          aria-label="Close navigation menu"
          on:click={() => (mobileOpen = false)}
        >
          x
        </button>
      </div>

      <nav class="flex flex-1 flex-col gap-2" aria-label="Mobile primary">
        {#each navigation as item}
          <a
            href={item.href}
            class="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 text-base font-medium text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)]"
            aria-current={$activeSection === item.href.slice(1) ? 'page' : undefined}
            on:click|preventDefault={() => goToSection(item.href)}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <div class="space-y-3">
        <button
          type="button"
          class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)]"
          on:click={() => {
            mobileOpen = false;
            openCommandPalette();
          }}
        >
          Open command palette
        </button>
        <ThemeToggle />
      </div>
    </aside>
  </div>
</header>
