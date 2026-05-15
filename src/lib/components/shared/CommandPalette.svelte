<script lang="ts">
  import { projects } from '$lib/data/projects';
  import { commandPaletteOpen, closeCommandPalette } from '$lib/stores/command';
  import { openProject } from '$lib/stores/active-project';
  import { theme } from '$lib/stores/theme';
  import { toast } from '$lib/stores/toast';
  import { fade, fly } from 'svelte/transition';
  import { onDestroy, tick } from 'svelte';
  import { trapFocus } from '$lib/actions/trapFocus';
  import type { ChatMessage, CommandItem } from '$lib/types/ai';

  let input: HTMLInputElement | null = null;
  let query = '';
  let mode: 'commands' | 'ai' = 'commands';
  let aiPrompt = '';
  let aiMessages: ChatMessage[] = [
    {
      role: 'assistant',
      content: "Ask me about FXGuard, LifeOS, NEXUS Terminal, stack, experience, or availability."
    }
  ];
  let aiLoading = false;
  let isMounted = true;

  type ProjectPaletteItem = {
    id: string;
    title: string;
    description: string;
    kind: 'project';
    projectId: string;
    searchText: string;
  };

  type PaletteItem = CommandItem | ProjectPaletteItem;

  const actionItems: CommandItem[] = [
    {
      id: 'about',
      title: 'Go to About',
      description: 'Jump to the profile and timeline section.',
      kind: 'navigation',
      href: '#about'
    },
    {
      id: 'projects',
      title: 'Go to Projects',
      description: 'Scroll into the project showcase.',
      kind: 'navigation',
      href: '#projects'
    },
    {
      id: 'skills',
      title: 'Go to Skills',
      description: 'Review the stack breakdown and proficiency bars.',
      kind: 'navigation',
      href: '#skills'
    },
    {
      id: 'contact',
      title: 'Go to Contact',
      description: 'Open the contact form and reach out.',
      kind: 'navigation',
      href: '#contact'
    },
    {
      id: 'theme',
      title: 'Toggle Theme',
      description: 'Switch between dark and light modes.',
      kind: 'action'
    },
    {
      id: 'resume',
      title: 'Download Resume',
      description: 'Get the portfolio resume file.',
      kind: 'action'
    },
    {
      id: 'copy-email',
      title: 'Copy Email Address',
      description: 'Copy the contact address to your clipboard.',
      kind: 'action'
    },
    {
      id: 'ask-ai',
      title: 'Ask Muiz AI',
      description: 'Switch to portfolio assistant mode.',
      kind: 'ai'
    }
  ];

  const paletteItems = [...actionItems];

  function scrollToHash(hash: string) {
    const target = document.querySelector(hash);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function close() {
    closeCommandPalette();
    query = '';
    aiPrompt = '';
    mode = 'commands';
  }

  function selectItem(item: PaletteItem) {
    switch (item.id) {
      case 'ask-ai':
        mode = 'ai';
        query = '';
        aiPrompt = '';
        return;
      case 'theme':
        theme.toggle();
        toast('Theme updated', 'The interface has been switched.');
        break;
      case 'resume':
        window.open('/resume', '_blank');
        toast('Resume opened', 'Your browser should start the download.');
        break;
      case 'copy-email':
        navigator.clipboard
          .writeText('abdulmuiz@example.com')
          .then(() => toast('Email copied', 'Paste it anywhere you need it.'))
          .catch(() => toast('Copy failed', 'You can still use the email shown in Contact.', 'danger'));
        break;
      default:
        if (item.kind === 'navigation' && item.href) {
          scrollToHash(item.href);
        } else if (item.kind === 'project' && 'projectId' in item) {
          const project = projects.find((entry) => entry.id === item.projectId);
          if (project) {
            openProject(project);
          }
        }
        break;
    }

    close();
  }

  function filteredItems() {
    const search = query.trim().toLowerCase();
    const projectItems: ProjectPaletteItem[] = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.tagline,
      kind: 'project' as const,
      projectId: project.id,
      searchText: [
        project.title,
        project.tagline,
        project.summary,
        project.description,
        project.longDescription,
        project.category,
        project.status,
        project.tags.join(' '),
        project.stack.join(' '),
        project.technologies.map((tech) => tech.name).join(' ')
      ].join(' ')
    }));

    const items: PaletteItem[] = [...paletteItems, ...projectItems];

    if (!search) {
      return items;
    }

    return items.filter((item) => {
      const haystack = `${item.title} ${item.description} ${item.kind}${'searchText' in item ? ` ${item.searchText}` : ''}`.toLowerCase();
      return haystack.includes(search);
    });
  }

  async function submitAi() {
    const prompt = aiPrompt.trim();
    if (!prompt || aiLoading) {
      return;
    }

    mode = 'ai';
    aiLoading = true;
    aiMessages = [...aiMessages, { role: 'user', content: prompt }, { role: 'assistant', content: '' }];
    aiPrompt = '';

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: aiMessages.filter((message) => message.content.trim().length > 0) })
      });

      if (!response.ok) {
        throw new Error('AI request failed');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      if (reader) {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          assistantText += decoder.decode(value, { stream: true });
          if (!isMounted) {
            return;
          }
          aiMessages = [...aiMessages.slice(0, -1), { role: 'assistant', content: assistantText }];
        }
      } else {
        assistantText = await response.text();
        if (!isMounted) {
          return;
        }
        aiMessages = [...aiMessages.slice(0, -1), { role: 'assistant', content: assistantText }];
      }
    } catch {
      if (!isMounted) {
        return;
      }
      aiMessages = [...aiMessages.slice(0, -1), { role: 'assistant', content: 'I could not reach the assistant right now. Try again in a moment.' }];
    } finally {
      if (isMounted) {
        aiLoading = false;
      }
    }
  }

  $: if ($commandPaletteOpen) {
    tick().then(() => input?.focus());
  }

  $: if (query.toLowerCase().startsWith('ask ')) {
    mode = 'ai';
    aiPrompt = query.slice(4).trim();
    query = '';
  }

  onDestroy(() => {
    isMounted = false;
  });
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'Escape' && $commandPaletteOpen) {
      close();
    }
  }}
/>

{#if $commandPaletteOpen}
  <div class="fixed inset-0 z-[90] flex items-start justify-center px-4 py-16 sm:py-20">
    <button
      type="button"
      class="absolute inset-0 bg-black/60 backdrop-blur-sm"
      aria-label="Close command palette"
      transition:fade
      on:click={close}
    ></button>

    <div
      use:trapFocus
      class="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-[var(--bg-surface)] shadow-[0_30px_120px_rgba(0,0,0,0.45)]"
      transition:fly={{ y: -12, duration: 220 }}
      aria-label="Command palette"
      role="dialog"
      aria-modal="true"
    >
      <div class="border-b border-white/8 p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-primary)]">Command Palette</p>
            <h2 class="mt-2 font-[var(--font-display)] text-2xl font-semibold text-[var(--text-primary)]">Navigate or ask Muiz AI</h2>
          </div>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xl text-[var(--text-primary)] transition hover:border-[var(--border-emphasis)] hover:bg-white/10"
            aria-label="Close command palette"
            on:click={close}
          >
            x
          </button>
        </div>

        <div class="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            class={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === 'commands'
                ? 'bg-[color-mix(in_srgb,var(--accent-primary)_15%,transparent)] text-[var(--text-primary)] ring-1 ring-[var(--border-emphasis)]'
                : 'border border-white/10 bg-white/5 text-[var(--text-secondary)]'
            }`}
            on:click={() => (mode = 'commands')}
          >
            Commands
          </button>
          <button
            type="button"
            class={`rounded-full px-4 py-2 text-sm font-medium transition ${
              mode === 'ai'
                ? 'bg-[color-mix(in_srgb,var(--accent-primary)_15%,transparent)] text-[var(--text-primary)] ring-1 ring-[var(--border-emphasis)]'
                : 'border border-white/10 bg-white/5 text-[var(--text-secondary)]'
            }`}
            on:click={() => (mode = 'ai')}
          >
            Ask AI
          </button>
        </div>

        <div class="mt-4">
          <input
            bind:this={input}
            bind:value={query}
            type="text"
            class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-emphasis)] focus:outline-none"
            placeholder={mode === 'ai' ? 'Ask about FXGuard, LifeOS, NEXUS Terminal, or the stack...' : 'Search commands, projects, or actions...'}
            aria-label="Command search"
            on:keydown={(event) => {
              if (event.key === 'Enter') {
                if (mode === 'ai') {
                  submitAi();
                } else {
                  const firstItem = filteredItems()[0];
                  if (firstItem) {
                    selectItem(firstItem);
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {#if mode === 'commands'}
        <div class="max-h-[30rem] overflow-y-auto p-2 sm:p-4">
          {#each filteredItems() as item (item.id)}
            <button
              type="button"
              class="flex w-full items-start gap-4 rounded-2xl border border-transparent px-4 py-4 text-left transition hover:border-[var(--border-emphasis)] hover:bg-white/5"
              on:click={() => selectItem(item)}
            >
              <span class="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/6 text-sm font-semibold text-[var(--accent-primary)]" aria-hidden="true">
                {item.kind === 'project' ? 'P' : item.kind === 'ai' ? 'AI' : '->'}
              </span>
              <span class="space-y-1">
                <span class="block text-sm font-semibold text-[var(--text-primary)]">{item.title}</span>
                <span class="block text-sm leading-6 text-[var(--text-secondary)]">{item.description}</span>
              </span>
            </button>
          {/each}
        </div>
      {:else}
        <div class="grid gap-4 p-4 sm:grid-cols-[1fr_auto]">
          <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <div class="space-y-3" aria-live="polite">
              {#each aiMessages as message}
                <article class={`rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'ml-auto max-w-[85%] border border-white/8 bg-[color-mix(in_srgb,var(--accent-primary)_10%,transparent)] text-[var(--text-primary)]' : 'max-w-[92%] border border-white/8 bg-black/10 text-[var(--text-secondary)]'}`}>
                  {message.content}
                </article>
              {/each}
            </div>
          </div>

        <div class="flex min-w-[14rem] flex-col gap-3">
          <textarea
            bind:value={aiPrompt}
            class="min-h-40 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-emphasis)] focus:outline-none"
            placeholder="What is Muiz's strongest project?"
            aria-label="AI prompt"
          ></textarea>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-full bg-[var(--accent-primary)] px-4 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={aiLoading}
            on:click={submitAi}
            >
              {aiLoading ? 'Thinking...' : 'Ask AI'}
            </button>
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}
